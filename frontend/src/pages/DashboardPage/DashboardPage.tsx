import AvailableCard from "@/components/layout/AvailableCard/AvailableCard";
import BookedCard from "@/components/layout/BookedCard/BookedCard";
import Footer from "@/components/layout/Footer/Footer";
import UserNavigation from "@/components/layout/UserNavigation/UserNavigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export default function DashboardPage() {
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
                        <UserNavigation username={"User"} imageSrc="https://github.com/shadcn.png" />
                    </div>
                </header>
                <section className="mb-5">
                    <h2 className="text-xl font-bold mb-2.5">Booked slots:</h2>
                    <ul className="flex gap-5 flex-wrap max-h-72 p-2 md:max-h-none overflow-y-auto">
                        <BookedCard imageSrc={"https://media.licdn.com/dms/image/v2/D4E0BAQFYUF6QoPOH8A/company-logo_200_200/B4EZbFTRxvHwAI-/0/1747066887630/42born2code_logo?e=2147483647&v=beta&t=rP3yqIK5dT9kyJ7IgSQ9gRjsU6YCZ_ZbDnoPfmvxWVo"} username={"42"} description={"I want to practice easy leetcode problems"} date={"Thu, 24 oct."} time={"18:30"} difficulty={"Easy"} />
                        <BookedCard imageSrc={"https://media.licdn.com/dms/image/v2/D4E0BAQFYUF6QoPOH8A/company-logo_200_200/B4EZbFTRxvHwAI-/0/1747066887630/42born2code_logo?e=2147483647&v=beta&t=rP3yqIK5dT9kyJ7IgSQ9gRjsU6YCZ_ZbDnoPfmvxWVo"} username={"42"} description={"I want to practice easy leetcode problems"} date={"Thu, 24 oct."} time={"18:30"} difficulty={"Medium"}/>
                        <BookedCard imageSrc={"https://media.licdn.com/dms/image/v2/D4E0BAQFYUF6QoPOH8A/company-logo_200_200/B4EZbFTRxvHwAI-/0/1747066887630/42born2code_logo?e=2147483647&v=beta&t=rP3yqIK5dT9kyJ7IgSQ9gRjsU6YCZ_ZbDnoPfmvxWVo"} username={"42"} description={"I want to practice easy leetcode problems"} date={"Thu, 24 oct."} time={"18:30"} difficulty={"Hard"}/>
                    </ul>
                </section>
                <section>
                    <h2 className="text-xl font-bold mb-2.5">Available slots:</h2>
                    <ul className="grid grid-cols-[repeat(auto-fit,minmax(345px,1fr))] gap-5 mb-5 p-2">
                        <li>
                            <AvailableCard imageSrc={"https://github.com/shadcn.png"} username={"Alex"} description={"I want to practice easy leetcode problems"} date={"Tue, 22 oct."} time={"19:00"} difficulty={"Easy"}/>
                        </li>
                        <li>
                            <AvailableCard imageSrc={"https://cdn-icons-png.flaticon.com/512/6858/6858504.png"} username={"John"} description={"I want to practice medium leetcode problems"} date={"Tue, 22 oct."} time={"12:30"} difficulty={"Medium"} />
                        </li>
                        <li>
                            <AvailableCard imageSrc={"https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/batman-icon.png"} username={"Sam"} description={"I want to practice hard leetcode problems"} date={"Tue, 22 oct."} time={"12:30"} difficulty={"Hard"}/>
                        </li>
                        <li>
                            <AvailableCard imageSrc={""} username={"Tim"} description={"I want to practice easy leetcode problems"} date={"Wed, 23 oct."} time={"11:15"} difficulty={"Easy"} />
                        </li>
                        <li>
                            <AvailableCard imageSrc={"https://media.licdn.com/dms/image/v2/D4E0BAQFYUF6QoPOH8A/company-logo_200_200/B4EZbFTRxvHwAI-/0/1747066887630/42born2code_logo?e=2147483647&v=beta&t=rP3yqIK5dT9kyJ7IgSQ9gRjsU6YCZ_ZbDnoPfmvxWVo"} username={"42"} description={"I want to practice easy leetcode problems"} date={"Thu, 24 oct."} time={"18:30"} difficulty={"Hard"} />
                        </li>
                    </ul>
                </section>
                <Footer />
            </main>
        </div>
    );
}
