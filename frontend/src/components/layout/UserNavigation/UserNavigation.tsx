import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Bell } from "lucide-react";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOutIcon,
  UserIcon,
} from "lucide-react"
import LogOutDialog from "./LogOutDialog";
import { useState } from "react";
import { useNavigate } from "react-router";

interface UserNavigationProps {
    imageSrc: string
    username: string
}


export default function UserNavigation(props: UserNavigationProps) {
    const { username, imageSrc } = props
    const [logoutOpen, setLogoutOpen] = useState(false);
    const navigate = useNavigate()

    function handleNavigate() {
        navigate("/profile")
    }

    return (
        <div className="flex items-center gap-3">
            <Button variant="outline" size="icon">
                <Bell />
            </Button>
            <ModeToggle />
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="outline" className="py-6">
                    <p>{username}</p>
                    <Avatar>
                        <AvatarImage src={imageSrc} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Button>} />
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleNavigate}>
                        <UserIcon />
                            Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onClick={() => setLogoutOpen(true)}>
                        <LogOutIcon />
                        Log Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <LogOutDialog open={logoutOpen} onOpenChange={setLogoutOpen}/>
        </div>
    );
}
