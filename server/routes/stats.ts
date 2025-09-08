import { RequestHandler } from "express";

export const handleStats: RequestHandler = (_req, res) => {
  const stats = {
    awareness: [
      { topic: "Flood kit readiness", percent: 62 },
      { topic: "Fire escape plan", percent: 48 },
      { topic: "Cyclone safe zones", percent: 55 },
      { topic: "First-aid basics", percent: 71 },
      { topic: "Emergency contacts", percent: 67 },
    ],
  };
  res.status(200).json(stats);
};
