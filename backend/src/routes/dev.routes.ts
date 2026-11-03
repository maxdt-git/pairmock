import express from "express"
import { prisma } from "../lib/prisma.ts";

export const devRouter = express.Router()

// Create a test entry
devRouter.post("/test-entries", async (req, res) => {
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
devRouter.get("/test-entries", async (_req, res) => {
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
devRouter.get("/users", async (_req, res) => {
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
