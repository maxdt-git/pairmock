import Footer from '@/components/layout/Footer/Footer';
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import Editor from '@monaco-editor/react';
import type { editor as MonacoEditor } from "monaco-editor";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { MonacoBinding } from "y-monaco";
import * as Y from "yjs";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, LoaderCircle, Video } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router';
import { authClient } from '@/lib/auth-client';

interface feedbackDataProps {
    problemSolving: string;
    codeQuality: string;
    complexityAnalysis: string;
    communication: string;
    signals: string[];
    outcome: string;
};

export default function ReviewPage() {
    const [language, setLanguage] = useState("javascript");
    const [editor, setEditor] = useState<MonacoEditor.IStandaloneCodeEditor | null>(null);
    const settingsRef = useRef<Y.Map<string> | null>(null);
    const textRef = useRef<Y.Text | null>(null);
    const queryClient = useQueryClient()
    let { id } = useParams(); // CHANGE TO CONST AFTER 
    const { data: session, isPending: isSessionPending } = authClient.useSession();
    const navigate = useNavigate();

    id = "1"

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


    const code = "REVIEW PAGE (READ-ONLY)" + `

print("Hello World!)`;

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

    if (queryInterviewData.isPending || isSessionPending) {
        return (
            <div className="flex items-center justify-center min-h-dvh">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-muted-foreground">Loading interview review session...</p>
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

    return (
        <main className="max-w-full p-5 flex flex-col grow mx-auto min-h-dvh">
            <div className="flex items-center justify-between">
                <div className="mb-4 flex items-center gap-4">
                    <Button variant="outline" size="lg">
                        <Link to="/profile" className="flex gap-2 items-center">
                            <ArrowLeft /> Profile
                        </Link>
                    </Button>
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
                </div>
            </div>
            <ResizablePanelGroup
                orientation="horizontal"
                className="rounded-lg border grow mb-3"
            >
                <ResizablePanel defaultSize="75%">
                    <div className="flex h-full items-center justify-center">
                        <Editor
                            language="plaintext"
                            theme="vs-dark"
                            onMount={(instance) => setEditor(instance)}
                            options={{
                                readOnly: true
                            }}
                            value={code}
                        />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize="50%">
                    <ResizablePanelGroup orientation="vertical">
                        <ResizablePanel defaultSize="50%">
                            <div className="flex h-full items-center justify-center p-6">
                                Feedback display
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize="50%">
                            <div className="flex h-full items-center justify-center p-6">
                                <span className="font-semibold">AI</span>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
            <Footer />
        </main>
    );
}