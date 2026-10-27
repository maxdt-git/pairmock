import express from "express";
import { prisma } from "./lib/prisma.ts";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.ts";
import { createMeetAndCalendarEvent, deleteCalendarEvent } from "./lib/googleCalendar.ts";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "transcendence-backend",
  });
});

// Create a test entry
app.post("/api/test-entries", async (req, res) => {
  const label = req.body?.label;

  if (typeof label !== "string" || !label.trim()) {
    res.status(400).json({
      error: "A non-empty label is required",
    });
    return;
  }

  try {
    const entry = await prisma.testEntry.create({
      data: {
        label: label.trim(),
      },
    });

    res.status(201).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// Retrieve all test entries
app.get("/api/test-entries", async (_req, res) => {
  try {
    const entries = await prisma.testEntry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

// Retrieve all user // dev only
app.get("/api/users", async (_req, res) => {
  try {
    const entries = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(entries)
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to retrieve users",
    })
  }
})


// POST slots
app.post("/api/slots", async (req, res) => {
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
    typeof description !== "string" || !description.trim() ||
    typeof scheduledAt !== "string" || !scheduledAt.trim()
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

  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const card = await prisma.slot.create({
      data: {
        imageSrc: session.user.image ? session.user.image : "",
        hostId: session?.user.id,
        description: description.trim(),
        difficulty: difficulty.trim(),
        scheduledAt: scheduledAt.trim(),
        durationMinutes: durationMinutes,
        status: status.trim()
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

// GET available slots
app.get("/api/slots/available", async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1)
    const difficultyQuery = req.query.difficulty?.toString().toUpperCase() || "ALL"
    const difficulty = (difficultyQuery && difficultyQuery !== "ALL") ? difficultyQuery : undefined
    const sortTime = req.query.time === 'asc' ? 'asc' : 'desc';
    const limit = 8
    const skip = (page - 1) * limit
    const [entries, totalCount] = await prisma.$transaction([
      prisma.slot.findMany({
        skip: skip,
        take: limit, // Use the variable instead of hardcoded 8
        orderBy: {
          scheduledAt: sortTime,
        },
        where: {
          status: "AVAILABLE",
          difficulty: difficulty
        },
        include: {
          host: {
            select: {
              name: true,
              image: true
            }
          }
        }
      }),
      prisma.slot.count({
        where: {
          status: "AVAILABLE",
          difficulty: difficulty
        }
      }),
    ]);
    res.status(200).json({
      data: entries,
      totalPages: Math.ceil(totalCount / limit) || 1
    })
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to retrieve users",
    })
  }
})

// GET booked slots
app.get("/api/slots/booked", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const entries = await prisma.slot.findMany({
      orderBy: {
        scheduledAt: "desc",
      },
      where: {
        status: "BOOKED",
        OR: [
          { bookerId: session.user.id },
          { hostId: session.user.id },
        ],
      },
      include: {
        host: {
          select: {
            name: true,
            image: true
          }
        },
        booker: {
          select: {
            name: true
          }
        }
      }
    });
    res.status(200).json(entries)
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to retrieve users",
    })
  }
})


// GET completed slots
app.get("/api/slots/completed", async (req, res) => {
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
        scheduledAt: "desc",
      },
      where: {
        status: "COMPLETED",
        OR: [
          { bookerId: currentId },
          { hostId: currentId },
        ],
      },
      include: {
        host: {
          select: {
            name: true,
            image: true
          }
        }
      }
    });
    res.status(200).json(entries)
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to retrieve users",
    })
  }
})

// DELETE slot by id
app.delete("/api/slots/:id", async (req, res) => {
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

    await prisma.slot.delete({
      where: { id },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Unable to delete slot",
    });
  }
});

// UPDATE booking slot
app.patch("/api/slots/:id/book", async (req, res) => {
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

    const userId = session.user.id
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
    // updateMany to only allow one user to make the update
    const result = await prisma.slot.updateMany({
      where: { id, status: "AVAILABLE" },
      data: { status: "BOOKED", bookerId: userId }
    });
    const updatedSlot = await prisma.slot.findUnique({
      where: { id },
      include: {
        host: true,
        booker: true
      }
    })
    try {
      const event = await createMeetAndCalendarEvent(updatedSlot, updatedSlot?.host, updatedSlot?.booker)
      if (event?.googleEventId){
        await prisma.slot.update({
          where: {id},
          data: {
            googleEventId: event.googleEventId
          }
        })
      }
    }
    catch (e) {
      console.log(e)
    }
    // 
    if (result.count === 0) {
      res.status(409).json({
        error: "Slot is no longer available",
      });
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: "Unable to update slot",
    });
  }
})
// UPDATE cancel booked slot
app.patch("/api/slots/:id/cancel-book", async (req, res) => {
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

    const userId = session.user.id
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
      data: { status: "AVAILABLE", bookerId: null, googleEventId: null }
    });
    if (result.count === 0) {
      res.status(409).json({ error: "Slot is no longer booked" });
      return;
    }
    if (slot.googleEventId && slot.bookerId) {
      try {
        await deleteCalendarEvent(slot.bookerId, slot.hostId, slot.googleEventId);
      } catch (calendarError) {
        console.error("Failed to delete Google Calendar event:", calendarError);
      }
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: "Unable to cancel slot",
    });
  }
})


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
