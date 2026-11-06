import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateSlotForm from "./CreateSlotForm";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";

export default function SlotCreation() {
    const [open, setOpen] = useState(false);
    const [isGoogleConnected, setIsGoogleConnected] = useState(false);

    useEffect(() => {
        async function checkGoogleConnection() {
            const { data: accounts, error } = await authClient.listAccounts();
            if (error) {
                toast.add({
                    type: "error",
                    description: (error.message),
                    priority: "high",
                });
            }
            const connected = accounts?.find((account) => account.providerId === "google");
            setIsGoogleConnected(Boolean(connected));
        }
        checkGoogleConnection()
    }, [])

    async function linkGoogleAccount() {
        await authClient.linkSocial({
            provider: "google",
            callbackURL: `${window.location.origin}/dashboard` // Callback URL after linking completes
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button size="lg" />}>
                <Plus className="w-4 h-4" />
                Create Slot
            </DialogTrigger>
            {isGoogleConnected ?
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a Slot</DialogTitle>
                        <DialogDescription>
                            Configure your new interview slot.
                        </DialogDescription>
                    </DialogHeader>
                    <CreateSlotForm
                        onCreated={() => setOpen(false)}
                    />
                </DialogContent>
                :
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Connect Google Calendar</DialogTitle>
                        <DialogDescription>
                            When someone books your slot, PairMock automatically creates a Google Calendar invite and a Google Meet link for both of you. Connect your Google Account once to start hosting slots.
                        </DialogDescription>
                    </DialogHeader>
                    <Button onClick={() => linkGoogleAccount()}>Connect Google Calendar</Button>
                </DialogContent>
            }
        </Dialog>
    )
}