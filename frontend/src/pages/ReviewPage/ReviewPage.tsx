import Footer from '@/components/layout/Footer/Footer';
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import Editor from '@monaco-editor/react';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router';
import { authClient } from '@/lib/auth-client';
import { useQuestionnaireItems } from '../InterviewPage/interviewData';
import { useTranslation } from 'react-i18next';
import AiFeedback from "@/components/layout/AiFeedback/AiFeedback";


export default function ReviewPage() {
    const { t } = useTranslation();
    const questionnaireItems = useQuestionnaireItems();
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
    const userFeedback = isHost ? interviewData?.bookerFeedback : isBooker ? interviewData?.hostFeedback : null

    const code = `${t("review.readOnly")} \n \n` + (interviewData?.code ?? "")

    if (queryInterviewData.isPending || isSessionPending) {
        return (
            <div className="flex items-center justify-center min-h-dvh">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-muted-foreground">{t("review.loading")}</p>
                    <LoaderCircle className="size-8 animate-spin text-muted-foreground" />
                </div>
            </div>
        );
    }

    if (queryInterviewData.isError || !interviewData) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <main className="max-w-full p-5 flex flex-col grow mx-auto min-h-dvh">
            <div className="flex items-center justify-between">
                <div className="mb-4 flex items-center gap-4">
                    <Button variant="outline" size="lg">
                        <Link to="/profile" className="flex gap-2 items-center">
                            <ArrowLeft /> {t("common.profile")}
                        </Link>
                    </Button>
                </div>
                <div className="mb-4 flex items-center gap-3">
                    <AvatarGroup>
                        <Avatar className="mr-2">
                            <AvatarImage src={interviewData?.host?.image} alt={interviewData?.host?.name} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage src={interviewData?.booker?.image} alt={interviewData?.booker?.name} />
                            <AvatarFallback>LR</AvatarFallback>
                        </Avatar>
                    </AvatarGroup>
                </div>
            </div>
            <ResizablePanelGroup
                orientation="horizontal"
                className="rounded-lg border grow mb-3"
            >
                <ResizablePanel defaultSize="75%">
                    <div className="h-full w-full min-h-100 overflow-hidden">
                        <Editor
                            language="plaintext"
                            theme="vs-dark"
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
                            <div className="flex h-full items-start justify-center flex-col p-6 space-y-4 max-w-175 mx-auto">
                                <b className='text-lg'>{t("review.feedbackHeading")}</b>
                                {questionnaireItems.map((item) => {
                                    const value = userFeedback?.[item.name];
                                    if (!value || (Array.isArray(value) && value.length === 0)) {
                                        return null;
                                    }
                                    if (Array.isArray(value)) {
                                        return (
                                            <div key={item.name} className="w-full">
                                                <span className="font-semibold block">{item.title}:</span>
                                                <ul className="list-disc list-insid pl-2">
                                                    {value.map((val) => {
                                                        const match = item.choices.find((c) => c.value === val);
                                                        return <li key={val}>{match ? match.label : val}</li>;
                                                    })}
                                                </ul>
                                            </div>
                                        );
                                    }
                                    const choice = item.choices.find((c) => c.value === value);
                                    const displayLabel = choice?.description
                                        ? `${choice.label} (${choice.description})`
                                        : (choice?.label ?? value);

                                    return (
                                        <div key={item.name} className="w-full">
                                            <span className="font-semibold">{item.title}: </span>
                                            <span>{displayLabel}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize="50%">
                            <AiFeedback slotId={ id! } code={ interviewData.code } />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
            <Footer />
        </main>
    );
}
