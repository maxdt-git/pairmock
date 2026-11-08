import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from 'lucide-react';
import ReactMarkdown from "react-markdown"
import { toast } from "@/components/ui/toast";

interface AiFeedbackProps {
    slotId: string
    code: string | null | undefined
}

const AI_BUTTONS = [
    { type: "tips", label: "Tips" },
    { type: "complexity", label: "Complexity" },
    { type: "bugs", label: "Bugs" },
    { type: "optimal", label: "Optimal solution" },
]

export default function AiFeedback(props: AiFeedbackProps) {
    const { slotId, code } = props

    const [messages, setMessages] = useState<Record<string, string>>({})
    const [activeType, setActiveType] = useState<string | null>(null)

    const aiFeedbackMutation = useMutation({
        mutationFn: async (type: string) => {
            const response = await fetch (`/api/slots/${slotId}/ai-tips`, {
                  method: "POST",
                  body: JSON.stringify({ code, type }),
                  headers: { "Content-Type": "application/json" },
                });

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error)
            }

            return response.json()
        },

        onSuccess: (data, type) => {
            setMessages({...messages, [type]: data.tips})
        },

        onError: (error) => {
            console.error(error)
            toast.add({
                title: "Issue with AI",
                description: error.message,
                type: "error",
            });
        },
    });

    function handleClick(type: string) {
        setActiveType(type)
        if (!messages[type]) {
            aiFeedbackMutation.mutate(type)
        }
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b p-3">
                <b className="text-lg">AI Feedback</b>
                <div className="flex flex-wrap gap-2">
                    { AI_BUTTONS.map((btn) => (
                        <Button
                            key={btn.type}
                            onClick={() => handleClick(btn.type)}
                            disabled={aiFeedbackMutation.isPending}
                            variant={ btn.type === activeType ? "default" : "outline" } size="sm">
                            {btn.label}
                        </Button>
                    ))}
                </div>
                {aiFeedbackMutation.isPending && (
                    <LoaderCircle className="size-4 animate-spin text-muted-foreground"/>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                { !activeType && (
                    <p className="text-sm text-muted-foreground">
                        Click a button to get AI feedback on the code.
                    </p>
                )}
                { activeType && messages[activeType] && (
                    <div className="rounded-xl border p-3 prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>
                            {messages[activeType]}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}
