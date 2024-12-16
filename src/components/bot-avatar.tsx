import { Avatar, AvatarImage } from "./ui/avatar"

export const BotAvatar = () => {
    return (
        <Avatar className="h-12 w-12">
            <AvatarImage src="/assistant.webp" />
        </Avatar>
    )
}