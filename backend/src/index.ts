import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.ts";
import { collaborationServer } from "./collaboration.ts";
import { slotsRouter } from "./routes/slots.routes.ts";
import { notificationsRouter } from "./routes/notifications.routes.ts";
import { devRouter } from "./routes/dev.routes.ts";
import { interviewRouter } from "./routes/interview.routes.ts";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.use("/api/slots", slotsRouter)
app.use("/api/notifications", notificationsRouter)
app.use("/api/interview", interviewRouter)
// app.use("/api", devRouter) # ONLY FOR DEVELOPMENT | DONT ENABLE IT IN PRODUCTION 

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "transcendence-backend",
  });
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});

collaborationServer.listen().catch((error) => {
  console.error("Failed to start Hocuspocus:", error);
});
