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
import { useTranslation } from "react-i18next";

export default function SlotCreation() {
    const { t } = useTranslation();
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
                {t("slotCreation.trigger")}
            </DialogTrigger>
            {isGoogleConnected ?
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("slotCreation.title")}</DialogTitle>
                        <DialogDescription>
                            {t("slotCreation.description")}
                        </DialogDescription>
                    </DialogHeader>
                    <CreateSlotForm
                        onCreated={() => setOpen(false)}
                    />
                </DialogContent>
                :
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t("slotCreation.connectTitle")}</DialogTitle>
                        <DialogDescription>
                            {t("slotCreation.connectDescription")}
                        </DialogDescription>
                    </DialogHeader>
                    <Button onClick={() => linkGoogleAccount()}>{t("slotCreation.connectButton")}</Button>
                </DialogContent>
            }
        </Dialog>
    )
}