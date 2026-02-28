import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Button from "~/components/ui/Button";
import Eyebrow from "~/components/ui/Eyebrow";
import { viewFadeInUp, EASE } from "~/lib/motion";

const devLogos = [
  { name: "HTML5", file: "html5-default.svg" },
  { name: "CSS", file: "css-default.svg" },
  { name: "JavaScript", file: "javascript-default.svg" },
  { name: "TypeScript", file: "typescript-default.svg" },
  { name: "React", file: "react-dark.svg" },
  { name: "React Router", file: "reactrouter-default.svg" },
  { name: "React Query", file: "reactquery-default.svg" },
  { name: "Tailwind CSS", file: "tailwindcss-default.svg" },
  { name: "Motion", file: "motion-dark.svg" },
  { name: "Shadcn UI", file: "shadcn-ui-dark.svg" },
  { name: "Zustand", file: "zustand.svg" },
  { name: "Zod", file: "zod-default.svg" },
  { name: "TanStack", file: "tanstack-default.svg" },
  { name: "Vite", file: "vitejs-default.svg" },
  { name: "Node.js", file: "nodejs-wordmark.svg" },
  { name: "Express.js", file: "expressjs-dark.svg" },
  { name: "Python", file: "python-default.svg" },
  { name: "Bun", file: "bun-default.svg" },
  { name: "Deno", file: "deno-default.svg" },
  { name: "MongoDB", file: "mongodb-dark.svg" },
  { name: "Mongoose", file: "mongoosejs-default.svg" },
  { name: "PostgreSQL", file: "postgresql-default.svg" },
  { name: "MySQL", file: "mysql-dark.svg" },
  { name: "Strapi", file: "strapi-default.svg" },
  { name: "Git", file: "git-default.svg" },
  { name: "GitHub", file: "github-default.svg" },
  { name: "Netlify", file: "netlify-default.svg" },
  { name: "Vercel", file: "vercel-dark.svg" },
  { name: "Postman", file: "postman-default.svg" },
  { name: "npm", file: "npm-default.svg" },
  { name: "pnpm", file: "pnpm-default.svg" },
  { name: "Chart.js", file: "chartjs-default.svg" },
  { name: "PostCSS", file: "postcss-default.svg" },
  { name: "Biome", file: "biomejs-default.svg" },
  { name: "Figma", file: "figma-default.svg" },
  { name: "Canva", file: "canva-default.svg" },
  { name: "Photoshop", file: "photoshop-default.svg" },
  { name: "Notion", file: "notion-default.svg" },
  { name: "VS Code", file: "vscode-default.svg" },
  { name: "Linux", file: "linux-default.svg" },
  { name: "Bash", file: "bash-default.svg" },
  { name: "Markdown", file: "markdown-dark.svg" },
  { name: "YAML", file: "yaml-default.svg" },
  { name: "C++", file: "c-plusplus-default.svg" },
  { name: "Jekyll", file: "jekyll-default.svg" },
  { name: "Windows", file: "windows-default.svg" },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 18, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 280, damping: 22 },
  },
};

const SkillsSection = () => {
  const skillsRef = useRef(null);
  const inView = useInView(skillsRef, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <section ref={skillsRef} className="relative py-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-10"
          {...viewFadeInUp}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Eyebrow className="mb-4">My Skills</Eyebrow>
          <h2 className="font-display">
            The Special{" "}
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Ingredients
            </span>
          </h2>
        </motion.div>

        {/* Grid wrapper — clipped when collapsed */}
        <div className="relative">
          <motion.div
            animate={{ maxHeight: expanded ? 2000 : 300 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3"
              variants={container}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {devLogos.map(({ name, file }) => (
                <motion.div
                  key={name}
                  variants={item}
                  className="group flex flex-col items-center justify-center aspect-square glass rounded p-2.5 hover:bg-white/15 transition-colors cursor-default"
                  title={name}
                >
                  <img
                    src={`/dev-logos/${file}`}
                    alt={name}
                    className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-200"
                    loading="lazy"
                    draggable={false}
                  />
                  <span className="mt-1.5 text-[9px] text-zinc-500 group-hover:text-zinc-300 transition-colors text-center leading-tight truncate w-full">
                    {name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Gradient fade — only visible when collapsed */}
          <AnimatePresence>
            {!expanded && (
              <motion.div
                key="gradient"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-gray-950 via-gray-950/80 to-transparent pointer-events-none"
              />
            )}
          </AnimatePresence>
        </div>

        {/* See more / See less */}
        <div className="mt-6 flex justify-center">
          <Button onClick={() => setExpanded((v) => !v)} className="flex gap-3">
            {expanded ? "See less" : "See more"}
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              ↓
            </motion.span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
