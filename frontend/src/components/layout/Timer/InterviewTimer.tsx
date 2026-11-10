import { useEffect, useState, useRef } from "react";
import { Timer } from "lucide-react";
import { useTranslation } from "react-i18next";

type InterviewTimerProps = {
    durationMinutes: number;
    scheduledDate: string;
    onFinished: () => void;
};

export default function InterviewTimer({
    durationMinutes,
    scheduledDate,
    onFinished
}: InterviewTimerProps) {
    const { t } = useTranslation()
    const durationMilliSeconds = durationMinutes * 60 * 1000
    const timerStart = (new Date(scheduledDate).getTime())
    const timerEnd = timerStart + durationMilliSeconds
    const [ timer, setTimer ] = useState(timerEnd - Date.now())
    const hasStarted = Date.now() >= timerStart;
    const hasNotified = useRef(false);

    useEffect(() => {
        if (timer <= 0 && !hasNotified.current) {
            hasNotified.current = true;
            onFinished();
        }
    }, [timer, onFinished]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timerEnd - Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, [timerEnd]);

    const minutes = String(Math.floor(timer / 60 / 1000)).padStart(2, "0")
    const seconds = String(Math.floor(timer / 1000) % 60).padStart(2, "0")

    return (
        <div className="flex items-center gap-2">
            <Timer className="size-5 text-muted-foreground" />
            <span className="font-mono text-lg font-semibold tabular-nums">
                {!hasStarted ? (
                <p>{t("interview.timer.notStarted")}</p>
                ) : timer <= 0 ? (
                <p>{t("interview.timer.over")}</p>
                ) : (
                <p>{minutes}:{seconds}</p>
                )}
            </span>
        </div>
    );
}