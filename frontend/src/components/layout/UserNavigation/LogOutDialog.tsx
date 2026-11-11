import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { authClient } from "@/lib/auth-client";
import { useTranslation } from "react-i18next";

interface LogOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export default function LogOutDialog({
    open,
    onOpenChange
}: LogOutDialogProps) {
    const { t } = useTranslation()

    async function handleLogout() {
        const { error } = await authClient.signOut();
    
        if (error) {
            return;
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogTrigger/>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t("nav.logoutDialog.title")}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("nav.logoutDialog.description")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>{t("common.continue")}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}