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
import { useNavigate } from "react-router";

interface LogOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export default function LogOutDialog({
    open,
    onOpenChange
}: LogOutDialogProps) {
    const navigate = useNavigate()

    async function handleLogout() {
        const { error } = await authClient.signOut();
    
        if (error) {
            console.log("Logout failed", error);
            return;
        }
    
        navigate("/login")
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogTrigger/>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be logged out.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}