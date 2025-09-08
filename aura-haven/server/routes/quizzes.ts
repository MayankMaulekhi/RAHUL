import { RequestHandler } from "express";

export const handleQuizzes: RequestHandler = (_req, res) => {
  const quizzes = [
    {
      id: "q1",
      question: "What should you do first during a flood warning?",
      options: ["Drive through water to move fast", "Move to higher ground immediately", "Wait until water rises", "Open all windows"],
      answerIndex: 1,
    },
    {
      id: "q2",
      question: "During a fire, which is safest?",
      options: ["Use elevators", "Get low and crawl under smoke", "Hide in a closet", "Break windows"],
      answerIndex: 1,
    },
    {
      id: "q3",
      question: "Cyclone prep includes:",
      options: ["Tape windows only", "Secure loose objects outdoors", "Open doors for airflow", "Ignore alerts"],
      answerIndex: 1,
    },
    {
      id: "q4",
      question: "Earthquake drill means:",
      options: ["Drop, Cover, Hold On", "Run outside immediately", "Stand in doorway", "Use elevator"],
      answerIndex: 0,
    },
  ];
  res.status(200).json(quizzes);
};
