import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleAlerts } from "./routes/alerts";
import { handleQuizzes } from "./routes/quizzes";
import { handleStats } from "./routes/stats";
import { handleSessions } from "./routes/sessions";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Preparedness Hub APIs
  app.get("/api/alerts", handleAlerts);
  app.get("/api/quizzes", handleQuizzes);
  app.get("/api/stats", handleStats);
  app.get("/api/sessions", handleSessions);

  return app;
}
