import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface SlotDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>
}


export default function SlotDeleteDialog({
    open,
    onOpenChange,
    onConfirm
}: SlotDeleteDialogProps) {
    const { t } = useTranslation()
    const [ isDeleting, setIsDeleting ] = useState(false)

    async function handleDeleteSlot() {
        setIsDeleting(true)

        try {
            await onConfirm()
            onOpenChange(false)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogTrigger/>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{t("slot.deleteDialog.title")}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("slot.deleteDialog.description")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>{t("common.cancel")}</AlertDialogCancel>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDeleteSlot}
                        disabled={isDeleting}
                    >
                        {isDeleting ? t("slot.deleteDialog.deleting") : t("slot.deleteDialog.confirm")}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}