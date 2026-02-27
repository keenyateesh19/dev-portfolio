import { Link } from "react-router";
import { motion } from "framer-motion";
import Button from "~/components/ui/Button";
import type { Project } from "~/types";
import ProjectCard from "./ProjectCard";
import Eyebrow from "~/components/ui/Eyebrow";
import {
  EASE,
  VIEW,
  containerVariants,
  itemVariants,
  viewFadeInUp,
} from "~/lib/motion";

const FeaturedProjects = ({ projects }: { projects: Project[] }) => {
  if (!projects.length) return null;

  const [primary, ...rest] = projects;

  return (
    <section className="relative py-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
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
          viewport={VIEW}
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

export default FeaturedProjects;
