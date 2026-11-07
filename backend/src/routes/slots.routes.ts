import express from "express";
import { fromNodeHeaders } from "better-auth/node";
import { prisma } from "../lib/prisma.ts";
import cron from "node-cron";
import { auth } from "../lib/auth.ts";
import {
  createMeetAndCalendarEvent,
  deleteCalendarEvent,
  getGoogleAccessToken,
} from "../lib/googleCalendar.ts";
import { Difficulty } from "../generated/prisma/client.ts";
import { AI_PROMPTS, getAiFeedback, type AiReviewType } from "../lib/ai.ts";

export const slotsRouter = express.Router();

const isDifficulty = (val: string): val is Difficulty => {
  return Object.values(Difficulty).includes(val as Difficulty);
};

// GET available slots
slotsRouter.get("/available", async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const difficultyQuery = req.query.difficulty?.toString().toUpperCase();
    const difficulty =
      difficultyQuery && isDifficulty(difficultyQuery)
        ? difficultyQuery
        : undefined;
    const sortTime = req.query.time === "asc" ? "asc" : "desc";
    const limit = 8;
    const skip = (page - 1) * limit;
    const [entries, totalCount] = await prisma.$transaction([
      prisma.slot.findMany({
        skip: skip,
        take: limit, // Use the variable instead of hardcoded 8
        orderBy: {
          scheduledAt: sortTime,
        },
        where: {
          status: "AVAILABLE",
          difficulty: difficulty,
          scheduledAt: {
            gt: new Date(),
          },
        },
        include: {
          host: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      }),
      prisma.slot.count({
        where: {
          status: "AVAILABLE",
          difficulty: difficulty,
        },
      }),
    ]);
    res.status(200).json({
      data: entries,
      totalPages: Math.ceil(totalCount / limit) || 1,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to retrieve users",
    });
  }
});

// GET booked slots
slotsRouter.get("/booked", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const entries = await prisma.slot.findMany({
      orderBy: {
        scheduledAt: "desc",
      },
      where: {
        status: "BOOKED",
        OR: [{ bookerId: session.user.id }, { hostId: session.user.id }],
      },
      include: {
        host: {
          select: {
            name: true,
            image: true,
          },
        },
        booker: {
          select: {
            name: true,
          },
        },
      },
    });
    res.status(200).json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to retrieve users",
    });
  }
});

// GET completed slots
slotsRouter.get("/completed", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const currentId = session.user.id;

    const entries = await prisma.slot.findMany({
      orderBy: {
        scheduledAt: "desc",
      },
      where: {
        status: "COMPLETED",
        OR: [{ bookerId: currentId }, { hostId: currentId }],
      },
      include: {
        host: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    res.status(200).json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to retrieve users",
    });
  }
});

// POST slots
slotsRouter.post("/", async (req, res) => {
  const {
    description,
    difficulty,
    scheduledAt,
    durationMinutes,
    status,
    createdAt,
    updatedAt,
  } = req.body ?? {};

  if (
    typeof description !== "string" ||
    !description.trim() ||
    typeof scheduledAt !== "string" ||
    !scheduledAt.trim()
  ) {
    return res.status(400).json({
      error: "description, and scheduledAt are required strings",
    });
  }

  const parsedDuration = Number(durationMinutes);
  if (!Number.isInteger(parsedDuration) || parsedDuration <= 0) {
    return res.status(400).json({
      error: "durationMinutes must be a positive integer",
    });
  }

  const scheduledDate = new Date(scheduledAt);
  const minDate = Date.now() + 60 * 60 * 1000;

  if (scheduledDate.getTime() < minDate) {
    return res.status(400).json({
      error: "Slot must start at least an hour from now",
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
    // prevents overlapping with AVAILABLE & BOOKED slots
    const existingSlots = await prisma.slot.findMany({
      where: {
        OR: [{ hostId: session.user.id }, { bookerId: session.user.id }],
        status: {
          in: ["AVAILABLE", "BOOKED"],
        },
      },
    });

    const scheduledEnd = new Date(
      scheduledDate.getTime() + durationMinutes * 60 * 1000,
    );
    // if any slot has overlapping, return true
    const hasOverlap = existingSlots.some((slot) => {
      const existingStart = slot.scheduledAt.getTime();

      const existingEnd = existingStart + slot.durationMinutes * 60 * 1000;

      return (
        existingStart < scheduledEnd.getTime() &&
        existingEnd > scheduledDate.getTime()
      );
    });

    if (hasOverlap) {
      return res.status(409).json({
        error: "You already have a slot during this time",
      });
    }

    const googleToken = await getGoogleAccessToken(session.user.id);
    if (!googleToken) {
      return res.status(403).json({ error: "Not authenticated with Google" });
    }
    const card = await prisma.slot.create({
      data: {
        imageSrc: session.user.image ? session.user.image : "",
        hostId: session?.user.id,
        description: description.trim(),
        difficulty: difficulty.trim(),
        scheduledAt: scheduledAt.trim(),
        durationMinutes: durationMinutes,
        status: status.trim(),
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

// DELETE slot by id
slotsRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid slot ID" });
    return;
  }
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    // every verification here is just for security,
    // with our implementation it should be impossible
    // to call this endpoint if no user corresponds or
    // if the slot doesn't exist
    if (!session) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const slot = await prisma.slot.findUnique({
      where: { id },
    });

    if (!slot) {
      res.status(404).json({ error: "Slot not found" });
      return;
    }

    if (slot.hostId !== session.user.id) {
      res.status(403).json({
        error: "You cannot delete this slot",
      });
      return;
    }

    if (slot.status === "BOOKED") {
      if (slot.googleEventId && slot.bookerId) {
        try {
          await deleteCalendarEvent(
            slot.bookerId,
            slot.hostId,
            slot.googleEventId,
          );
        } catch (calendarError) {
          console.error(
            "Failed to delete Google Calendar event:",
            calendarError,
          );
        }
      }
    }

    await prisma.slot.delete({
      where: { id },
    });

    if (slot.bookerId) {
      await prisma.notification.create({
        data: {
          userId: slot.bookerId,
          description: `Slot deleted by the host: ${session.user.name}`,
          status: "NEW",
        },
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to delete slot",
    });
  }
});

// UPDATE booking slot
slotsRouter.patch("/:id/book", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid slot ID" });
    return;
  }
  try {
    // check if session exists
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const userId = session.user.id;
    // check if slot exists
    const slot = await prisma.slot.findUnique({
      where: { id },
    });

    if (!slot) {
      res.status(404).json({ error: "Slot not found" });
      return;
    }
    // check if booker is host
    if (slot.hostId === session.user.id) {
      res.status(403).json({ error: "Can't book hosted slot" });
      return;
    }
    // check if slot is available
    if (slot.status !== "AVAILABLE") {
      res.status(409).json({ error: "Can only book available slots" });
      return;
    }

    const scheduledDate = new Date(slot.scheduledAt);
    const durationMinutes = slot.durationMinutes;

    const existingSlots = await prisma.slot.findMany({
      where: {
        OR: [{ hostId: session.user.id }, { bookerId: session.user.id }],
        status: {
          in: ["AVAILABLE", "BOOKED"],
        },
      },
    });

    const scheduledEnd = new Date(
      scheduledDate.getTime() + durationMinutes * 60 * 1000,
    );
    // if any slot has overlapping, return true
    const hasOverlap = existingSlots.some((slot) => {
      const existingStart = slot.scheduledAt.getTime();

      const existingEnd = existingStart + slot.durationMinutes * 60 * 1000;

      return (
        existingStart < scheduledEnd.getTime() &&
        existingEnd > scheduledDate.getTime()
      );
    });

    if (hasOverlap) {
      return res.status(409).json({
        error: "You already have a slot during this time",
      });
    }

    // updateMany to only allow one user to make the update
    const result = await prisma.slot.updateMany({
      where: { id, status: "AVAILABLE" },
      data: { status: "BOOKED", bookerId: userId },
    });
    if (result.count === 0) {
      res.status(409).json({
        error: "Slot is no longer available",
      });
      return;
    }
    const updatedSlot = await prisma.slot.findUnique({
      where: { id },
      include: {
        host: true,
        booker: true,
      },
    });
    try {
      const event = await createMeetAndCalendarEvent(
        updatedSlot,
        updatedSlot?.host,
        updatedSlot?.booker,
      );
      if (event?.googleEventId) {
        await prisma.slot.update({
          where: { id },
          data: {
            googleEventId: event.googleEventId,
            meetLink: event.meetLink,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
    // create notif for the slot host when slot is booked
    await prisma.notification.create({
      data: {
        userId: slot.hostId,
        description: `Slot booked by ${session.user.name}`,
        status: "NEW",
      },
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to update slot",
    });
  }
});

// UPDATE cancel booked slot
slotsRouter.patch("/:id/cancel-book", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid slot ID" });
    return;
  }
  try {
    // check if session exists
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const userId = session.user.id;
    // check if slot exists
    const slot = await prisma.slot.findUnique({
      where: { id },
    });

    if (!slot) {
      res.status(404).json({ error: "Slot not found" });
      return;
    }
    // check if slot is booked
    if (slot.status !== "BOOKED") {
      res.status(409).json({ error: "Can only cancel booked slots" });
      return;
    }
    // updateMany to only allow one user to make the update
    const result = await prisma.slot.updateMany({
      where: { id, status: "BOOKED", bookerId: userId },
      data: {
        status: "AVAILABLE",
        bookerId: null,
        googleEventId: null,
        meetLink: null,
      },
    });
    if (result.count === 0) {
      res.status(409).json({ error: "Slot is no longer booked" });
      return;
    }
    if (slot.googleEventId && slot.bookerId) {
      try {
        await deleteCalendarEvent(
          slot.bookerId,
          slot.hostId,
          slot.googleEventId,
        );
      } catch (calendarError) {
        console.error("Failed to delete Google Calendar event:", calendarError);
      }
    }
    // create a notif when book has been cancelled
    await prisma.notification.create({
      data: {
        userId: slot.hostId,
        description: `Your slot with ${session.user.name} has been cancelled`,
        status: "NEW",
      },
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to cancel slot",
    });
  }
});

// add the code at the end of interview to the slot
slotsRouter.patch("/:id/addcode", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid slot ID" });
    return;
  }

  console.log(req.body);

  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }
    const slot = await prisma.slot.findUnique({
      where: { id },
    });
    if (!slot) {
      res.status(404).json({ error: "Slot not found" });
      return;
    }
    if (slot.hostId !== session.user.id && slot.bookerId !== session.user.id) {
      return res.status(403).json({
        error: "You are not a participant of this interview",
      });
    }
    const result = await prisma.slot.updateMany({
      where: { id, code: null },
      data: {
        code: req.body.code,
      },
    });

    const canComplete =
      slot.code !== null &&
      slot.hostFeedback !== null &&
      slot.bookerFeedback !== null;

    if (canComplete) {
      await prisma.slot.updateMany({
        where: { id, status: "BOOKED" },
        data: { status: "COMPLETED" },
      });
    }

    if (result.count === 0) {
      const currentSlot = await prisma.slot.findUnique({
        where: { id },
        select: { code: true },
      });

      if (!currentSlot) {
        return res.status(404).json({
          error: "Slot not found",
        });
      }

      if (currentSlot.code !== null) {
        return res.status(200).json({
          message: "Code already saved",
        });
      }

      return res.status(409).json({
        error: "Unable to save code",
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to update slot",
    });
  }
});

// DELETE expired slots
async function cleanExpiredSlots() {
  const result = await prisma.slot.deleteMany({
    where: {
      status: "AVAILABLE",
      scheduledAt: {
        lte: new Date(Date.now() + 60 * 60 * 1000),
      },
    },
  });
  if (result.count > 0) {
    console.log(`${result.count} expired slots deleted`);
  }
}
// Program deletion exec
cron.schedule("* * * * *", async () => {
  try {
    await cleanExpiredSlots();
  } catch (error) {
    console.error("Slot cleanup failed:", error);
  }
});

// GET ai review
slotsRouter.post("/:id/ai-tips", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session?.user?.id) {
      return res.status(401).json({ error: "Unauthorized: Please log in" });
    }
    const slot = await prisma.slot.findUnique({ where: { id } });
    if (!slot) return res.status(404).json({ error: "Interview not found" });
    if (session.user.id !== slot.hostId && session.user.id !== slot.bookerId) {
      return res.status(403).json({ error: "Access denied" });
    }
    const code = String(req.body?.code ?? "");
    if (!code.trim())
      return res.status(400).json({ error: "No code to review" });
    if (code.length > 10_000)
      return res.status(400).json({ error: "Code too long" });

    const reviewType = String(req.body?.type ?? "");
    if (!(Object.hasOwn(AI_PROMPTS, reviewType))) {
      return res.status(400).json({ error: "Wrong type of review" });
    }

    const aiFb = await getAiFeedback(code, reviewType as AiReviewType);
    res.status(200).json({ tips: aiFb });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "AI review failed" });
  }
});
