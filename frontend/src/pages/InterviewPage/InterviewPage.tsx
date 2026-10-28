import Footer from '@/components/layout/Footer/Footer';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Editor from '@monaco-editor/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

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
    return (
        <main className="max-w-full p-5 flex flex-col grow mx-auto min-h-dvh">
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
            <ResizablePanelGroup
                orientation="horizontal"
                className="rounded-lg border grow mb-3"
            >
                <ResizablePanel defaultSize="75%">
                    <div className="flex h-full items-center justify-center">
                        <Editor
                            language={language}
                            theme='vs-dark'
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