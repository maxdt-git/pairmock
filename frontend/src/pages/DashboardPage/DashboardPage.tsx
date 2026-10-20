import AvailableCard from "@/components/layout/AvailableCard/AvailableCard";
import BookedCard from "@/components/layout/BookedCard/BookedCard";
import UserNavigation from "@/components/layout/UserNavigation/UserNavigation";
import { Button } from "@/components/ui/button";


export default function DashboardPage() {
    return (
        <main className="max-w-[1700px] mx-auto p-4">
            <header className="flex justify-between p-3 items-center shadow-sm mb-2.5 rounded-4xl max-[450px]:justify-center">
                <h1 className="text-2xl font-bold max-[450px]:hidden">PairMock</h1>
                <div className="flex items-center gap-4 ">
                    <Button size="lg">Create Slot</Button>
                    <UserNavigation username={"User"} imageSrc="https://github.com/shadcn.png" />
                </div>
            </header>
            <section className="mb-5">
                <h2 className="ml-2.5 text-xl font-bold mb-2.5">Booked slots:</h2>
                <ul className="flex gap-5 flex-wrap max-h-70 md:max-h-none p-2 overflow-y-auto">
                    <BookedCard imageSrc={"https://media.licdn.com/dms/image/v2/D4E0BAQFYUF6QoPOH8A/company-logo_200_200/B4EZbFTRxvHwAI-/0/1747066887630/42born2code_logo?e=2147483647&v=beta&t=rP3yqIK5dT9kyJ7IgSQ9gRjsU6YCZ_ZbDnoPfmvxWVo"} username={"42"} description={"I want to practice easy leetcode problems"} date={"Thu, 24 oct."} time={"18:30"} />
                    <BookedCard imageSrc={"https://media.licdn.com/dms/image/v2/D4E0BAQFYUF6QoPOH8A/company-logo_200_200/B4EZbFTRxvHwAI-/0/1747066887630/42born2code_logo?e=2147483647&v=beta&t=rP3yqIK5dT9kyJ7IgSQ9gRjsU6YCZ_ZbDnoPfmvxWVo"} username={"42"} description={"I want to practice easy leetcode problems"} date={"Thu, 24 oct."} time={"18:30"} />
                    <BookedCard imageSrc={"https://media.licdn.com/dms/image/v2/D4E0BAQFYUF6QoPOH8A/company-logo_200_200/B4EZbFTRxvHwAI-/0/1747066887630/42born2code_logo?e=2147483647&v=beta&t=rP3yqIK5dT9kyJ7IgSQ9gRjsU6YCZ_ZbDnoPfmvxWVo"} username={"42"} description={"I want to practice easy leetcode problems"} date={"Thu, 24 oct."} time={"18:30"} />
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-bold mb-2.5">Available slots:</h2>
                <ul className="grid grid-cols-[repeat(auto-fit,minmax(345px,1fr))] gap-5">
                    <li>
                        <AvailableCard imageSrc={"https://github.com/shadcn.png"} username={"Alex"} description={"I want to practice easy leetcode problems"} date={"Tue, 22 oct."} time={"19:00"} />
                    </li>
                    <li>
                        <AvailableCard imageSrc={"https://cdn-icons-png.flaticon.com/512/6858/6858504.png"} username={"John"} description={"I want to practice medium leetcode problems"} date={"Tue, 22 oct."} time={"12:30"} />
                    </li>
                    <li>
                        <AvailableCard imageSrc={"https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/batman-icon.png"} username={"Sam"} description={"I want to practice hard leetcode problems"} date={"Tue, 22 oct."} time={"12:30"} />
                    </li>
                    <li>
                        <AvailableCard imageSrc={""} username={"Tim"} description={"I want to practice easy leetcode problems"} date={"Wed, 23 oct."} time={"11:15"} />
                    </li>
                    <li>
                        <AvailableCard imageSrc={"https://media.licdn.com/dms/image/v2/D4E0BAQFYUF6QoPOH8A/company-logo_200_200/B4EZbFTRxvHwAI-/0/1747066887630/42born2code_logo?e=2147483647&v=beta&t=rP3yqIK5dT9kyJ7IgSQ9gRjsU6YCZ_ZbDnoPfmvxWVo"} username={"42"} description={"I want to practice easy leetcode problems"} date={"Thu, 24 oct."} time={"18:30"} />
                    </li>
                </ul>
            </section>
        </main>
    );
}
