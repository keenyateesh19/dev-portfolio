import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types/index";
import type { Project } from "~/types";
import { useState } from "react";
import Pagination from "~/components/Pagination";
import { AnimatePresence, motion } from "framer-motion";
import PageBackground from "~/components/PageBackground";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  const projects = await res.json();

  return { projects };
}

const projectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [categorySelect, setCategorySelect] = useState("All");
  const { projects } = loaderData as { projects: Project[] };
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];
  const filteredProjects =
    categorySelect === "All"
      ? projects
      : projects.filter((project) => project.category === categorySelect);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      <PageBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 pt-20 pb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-white mb-4 font-display">
            Curated{" "}
            <span className="bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            A collection of my work spanning web development, design, and
            creative experiments. Each project represents a unique challenge and
            solution.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`glass-transparent px-6 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                category === categorySelect
                  ? "bg-blue-500/30 text-white outline-blue-400/50"
                  : "text-gray-300 hover:bg-white/15"
              }`}
              onClick={() => {
                setCategorySelect(category);
                setCurrentPage(1);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={categorySelect + currentPage}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mx-6 grid gap-6 sm:grid-cols-2 lg:gap-12 lg:grid-cols-3 mb-12"
          >
            {currentProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants} layout>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {currentProjects.length === 0 && (
          <motion.div
            className="glass text-center py-16 px-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-gray-300 text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default projectsPage;
