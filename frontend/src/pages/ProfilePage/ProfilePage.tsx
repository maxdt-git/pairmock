import Footer from "@/components/layout/Footer/Footer";
import Slot from "@/components/layout/Slot/Slot";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import type { SlotType } from "@/types/slot";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, GraduationCap, Hourglass, MessagesSquare } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function ProfilePage() {
  const { t } = useTranslation();
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
    if (username === session?.user.name && imageSrc === session.user.image) {
      toast.add({
        type: "error",
        title: t("profile.noChanges")
      });
      return
    }
    try {
      await authClient.updateUser({
        image: imageSrc,
        name: username,
      })
      toast.add({
        type: "success",
        title: t("profile.saved")
      });
    }
    catch {
      toast.add({
        type: "error",
        title: t("profile.error")
      });
    }
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

  if (!session) {
    return <p>{t("common.notLoggedIn")}</p>
  }

  // stats
  let evaluatedCount = 0;
  const scoreKeys = ['codeQuality', 'communication', 'problemSolving', 'complexityAnalysis'] as const;

  const totalScoreAverage = queryCompleted?.data?.reduce((acc: number, card: SlotType) => {
    const isHost = session?.user.id === card.hostId
    const isBooker = session?.user.id === card.bookerId

    const feedback = isHost ? card.bookerFeedback : isBooker ? card.hostFeedback : null;

    if (!feedback) {
      return acc
    }

    const cardScore = scoreKeys.reduce((sum, key) => sum + (Number(feedback[key]) || 0), 0);

    evaluatedCount += 1;
    return acc + cardScore / scoreKeys.length;
  }, 0) ?? 0

  const passedInterviewCount = queryCompleted?.data?.length ?? 0
  const hoursPracticeScore = Math.round(queryCompleted?.data?.reduce((acc: number, curr: SlotType) => acc + curr.durationMinutes, 0) ?? 0) / 60
  const feedbackScore = evaluatedCount > 0 ? Number(totalScoreAverage / evaluatedCount).toFixed(1) : 0
  const navigate = useNavigate()

  function handleNavigate() {
    navigate("/analytics")
  }

  return (
    <main className="max-w-[1650px] p-2 flex flex-col grow mx-auto min-h-dvh">
      <div className="mb-4">
        <Button variant="outline" size={"lg"}>
          <Link to={"/dashboard"} className="flex gap-2 items-center">
            <ArrowLeft /> {t("common.dashboard")}
          </Link>
        </Button>
      </div>
      <div className="flex gap-4 mb-4 flex-wrap lg:flex-nowrap">
        <Card className="w-full lg:max-w-sm flex flex-col max-h-105">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <Avatar size="profile" className="mx-auto">
                <AvatarImage src={session?.user.image || ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardTitle className="text-center mb-2.5">{session?.user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="image">{t("profile.imageLabel")}</Label>
                  <Input
                    id="image"
                    type="url"
                    placeholder="https://github.com/shadcn.png"
                    value={imageSrc}
                    onChange={(e) => setImageSrc(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">{t("profile.username")}</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder={t("common.user")}
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
                {t("profile.save")}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <Card className="w-full pl-3 pr-3">
          <div className="flex gap-3 flex-wrap xl:flex-nowrap">
            <Item variant="outline" size="sm" className="min-w-55">
              <ItemMedia>
                <MessagesSquare />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{t("profile.stats.passed", { count: passedInterviewCount })}</ItemTitle>
              </ItemContent>
            </Item>
            <Item variant="outline" size="sm" className="min-w-55">
              <ItemMedia>
                <Hourglass />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{t("profile.stats.hours", { count: hoursPracticeScore })}</ItemTitle>
              </ItemContent>
            </Item>
            <Item variant="outline" size="sm" className="min-w-55">
              <ItemMedia>
                <GraduationCap />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{t("profile.stats.score", { score: feedbackScore })}</ItemTitle>
              </ItemContent>
            </Item>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold ml-1">{t("profile.passedHeading")}</h2>
            <Button className={"w-36"} onClick={handleNavigate}>View Analytics</Button>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(345px,1fr))] gap-5">
            {queryCompleted?.data?.map((card: SlotType) => (
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
