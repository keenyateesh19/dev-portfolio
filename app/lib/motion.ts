import type { Variants } from "framer-motion";

/** Shared easing curve used across all duration-based transitions */
export const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

/** Shared spring config — spread into any `transition` prop */
export const SPRING = {
  type: "spring",
  stiffness: 100,
  damping: 15,
} as const;

/** Shared viewport config — spread into any `viewport` prop */
export const VIEW = { once: true, margin: "-80px" } as const;

// ─── Page-entry helpers (animate on mount) ────────────────────────────────────

/** Spread directly onto a `motion.*` element that enters on mount */
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
} as const;

export const fadeInLeft = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
} as const;

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
} as const;

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
} as const;

// ─── Scroll-triggered helpers (animate when entering viewport) ────────────────

/** Spread directly onto a `motion.*` element that animates on scroll */
export const viewFadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEW,
} as const;

export const viewFadeInLeft = {
  initial: { opacity: 0, x: -10 },
  whileInView: { opacity: 1, x: 0 },
  viewport: VIEW,
} as const;

export const viewFadeInRight = {
  initial: { opacity: 0, x: 20 },
  whileInView: { opacity: 1, x: 0 },
  viewport: VIEW,
} as const;

// ─── Stagger variants ─────────────────────────────────────────────────────────

/** Parent: orchestrates children stagger */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Child: used inside containerVariants */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: SPRING,
  },
};

/** Hero CTA buttons — slightly slower stagger for emphasis */
export const heroCTAContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export const heroCTAItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

// ─── Custom-delay variant (use with `custom` prop) ────────────────────────────

/** Accepts a `custom` delay value per element */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};
