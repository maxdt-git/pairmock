import Footer from '@/components/layout/Footer/Footer';
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Editor from '@monaco-editor/react';
import type { editor as MonacoEditor } from "monaco-editor";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { MonacoBinding } from "y-monaco";
import * as Y from "yjs";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Video, LoaderCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import type { SlotType } from "@/types/slot";
import { toast } from '@/components/ui/toast';
import { INTERVIEW_LANGUAGES, questionnaireItems } from './interviewData';
import InterviewTimer from '@/components/layout/Timer/InterviewTimer';
import { authClient } from '@/lib/auth-client';
import {
    Questionnaire,
    QuestionnaireActions,
    QuestionnaireChoice,
    QuestionnaireChoices,
    QuestionnaireDescription,
    QuestionnaireError,
    QuestionnaireInput,
    QuestionnaireItem,
    QuestionnaireNext,
    QuestionnairePrevious,
    QuestionnaireProgress,
    QuestionnaireSkip,
    QuestionnaireSubmit,
    QuestionnaireTitle
} from '@/components/ui/questionnaire';

interface feedbackDataProps {
    problemSolving: string;
    codeQuality: string;
    complexityAnalysis: string;
    communication: string;
    signals: string[];
    outcome: string;
};

export default function InterviewPage() {
    const [language, setLanguage] = useState("javascript");
    const [editor, setEditor] = useState<MonacoEditor.IStandaloneCodeEditor | null>(null);
    const [hasStarted, setHasStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const settingsRef = useRef<Y.Map<string> | null>(null);
    const textRef = useRef<Y.Text | null>(null);
    const queryClient = useQueryClient()
    const { id } = useParams();
    const { data: session, isPending: isSessionPending } = authClient.useSession();

    async function getInterviewData() {
        const res = await fetch(`/api/interview/${id}`);
        if (!res.ok) {
            throw new Error('Failed to load data');
        }
        return res.json();
    }

    const queryInterviewData = useQuery({
        queryKey: ["interview", id],
        queryFn: getInterviewData,
        enabled: Boolean(id)
    });

    const interviewData = queryInterviewData.data;

    const isHost = session?.user.id === interviewData?.hostId
    const isBooker = session?.user.id === interviewData?.bookerId
    const userFeedback = isHost ? interviewData.hostFeedback : isBooker ? interviewData.bookerFeedback : null
    const isFeedbackSubmitted = Boolean(userFeedback && Object.keys(userFeedback).length > 0)


    async function postFeedback(feedback: feedbackDataProps) {
        const res = await fetch(`/api/interview/${id}/feedback`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(feedback)
        });
        if (!res.ok) {
            throw new Error('Failed to send feedback');
        }
    }

    const mutationFeedback = useMutation({
        mutationFn: postFeedback,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['interview', id] })
            toast.add({
                type: "success",
                description: "Feedback has been saved",
                priority: "high",
            });
        },
        onError: (err) => {
            console.error("Submission failed:", err);
            toast.add({
                type: "error",
                description: "Failed to save feedback",
                priority: "high",
            });
        },
    })

    useEffect(() => {
        if (!editor || !interviewData) return;

        const model = editor.getModel();
        if (!model) return;

        const doc = new Y.Doc();
        const text = doc.getText("code");
        textRef.current = text
        const settings = doc.getMap<string>("settings");
        settingsRef.current = settings;

        const syncLanguage = () => {
            const sharedLanguage = settings.get("language") ?? "javascript";
            setLanguage(sharedLanguage);
        };

        settings.observe(syncLanguage);
        syncLanguage();

        const provider = new HocuspocusProvider({
            url: "ws://localhost:4001",
            name: `interview-${id}`,
            document: doc
        });

        const binding = new MonacoBinding(
            text,
            model,
            new Set([editor]),
            provider.awareness ?? undefined
        );

        return () => {
            settings.unobserve(syncLanguage);
            settingsRef.current = null;
            textRef.current = null;
            binding.destroy();
            provider.destroy();
            doc.destroy();
        };
    }, [editor, id, interviewData]);


    const testApi = useMutation({
        mutationFn: async ({
            slotId,
            code
        }: {
            slotId: SlotType["id"],
            code: string
        }) => {
            const response = await fetch(`/api/slots/${slotId}/addcode`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: code,
                }),
            });
            if (!response.ok) {
                throw new Error(`Failed to book slot: ${response.status}`);
            }
        },

        onSuccess: async () => {
            toast.add({
                title: "Code added to review!",
                description: "This slot has been updated.",
                type: "success",
            });
        },

        onError: (error) => {
            console.error(error);

            toast.add({
                title: "Update failed",
                description: "Unable to update this slot. Retry later",
                type: "error",
            });
        },
    })

    useEffect(() => {
        if (!interviewData) return;

        const start = new Date(interviewData.scheduledAt).getTime();
        const delay = start - Date.now();

        if (delay <= 0) {
            setHasStarted(true);
            return;
        }

        setHasStarted(false);

        const timeout = setTimeout(() => {
            setHasStarted(true);
        }, delay);

        return () => clearTimeout(timeout);
    }, [interviewData?.scheduledAt]);

    if (queryInterviewData.isPending || isSessionPending) {
        return (
            <div className="flex items-center justify-center min-h-dvh">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-muted-foreground">Loading interview session...</p>
                    <LoaderCircle className="size-8 animate-spin text-muted-foreground" />
                </div>
            </div>
        );
    }

    if (queryInterviewData.isError || !interviewData) {
        console.warn("[INTERVIEW REDIRECT]", {
            status: queryInterviewData.status,
            isPending: queryInterviewData.isPending,
            error: queryInterviewData.error,
        });
        return <Navigate to="/dashboard" replace />;
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const feedbackData: feedbackDataProps = {
            problemSolving: String(formData.get('problemSolving') ?? ''),
            codeQuality: String(formData.get('codeQuality') ?? ''),
            complexityAnalysis: String(formData.get('complexityAnalysis') ?? ''),
            communication: String(formData.get('communication') ?? ''),
            signals: formData.getAll('signals').map((s) => String(s)),
            outcome: String(formData.get('outcome') ?? ''),
        };
        console.log(feedbackData);
        mutationFeedback.mutate(feedbackData)
    }

    return (
        <main className="max-w-full p-5 flex flex-col grow mx-auto min-h-dvh">
            <div className="flex items-center justify-between">
                <div className="mb-4 flex items-center gap-4">
                    <Button variant="outline" size="lg">
                        <Link to="/dashboard" className="flex gap-2 items-center">
                            <ArrowLeft /> Dashboard
                        </Link>
                    </Button>
                    {hasStarted && (
                        <Select
                            items={INTERVIEW_LANGUAGES}
                            value={language}
                            onValueChange={(value) => {
                                if (!value) return;
                                settingsRef.current?.set("language", value);
                            }}
                        >
                            <SelectTrigger className="w-45">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {INTERVIEW_LANGUAGES.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                    <Button onClick={() => {
                        const text = textRef.current
                        if (!text) return;
                        testApi.mutate({ slotId: interviewData.id, code: text.toString() })
                    }}>
                        TEST API
                    </Button>
                    <InterviewTimer
                        durationMinutes={interviewData.durationMinutes}
                        scheduledDate={interviewData.scheduledAt}
                        onFinished={() => setIsFinished(true)}
                    />
                    {isFinished ? <p>finished</p> : <p>not finished</p>}
                </div>
                <div className="mb-4 flex items-center gap-3">
                    <AvatarGroup>
                        <Avatar className="mr-2">
                            <AvatarImage src={interviewData?.host?.image} alt={interviewData?.host?.name} />
                            <AvatarFallback>CN</AvatarFallback>
                            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                        </Avatar>
                        <Avatar>
                            <AvatarImage src={interviewData?.booker?.image} alt={interviewData?.booker?.name} />
                            <AvatarFallback>LR</AvatarFallback>
                            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                        </Avatar>
                    </AvatarGroup>
                    {interviewData?.meetLink && (
                        <Button
                            render={<a href={interviewData.meetLink} target="_blank" rel="noopener noreferrer"></a>}
                            nativeButton={false}
                        >
                            <Video /> Join Google Meet
                        </Button>
                    )}
                </div>
            </div>
            {hasStarted ? (
            <ResizablePanelGroup
                orientation="horizontal"
                className="rounded-lg border grow mb-3"
            >
                <ResizablePanel defaultSize="75%">
                    <div className="flex h-full items-center justify-center">
                        <Editor
                            language={language}
                            theme="vs-dark"
                            onMount={(instance) => setEditor(instance)}
                        />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize="50%">
                    <ResizablePanelGroup orientation="vertical">
                        <ResizablePanel defaultSize="75%">
                            <div className="flex h-full items-center justify-center p-6">
                                {isFeedbackSubmitted ?
                                    <p>Thanks for providing feedback!</p>
                                    :
                                    <Questionnaire
                                        className="mx-auto max-w-md"
                                        defaultItem="direction"
                                        items={questionnaireItems}
                                        shortcuts="letters"
                                        onSubmit={handleSubmit}
                                    >
                                        <QuestionnaireProgress />
                                        {questionnaireItems.map((question) => (
                                            <QuestionnaireItem
                                                key={question.name}
                                                multiple={"multiple" in question && question.multiple}
                                                name={question.name}
                                                required={question.required}
                                            >
                                                <QuestionnaireTitle>{question.title}</QuestionnaireTitle>
                                                <QuestionnaireDescription>
                                                    {question.description}
                                                </QuestionnaireDescription>
                                                <QuestionnaireChoices>
                                                    {question.choices.map((choice) => (
                                                        <QuestionnaireChoice key={choice.value} value={choice.value}>
                                                            <span className="font-medium">{choice.label}</span>
                                                            {"description" in choice ? (
                                                                <span className="text-muted-foreground">
                                                                    {choice.description}
                                                                </span>
                                                            ) : null}
                                                        </QuestionnaireChoice>
                                                    ))}
                                                    {"input" in question ? (
                                                        <QuestionnaireInput
                                                            aria-label={question.input.label}
                                                            placeholder={question.input.placeholder}
                                                        />
                                                    ) : null}
                                                </QuestionnaireChoices>
                                                <QuestionnaireError />
                                            </QuestionnaireItem>
                                        ))}
                                        <QuestionnaireActions>
                                            <QuestionnairePrevious />
                                            <QuestionnaireSkip />
                                            <QuestionnaireNext>Next</QuestionnaireNext>
                                            <QuestionnaireSubmit>Save plan</QuestionnaireSubmit>
                                        </QuestionnaireActions>
                                    </Questionnaire>
                                }
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize="25%">
                            <div className="flex h-full items-center justify-center p-6">
                                <span className="font-semibold">Console</span>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
            ) : (
            <p></p>
            )}
            <Footer />
        </main>
    );
}