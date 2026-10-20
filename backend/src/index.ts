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


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
