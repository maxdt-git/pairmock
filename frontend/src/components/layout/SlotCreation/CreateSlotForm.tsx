import type { SubmitEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateSlotPayload } from "@/types/slot";
import { toast } from "@/components/ui/toast";

interface CreateSlotFormProps {
  onCreated: () => void;
}

export default function CreateSlotForm({
    onCreated
}: CreateSlotFormProps) {
    const queryClient = useQueryClient();

    const createSlotMutation = useMutation({
        mutationFn: async (slot: CreateSlotPayload) => {
            const response = await fetch("/api/slots", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(slot),
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error ?? "Failed to create slot");
            }
            
            return result;
        },
        
        onSuccess: async (data) => {
            console.log("Slot created:", data);
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["slot-available"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["slot-booked"],
                }),
            ]);
            toast.add({
                title: "Slot created!",
                description: "Your interview slot is now available.",
                type: "success",
            });
            onCreated()
        },
        
        onError: (error) => {
            console.error("Slot creation failed:", error);
            toast.add({
                title: "Slot creation failed!",
                description: "Unable to create your slot.",
                type: "error",
            });
        },
    });
    
    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const slot: CreateSlotPayload = {
            description: String(formData.get("description")),
            difficulty: String(formData.get("difficulty")),
            scheduledAt: new Date(
                String(formData.get("scheduledAt"))
            ).toISOString(),
            durationMinutes: Number(formData.get("durationMinutes")),
            status: "AVAILABLE"
        };
        
        createSlotMutation.mutate(slot)
      }

    return (
        <form onSubmit={handleSubmit}>
            <FieldGroup>

                <Field>
                    <FieldLabel htmlFor="description">
                        Description
                    </FieldLabel>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="What would you like to practice?"
                        required
                    />
                    <FieldDescription>
                        Describe the interview session.
                    </FieldDescription>
                </Field>

                <Field>
                    <FieldLabel htmlFor="difficulty">
                        Difficulty
                    </FieldLabel>
                    <NativeSelect
                        id="difficulty"
                        name="difficulty"
                        defaultValue="MEDIUM"
                        required
                    >
                        <NativeSelectOption value="EASY">
                            Easy
                        </NativeSelectOption>
                        <NativeSelectOption value="MEDIUM">
                            Medium
                        </NativeSelectOption>
                        <NativeSelectOption value="HARD">
                            Hard
                        </NativeSelectOption>
                    </NativeSelect>
                </Field>

                <Field>
                    <FieldLabel htmlFor="scheduledAt">
                        Date & Time
                    </FieldLabel>
                    <Input
                        id="scheduledAt"
                        name="scheduledAt"
                        type="datetime-local"
                        required
                    />
                </Field>

                <Field>
                    <FieldLabel htmlFor="durationMinutes">
                        Duration (minutes)
                    </FieldLabel>
                    <Input
                        id="durationMinutes"
                        name="durationMinutes"
                        type="number"
                        min={15}
                        max={120}
                        step={15}
                        defaultValue={30}
                        required
                    />
                </Field>

                <Button type="submit" className="w-full">
                    Create Slot
                </Button>
            </FieldGroup>
        </form>
    );
}
