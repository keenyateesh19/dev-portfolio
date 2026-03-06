import { useState, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import Button from "~/components/ui/Button";
import type { Project } from "~/types";
import Eyebrow from "~/components/ui/Eyebrow";
import { EASE, viewFadeInUp } from "~/lib/motion";

const FeaturedProjects = ({ projects }: { projects: Project[] }) => {
  if (!projects.length) return null;

  const [activeIndex, setActiveIndex] = useState(0);
  const active = projects[activeIndex];

  return (
    <section className="relative py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          {...viewFadeInUp}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Eyebrow>Selected work</Eyebrow>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-display text-white">
              Featured{" "}
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <Link
              to="/projects"
              className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
            >
              View all projects
              <motion.span
                className="inline-block"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </motion.div>

        {/* Split layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* LEFT — sticky image */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-28">
            <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.id}
                  src={active.image}
                  alt={active.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: EASE }}
                />
              </AnimatePresence>

              {/* Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-gray-950/60 to-transparent pointer-events-none" />

              {/* Active badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active.id + "-cat"}
                    className="text-xs font-medium text-blue-300 bg-gray-950/70 backdrop-blur-sm border border-blue-400/20 px-3 py-1 rounded-full"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    {active.category}
                  </motion.span>
                </AnimatePresence>

                {/* Dot indicators */}
                <div className="flex gap-1.5">
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? "w-5 bg-blue-400"
                          : "w-1.5 bg-white/30 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Visit link under image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + "-link"}
                className="mt-4 flex items-center justify-between px-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <span className="text-xs text-gray-600">
                  {new Date(active.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
                <Link
                  to={`/projects/${active.slug}`}
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  Open project →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — scrollable project list */}
          <div className="w-full lg:w-1/2 flex flex-col divide-y divide-white/8">
            {projects.map((project, i) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={i}
                isActive={activeIndex === i}
                onActive={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-14 text-center"
          {...viewFadeInUp}
          transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
        >
          <Button to="/projects" className="inline-flex">
            Explore all projects →
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Right-side row ──────────────────────────────────────────────────────── */
const ProjectRow = ({
  project,
  index,
  isActive,
  onActive,
}: {
  project: Project;
  index: number;
  isActive: boolean;
  onActive: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.07 }}
      onViewportEnter={onActive}
    >
      <Link
        to={`/projects/${project.slug}`}
        onMouseEnter={onActive}
        className="group flex flex-col gap-3 py-7 cursor-pointer"
      >
        {/* Row header */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-gray-600 group-hover:text-gray-400 transition-colors w-6 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={`flex-1 text-lg font-semibold transition-colors duration-300 leading-snug ${
              isActive ? "text-white" : "text-gray-400 group-hover:text-white"
            }`}
          >
            {project.title}
          </h3>
          <span
            className={`text-xs border px-2.5 py-1 rounded-full transition-colors duration-300 shrink-0 hidden sm:block ${
              isActive
                ? "text-blue-300 border-blue-500/30 bg-blue-500/10"
                : "text-gray-600 border-white/10"
            }`}
          >
            {project.category}
          </span>
        </div>

        {/* Expandable detail */}
        <motion.div
          animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="overflow-hidden pl-10"
        >
          <p className="text-sm text-gray-500 leading-relaxed mb-3">
            {project.description.length > 130
              ? project.description.slice(0, 130) + "…"
              : project.description}
          </p>

          {project.techStack && project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="text-xs text-gray-400 bg-white/5 border border-white/8 px-2 py-0.5 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Active indicator bar */}
        <div className="pl-10">
          <motion.div
            animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="h-px origin-left bg-linear-to-r from-blue-500 via-purple-500 to-transparent"
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default FeaturedProjects;
