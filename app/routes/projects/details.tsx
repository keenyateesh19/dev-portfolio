import { FaArrowRight } from "react-icons/fa";
import type { Route } from "./+types/details";
import type { Project, StrapiProject, StrapiResponse } from "~/types";
import { motion } from "framer-motion";
import BackLink from "~/components/BackLink";
import SectionHeading from "~/components/ui/SectionHeading";
import { formatDate } from "~/lib/utils";
import { fadeInUp, fadeInRight, scaleIn } from "~/lib/motion";

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<Project> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects/?filters[slug][$eq]=${params.id}&populate=*`,
  );

  if (!res.ok) throw new Response("Project not found", { status: 404 });

  const json: StrapiResponse<StrapiProject> = await res.json();
  const item = json.data[0];

  const project = {
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
    keyFeatures: item.keyFeatures.split(", "),
    techStack: item.techStack.split(", "),
    challenges: item.challenges,
    learnings: item.learnings,
    slug: item.slug,
  };
  return project;
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const project = loaderData;
  const date = formatDate(project.date);

  return (
    <section className="page-section">
      <div className="max-w-5xl mx-auto relative z-10 pt-35 pb-10 md:pb-15">
        <BackLink to="/projects" label="Back to Projects" />

        {/* Hero Image */}
        <motion.div
          className="relative overflow-hidden rounded glass mb-10"
          {...fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full max-h-120 object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-950/70 via-transparent to-transparent" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-display text-white mb-8 leading-tight"
          {...fadeInUp}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {project.title}
        </motion.h1>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Main content — left 2 cols */}
          <div className="md:col-span-2 flex flex-col gap-8">
            {/* Description */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <SectionHeading>Overview</SectionHeading>
              <p className="text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </motion.div>

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.22, duration: 0.6 }}
              >
                <SectionHeading color="purple">Key Features</SectionHeading>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {project.keyFeatures.map((feature, i) => (
                    <motion.li
                      key={i}
                      className="glass-transparent px-4 py-2.5 text-sm text-gray-300 flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.06 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Challenges */}
            {project.challenges && (
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <SectionHeading color="orange">Challenges</SectionHeading>
                <div className="glass-transparent px-5 py-4 text-gray-300 text-sm leading-relaxed border-l-2 border-orange-500/40">
                  {project.challenges}
                </div>
              </motion.div>
            )}

            {/* Learnings */}
            {project.learnings && (
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.36, duration: 0.6 }}
              >
                <SectionHeading color="green">Learnings</SectionHeading>
                <div className="glass-transparent px-5 py-4 text-gray-300 text-sm leading-relaxed border-l-2 border-green-500/40">
                  {project.learnings}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar — right col */}
          <motion.div
            className="flex flex-col gap-5"
            {...fadeInRight}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            {/* Meta */}
            <div className="glass p-6 flex flex-col gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
                  Category
                </p>
                <span className="glass-transparent px-3 py-1 text-blue-300 font-medium text-xs">
                  {project.category}
                </span>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                  Published
                </p>
                <p className="text-gray-300">{date}</p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2 w-full"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  View Live Site
                  <FaArrowRight />
                </motion.a>
              </div>
            </div>

            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="glass p-6">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="glass-transparent px-3 py-1 text-xs text-gray-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsPage;
