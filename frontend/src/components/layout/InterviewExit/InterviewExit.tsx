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
import { useTranslation } from "react-i18next"

interface ExitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLeave: () => Promise<void>;
  isSaving: boolean;
}

export default function InterviewExit({
    open,
    onOpenChange,
    onLeave,
    isSaving
}: ExitDialogProps) {
    const { t } = useTranslation()
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogTrigger/>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t("interview.exitDialog.title")}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("interview.exitDialog.description")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isSaving}>{t("common.cancel")}</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isSaving}
                        onClick={(event) => {
                            event.preventDefault();
                            void onLeave();
                        }}
                    >
                        {isSaving ? t("interview.exitDialog.saving") : t("common.continue")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}