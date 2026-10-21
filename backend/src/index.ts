import express from "express";
import { prisma } from "./lib/prisma.ts";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.ts";

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


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});

 
// POST slots
app.post("/api/slots", async (req, res) => {
  const {
    imageSrc,
    hostUsername,
    bookerUsername,
    description,
    difficulty,
    scheduledAt,
    durationMinutes,
    status,
    createdAt,
    updatedAt,
  } = req.body ?? {};

  const fields = [
    imageSrc,
    hostUsername,
    bookerUsername,
    description,
    difficulty,
    scheduledAt,
    durationMinutes,
    status,
    createdAt,
    updatedAt,
  ];

  if (
    typeof imageSrc !== "string" || !imageSrc.trim() ||
    typeof hostUsername !== "string" || !hostUsername.trim() ||
    typeof description !== "string" || !description.trim() ||
    typeof scheduledAt !== "string" || !scheduledAt.trim()
  ) {
    return res.status(400).json({
      error: "imageSrc, hostUsername, description, and scheduledAt are required strings",
    });
  }

  const parsedDuration = Number(durationMinutes);
  if (!Number.isInteger(parsedDuration) || parsedDuration <= 0) {
    return res.status(400).json({
      error: "durationMinutes must be a positive integer",
    });
  }

  try {
    const card = await prisma.slot.create({
      data: {
        imageSrc: imageSrc.trim(),
        hostUsername: hostUsername.trim(),
        bookerUsername: typeof bookerUsername === "string" && bookerUsername.trim()
          ? bookerUsername.trim()
          : null,
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

// GET slots
app.get("/api/slots", async (req, res) => {
    try {
        const entries = await prisma.slot.findMany({
            orderBy: {
                scheduledAt: "desc",
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