import { ChatForm } from "@/components/chat-form";
import { ChatHeader } from "@/components/chat-header";
import { ChatMessages } from "@/components/chat-messages";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const ChatRoom = () => {
    return (
        <Card className="w-[400px] h-[500px] flex flex-col bg-[#F8F6FF]">
            <ChatHeader />
            <Separator />
            <ChatMessages />
            <Separator />
            <ChatForm />
        </Card>
    );
}