import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { BotAvatar } from "./bot-avatar";
import { BeatLoader } from "react-spinners";
import { UserAvatar } from "./user-avatar";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import ImageResize from "tiptap-extension-resize-image";
import Image from '@tiptap/extension-image';
import Underline from "@tiptap/extension-underline";
import { FontFamily } from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";
import Highlight from '@tiptap/extension-highlight';
import { marked } from "marked";

export interface ChatMessageProps {
    role: "user" | "system";
    content?: string;
    isLoading?: boolean;
}

export const ChatMessage = ({
    role,
    content,
    isLoading,
}: ChatMessageProps) => {
    const renderContent = marked(content || "");
    const editor = useEditor({
        extensions: [
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
        content: renderContent, // Pass content to the editor
        editable: false, // Read-only mode
    });

    const onCopy = () => {
        if (!content) {
            return;
        }

        navigator.clipboard.writeText(content);
        toast.success("Copied to clipboard");
    }

    

    return (
        <div className={cn(
            "group flex items-start gap-x-3 py-4 w-full",
            role === "user" && "justify-end"
        )}>
            {role !== "user" && <BotAvatar />}

            <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
                {isLoading ? <BeatLoader size={5} /> : <EditorContent editor={editor} />}
            </div>

            {role === "user" && <UserAvatar />}

            {role !== "user" && !isLoading && (
                <div className="group flex-1">
                    <div>
                        <Button onClick={onCopy}
                            className="opacity-0 group-hover:opacity-100 transition"
                            size="icon"
                            variant="ghost">
                            <Copy className="w-4 h-4"/>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}