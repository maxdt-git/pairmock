import { fromNodeHeaders } from "better-auth/node";
import express from "express"
import { prisma } from "../lib/prisma.ts";
import { auth } from "../lib/auth.ts";

export const interviewRouter = express.Router()

// GET info for the InterviewPage
interviewRouter.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id)
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        if (!session?.user?.id) {
            return res.status(401).json({ error: "Unauthorized: Please log in" });
        }
        const slot = await prisma.slot.findUnique({
            where: { id },
            include: {
                host: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                },
                booker: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        })
        if (!slot) {
            return res.status(404).json({ error: "Interview not found" });
        }
        if (session.user.id !== slot.host?.id && session.user.id !== slot.booker?.id) {
            return res.status(403).json({ error: "Forbidden: Access denied" });
        }
        res.status(200).json(slot)
    } catch (e) {
        return res.status(500).json({ error: "Internal server error" });
    }
})


interviewRouter.post("/:id/feedback", async (req, res) => {
    try {
        const id = Number(req.params.id)
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        if (!session?.user?.id) {
            return res.status(401).json({ error: "Unauthorized: Please log in" });
        }
        const feedbackData = req.body ?? {};
        const slot = await prisma.slot.findUnique({
            where: { id },
        });
        if (!slot) {
            return res.status(404).json({ error: "Interview not found" });
        }
        if (session.user.id !== slot.hostId && session.user.id !== slot.bookerId) {
            return res.status(403).json({ error: "Access denied" });
        }
        if (session.user.id === slot?.hostId) {
            await prisma.slot.update({
                where: { id },
                data: {
                    hostFeedback: feedbackData
                }
            })
        }
        if (session.user.id === slot?.bookerId) {
            await prisma.slot.update({
                where: { id },
                data: {
                    bookerFeedback: feedbackData
                }
            })
        }
        console.log(feedbackData)
        res.sendStatus(200)
    } catch (e) {
        return res.status(500).json({ error: "Internal server error" });
    }
})