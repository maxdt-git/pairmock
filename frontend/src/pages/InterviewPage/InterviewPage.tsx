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
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Video } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { Questionnaire, QuestionnaireActions, QuestionnaireChoice, QuestionnaireChoices, QuestionnaireDescription, QuestionnaireError, QuestionnaireInput, QuestionnaireItem, QuestionnaireNext, QuestionnairePrevious, QuestionnaireProgress, QuestionnaireSkip, QuestionnaireSubmit, QuestionnaireTitle } from '@/components/ui/questionnaire';
import { toast } from '@/components/ui/toast';

export const INTERVIEW_LANGUAGES = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'sql', label: 'SQL' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' }
];

const questionnaireItems = [
    {
        choices: [
            { label: "5", value: "5" },
            { label: "4", value: "4" },
            { label: "3", value: "3" },
            { label: "2", value: "2" },
            { label: "1", value: "1" },
            { label: "0", value: "0" },
        ],
        description: "Rate from 0 (did not solve) to 5 (optimal approach without hints).",
        name: "problemSolving",
        required: true,
        title: "Problem Solving & Algorithm Design",
    },
    {
        choices: [
            { label: "5", value: "5" },
            { label: "4", value: "4" },
            { label: "3", value: "3" },
            { label: "2", value: "2" },
            { label: "1", value: "1" },
            { label: "0", value: "0" },
        ],
        description: "Rate from 0 (broken/unreadable) to 5 (clean, idiomatic, bug-free).",
        name: "codeQuality",
        required: true,
        title: "Code Quality & Implementation",
    },
    {
        choices: [
            { label: "5", value: "5" },
            { label: "4", value: "4" },
            { label: "3", value: "3" },
            { label: "2", value: "2" },
            { label: "1", value: "1" },
            { label: "0", value: "0" },
        ],
        description: "Rate from 0 (incorrect/missing) to 5 (accurate Time & Space Big-O analysis).",
        name: "complexityAnalysis",
        required: true,
        title: "Time & Space Complexity (Big-O)",
    },
    {
        choices: [
            { label: "5", value: "5" },
            { label: "4", value: "4" },
            { label: "3", value: "3" },
            { label: "2", value: "2" },
            { label: "1", value: "1" },
            { label: "0", value: "0" },
        ],
        description: "Rate from 0 (silent/unclear) to 5 (structured thinking out loud).",
        name: "communication",
        required: true,
        title: "Communication & Thought Process",
    },
    {
        choices: [
            { label: "Clarified constraints & edge cases early", value: "clarified-constraints" },
            { label: "Compared trade-offs before coding", value: "compared-tradeoffs" },
            { label: "Dry-ran code with test cases", value: "dry-run" },
            { label: "Caught and fixed bugs independently", value: "self-debugged" },
        ],
        description: "Select all that apply, or skip this question.",
        multiple: true,
        name: "signals",
        required: false,
        title: "Which positive signals did the candidate show?",
    },
    {
        choices: [
            { label: "Solved optimally without hints", value: "optimal-no-hints" },
            { label: "Solved optimally with minor hints", value: "optimal-with-hints" },
            { label: "Working brute-force / suboptimal solution", value: "suboptimal" },
            { label: "Did not finish a working solution", value: "incomplete" },
        ],
        input: {
            label: "Custom feedback note",
            placeholder: "Add specific advice or missed edge cases…",
        },
        name: "outcome",
        required: true,
        title: "What was the final result of the coding task?",
    },
] as const


export default function InterviewPage() {
    const [language, setLanguage] = useState("javascript")
    const [editor, setEditor] = useState<
        MonacoEditor.IStandaloneCodeEditor | null
    >(null);
    // will use later for connection status display
    // const [status, setStatus] = useState("connecting");

    const { id } = useParams();
    async function getInterviewData() {
        const res = await fetch(`/api/interview/${id}`)
        if (!res.ok) {
            throw new Error('Failed to load data');
        }
        return res.json()
    }
    const { data, isLoading, isError } = useQuery({ queryKey: ["interview", id], queryFn: getInterviewData })
    const interviewData = data

    useEffect(() => {
        if (!editor || !interviewData) return;

        const model = editor.getModel();
        if (!model) return;

        const doc = new Y.Doc();
        const text = doc.getText("code");

        const provider = new HocuspocusProvider({
            url: "ws://localhost:4001",
            name: `inteview-${id}`,
            document: doc
        });

        const binding = new MonacoBinding(
            text,
            model,
            new Set([editor]),
            provider.awareness ?? undefined
        );

        // const handleStatus = (event: { status: string }) => {
        //     setStatus(event.status);
        // };
        // will use later for connection status display
        // provider.on("status", handleStatus);

        return () => {
            // provider.off("status", handleStatus);
            binding.destroy();
            provider.destroy();
            doc.destroy();
        };
    }, [editor]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-dvh">
                <div className="text-muted-foreground animate-pulse">Loading interview session...</div>
            </div>
        );
    }

    if (isError || !interviewData) {
        return <Navigate to="/dashboard" replace />;
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const answers = {
            problemSolving: formData.get("problemSolving"),
            codeQuality: formData.getAll("codeQuality"),
            complexityAnalysis: formData.get("complexityAnalysis"),
            communication: formData.get("communication"),
            signals: formData.getAll("signals"),
            outcome: formData.get("outcome"),
        }
        toast.add({
            type: "success",
            description: "Feedback has been saved",
            priority: "high",
        });
        console.log(answers)
    }

    return (
        <main className="max-w-full p-5 flex flex-col grow mx-auto min-h-dvh">
            <div className='flex items-center justify-between'>
                <div className="mb-4 flex items-center gap-4">
                    <Button variant="outline" size={"lg"}>
                        <Link to={"/dashboard"} className="flex gap-2 items-center">
                            <ArrowLeft /> Dashboard
                        </Link>
                    </Button>
                    <Select items={INTERVIEW_LANGUAGES} value={language} onValueChange={(value) => setLanguage(value ?? "javascript")}>
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
                </div>
                <div className="mb-4 flex items-center gap-3">
                    <AvatarGroup>
                        <Avatar className="mr-2">
                            <AvatarImage src={interviewData?.host.image} alt={interviewData?.host.name} />
                            <AvatarFallback>CN</AvatarFallback>
                            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                        </Avatar>
                        <Avatar>
                            <AvatarImage src={interviewData?.booker.image} alt={interviewData?.booker.name} />
                            <AvatarFallback>LR</AvatarFallback>
                            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                        </Avatar>
                    </AvatarGroup>
                    {interviewData?.meetLink &&
                        <Button render={<a href={interviewData.meetLink} target='_blank' rel="noopener noreferrer"></a>} nativeButton={false}>
                            <Video /> Join Google Meet
                        </Button>
                    }
                </div>

            </div>
            <ResizablePanelGroup
                orientation="horizontal"
                className="rounded-lg border grow mb-3"
            >
                <ResizablePanel defaultSize="75%">
                    <div className="flex h-full items-center justify-center">
                        <Editor
                            language={language}
                            theme='vs-dark'
                            onMount={(instance) => setEditor(instance)}
                        />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize="50%">
                    <ResizablePanelGroup orientation="vertical">
                        <ResizablePanel defaultSize="75%">
                            <div className="flex h-full items-center justify-center p-6">
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
            <Footer />
        </main >
    );
}