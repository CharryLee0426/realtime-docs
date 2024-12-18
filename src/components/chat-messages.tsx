// import { ElementRef, useRef } from "react";
import { ChatMessage } from "./chat-message";
import { CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Doc } from "../../convex/_generated/dataModel";
import { ElementRef, useEffect, useRef, useState } from "react";
import { RingLoader } from "react-spinners";

interface ChatMessagesProps {
    chats: Doc<"chats">[] | undefined;
    isLoading: boolean;
}

export const ChatMessages = ({chats, isLoading}: ChatMessagesProps) => {
    const scroolRef = useRef<ElementRef<"div">>(null);
    const messages = !!chats ? chats : [];

    useEffect(() => {
        scroolRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages.length]);

    const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false)
        }, 1000)

        return () => {
            clearTimeout(timeout)
        }
    }, []);

    return (
        <ScrollArea className="w-[400px] h-[360px] p-1">
            <CardContent className="bg-[#F8F6FF]">
                <div className="flex-1 overflow-y-auto pr-4">
                    {fakeLoading ===true ? (
                        <div className="w-full h-full flex items-center justify-center">
                        <RingLoader
                            color="#4A90E2"
                            aria-label="Loading..."
                            size={300}
                        />
                        </div>
                    ) : (
                        <>
                            {messages.map((message) => (
                                <ChatMessage
                                    key={message._id}
                                    isLoading={false}
                                    role={message.role}
                                    content={message.content}
                                />
                            ))}
                            {isLoading && (
                                <ChatMessage 
                                    isLoading
                                    role="system"
                                    content=""
                                />
                            )}
                            <div ref={scroolRef}/>
                        </>
                    )}
                </div>
            </CardContent>
        </ScrollArea>
    );
}