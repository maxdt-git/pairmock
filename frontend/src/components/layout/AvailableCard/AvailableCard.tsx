import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CalendarDays, Clock } from "lucide-react";

interface AvailableCardProps {
    imageSrc: string,
    username: string,
    description: string,
    date: string,
    time: string
}

export default function AvailableCard(props: AvailableCardProps) {
    const { imageSrc, username, description, date, time } = props
    return (
        <Card className="w-full sm:w-auto flex-1 min-w-60 max-w-2xl flex flex-col justify-between">
            <CardHeader>
                <CardTitle>Mock interview</CardTitle>
                <div className="flex items-center gap-2">
                    <Avatar size="default">
                        <AvatarImage src={imageSrc} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p>{username}</p>
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
