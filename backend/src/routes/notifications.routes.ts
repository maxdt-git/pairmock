import { fromNodeHeaders } from "better-auth/node";
import express from "express"
import { auth } from "../lib/auth.ts";
import { prisma } from "../lib/prisma.ts";

export const notificationsRouter = express.Router()

// Get notifications
notificationsRouter.get("/", async (req, res) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        })
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const currentId = session.user.id

        const entries = await prisma.notification.findMany({
            take: 6,
            orderBy: {
                createdAt: "desc",
            },
            where: {
                userId: currentId,
            }
        });
        res.status(200).json(entries)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Unable to retrieve notifs",
        })
    }
})

// delete notifs
notificationsRouter.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id <= 0) {
        res.status(400).json({ error: "Invalid notification ID" });
        return;
    }
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        if (!session) {
            res.status(401).json({ error: "Not authenticated" });
            return;
        }
        const notification = await prisma.notification.findUnique({
            where: { id },
        });
        if (!notification) {
            res.status(404).json({ error: "Notification not found" });
            return;
        }
        if (notification.userId !== session.user.id) {
            res.status(403).json({
                error: "You cannot delete this notification",
            });
            return;
        }
        await prisma.notification.delete({
            where: { id },
        });
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Unable to delete notification",
        });
    }
});

// Post notifications
notificationsRouter.post("/", async (req, res) => {
    const {
        description,
        status,
    } = req.body ?? {};
    if (
        typeof description !== "string" || !description.trim() ||
        typeof status !== "string" || !status.trim()
    ) {
        return res.status(400).json({
            error: "description, are required strings",
        });
    }
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        if (!session) {
            res.status(401).json({ error: "Not authenticated" });
            return;
        }

        const card = await prisma.notification.create({
            data: {
                userId: session.user.id,
                description: description.trim(),
                status: status.trim(),
            },
        });
        res.status(201).json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Unable to create notification",
        });
    }
});

async function notifThirty() {
    const now = new Date()
    const schedule = new Date(now.getTime() + 1800000)
    // create notif for the host
    try {
        const slots = await prisma.slot.findMany({
            orderBy: {
                scheduledAt: "desc",
            },
            where: {
                status: 'BOOKED',
                AND: [
                    { scheduledAt: { gte: now, lte: schedule } },
                    { infoThirty: false },
                ],
            },
            include: {
                host: {
                    select: {
                        name: true
                    }
                },
                booker: {
                    select: {
                        name: true
                    }
                }
            }
        });
        for (const slot of slots) {
            if (slot.booker) {
                await prisma.notification.create({
                    data: {
                        userId: slot.hostId,
                        description: `Your meeting with ${slot.booker.name} will begin in ${Math.round((slot.scheduledAt.getTime() - now.getTime()) / 1000 / 60)} min`,
                        status: "NEW",
                    },
                });
                if (slot.bookerId) {
                    await prisma.notification.create({
                        data: {
                            userId: slot.bookerId,
                            description: `Your meeting with ${slot.host.name} will begin in ${Math.round((slot.scheduledAt.getTime() - now.getTime()) / 1000 / 60)} min`,
                            status: "NEW",
                        },
                    })
                }
            }

            await prisma.slot.update({
                where: {
                    id: slot.id,
                },
                data: {
                    infoThirty: true,
                },
            });
        }
    }
    catch (error) {
        console.error(error)
    }
}

setInterval(notifThirty, 60000)