import { SendHorizonal, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";

export const ChatForm = () => {
    return (
        <CardFooter className="bg-[#F8F6FF] flex-col justify-start">
            <div className="py-2 flex items-center gap-x-2 w-full">
                <textarea
                    placeholder="Ask your assistant"
                    rows={1}
                    className="flex-1 rounded-lg bg-primary/10 p-2 h-10 max-h-32 resize-none overflow-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault(); // Prevent new line when pressing Enter
                            // TODO: handle submit logic
                        }
                    }}
                />

                <Button variant="ghost" className="p-2">
                    <SendHorizonal className="size-4"/>
                </Button>
                <Button variant="ghost" className="p-2">
                    <Trash2Icon className="size-4 text-red-500"/>
                </Button>
            </div>

            {/* Small Note */}
            <div className="text-xs text-gray-500">
                *AI assistant may generate inaccurate information.
            </div>
        </CardFooter>
    );
}