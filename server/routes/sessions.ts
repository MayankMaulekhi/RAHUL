import { RequestHandler } from "express";

export const handleSessions: RequestHandler = (_req, res) => {
  const base = Date.now();
  const sessions = [
    { id: "s1", title: "Cyclone Readiness 101", datetime: new Date(base + 36e5).toISOString(), host: "NDRF Trainer A", url: "#" },
    { id: "s2", title: "Community Flood Drill", datetime: new Date(base + 72e5).toISOString(), host: "Relief Org B", url: "#" },
    { id: "s3", title: "Home Fire Safety", datetime: new Date(base + 108e5).toISOString(), host: "Fire Dept C", url: "#" },
  ];
  res.status(200).json(sessions);
};
