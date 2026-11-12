import { fromNodeHeaders } from "better-auth/node";
import express from "express"
import { prisma } from "../lib/prisma.ts";
import { auth } from "../lib/auth.ts";

export const messageRouter = express.Router()

messageRouter.post("/", async (req, res) => {
  const {
    senderId,
    receiverId,
    text
  } = req.body ?? {};

  if (
    typeof senderId !== "string" ||
    !senderId.trim() ||
    typeof receiverId !== "string" ||
    !receiverId.trim()
  ) {
    return res.status(400).json({
      error: "senderId and receiverId are required strings",
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

    if (session.user.id === receiverId) {
        res.status(401).json()
        return;
    }

    const receiver = await prisma.user.findUnique({
      where: {
        id: receiverId,
      }
    })

    if (!receiver) {
        res.status(401).json({ error: "User not found"})
        return;
    }

    const card = await prisma.message.create({
      data: {
        senderId: senderId,
        receiverId: receiverId,
        text: text
      },
    });
    res.status(201).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to create available card",
    });
  }
});

messageRouter.get("/", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const entries = await prisma.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        receiverId: session.user.id,
      },
    });
    res.status(200).json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to retrieve messages",
    });
  }
});