import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, CalendarDays, Clock } from "lucide-react";

interface AvailableCardProps {
    imageSrc: string,
    username: string,
    description: string,
    date: string,
    time: string,
    difficulty: string
}

const difficultyStyles = {
    Easy: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    Medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    Hard: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
};

export default function AvailableCard(props: AvailableCardProps) {
    const { imageSrc, username, description, date, time, difficulty } = props
    return (
        <Card className="w-full sm:w-auto flex-1 min-w-60 max-w-2xl flex flex-col justify-between">
            <CardHeader>
                {/* <CardTitle>Mock interview</CardTitle> */}
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar size="default">
                            <AvatarImage src={imageSrc} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p>{username}</p>
                    </div>
                    <Badge className={difficultyStyles[difficulty as keyof typeof difficultyStyles] ?? difficultyStyles.Easy}>
                        {difficulty}
                    </Badge>
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2 items-center">
                <Calendar width={16} height={16} />
                <p>{date}</p>
                <Clock width={16} height={16} />
                <p>{time}</p>
                <p>(60 min)</p>
            </CardContent>
            <CardFooter>
                <Button className="w-full" size="lg">
                    <CalendarDays />
                    Book slot
                </Button>
            </CardFooter>
        </Card>
    );
}
