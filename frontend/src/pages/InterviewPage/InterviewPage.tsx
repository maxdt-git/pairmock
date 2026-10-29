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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Video } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router';

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

export default function InterviewPage() {
    const [language, setLanguage] = useState("javascript")
    const [editor, setEditor] = useState<
        MonacoEditor.IStandaloneCodeEditor | null
    >(null);
    const settingsRef = useRef<Y.Map<string> | null>(null);
    // will use later for connection status display
    // const [status, setStatus] = useState("connecting");

    const { id } = useParams();
    // const queryClient = useQueryClient()
    async function getInterviewData() {
        const res = await fetch(`/api/interview/${id}`)
        if (!res.ok) {
            throw new Error('Failed to load data');
        }
        return res.json()
    }
    const queryInterviewData = useQuery({ queryKey: ["interview"], queryFn: getInterviewData })
    const interviewData = queryInterviewData?.data?.[0]


    useEffect(() => {
        if (!editor) return;

        const model = editor.getModel();
        if (!model) return;

        const doc = new Y.Doc();
        const text = doc.getText("code");
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
            settings.unobserve(syncLanguage);
            settingsRef.current = null;
            binding.destroy();
            provider.destroy();
            doc.destroy();
        };
    }, [editor]);

    return (
        <main className="max-w-full p-5 flex flex-col grow mx-auto min-h-dvh">
            <div className='flex items-center justify-between'>
                <div className="mb-4 flex items-center gap-4">
                    <Button variant="outline" size={"lg"}>
                        <Link to={"/dashboard"} className="flex gap-2 items-center">
                            <ArrowLeft /> Dashboard
                        </Link>
                    </Button>
                    <Select items={INTERVIEW_LANGUAGES} value={language} onValueChange={(value) => {
                        if (!value) return;
                        settingsRef.current?.set("language", value);
                    }}>
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
                                <span className="font-semibold">Feedback</span>
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