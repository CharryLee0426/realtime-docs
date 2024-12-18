import { ChatForm } from "@/components/chat-form";
import { ChatHeader } from "@/components/chat-header";
import { ChatMessages } from "@/components/chat-messages";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

interface ChatRoomProps {
    documentId: string;
}

export const ChatRoom = ({documentId}: ChatRoomProps) => {
    const chats = useQuery(api.chats.getByDocumentId, {documentId: documentId});
    const create = useMutation(api.chats.create);
    const remove = useMutation(api.chats.deleteByDocumentId);

    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }

    const onSubmit = async (message: string) => {
        setDisabled(true);
        create({documentId: documentId, content: message, role: "user"})
        .then(() => {
            setMessage("");
            setDisabled(false);
        })
        .catch(() => toast.error("Something went wrong"))
        .finally(() => {
            setDisabled(false);
        });

        // generate the answer
        setIsLoading(true);
        const response = await fetch("/api/ai-assistant", {
            method: "POST",
            body: JSON.stringify({prompt: message}),
        });
        if (!response.ok) {
            toast.error("Something went wrong");
        }

        const data = await response.json();
        if (!data.result) {
            toast.error("Something went wrong");
        }

        // save the answer to the database
        create({documentId: documentId, content: data.result, role: "system"})
        .then(() => setIsLoading(false))
        .catch(() => toast.error("Something went wrong"));
    }

    

    const onRemove = () => {
        setDisabled(true);
        remove({documentId: documentId})
        .then(() => {
            setMessage("");
            toast.success("History removed");
        })
        .catch(() => {
            toast.error("Something went wrong");
        })
        .finally(() => {
            setDisabled(false);
        });
    }

    return (
        <Card className="w-[400px] h-[500px] flex flex-col bg-[#F8F6FF]">
            <ChatHeader />
            <Separator />
            <ChatMessages chats={chats} isLoading={isLoading} />
            <Separator />
            <ChatForm 
                message={message} 
                disabled={disabled} 
                onSubmit={onSubmit} 
                handleChange={handleChange} 
                onRemove={onRemove}
            />
        </Card>
    );
}