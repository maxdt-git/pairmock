import { Server } from "@hocuspocus/server";
import { auth } from "./lib/auth.ts";
import { prisma } from "./lib/prisma.ts";

export const collaborationServer = new Server({
    port: 4001,
    address: "0.0.0.0",

    async onAuthenticate({ documentName, requestHeaders }) {
        const match = /^interview-(\d+)$/.exec(documentName);
        if (!match) {
            throw new Error("Invalid document name");
        }

        const slotId = Number(match[1]);
        if (!Number.isSafeInteger(slotId) || slotId <= 0) {
            throw new Error("Invalid slot ID");
        }

        const session = await auth.api.getSession({
            headers: requestHeaders,
        });
        if (!session?.user?.id) {
            throw new Error("Not authenticated");
        }

        const slot = await prisma.slot.findUnique({
            where: { id: slotId },
            select: {
                hostId: true,
                bookerId: true,
            },
        });

        if (
            !slot || (slot.hostId !== session.user.id && slot.bookerId !== session.user.id)
        ) {
            throw new Error("Access denied");
        }

        return {
            userId: session.user.id,
            slotId,
        };
    },
});