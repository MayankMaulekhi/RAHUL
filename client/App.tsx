import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import DynamicBackground from "@/components/visuals/DynamicBackground";

const queryClient = new QueryClient();

function NeonHeader({ disasterType, setDisasterType }: { disasterType: string; setDisasterType: (v: string) => void }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-xl tracking-tight text-neon">
          DPHub
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-foreground/80 hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[hsl(var(--primary))] hover:after:w-full after:transition-all">
            Home
          </Link>
          <a href="#education" className="text-sm text-foreground/80 hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[hsl(var(--secondary))] hover:after:w-full after:transition-all">
            Education
          </a>
          <a href="#sessions" className="text-sm text-foreground/80 hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-[hsl(var(--accent))] hover:after:w-full after:transition-all">
            Virtual Sessions
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <select
            aria-label="Disaster type"
            value={disasterType}
            onChange={(e) => setDisasterType(e.target.value)}
            className="bg-transparent border border-border/70 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] text-foreground/90 hover:border-[hsl(var(--primary))] transition-colors"
          >
            <option value="flood">Flood</option>
            <option value="fire">Fire</option>
            <option value="cyclone">Cyclone</option>
          </select>
        </div>
      </div>
    </header>
  );
}

const App = () => {
  const [disasterType, setDisasterType] = useState<string>("flood");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="relative min-h-screen overflow-x-clip">
            <DynamicBackground disasterType={disasterType} />
            <NeonHeader disasterType={disasterType} setDisasterType={setDisasterType} />
            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<Index disasterType={disasterType} setDisasterType={setDisasterType} />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
