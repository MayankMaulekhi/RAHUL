import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

type DisasterType = "flood" | "fire" | "cyclone";

type AlertsResponse = Array<{
  id: string;
  type: DisasterType;
  region: string;
  severity: "low" | "moderate" | "high" | "critical";
  timestamp: string;
  summary: string;
}>;

type StatsResponse = {
  awareness: Array<{ topic: string; percent: number }>;
};

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
};

type QuizzesResponse = QuizQuestion[];

type SessionsResponse = Array<{ id: string; title: string; datetime: string; host: string; url: string }>;

export default function Index({ disasterType, setDisasterType }: { disasterType?: DisasterType; setDisasterType?: (v: DisasterType) => void } = {}) {
  const [internalDisaster, setInternalDisaster] = useState<DisasterType>(("flood") as DisasterType);
  const activeDisaster = disasterType ?? internalDisaster;
  const setActiveDisaster = setDisasterType ?? setInternalDisaster;
  const { data: alerts } = useQuery<AlertsResponse>({ queryKey: ["alerts"], queryFn: async () => (await fetch("/api/alerts")).json() });
  const { data: stats } = useQuery<StatsResponse>({ queryKey: ["stats"], queryFn: async () => (await fetch("/api/stats")).json() });
  const { data: quizzes } = useQuery<QuizzesResponse>({ queryKey: ["quizzes"], queryFn: async () => (await fetch("/api/quizzes")).json() });
  const { data: sessions } = useQuery<SessionsResponse>({ queryKey: ["sessions"], queryFn: async () => (await fetch("/api/sessions")).json() });

  const tips = useMemo(
    () => [
      "Keep a 72-hour emergency kit ready.",
      "Store copies of IDs and insurance in waterproof bags.",
      "Know evacuation routes and meeting points.",
      "Charge power banks before a storm.",
      "Turn off gas and electricity if instructed.",
    ],
    [],
  );

  const [tipIndex, setTipIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTipIndex((i) => (i + 1) % tips.length), 3500);
    return () => clearInterval(id);
  }, [tips.length]);

  const [quizProgress, setQuizProgress] = useState<Record<string, number | null>>({});

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative pt-16 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--neon-purple))] via-[hsl(var(--neon-cyan))] to-[hsl(var(--neon-pink))]">
                Disaster Preparedness Hub
              </span>
            </h1>
            <p className="mt-4 text-lg text-foreground/80 max-w-xl">Real-time alerts, science-backed education, and gamified training to keep your community resilient.</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a href="#education" className="px-6 py-3 rounded-lg bg-[hsl(var(--neon-cyan))] text-black font-semibold shadow-neon-cyan hover:brightness-110 transition will-change-transform animate-pulse-glow">
                Start Learning
              </a>
              <a href="#sessions" className="px-6 py-3 rounded-lg bg-[hsl(var(--neon-purple))] text-white font-semibold shadow-neon-purple hover:brightness-110 transition">
                Join a Drill
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm">
              <span className="opacity-80">Background:</span>
              <button onClick={() => setActiveDisaster("flood")} className={`px-3 py-1 rounded-md border ${activeDisaster === "flood" ? "neon-glow-cyan border-transparent" : "border-border/60"}`}>Flood</button>
              <button onClick={() => setActiveDisaster("fire")} className={`px-3 py-1 rounded-md border ${activeDisaster === "fire" ? "neon-glow-orange border-transparent" : "border-border/60"}`}>Fire</button>
              <button onClick={() => setActiveDisaster("cyclone")} className={`px-3 py-1 rounded-md border ${activeDisaster === "cyclone" ? "neon-glow-pink border-transparent" : "border-border/60"}`}>Cyclone</button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95, rotate: -1 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[hsl(var(--neon-purple))]/30 via-transparent to-[hsl(var(--neon-cyan))]/30 blur-2xl" />
            <div className="relative rounded-3xl border border-border/60 bg-card/70 backdrop-blur p-6 md:p-8 shadow-neon-purple">
              <h3 className="text-xl font-bold mb-3">Live Regional Alerts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(alerts ?? []).slice(0, 4).map((a) => (
                  <article key={a.id} className="rounded-xl border border-border/60 bg-background/60 p-4 hover:border-[hsl(var(--primary))]/70 transition shadow-neon-cyan">
                    <div className="flex items-center justify-between text-xs opacity-80">
                      <span className="capitalize">{a.type}</span>
                      <time>{new Date(a.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time>
                    </div>
                    <div className="mt-2 text-sm font-semibold">{a.region}</div>
                    <p className="mt-1 text-xs opacity-80">{a.summary}</p>
                    <span className={`mt-2 inline-block text-[10px] px-2 py-0.5 rounded-full ${
                      a.severity === "critical"
                        ? "bg-[hsl(var(--destructive))] text-black"
                        : a.severity === "high"
                        ? "bg-[hsl(var(--neon-pink))] text-black"
                        : a.severity === "moderate"
                        ? "bg-[hsl(var(--neon-orange))] text-black"
                        : "bg-[hsl(var(--neon-cyan))] text-black"
                    }`}>{a.severity.toUpperCase()}</span>
                  </article>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Safety Cards */}
      <section id="education" className="mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Quick Safety</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Flood", tip: "Move to higher ground, avoid bridges.", cls: "shadow-neon-cyan" },
              { title: "Fire", tip: "Get low, cover nose, check heat on doors.", cls: "shadow-neon-orange" },
              { title: "Cyclone", tip: "Stay indoors, away from windows.", cls: "shadow-neon-pink" },
              { title: "Quake", tip: "Drop, Cover, Hold On.", cls: "shadow-neon-purple" },
            ].map((c) => (
              <motion.div whileHover={{ y: -4 }} key={c.title} className={`rounded-xl border border-border/60 p-4 bg-card/70 backdrop-blur ${c.cls}`}>
                <div className="text-sm opacity-80">{c.title}</div>
                <div className="mt-1 font-semibold">{c.tip}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Gap Dashboard */}
      <section className="mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-2xl md:text-3xl font-bold">Knowledge Gap Dashboard</h2>
            <p className="text-sm opacity-80 max-w-xl">Where awareness is low, risk is high. Track awareness to prioritize training.</p>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border/60 p-6 bg-card/70 backdrop-blur">
              <div className="space-y-4">
                {(stats?.awareness ?? []).map((row) => (
                  <div key={row.topic} className="w-full">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>{row.topic}</span>
                      <span className="opacity-80">{row.percent}%</span>
                    </div>
                    <div className="h-2 bg-background/60 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${row.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-[hsl(var(--neon-cyan))] via-[hsl(var(--neon-purple))] to-[hsl(var(--neon-pink))] shadow-neon-cyan"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Myth vs Fact */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { myth: "Open windows during a cyclone to balance pressure.", fact: "Keep windows shut; move to an inner room or hallway." },
                { myth: "Driving through flood water is safe if slow.", fact: "Even 6 inches can sweep a car; avoid flooded roads." },
                { myth: "Elevators are safe during fire evacuation.", fact: "Use stairs; smoke and heat can trap elevators." },
                { myth: "Earthquakes only happen once.", fact: "Aftershocks can be strong—stay prepared for hours/days." },
              ].map((m, i) => (
                <FlipCard key={i} frontTitle="Myth" backTitle="Fact" front={m.myth} back={m.fact} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gamified Quizzes + Micro Tips */}
      <section className="mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-border/60 p-6 bg-card/70 backdrop-blur" id="education">
            <h3 className="text-xl font-bold mb-4">Quick Quizzes</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {(quizzes ?? []).slice(0, 4).map((q) => (
                <QuizCard key={q.id} q={q} value={quizProgress[q.id] ?? null} onChange={(i) => setQuizProgress((s) => ({ ...s, [q.id]: i }))} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border/60 p-6 bg-card/70 backdrop-blur">
            <h3 className="text-xl font-bold mb-2">Did you know?</h3>
            <motion.p key={tipIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-foreground/90">
              {tips[tipIndex]}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Sessions CTA */}
      <section id="sessions" className="mt-16 md:mt-24 mb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-3xl border border-border/60 p-6 md:p-10 bg-card/70 backdrop-blur relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-60 h-60 rounded-full bg-[hsl(var(--neon-cyan))]/20 blur-3xl" />
            <h2 className="text-2xl md:text-3xl font-bold">Learning Modules & Virtual Drills</h2>
            <p className="mt-2 text-foreground/80 max-w-2xl">Join expert-led live sessions and interactive drills. Practice makes preparedness.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#education" className="px-5 py-2.5 rounded-lg bg-[hsl(var(--neon-pink))] text-black font-semibold shadow-neon-pink">Browse Modules</a>
              <a href="#sessions" className="px-5 py-2.5 rounded-lg bg-[hsl(var(--neon-cyan))] text-black font-semibold shadow-neon-cyan">Upcoming Drills</a>
            </div>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(sessions ?? []).slice(0, 3).map((s) => (
                <a key={s.id} href={s.url} className="rounded-xl border border-border/60 p-4 bg-background/60 hover:border-[hsl(var(--primary))]/70 transition">
                  <div className="text-sm font-semibold">{s.title}</div>
                  <div className="text-xs opacity-80 mt-1">{new Date(s.datetime).toLocaleString()}</div>
                  <div className="text-xs opacity-80">Host: {s.host}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FlipCard({ frontTitle, backTitle, front, back }: { frontTitle: string; backTitle: string; front: string; back: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="[perspective:1000px]">
      <div
        className={`relative h-40 rounded-xl border border-border/60 bg-card/70 p-4 cursor-pointer transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="text-xs opacity-80">{frontTitle}</div>
          <div className="mt-1 font-semibold">{front}</div>
        </div>
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-xs opacity-80">{backTitle}</div>
          <div className="mt-1 font-semibold">{back}</div>
        </div>
      </div>
    </div>
  );
}

function QuizCard({ q, value, onChange }: { q: QuizQuestion; value: number | null; onChange: (i: number) => void }) {
  const correct = value !== null && value === q.answerIndex;
  return (
    <div className={`rounded-xl border border-border/60 p-4 bg-background/60 ${correct ? "shadow-neon-cyan" : value !== null ? "shadow-neon-pink" : ""}`}>
      <div className="text-sm font-semibold mb-2">{q.question}</div>
      <div className="grid gap-2">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={`text-left px-3 py-2 rounded-md border transition-colors ${
              value === i ? "border-[hsl(var(--primary))] bg-card" : "border-border/60 hover:border-[hsl(var(--primary))]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {value !== null && (
        <div className={`mt-3 inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full ${correct ? "bg-[hsl(var(--neon-cyan))] text-black" : "bg-[hsl(var(--neon-pink))] text-black"}`}>
          {correct ? "Correct!" : "Try again"}
        </div>
      )}
    </div>
  );
}
