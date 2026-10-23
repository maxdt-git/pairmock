import Footer from "@/components/layout/Footer/Footer";
import Slot from "@/components/layout/Slot/Slot";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import type { SlotType } from "@/types/slot";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, GraduationCap, Hourglass, MessagesSquare } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const [imageSrc, setImageSrc] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    if (session?.user?.name) {
      setUsername(session.user.name);
    }
    if (session?.user.image) {
      setImageSrc(session.user.image)
    }
  }, [session?.user?.image, session?.user?.name]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await authClient.updateUser({
      image: imageSrc,
      name: username,
    })
  }

  async function getCompletedSlots() {
    const res = await fetch('/api/slots/completed');
    if (!res.ok) {
      throw new Error('Failed to load posts');
    }
    return res.json();
  }

  const queryCompleted = useQuery({
    queryKey: ['slot-completed'],
    queryFn: getCompletedSlots,
    enabled: !!session?.user,
  })

  return (
    <main className="max-w-[1650px] p-2 flex flex-col grow mx-auto min-h-dvh">
      <div className="mb-4">
        <Button variant="outline" size={"lg"}>
          <Link to={"/dashboard"} className="flex gap-2 items-center">
            <ArrowLeft /> Dashboard
          </Link>
        </Button>
      </div>
      <div className="flex gap-4 mb-4">
        <Card className="w-full max-w-sm flex flex-col max-h-105">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <Avatar size="profile" className="mx-auto">
                <AvatarImage src={imageSrc} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardTitle className="text-center mb-2.5">{session?.user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="image">Profile image</Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://github.com/shadcn.png"
                    value={imageSrc}
                    onChange={(e) => setImageSrc(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="User"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={25}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-6">
              <Button type="submit" className="w-full">
                Save
              </Button>
            </CardFooter>
          </form>
        </Card>
        <Card className="w-full pl-3 pr-3">
          <div className="flex gap-3">
            <Item variant="outline" size="sm" className="min-w-55">
              <ItemMedia>
                <MessagesSquare />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Passed interviews: {queryCompleted?.data?.length ?? 0}</ItemTitle>
              </ItemContent>
            </Item>
            <Item variant="outline" size="sm" className="min-w-55">
              <ItemMedia>
                <Hourglass />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Hours of practice: {Math.round(queryCompleted?.data?.reduce((acc: number, curr: SlotType) => acc + curr.durationMinutes, 0) ?? 0) / 60}</ItemTitle>
              </ItemContent>
            </Item>
            <Item variant="outline" size="sm" className="min-w-55">
              <ItemMedia>
                <GraduationCap />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Feedback score: 4.2</ItemTitle>
              </ItemContent>
            </Item>
          </div>
          <h2 className="text-xl font-bold ml-1">Passed interviws:</h2>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(345px,1fr))] gap-5">
            {queryCompleted?.data?.map((card: SlotType) => (
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
        </Card>
      </div>
      <Footer />
    </main >
  );
}