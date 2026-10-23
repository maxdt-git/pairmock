import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { formatDateTime } from "@/lib/dateFormat";
import { Calendar, CalendarDays, Clock, Hourglass, Video, Trash2 } from "lucide-react";
import SlotDeleteDialog from "./SlotDeleteDialog";
import { useState } from "react";

export interface SlotProps {
    imageSrc: string,
    username: string,
    description: string,
    date: string,
    difficulty: string,
    duration: number,
    status: string,
    onDelete?: () => Promise<void>,
    onBooking?: () => void
}

const difficultyStyles = {
    EASY: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    MEDIUM: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    HARD: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

export default function AvailableCard(props: SlotProps) {
    const { imageSrc, username, description, date, difficulty, duration, status, onDelete, onBooking } = props
    const { date: formattedDate, time: formattedTime } = formatDateTime(date);
    const [ slotDeleteOpen, setSlotDeleteOpen ] = useState(false)

    return (
        <Card className="w-full sm:w-auto flex-1 min-w-80 max-w-2xl flex flex-col justify-between">
            <CardHeader>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar size="default">
                            <AvatarImage src={imageSrc} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p>{username}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                        <Badge className={difficultyStyles[difficulty as keyof typeof difficultyStyles] ?? difficultyStyles.EASY}>
                            {difficulty}
                        </Badge>
                        {onDelete && (
                            <>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    aria-label="Delete slot"
                                    onClick={() => setSlotDeleteOpen(true)}
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                                <SlotDeleteDialog open={slotDeleteOpen} onOpenChange={setSlotDeleteOpen} onConfirm={onDelete}/>
                            </>
                        )}
                    </div>
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-5 items-center">
                <div className="flex gap-0.5 items-center">
                    <Calendar width={16} height={16} />
                    <p>{formattedDate}</p>
                </div>
                <div className="flex gap-0.5 items-center">
                    <Clock width={16} height={16} />
                    <p>{formattedTime}</p>
                </div>
                <div className="flex gap-0.5 items-center">
                    <Hourglass width={16} height={16} />
                    <p>{duration}(min)</p>
                </div>
            </CardContent>
            {status === "AVAILABLE" ?
                <CardFooter>
                    <Button className="w-full" size="lg" onClick={onBooking}>
                        <CalendarDays />
                        Book slot
                    </Button>
                </CardFooter>
                :
                <CardFooter className="flex gap-1">
                    <Button className="bg-green-700 hover:bg-green-800" size="lg">
                        <Video />
                        Enter interview
                    </Button>
                    <Button size="lg" variant="destructive">
                        Cancel
                    </Button>
                </CardFooter>
            }
        </Card>
    );
}
