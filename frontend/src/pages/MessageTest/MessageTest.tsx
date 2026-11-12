import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";  
import { toast } from "@/components/ui/toast";
import { useTranslation } from "react-i18next";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

type CreateMessagePayload = {
    senderId: string
    receiverId: string
    text: string
}

export default function MessageText() {
    const queryClient = useQueryClient();
    const { t } = useTranslation();
    const { data: session } = authClient.useSession();
    const [ text, setText ] = useState<string>("")

    const createSlotMutation = useMutation({
        mutationFn: async (slot: CreateMessagePayload) => {
            const response = await fetch("/api/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(slot),
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error ?? t("slotCreation.form.failedFallback"));
            }
            
            return result;
        },
        
        onSuccess: async (data) => {
            console.log("Message sent:", data);
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["message"],
                }),
            ]);
            toast.add({
                title: ("Success"),
                description: ("Message sent"),
                type: "success",
            });
        },
        
        onError: () => {
            toast.add({
                title: ("Failure"),
                description: ("Sending failed"),
                type: "error",
            });
        },
    });

    function handleSubmit() {
        const slot: CreateMessagePayload = {
            senderId: String(session?.user.id),
            receiverId: "nMbQ78u6HpDjk3qqD2UCJ5djyafLQQ5A",
            text: text
        };
        
        createSlotMutation.mutate(slot)
      }

    async function getMessage() {
        const res = await fetch('/api/message');
        if (!res.ok) {
            throw new Error('Failed to load messages');
        }
        return res.json();
    }

    const queryMessage = useQuery({
            queryKey: ["message"],
            queryFn: getMessage,
            refetchInterval: 1 * 1000
        });

    return (
        <div className="flex flex-col justify-center my-8 gap-8">
            <Textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="Write your message..."
            />
            <Button onClick={handleSubmit}>SEND</Button>
            {
                queryMessage.data?.map((message: any) => (
                    <p key={message.id}>{message.text}</p>
                ))
            }
        </div>
    )
}