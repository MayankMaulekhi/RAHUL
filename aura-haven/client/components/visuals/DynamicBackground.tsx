import { useEffect, useRef } from "react";

interface Props {
  disasterType: string;
}

export default function DynamicBackground({ disasterType }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    type Particle = { x: number; y: number; vx: number; vy: number; size: number; life?: number; angle?: number };
    let particles: Particle[] = [];

    const init = () => {
      particles = [];
      const count = Math.floor((width * height) / (disasterType === "fire" ? 45000 : 35000));
      for (let i = 0; i < count; i++) {
        particles.push(spawnParticle());
      }
    };

    const spawnParticle = (): Particle => {
      if (disasterType === "flood") {
        return { x: Math.random() * width, y: Math.random() * -height, vx: (Math.random() - 0.5) * 0.2, vy: 2 + Math.random() * 2.5, size: 1 + Math.random() * 1.5 };
      }
      if (disasterType === "fire") {
        return { x: Math.random() * width, y: height + Math.random() * 100, vx: (Math.random() - 0.5) * 0.3, vy: -1.5 - Math.random() * 1.5, size: 1 + Math.random() * 2, life: 60 + Math.random() * 80 };
      }
      // cyclone
      return { x: Math.random() * width, y: Math.random() * height, vx: 0, vy: 0, size: 1 + Math.random() * 1.5, angle: Math.random() * Math.PI * 2 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        ctx.beginPath();
        if (disasterType === "flood") {
          ctx.strokeStyle = `hsla(var(--neon-cyan),${0.55 + Math.random() * 0.3})`;
          ctx.lineWidth = p.size;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 2, p.y + p.vy * 6);
          ctx.stroke();
          p.x += p.vx;
          p.y += p.vy * 1.2;
          if (p.y > height) Object.assign(p, spawnParticle());
        } else if (disasterType === "fire") {
          const alpha = Math.max(0.1, (p.life ?? 0) / 120);
          ctx.fillStyle = `hsla(var(--neon-orange),${alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `hsl(var(--neon-orange))`;
          ctx.arc(p.x, p.y, p.size + Math.random() * 1.2, 0, Math.PI * 2);
          ctx.fill();
          p.x += p.vx + Math.sin(p.y * 0.02) * 0.2;
          p.y += p.vy;
          if (p.life) p.life -= 1;
          if (!p.life || p.y < -20) Object.assign(p, spawnParticle());
        } else {
          // cyclone swirl around center
          const cx = width / 2;
          const cy = height / 2;
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.max(40, Math.hypot(dx, dy));
          const speed = 0.6 + 60 / dist;
          const angle = Math.atan2(dy, dx) + 0.2 / (dist * 0.02);
          p.x = cx + Math.cos(angle) * dist + (Math.random() - 0.5) * 0.6;
          p.y = cy + Math.sin(angle) * dist + (Math.random() - 0.5) * 0.6;
          ctx.fillStyle = `hsla(var(--neon-pink),0.35)`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = `hsl(var(--neon-pink))`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.closePath();
      }
      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(draw);
    };

    init();
    draw();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [disasterType]);

  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-neon" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0,transparent_50%,rgba(0,0,0,0.35)_100%)]" />
    </div>
  );
}
