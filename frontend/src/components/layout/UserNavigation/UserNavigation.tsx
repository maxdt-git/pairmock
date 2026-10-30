import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  LogOutIcon,
  UserIcon,
} from "lucide-react"
import LogOutDialog from "./LogOutDialog";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { Notif } from "@/types/notifications";


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

  async function getNotifications() {
    const res = await fetch('/api/notifications');
    if (!res.ok) {
      throw new Error('Failed to load notifs');
    }
    return res.json();
  }

  const notifFound = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    refetchInterval: 5 * 1000
  })

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon" aria-label="Notifications" />
          }
        >
          <Bell className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {notifFound?.data?.map((notif: Notif) => (
            <DropdownMenuItem key={notif.id}>
              {notif.description}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
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
      <LogOutDialog open={logoutOpen} onOpenChange={setLogoutOpen} />
    </div>
  );
}
