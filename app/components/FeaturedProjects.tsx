import { Link } from "react-router";
import { motion } from "framer-motion";
import type { Project } from "~/types";
import ProjectCard from "./ProjectCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 90, damping: 15 },
  },
};

const FeaturedProjects = ({ projects }: { projects: Project[] }) => {
  if (!projects.length) return null;

  const [primary, ...rest] = projects;

  return (
    <section className="relative py-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="glass px-3 py-1 text-xs font-mono tracking-widest text-zinc-400 uppercase mb-4 inline-block">
            Selected work
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-display text-white">
              Featured{" "}
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <Link
              to="/projects"
              className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 group shrink-0"
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

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Primary featured card — spans 2 cols on large screens */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <ProjectCard project={primary} featured />
          </motion.div>

          {/* Remaining featured cards */}
          <div className="flex flex-col gap-6">
            {rest.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="flex-1"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/projects" className="btn-primary inline-flex">
            Explore all projects →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
