import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";

interface BookedCardProps {
    imageSrc: string,
    username: string,
    description: string,
    date: string,
    time: string
}

export default function BookedCard(props: BookedCardProps) {
    const { imageSrc, username, description, date, time } = props
    return (
        <Card className="w-full sm:w-auto flex-1 min-w-72 max-w-md flex flex-col justify-between">
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
            <CardFooter className="flex gap-1">
               <Button className="bg-green-700 hover:bg-green-800" size="lg">
                    <Video />
                    Enter interview
                </Button>
                <Button size="lg" variant="destructive">
                    Cancel
                </Button>
            </CardFooter>
        </Card>
    );
}
