import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Notif } from "@/types/notifications";
import { toast } from "@/components/ui/toast";
import { X } from "lucide-react";
import { formatDateTime } from "@/lib/dateFormat";
import { useTranslation } from "react-i18next";


interface UserNavigationProps {
  imageSrc: string
  username: string
}


export default function UserNavigation(props: UserNavigationProps) {
  const { username, imageSrc } = props
  const { t } = useTranslation()
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

  const queryClient = useQueryClient();

  const deleteNotifMutation = useMutation({
      mutationFn: async (notifId: Notif["id"]) => {
          const response = await fetch(`/api/notifications/${notifId}`, {
              method: "DELETE",
          });
          if (!response.ok) {
              throw new Error(`Failed to delete notif: ${response.status}`);
          }
      },
      onSuccess: async () => {
          await queryClient.invalidateQueries({
                  queryKey: ["notifications"],
          });
          toast.add({
              title: t("nav.notifDeleted.title"),
              description: t("nav.notifDeleted.description"),
              type: "success",
          });
      },
      onError: (error) => {
          console.error(error);
          toast.add({
              title: t("nav.notifDeleteFailed.title"),
              description: t("nav.notifDeleteFailed.description"),
              type: "error",
          });
      },
  });

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button className="relative" variant="outline" size="icon" aria-label={t("nav.notifications")} />
          }
        >
          <Bell className="h-4 w-4" />
          { notifFound.data?.length > 0 && (
            <span className="absolute -top-1 -right-1 flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"> </span>
              <span className="relative inline-flex size-3 rounded-full bg-sky-500"> </span>
            </span>
          )}

        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-70">
          {!notifFound.data?.length && (
            <p className="px-2 py-3 text-center text-sm text-muted-foreground">
              {t("nav.noNotifications")}
            </p>
          )}
          {notifFound?.data?.map((notif: Notif) => (
            <DropdownMenuItem key={notif.id} className="flex justify-between">
              <div>
                <p> {notif.description} </p>
                <p className="text-[10px] text-muted-foreground"> {formatDateTime(notif.createdAt).time} </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                aria-label={t("nav.deleteNotification")}
                onClick={() => deleteNotifMutation.mutate(notif.id)}>
                <X className="size-4" />
              </Button>
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
            {t("common.profile")}
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={() => setLogoutOpen(true)}>
            <LogOutIcon />
            {t("nav.logOut")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogOutDialog open={logoutOpen} onOpenChange={setLogoutOpen} />
    </div>
  );
}