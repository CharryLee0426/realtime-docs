import { ChatForm } from "@/components/chat-form";
import { ChatHeader } from "@/components/chat-header";
import { ChatMessages } from "@/components/chat-messages";
import { Card } from "@/components/ui/card";

export const ChatRoom = () => {
    /*
    TODO: ChatHeader UI Design;
    TODO: ChatMessages UI Design;
    TODO: ChatMessage UI Design;
    TODO: ChatForm UI Design;
    */
    return (
        <Card className="w-[350px] h-[400px] flex flex-col">
            <ChatHeader />
            <ChatMessages />
            <ChatForm />
        </Card>
    );
}