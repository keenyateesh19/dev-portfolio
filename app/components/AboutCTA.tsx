import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCopy,
  FaCheck,
  FaEnvelope,
  FaPaperPlane,
  FaTimes,
} from "react-icons/fa";
import confetti from "canvas-confetti";
import { EASE, viewFadeInUp } from "~/lib/motion";

const EMAIL = "reachme@yateesh.tech";

// ─── Animated background blobs ────────────────────────────────────────────────

// ─── Contact form ─────────────────────────────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(
        "https://formsubmit.co/ajax/4f03f99077a199301a9922ecce8533d2 ",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ ...form }),
        },
      );
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 focus:border-blue-500/60 focus:bg-white/8 rounded px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none transition-all duration-200";

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-3 py-10 text-center"
      >
        <span className="text-4xl">🎉</span>
        <p className="text-white font-semibold">Message received!</p>
        <p className="text-zinc-500 text-sm">
          I'll get back to you as soon as I can.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          required
          className={inputClass}
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your email"
          required
          className={inputClass}
        />
      </div>
      <input
        name="subject"
        value={form.subject}
        onChange={handleChange}
        placeholder="Subject"
        required
        className={inputClass}
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Tell me about the project or role…"
        required
        rows={4}
        className={`${inputClass} resize-none`}
      />
      {status === "error" && (
        <p className="text-red-400 text-xs">
          Something went wrong — try emailing me directly.
        </p>
      )}
      <motion.button
        type="submit"
        disabled={status === "sending"}
        whileHover={{ y: -1 }}
        className="btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
            />
            Sending…
          </>
        ) : (
          <>
            <FaPaperPlane className="text-xs" />
            Send Message
          </>
        )}
      </motion.button>
    </form>
  );
}

// ─── Copy email button ────────────────────────────────────────────────────────

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);

    const rect = btnRef.current?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { x, y },
      colors: ["#60a5fa", "#a78bfa", "#34d399"],
      startVelocity: 32,
      gravity: 0.8,
      ticks: 200,
      scalar: 0.85,
    });

    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      ref={btnRef}
      onClick={handleCopy}
      className={`group relative w-full flex items-center gap-3 px-4 py-3.5 rounded border transition-all duration-300 overflow-hidden cursor-pointer
        ${
          copied
            ? "bg-green-500/10 border-green-400/40 text-green-300"
            : "bg-white/5 border-white/10 hover:border-blue-400/50 hover:bg-blue-500/10 text-blue-200"
        }`}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/5 to-transparent" />
      <span
        className={`shrink-0 p-2 rounded transition-colors duration-300 ${copied ? "bg-green-500/20" : "bg-blue-500/15 group-hover:bg-blue-500/25"}`}
      >
        {copied ? (
          <FaCheck className="text-green-400 text-sm" />
        ) : (
          <FaEnvelope className="text-blue-400 text-sm" />
        )}
      </span>
      <span className="flex-1 text-left">
        <span className="block text-xs text-zinc-500 mb-0.5">
          {copied ? "Copied to clipboard!" : "Or copy my email"}
        </span>
        <span className="block text-sm font-mono truncate">{EMAIL}</span>
      </span>
      <span className="shrink-0 text-zinc-600 group-hover:text-zinc-400 transition-colors">
        {copied ? (
          <FaCheck className="text-xs" />
        ) : (
          <FaCopy className="text-xs" />
        )}
      </span>
    </button>
  );
}

// ─── Main CTA section ─────────────────────────────────────────────────────────

const AboutCTA = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="cta" className="relative py-24 px-4 overflow-hidden">
      {/* Top border accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          {...viewFadeInUp}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Availability badge */}
          <span className="glass px-4 py-1.5 text-xs font-mono tracking-widest text-green-400 uppercase mb-6 inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            Available for full-time &amp; freelance
          </span>

          <h2 className="font-display mt-4 mb-5">
            Great work starts with a{" "}
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              conversation.
            </span>
          </h2>

          <p className="page-subtitle mx-auto text-center text-balance">
            Building things that actually ship and actually matter — that's what
            keeps me going. Whether it's a full-time role or a freelance
            project, I'm in if the work is meaningful.
          </p>
        </motion.div>

        {/* Contact panel */}
        <motion.div
          className="max-w-xl mx-auto"
          {...viewFadeInUp}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        >
          <div className="glass rounded p-6 flex flex-col gap-4">
            {/* Toggle button */}
            <motion.button
              onClick={() => setFormOpen((v) => !v)}
              className={`flex items-center justify-center gap-2 w-full transition-colors duration-200 ${
                formOpen ? "btn-secondary" : "btn-primary"
              }`}
              whileHover={{ y: -1 }}
              layout
            >
              <AnimatePresence mode="wait" initial={false}>
                {formOpen ? (
                  <motion.span
                    key="close"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <FaTimes className="text-xs" />
                    Close
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    <FaEnvelope className="text-xs" />
                    Get In Touch
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Expandable form */}
            <AnimatePresence>
              {formOpen && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pt-2 flex flex-col gap-3">
                    <ContactForm />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-xs text-zinc-600 font-mono">or</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            <CopyEmailButton />
          </div>
        </motion.div>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-purple-500/30 to-transparent" />
    </section>
  );
};

export default AboutCTA;
