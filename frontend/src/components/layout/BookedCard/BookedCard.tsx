import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader} from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";

interface BookedCardProps {
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

export default function BookedCard(props: BookedCardProps) {
    const { imageSrc, username, description, date, time, difficulty } = props
    return (
        <Card className="w-full sm:w-auto flex-1 min-w-72 max-w-md flex flex-col justify-between">
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
