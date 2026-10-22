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
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function SlotCreation() {
    const { data: session } = authClient.useSession();
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button size="lg" />}>
                <Plus className="w-4 h-4" />
                    Create Slot
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Slot</DialogTitle>
                    <DialogDescription>
                    Configure your new interview slot.
                    </DialogDescription>
                </DialogHeader>
                <CreateSlotForm
                    hostUsername={session?.user.name!}
                    hostImage={session?.user.image!}
                    onCreated={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
}