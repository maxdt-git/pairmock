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
    const [ isDeleting, setIsDeleting ] = useState(false)

    async function handleDeleteSlot() {
        setIsDeleting(true)

        try {
            await onConfirm()
            onOpenChange(false)
        } catch (error) {
            console.error("Deletion failed", error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogTrigger/>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This slot will be deleted.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDeleteSlot}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete slot"}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}