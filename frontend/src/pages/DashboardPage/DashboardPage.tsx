import AvailableCard, { type AvailableCardProps } from "@/components/layout/AvailableCard/AvailableCard";
import BookedCard from "@/components/layout/BookedCard/BookedCard";
import Footer from "@/components/layout/Footer/Footer";
import UserNavigation from "@/components/layout/UserNavigation/UserNavigation";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { authClient } from "@/lib/auth-client";


export default function DashboardPage() {
    async function getAvailableCards() {
        const res = await fetch('http://localhost:3000/api/available-cards');
        if (!res.ok) {
            throw new Error('Failed to load posts');
        }
        return res.json();
    }

    const query = useQuery({ queryKey: ['available_cards'], queryFn: getAvailableCards })

    const { data: session } = authClient.useSession();

    if (!session) {
        return (
            <p>Not Logged In</p>
        )
    }

    if (session) {
        console.log(session.user)
        console.log(session.session)
    }

    return (
        <div className="bg-muted/30">
            <main className="max-w-[1650px] p-2 min-h-dvh mx-auto flex flex-col grow ">
                <header className="flex justify-between pt-2 pb-2 items-center border-b border-border mb-2.5 max-[450px]:justify-center ">
                    <h1 className="text-2xl font-bold max-[450px]:hidden">PairMock</h1>
                    <div className="flex items-center gap-4 ">
                        <Button size="lg">
                            <Plus className="w-4 h-4" />
                            Create Slot
                        </Button>
                        <UserNavigation username={session?.user.name} imageSrc={session.user.image ? session.user.image : ""} />
                    </div>
                </header>
                <section className="mb-5">
                    <h2 className="text-xl font-bold mb-2.5">Booked slots:</h2>
                    <ul className="flex gap-5 flex-wrap max-h-72 p-2 md:max-h-none overflow-y-auto">
                        <BookedCard imageSrc={"https://media.licdn.com/dms/image/v2/D4E0BAQFYUF6QoPOH8A/company-logo_200_200/B4EZbFTRxvHwAI-/0/1747066887630/42born2code_logo?e=2147483647&v=beta&t=rP3yqIK5dT9kyJ7IgSQ9gRjsU6YCZ_ZbDnoPfmvxWVo"} username={"42"} description={"I want to practice easy leetcode problems"} date={"Thu, 24 oct."} time={"18:30"} difficulty={"Easy"} />
                        <BookedCard imageSrc={"https://media.licdn.com/dms/image/v2/D4E0BAQFYUF6QoPOH8A/company-logo_200_200/B4EZbFTRxvHwAI-/0/1747066887630/42born2code_logo?e=2147483647&v=beta&t=rP3yqIK5dT9kyJ7IgSQ9gRjsU6YCZ_ZbDnoPfmvxWVo"} username={"42"} description={"I want to practice easy leetcode problems"} date={"Thu, 24 oct."} time={"18:30"} difficulty={"Medium"} />
                        <BookedCard imageSrc={"https://media.licdn.com/dms/image/v2/D4E0BAQFYUF6QoPOH8A/company-logo_200_200/B4EZbFTRxvHwAI-/0/1747066887630/42born2code_logo?e=2147483647&v=beta&t=rP3yqIK5dT9kyJ7IgSQ9gRjsU6YCZ_ZbDnoPfmvxWVo"} username={"42"} description={"I want to practice easy leetcode problems"} date={"Thu, 24 oct."} time={"18:30"} difficulty={"Hard"} />
                    </ul>
                </section>
                <section>
                    <h2 className="text-xl font-bold mb-2.5">Available slots:</h2>
                    <ul className="grid grid-cols-[repeat(auto-fit,minmax(345px,1fr))] gap-5 mb-5 p-2">
                        {query.data?.map((card: AvailableCardProps) => (
                            <li>
                                <AvailableCard imageSrc={card.imageSrc} username={card.username} description={card.description} date={card.date} time={card.time} difficulty={card.difficulty} />
                            </li>
                        ))}
                    </ul>
                </section>
                <Footer />
            </main>
        </div>
    );
}
