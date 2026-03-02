import { Link } from "react-router";
import { motion } from "framer-motion";
import type { Project } from "~/types";

const ProjectCard = ({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) => {
  const date = new Date(project.date).toISOString().split("T")[0];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="h-full"
    >
      <Link to={`/projects/${project.documentId}`} className="group block h-full">
        <div className="glass overflow-hidden h-full flex flex-col relative">
          {/* Image */}
          <div
            className={`relative overflow-hidden shrink-0 ${
              featured ? "h-72" : "h-44"
            }`}
          >
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-gray-900/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3
                className={`font-semibold text-white group-hover:text-blue-300 transition-colors leading-snug ${
                  featured ? "text-2xl" : "text-lg"
                }`}
              >
                {project.title}
              </h3>
              <span className="glass-transparent px-2.5 py-1 text-xs font-medium text-blue-300 shrink-0">
                {project.category}
              </span>
            </div>

            <p
              className={`text-gray-400 leading-relaxed flex-1 ${
                featured ? "text-sm line-clamp-3" : "text-xs line-clamp-2"
              }`}
            >
              {project.description}
            </p>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
              <span className="text-xs text-gray-500">{date}</span>
              <motion.span
                className="text-blue-400 text-xs font-medium flex items-center gap-1"
                whileHover={{ x: 3 }}
              >
                View →
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
