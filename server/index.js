/* Express JS entry for standalone backend (non-TS) */
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => res.json({ message: 'ping' }));

app.get('/api/alerts', (_req, res) => {
  const now = Date.now();
  res.json([
    { id: 'a1', type: 'flood', region: 'Assam, IN', severity: 'high', timestamp: new Date(now - 5 * 60_000).toISOString(), summary: 'River Brahmaputra rising; low-lying areas inundated.' },
    { id: 'a2', type: 'fire', region: 'Nashik, IN', severity: 'moderate', timestamp: new Date(now - 14 * 60_000).toISOString(), summary: 'Dry winds increasing wildfire spread near outskirts.' },
    { id: 'a3', type: 'cyclone', region: 'Odisha Coast, IN', severity: 'critical', timestamp: new Date(now - 1 * 60_000).toISOString(), summary: 'Cyclone Sagira approaching; gusts up to 130 km/h.' },
    { id: 'a4', type: 'flood', region: 'Guwahati, IN', severity: 'low', timestamp: new Date(now - 25 * 60_000).toISOString(), summary: 'Localized waterlogging after heavy showers.' },
  ]);
});

app.get('/api/quizzes', (_req, res) => {
  res.json([
    { id: 'q1', question: 'What should you do first during a flood warning?', options: ['Drive through water to move fast', 'Move to higher ground immediately', 'Wait until water rises', 'Open all windows'], answerIndex: 1 },
    { id: 'q2', question: 'During a fire, which is safest?', options: ['Use elevators', 'Get low and crawl under smoke', 'Hide in a closet', 'Break windows'], answerIndex: 1 },
    { id: 'q3', question: 'Cyclone prep includes:', options: ['Tape windows only', 'Secure loose objects outdoors', 'Open doors for airflow', 'Ignore alerts'], answerIndex: 1 },
    { id: 'q4', question: 'Earthquake drill means:', options: ['Drop, Cover, Hold On', 'Run outside immediately', 'Stand in doorway', 'Use elevator'], answerIndex: 0 },
  ]);
});

app.get('/api/stats', (_req, res) => {
  res.json({
    awareness: [
      { topic: 'Flood kit readiness', percent: 62 },
      { topic: 'Fire escape plan', percent: 48 },
      { topic: 'Cyclone safe zones', percent: 55 },
      { topic: 'First-aid basics', percent: 71 },
      { topic: 'Emergency contacts', percent: 67 },
    ],
  });
});

app.get('/api/sessions', (_req, res) => {
  const base = Date.now();
  res.json([
    { id: 's1', title: 'Cyclone Readiness 101', datetime: new Date(base + 36e5).toISOString(), host: 'NDRF Trainer A', url: '#' },
    { id: 's2', title: 'Community Flood Drill', datetime: new Date(base + 72e5).toISOString(), host: 'Relief Org B', url: '#' },
    { id: 's3', title: 'Home Fire Safety', datetime: new Date(base + 108e5).toISOString(), host: 'Fire Dept C', url: '#' },
  ]);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
