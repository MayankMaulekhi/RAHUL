import { RequestHandler } from "express";

export const handleAlerts: RequestHandler = (_req, res) => {
  const now = Date.now();
  const alerts = [
    { id: "a1", type: "flood", region: "Assam, IN", severity: "high", timestamp: new Date(now - 5 * 60_000).toISOString(), summary: "River Brahmaputra rising; low-lying areas inundated." },
    { id: "a2", type: "fire", region: "Nashik, IN", severity: "moderate", timestamp: new Date(now - 14 * 60_000).toISOString(), summary: "Dry winds increasing wildfire spread near outskirts." },
    { id: "a3", type: "cyclone", region: "Odisha Coast, IN", severity: "critical", timestamp: new Date(now - 1 * 60_000).toISOString(), summary: "Cyclone Sagira approaching; gusts up to 130 km/h." },
    { id: "a4", type: "flood", region: "Guwahati, IN", severity: "low", timestamp: new Date(now - 25 * 60_000).toISOString(), summary: "Localized waterlogging after heavy showers." },
  ];
  res.status(200).json(alerts);
};
