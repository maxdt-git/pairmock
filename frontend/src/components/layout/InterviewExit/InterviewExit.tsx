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
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogTrigger/>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Once you leave this interview, you won't be able to rejoin the session. Make sure you've completed everything before leaving.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isSaving}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isSaving}
                        onClick={(event) => {
                            event.preventDefault();
                            void onLeave();
                        }}
                    >
                        {isSaving ? "Saving..." : "Continue"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}