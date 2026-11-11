import Footer from "@/components/layout/Footer/Footer";
import UserNavigation from "@/components/layout/UserNavigation/UserNavigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SlotType } from "@/types/slot";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useSearchParams } from "react-router";
import SlotCreation from "@/components/layout/SlotCreation/SlotCreation";
import { toast } from "@/components/ui/toast";
import Slot from "@/components/layout/Slot/Slot";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
    const { t } = useTranslation();
    const { data: session } = authClient.useSession();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const difficultyFilter = searchParams.get("difficulty") ?? "all"
    const timeFilter = searchParams.get("time") ?? "asc"

    const queryClient = useQueryClient();

    const bookSlotMutation = useMutation({
        mutationFn: async (slotId: SlotType["id"]) => {
            const response = await fetch(`/api/slots/${slotId}/book`, {
                method: "PATCH",
            });
            if (!response.ok) {
                throw new Error(`Failed to book slot: ${response.status}`);
            }
        },

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["slot-available"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["slot-booked"],
                }),
            ]);
            toast.add({
                title: t("dashboard.toast.booked.title"),
                description: t("dashboard.toast.booked.description"),
                type: "success",
            });
        },

        onError: (error) => {
            console.error(error);

            toast.add({
                title: t("dashboard.toast.bookFailed.title"),
                description: t("dashboard.toast.bookFailed.description"),
                type: "error",
            });
        },
    })

    const cancelSlotMutation = useMutation({
        mutationFn: async (slotId: SlotType["id"]) => {
            const response = await fetch(`/api/slots/${slotId}/cancel-book`, {
                method: "PATCH",
            });
            if (!response.ok) {
                throw new Error(`Failed to cancel slot: ${response.status}`);
            }
        },

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["slot-available"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["slot-booked"],
                }),
            ]);
            toast.add({
                title: t("dashboard.toast.canceled.title"),
                description: t("dashboard.toast.canceled.description"),
                type: "success",
            });
        },

        onError: (error) => {
            console.error(error);

            toast.add({
                title: t("dashboard.toast.cancelFailed.title"),
                description: t("dashboard.toast.cancelFailed.description"),
                type: "error",
            });
        },
    })

    const deleteSlotMutation = useMutation({
        mutationFn: async (slotId: SlotType["id"]) => {
            const response = await fetch(`/api/slots/${slotId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Failed to delete slot: ${response.status}`);
            }
        },

        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["slot-available"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["slot-booked"],
                }),
            ]);
            toast.add({
                title: t("dashboard.toast.deleted.title"),
                description: t("dashboard.toast.deleted.description"),
                type: "success",
            });
        },

        onError: (error) => {
            console.error(error);

            toast.add({
                title: t("dashboard.toast.deleteFailed.title"),
                description: t("dashboard.toast.deleteFailed.description"),
                type: "error",
            });
        },
    });

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
        const res = await fetch('/api/slots/booked');
        if (!res.ok) {
            throw new Error('Failed to load slots');
        }
        return res.json();
    }

    async function getAvailableSlots(page: number, difficulty: string, time: string) {
        const params = new URLSearchParams({
            page: page.toString(),
            difficulty: difficulty,
            time: time,
        })
        const res = await fetch(`/api/slots/available?${params.toString()}`);
        if (!res.ok) {
            throw new Error('Failed to load slots');
        }
        return res.json();
    }
    const queryBooked = useQuery({
        queryKey: ["slot-booked"],
        queryFn: getBookedSlots,
        refetchInterval: 5 * 1000,
    });
    const queryAvailable = useQuery({
        queryKey: ['slot-available', { currentPage, difficultyFilter, timeFilter }],
        queryFn: () => getAvailableSlots(currentPage, difficultyFilter, timeFilter),
        refetchInterval: 5 * 1000
    })

    const itemsDifficulty = [
        { label: t("dashboard.filter.easy"), value: "easy" },
        { label: t("dashboard.filter.medium"), value: "medium" },
        { label: t("dashboard.filter.hard"), value: "hard" },
        { label: t("dashboard.filter.all"), value: "all" },
    ]

    const itemsTime = [
        { label: t("dashboard.sort.asc"), value: "asc" },
        { label: t("dashboard.sort.desc"), value: "desc" },
    ]

    if (!session) {
        return (
            <p>{t("common.notLoggedIn")}</p>
        )
    }

    return (
        <div className="bg-muted/30">
            <main className="max-w-[1650px] p-2 min-h-dvh mx-auto flex flex-col grow ">
                <header className="flex justify-between pt-2 pb-2 items-center border-b border-border mb-2.5 max-[540px]:justify-center ">
                    <h1 className="text-4xl font-bold flex items-center gap-2 max-[540px]:hidden ">
                        <img src="/favicon.svg" alt="" shrink-0 className="size-20"/> PairMock</h1>
                    <div className="flex items-center gap-4 ">
                        <SlotCreation />
                        <UserNavigation
                            username={session?.user.name ?? t("common.user")}
                            imageSrc={session?.user.image ? session.user.image : ""}
                        />
                    </div>
                </header>
                <section className="mb-5">
                    <h2 className="text-2xl font-bold mb-2.5">{t("dashboard.bookedSlots")}</h2>
                    <ul className="flex gap-2 flex-wrap max-h-72 p-2 md:max-h-none overflow-y-auto">
                        {queryBooked.data?.map((card: SlotType) => (
                            <li key={card.id}>
                                <Slot
                                    id={card.id}
                                    imageSrc={card.host.image ?? ""}
                                    username={card.host.name}
                                    description={card.description}
                                    date={card.scheduledAt}
                                    difficulty={card.difficulty}
                                    duration={card.durationMinutes}
                                    status={card.status}
                                    onDelete={
                                        card.hostId === session.user.id ?
                                            async () => await deleteSlotMutation.mutateAsync(card.id) : undefined
                                    }
                                    onBooking={undefined}
                                    onCancel={() => cancelSlotMutation.mutate(card.id)}
                                />
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2 className="text-2xl font-bold mb-2.5">{t("dashboard.availableSlots")}</h2>
                    <div className="mb-2.5 ml-2 flex gap-3">
                        <Select items={itemsTime} value={timeFilter} onValueChange={(value) => {
                            handleTimeChange(value ?? "asc")
                        }}>
                            <SelectTrigger className="w-45">
                                <SelectValue placeholder={t("dashboard.timePlaceholder")} />
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
                                <SelectValue placeholder={t("dashboard.difficultyPlaceholder")} />
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
                                <li key={card.id} className="relative">
                                    <Slot
                                        id={card.id}
                                        imageSrc={card.host.image ?? ""}
                                        username={card.host.name}
                                        description={card.description}
                                        date={card.scheduledAt}
                                        difficulty={card.difficulty}
                                        duration={card.durationMinutes}
                                        status={card.status}
                                        onDelete={
                                            card.hostId === session.user.id ?
                                                async () => await deleteSlotMutation.mutateAsync(card.id) : undefined
                                        }
                                        onBooking={
                                            card.hostId !== session.user.id ?
                                                () => bookSlotMutation.mutateAsync(card.id) : undefined
                                        }
                                    />
                                </li>
                            ))
                            :
                            <p>{t("dashboard.noSlots")}</p>
                        }
                    </ul>
                </section>
                {queryAvailable?.data?.data.length > 0 ?
                    <Pagination className="mb-5">
                        <PaginationContent>
                            <PaginationItem
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (currentPage > 1) {
                                        handlePageChange(currentPage - 1)
                                    }
                                }}>
                                <PaginationPrevious href="#" text={t("pagination.previous")} />
                            </PaginationItem>
                            {Array.from({ length: queryAvailable.data?.totalPages }, (_, index) => {
                                const page = index + 1
                                return (
                                    <PaginationItem
                                        key={index}
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
                                <PaginationNext href="#" text={t("pagination.next")} />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    :
                    null
                }
                <Footer />
            </main>
        </div>
    );
}
