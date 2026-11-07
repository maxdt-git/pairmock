import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from 'lucide-react';

interface AiFeedbackProps {
    slotId: string
    code: string | null | undefined
}

export default function AiFeedback(props: AiFeedbackProps) {
    const { slotId, code } = props

    const [messages, setMessages] = useState<string[]>([])

    function handleClick() {
        aiFeedbackMutation.mutate()
    }

    const aiFeedbackMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch (`/api/slots/${slotId}/ai-tips`, {
                  method: "POST",
                  body: JSON.stringify({ code }),
                  headers: { "Content-Type": "application/json" },
                });

            if (!response.ok) {
                throw new Error(`Failed to load review`)
            }

            return response.json()
        },

        onSuccess: async (data) => {
            setMessages([...messages, data.tips])
        },

        onError: (error) => {
            console.error(error)
        },
    });

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b p-3">
                <b className="text-lg">AI Feedback</b>
                <Button disabled={messages.length > 0 || aiFeedbackMutation.isPending} variant="outline" size="sm" onClick={handleClick}>
                    Tips
                {aiFeedbackMutation.isPending && (
                    <div>
                        <LoaderCircle className="size-8 animate-spin text-muted-foreground"/>
                    </div>
                )}
                </Button>

            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        Click a button to get AI feedback on the code.
                    </p>
                )}
                {messages.map((message, index) => (
                    <div key={index} className="rounded-xl border p-3 text-sm">
                        <p className="whitespace-pre-wrap">{message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
