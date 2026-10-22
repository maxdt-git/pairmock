import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Bell } from "lucide-react";
import { Link } from "react-router";

interface UserNavigationProps {
    imageSrc: string
    username: string
}

export default function UserNavigation(props: UserNavigationProps) {
    const { username, imageSrc } = props
    return (
        <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
                <Bell />
            </Button>
            <ModeToggle />
            <Link to="/profile" className="flex items-center gap-3 p-2 hover:bg-input/30 transition-all rounded-4xl">
                <p>{username}</p>
                <Avatar size="lg">
                    <AvatarImage src={imageSrc} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Link>
        </div>
    );
}
