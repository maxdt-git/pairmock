import { fromNodeHeaders } from "better-auth/node";
import express from "express"
import { auth } from "../lib/auth.ts";
import { prisma } from "../lib/prisma.ts";

export const analyticsRouter = express.Router()

analyticsRouter.get("/", async (req, res) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        })
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const currentId = session.user.id

        const entries = await prisma.slot.findMany({
            orderBy: {
                scheduledAt: "asc",
            },
            where: {
                status: "COMPLETED",
                OR: [
                    { hostId: currentId },
                    { bookerId: currentId },
                ],
            }
        });

        const interviews = entries.map((slot) => {
            const feedback = slot.hostId === currentId ? slot.bookerFeedback : slot.hostFeedback
            const role = slot.hostId === currentId ? "host" : "booker"

            return {
                id: slot.id,
                date: slot.scheduledAt,
                difficulty: slot.difficulty,
                role: role,
                feedback: feedback
            };
        });

        res.status(200).json(interviews)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Unable to retrieve analytics",
        })
    }
})
