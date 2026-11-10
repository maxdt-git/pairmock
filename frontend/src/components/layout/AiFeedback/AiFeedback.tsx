import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from 'lucide-react';
import ReactMarkdown from "react-markdown"
import { toast } from "@/components/ui/toast";
import { useTranslation } from "react-i18next";
import { currentLanguage, type AppLanguage } from "@/i18n";

interface AiFeedbackProps {
    slotId: string
    code: string | null | undefined
}

const AI_TYPES = ["tips", "complexity", "bugs", "optimal"] as const;
type AiType = (typeof AI_TYPES)[number];

const AI_ERROR_CODES = [
    "NO_CODE", "CODE_TOO_LONG", "INVALID_TYPE", "UNAUTHORIZED", "FORBIDDEN", "NOT_FOUND", "AI_FAILED",
] as const;
type AiErrorCode = (typeof AI_ERROR_CODES)[number];

class AiFeedbackError extends Error {
    readonly code: AiErrorCode | undefined;
    constructor(message: string, code: unknown) {
        super(message);
        this.code = AI_ERROR_CODES.find((known) => known === code);
    }
}

interface AiRequest {
    type: AiType
    lang: AppLanguage
}

// Answers are cached per language, so switching back and forth doesn't call the AI again
const cacheKey = ({ type, lang }: AiRequest) => `${lang}:${type}`;

export default function AiFeedback(props: AiFeedbackProps) {
    const { slotId, code } = props
    const { t } = useTranslation();
    const lang = currentLanguage();

    const [messages, setMessages] = useState<Record<string, string>>({})
    const [activeType, setActiveType] = useState<AiType | null>(null)

    const aiFeedbackMutation = useMutation({
        mutationFn: async ({ type, lang }: AiRequest) => {
            const response = await fetch(`/api/slots/${slotId}/ai-tips`, {
                method: "POST",
                body: JSON.stringify({ code, type, lang }),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}))
                throw new AiFeedbackError(data.error ?? `HTTP ${response.status}`, data.code)
            }

            return response.json() as Promise<{ tips: string }>
        },

        onSuccess: (data, request) => {
            setMessages((previous) => ({ ...previous, [cacheKey(request)]: data.tips }))
        },

        onError: (error) => {
            console.error(error)
            const code = error instanceof AiFeedbackError ? error.code : undefined
            toast.add({
                title: t("ai.errorTitle"),
                description: code ? t(`ai.errors.${code}`) : t("ai.errors.AI_FAILED"),
                type: "error",
            });
        },
    });

    const { mutate, isPending } = aiFeedbackMutation

    // When the user changes language from the footer, fetch the open review in the new language
    useEffect(() => {
        if (activeType && !messages[cacheKey({ type: activeType, lang })] && !isPending) {
            mutate({ type: activeType, lang })
        }
        // Only react to language changes; clicks are handled in handleClick
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang])

    function handleClick(type: AiType) {
        setActiveType(type)
        if (!messages[cacheKey({ type, lang })]) {
            mutate({ type, lang })
        }
    }

    const activeMessage = activeType ? messages[cacheKey({ type: activeType, lang })] : undefined

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b p-3">
                <b className="text-lg">{t("ai.heading")}</b>
                <div className="flex flex-wrap gap-2">
                    {AI_TYPES.map((type) => (
                        <Button
                            key={type}
                            onClick={() => handleClick(type)}
                            disabled={isPending}
                            variant={type === activeType ? "default" : "outline"} size="sm">
                            {t(`ai.buttons.${type}`)}
                        </Button>
                    ))}
                </div>
                {isPending && (
                    <LoaderCircle className="size-4 animate-spin text-muted-foreground" />
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {!activeType && (
                    <p className="text-sm text-muted-foreground">
                        {t("ai.empty")}
                    </p>
                )}
                {activeMessage && (
                    <div lang={lang} className="rounded-xl border p-3 prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>
                            {activeMessage}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
        </div>
    );
}
