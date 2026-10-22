import Footer from "@/components/layout/Footer/Footer";
import UserNavigation from "@/components/layout/UserNavigation/UserNavigation";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Slot from "@/components/layout/Slot/Slot";
import type { SlotType } from "@/types/slot";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useSearchParams } from "react-router";


export default function DashboardPage() {
    const { data: session } = authClient.useSession();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const difficultyFilter = searchParams.get("difficulty") ?? "all"
    const timeFilter = searchParams.get("time") ?? "asc"

    const handlePageChange = (newPage: number) => {
        setSearchParams((prevParams) => {
            const nextParams = new URLSearchParams(prevParams);
            nextParams.set("page", newPage.toString());
            return nextParams;
        });
    }

    const handleDifficultyChange = (newDifficulty: string) => {
        setSearchParams((prevParams) => {
            const nextParams = new URLSearchParams(prevParams);
            nextParams.set("page", "1");
            nextParams.set("difficulty", newDifficulty);
            return nextParams;
        });
    }

    const handleTimeChange = (newTime: string) => {
        setSearchParams((prevParams) => {
            const nextParams = new URLSearchParams(prevParams);
            nextParams.set("page", "1");
            nextParams.set("time", newTime);
            return nextParams;
        });
    }

    async function getBookedSlots() {
        const res = await fetch('http://localhost:3000/api/slots/booked');
        if (!res.ok) {
            throw new Error('Failed to load posts');
        }
        return res.json();
    }

    async function getAvailableSlots(page: number, difficulty: string, time: string) {
        const params = new URLSearchParams({
            page: page.toString(),
            difficulty: difficulty,
            time: time,
        })
        const res = await fetch(`http://localhost:3000/api/slots/available?${params.toString()}`);
        if (!res.ok) {
            throw new Error('Failed to load posts');
        }
        return res.json();
    }
    const queryBooked = useQuery({ queryKey: ['slot-booked'], queryFn: getBookedSlots })
    const queryAvailable = useQuery({
        queryKey: ['slot-available', { currentPage, difficultyFilter, timeFilter }],
        queryFn: () => getAvailableSlots(currentPage, difficultyFilter, timeFilter),
    })

    const itemsDifficulty = [
        { label: "Easy", value: "easy" },
        { label: "Medium", value: "medium" },
        { label: "Hard", value: "hard" },
        { label: "All", value: "all" },
    ]

    const itemsTime = [
        { label: "Earliest First", value: "asc" },
        { label: "Latest First", value: "desc" },
    ]

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
                <header className="flex justify-between pt-2 pb-2 items-center border-b border-border mb-2.5 max-[540px]:justify-center ">
                    <h1 className="text-2xl font-bold max-[540px]:hidden">PairMock</h1>
                    <div className="flex items-center gap-4 ">
                        <Button size="lg">
                            <Plus className="w-4 h-4" />
                            Create Slot
                        </Button>
                        <UserNavigation username={session?.user.name ?? "User"} imageSrc={session?.user.image ? session.user.image : ""} />
                    </div>
                </header>
                <section className="mb-5">
                    <h2 className="text-xl font-bold mb-2.5">Booked slots:</h2>
                    <ul className="flex gap-2 flex-wrap max-h-72 p-2 md:max-h-none overflow-y-auto">
                        {queryBooked.data?.map((card: SlotType) => (
                            <li key={card.id}>
                                <Slot
                                    imageSrc={card.imageSrc}
                                    username={card.hostUsername}
                                    description={card.description}
                                    date={card.scheduledAt}
                                    difficulty={card.difficulty}
                                    duration={card.durationMinutes}
                                    status={card.status}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2 className="text-xl font-bold mb-2.5">Available slots:</h2>
                    <div className="mb-2.5 ml-2 flex gap-3">
                        <Select items={itemsTime} value={timeFilter} onValueChange={(value) => {
                            handleTimeChange(value ?? "asc")
                        }}>
                            <SelectTrigger className="w-45">
                                <SelectValue placeholder="Time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {itemsTime.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select items={itemsDifficulty} value={difficultyFilter} onValueChange={(value) => {
                            handleDifficultyChange(value ?? "all")
                        }}>
                            <SelectTrigger className="w-45">
                                <SelectValue placeholder="Difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {itemsDifficulty.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <ul className="grid grid-cols-[repeat(auto-fit,minmax(345px,1fr))] gap-5 mb-5 p-2">
                        {queryAvailable?.data?.data.length > 0 ?
                            queryAvailable.data?.data.map((card: SlotType) => (
                                <li key={card.id}>
                                    <Slot
                                        imageSrc={card.imageSrc}
                                        username={card.hostUsername}
                                        description={card.description}
                                        date={card.scheduledAt}
                                        difficulty={card.difficulty}
                                        duration={card.durationMinutes}
                                        status={card.status}
                                    />
                                </li>
                            ))
                            :
                            <p>No slots available. Create your own!</p>
                        }
                    </ul>
                </section>
                <Pagination className="mb-5">
                    <PaginationContent>
                        <PaginationItem
                            onClick={(e) => {
                                e.preventDefault()
                                if (currentPage > 1) {
                                    handlePageChange(currentPage - 1)
                                }
                            }}>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        {Array.from({ length: queryAvailable.data?.totalPages }, (_, index) => {
                            const page = index + 1
                            return (
                                <PaginationItem
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handlePageChange(page)
                                    }}
                                >
                                    <PaginationLink href="#" isActive={currentPage === page} >{page}</PaginationLink>
                                </PaginationItem>
                            )
                        }
                        )}
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem
                            onClick={(e) => {
                                e.preventDefault()
                                handlePageChange(currentPage + 1)
                            }}
                        >
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
                <Footer />
            </main>
        </div>
    );
}
