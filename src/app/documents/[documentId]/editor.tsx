"use client";

import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'

// Custom Extensions
import { FontSizeExtension } from '@/extensions/font-size';
import { LineHeightExtension } from '@/extensions/line-height';

import { useEditorStore } from '@/app/store/use-editor-store'
import { Ruler } from './ruler';
import { Threads } from "./threads";
import { useStorage } from "@liveblocks/react";

import { RIGHT_MARGIN_DEFAULT, LEFT_MARGIN_DEFAULT } from "@/app/constants/margins";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";

interface EditorProps {
  id: Id<"documents">;
  initialContent?: string | undefined;
}

export const Editor = ({ initialContent, id }: EditorProps) => {
    const leftMargin = useStorage((root) => root.leftMargin);
    const rightMargin = useStorage((root) => root.rightMargin);
    const updatePreloaded = useMutation(api.documents.updateIsPreloadedById);
    const liveblocks = useLiveblocksExtension({
      initialContent,
      offlineSupport_experimental: true, // It will cause a preload bug if other users send initial content as offline support
    });

    useEffect(() => {
      if (initialContent) {
        updatePreloaded({ id: id });
      }
    }, []);

    // Function to upload an image via API
    const uploadImage = async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", file.name);

      const response = await fetch("/api/image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.serveUrl;
    };

    const { setEditor } = useEditorStore();

    const editor = useEditor({
        autofocus: true,
        immediatelyRender: false,
        onCreate({ editor }) {
            setEditor(editor);
        },
        onDestroy() {
            setEditor(null);
        },
        onUpdate({ editor }) {
          setEditor(editor);
        },
        onSelectionUpdate({ editor }) {
          setEditor(editor);
        },
        onTransaction({ editor }) {
          setEditor(editor);
        },
        onFocus({ editor }) {
          setEditor(editor);
        },
        onBlur({ editor }) {
          setEditor(editor);
        },
        onContentError({ editor }) {
          setEditor(editor);
        },
        editorProps: {
            attributes: {
                style: `padding-left: ${leftMargin ?? LEFT_MARGIN_DEFAULT}px; padding-right: ${rightMargin ?? RIGHT_MARGIN_DEFAULT}px;`, // Added padding to the editor
                class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text", // making the editor like a doc
                spellcheck: "true", // Explicitly set the spellcheck attribute
            },

            // Handle image drag-and-drop on the client side
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            handleDrop: (view, event, slice, moved) => {
              const file = event.dataTransfer?.files[0];
              if (file && file.type.startsWith("image/")) {
                event.preventDefault(); // Prevent default behavior

                (async () => {
                  try {
                    const imageUrl = await uploadImage(file); // Upload the image
                    editor?.chain().focus().setImage({ src: imageUrl, alt: imageUrl, title: imageUrl }).run(); // Insert the uploaded image
                  } catch (error) {
                    toast.error(`Image upload failed: ${error}`);
                  }
                })();

                return true;
              }
              return false;
            },
        },
        extensions: [
            liveblocks,
            StarterKit.configure({
              history: false, 
            }),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            Table.configure({
                resizable: true,
              }),
            TableRow,
            TableHeader,
            TableCell,
            Image,
            ImageResize,
            Underline,
            FontFamily,
            TextStyle,
            Color,
            Highlight.configure({
              multicolor: true,
            }),
            Link.configure({
              openOnClick: false,
              autolink: true,
              defaultProtocol: "https",
            }),
            TextAlign.configure({
              types: ['heading', 'paragraph'],
            }),
            FontSizeExtension,
            LineHeightExtension,
        ],
      });
    
    return (
        <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible"> {/* Added print:p-0 to remove padding on print */}
            <Ruler />
            <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
                <EditorContent editor={editor} />
                <Threads editor={editor} />
            </div>
        </div>
    );
}