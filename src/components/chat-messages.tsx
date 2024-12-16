import { ChatMessage } from "./chat-message";
import { CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

export const ChatMessages = () => {
    const test = `
### Content Highlights:

1. **Headers**: \`#\` for H1.
2. **Bold and Italic** text.
3. **Lists**: Bullet points.
4. **Code Block**: A \`JavaScript\` code example.
5. **Blockquote**: For emphasized content.
6. **Link**: A clickable URL.

This Markdown file should render rich text, a code block with syntax highlighting, and other basic Markdown elements. Let me know if you need more complex examples! 🚀
`;
    return (
        <ScrollArea className="w-[400px] h-[360px] p-1">
            <CardContent className="bg-[#F8F6FF]">
                <div className="flex-1 overflow-y-auto pr-4">
                    <ChatMessage
                        isLoading={false}
                        role="system"
                        content={`Hi, I'm AI assistant`}
                    />
                    <ChatMessage 
                        isLoading={false}
                        role="user"
                        content="Give me some response."
                    />
                    <ChatMessage
                        isLoading={true}
                        role="system"
                        content={`Hi, I'm AI assistant`}
                    />
                    <ChatMessage 
                        isLoading={true}
                        role="user"
                        content="Give me some response."
                    />
                    <ChatMessage
                        isLoading={false}
                        role="system"
                        content={test}
                    />
                </div>
            </CardContent>
        </ScrollArea>
    );
}