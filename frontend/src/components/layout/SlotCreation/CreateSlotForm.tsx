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
import { useTranslation } from "react-i18next";

interface CreateSlotFormProps {
  onCreated: () => void;
}

export default function CreateSlotForm({
    onCreated
}: CreateSlotFormProps) {
    const { t } = useTranslation();
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
                throw new Error(result.error ?? t("slotCreation.form.failedFallback"));
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
                title: t("slotCreation.toast.created.title"),
                description: t("slotCreation.toast.created.description"),
                type: "success",
            });
            onCreated()
        },
        
        onError: (error) => {
            console.error("Slot creation failed:", error);
            toast.add({
                title: t("slotCreation.toast.failed.title"),
                description: t("slotCreation.toast.failed.description"),
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
    
    const minDate = new Date(Date.now() + 60 * 60 * 1000);
    const minDateTime = new Date(
        minDate.getTime() - minDate.getTimezoneOffset() * 60_000
    ).toISOString().slice(0, 16);

    return (
        <form onSubmit={handleSubmit}>
            <FieldGroup>

                <Field>
                    <FieldLabel htmlFor="description">
                        {t("slotCreation.form.description")}
                    </FieldLabel>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder={t("slotCreation.form.descriptionPlaceholder")}
                        required
                    />
                    <FieldDescription>
                        {t("slotCreation.form.descriptionHelp")}
                    </FieldDescription>
                </Field>

                <Field>
                    <FieldLabel htmlFor="difficulty">
                        {t("slotCreation.form.difficulty")}
                    </FieldLabel>
                    <NativeSelect
                        id="difficulty"
                        name="difficulty"
                        defaultValue="MEDIUM"
                        required
                    >
                        <NativeSelectOption value="EASY">
                            {t("difficulty.EASY")}
                        </NativeSelectOption>
                        <NativeSelectOption value="MEDIUM">
                            {t("difficulty.MEDIUM")}
                        </NativeSelectOption>
                        <NativeSelectOption value="HARD">
                            {t("difficulty.HARD")}
                        </NativeSelectOption>
                    </NativeSelect>
                </Field>

                <Field>
                    <FieldLabel htmlFor="scheduledAt">
                        {t("slotCreation.form.dateTime")}
                    </FieldLabel>
                    <Input
                        id="scheduledAt"
                        name="scheduledAt"
                        type="datetime-local"
                        min={minDateTime}
                        required
                    />
                </Field>

                <Field>
                    <FieldLabel htmlFor="durationMinutes">
                        {t("slotCreation.form.duration")}
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
                {createSlotMutation.isError && (
                    <p role="alert" className="text-sm text-destructive">
                        {createSlotMutation.error.message}
                    </p>
                )}
                <Button type="submit" className="w-full">
                    {t("slotCreation.form.submit")}
                </Button>
            </FieldGroup>
        </form>
    );
}