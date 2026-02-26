import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import confetti from "canvas-confetti";
import { FaCopy, FaCheck, FaRocket, FaEnvelope } from "react-icons/fa";

const EMAIL = "reachme@yateesh.tech";

// ─── Globe Tile ───────────────────────────────────────────────────────────────

function GlobeTile() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const phi = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const extraPhi = useRef(0);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;

    const DPR = 2;
    const globe = createGlobe(canvas, {
      devicePixelRatio: DPR,
      width: container.offsetHeight * DPR,
      height: container.offsetHeight * DPR,
      phi: 0,
      theta: 0.22,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 6,
      baseColor: [0.05, 0.05, 0.13],
      markerColor: [0.25, 0.55, 1.0],
      glowColor: [0.12, 0.28, 0.65],
      markers: [
        { location: [37.09, -95.71], size: 0.08 }, // USA
        { location: [51.51, -0.13], size: 0.08 },  // UK
        { location: [50.11, 8.68], size: 0.07 },   // Europe (Frankfurt)
        { location: [20.59, 78.96], size: 0.09 },  // India
      ],
      onRender(state) {
        if (!isDragging.current) phi.current += 0.004;
        state.phi = phi.current + extraPhi.current;
        const size = container.offsetHeight * DPR;
        state.width = size;
        state.height = size;
      },
    });

    return () => globe.destroy();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col justify-end h-full overflow-hidden rounded-2xl border border-white/10 bg-[#07080f] cursor-grab active:cursor-grabbing select-none"
      onMouseDown={(e) => {
        isDragging.current = true;
        lastX.current = e.clientX;
      }}
      onMouseMove={(e) => {
        if (!isDragging.current) return;
        extraPhi.current += (e.clientX - lastX.current) / 280;
        lastX.current = e.clientX;
      }}
      onMouseUp={() => { isDragging.current = false; }}
      onMouseLeave={() => { isDragging.current = false; }}
    >
      {/* background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-950/30 via-transparent to-[#07080f] pointer-events-none z-1" />

      {/* Canvas sized to container height (square), centered horizontally */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ height: "100%", width: "auto", aspectRatio: "1 / 1" }}
      />

      {/* bottom overlay */}
      <div className="relative z-2 p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {["🇺🇸 US", "🇬🇧 UK", "🇪🇺 Europe", "🇮🇳 India"].map((loc) => (
            <span
              key={loc}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/15 border border-blue-400/20 text-blue-300 backdrop-blur-sm"
            >
              {loc}
            </span>
          ))}
        </div>
        <p className="text-white font-semibold text-xl leading-snug">
          Available worldwide
        </p>
        <p className="text-zinc-400 text-sm mt-1">
          Open to remote work across time zones
        </p>
      </div>
    </div>
  );
}

// ─── Contact Tile ─────────────────────────────────────────────────────────────

function ContactTile() {
  const [copied, setCopied] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for mobile / non-HTTPS
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return Promise.resolve();
  };

  const handleCopy = () => {
    copyToClipboard(EMAIL);
    setCopied(true);

    const rect = btnRef.current?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;

    confetti({
      particleCount: 130,
      spread: 90,
      origin: { x, y },
      colors: ["#60a5fa", "#a78bfa", "#34d399", "#f472b6", "#fbbf24"],
      startVelocity: 38,
      gravity: 0.75,
      ticks: 220,
      scalar: 0.9,
    });

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative flex flex-col justify-between h-full rounded-2xl glass border border-white/10 p-6 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-8 -right-8 w-40 h-40 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
          </span>
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
            Let&apos;s connect
          </span>
        </div>
        <h3 className="font-semibold text-xl leading-snug">
          <span className="text-white">Let&apos;s take the first step to</span>{" "}
          <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            bring your ideas to life
          </span>
        </h3>

      </div>

      <div className="relative z-10 mt-2">
        <button
          ref={btnRef}
          onClick={handleCopy}
          className={`group relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-300 overflow-hidden
            ${copied
              ? "bg-green-500/10 border-green-400/40 text-green-300"
              : "bg-blue-500/8 border-blue-400/20 hover:border-blue-400/50 hover:bg-blue-500/15 text-blue-200"
            }`}
        >
          {/* Shimmer sweep on hover */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/5 to-transparent" />

          <span className={`shrink-0 p-2 rounded-lg transition-colors duration-300 ${copied ? "bg-green-500/20" : "bg-blue-500/15 group-hover:bg-blue-500/25"}`}>
            {copied
              ? <FaCheck className="text-green-400 text-sm" />
              : <FaEnvelope className="text-blue-400 text-sm" />
            }
          </span>

          <span className="flex-1 text-left">
            <span className="block text-xs text-zinc-500 mb-0.5">
              {copied ? "Copied!" : "Email me at"}
            </span>
            <span className="block text-sm font-mono truncate">
              {EMAIL}
            </span>
          </span>

          <span className={`shrink-0 transition-opacity duration-300 ${copied ? "opacity-0" : "opacity-40 group-hover:opacity-100"}`}>
            <FaCopy className="text-xs" />
          </span>
        </button>
      </div>
    </div>
  );
}

// ─── Behind the Scenes Tile ───────────────────────────────────────────────────

function BehindScenesTile() {
  return (
    <div className="relative flex flex-col justify-between h-full rounded-2xl glass border border-white/10 p-6 overflow-hidden">
      {/* decorative blobs */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400" />
          </span>
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
            Behind the scenes
          </span>
        </div>

        <h3 className="text-white font-semibold text-base mb-4">
          Currently building
        </h3>

        <div className="flex items-start gap-3 px-3.5 py-3 rounded-xl bg-purple-500/10 border border-purple-400/20">
          <FaRocket className="text-purple-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-white text-sm font-medium">A SaaS Product</p>
            <p className="text-zinc-500 text-xs mt-0.5 leading-relaxed">
              Designing, building &amp; shipping in public
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Exported Section ─────────────────────────────────────────────────────────

const BentoSection = () => {
  return (
    <section className="py-12">
      <span className="glass px-3 py-1 text-xs font-mono tracking-widest text-zinc-400 uppercase mb-6 inline-block">
        Quick look
      </span>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:h-120">
        {/* Globe — spans 2 rows on desktop */}
        <div className="min-h-85 md:min-h-0 md:col-span-2 md:row-span-2 md:h-full">
          <GlobeTile />
        </div>

        {/* Contact */}
        <div className="md:h-full">
          <ContactTile />
        </div>

        {/* Behind the scenes */}
        <div className="md:h-full">
          <BehindScenesTile />
        </div>
      </div>
    </section>
  );
};

export default BentoSection;
