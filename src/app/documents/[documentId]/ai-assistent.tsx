import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuTrigger, 
} from "@/components/ui/dropdown-menu";
import { BotMessageSquareIcon } from "lucide-react";
import { ChatRoom } from "./chatroom";

interface AIAssistantProps {
    documentId: string;
}

export const AIAssistant = ({documentId}: AIAssistantProps) => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button 
                        className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-500 p-0 hover:bg-blue-600 focus:outline-none"
                    >
                        <BotMessageSquareIcon size={30} className="text-white font-bold" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                    side="top" 
                    align="center"
                    className="border-none shadow-none bg-[#F9FBFD]"
                >
                    <ChatRoom documentId={documentId}/>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}