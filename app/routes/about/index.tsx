import BioSection from "~/components/BioSection";
import ExperienceCard from "~/components/ExperienceCard";
import SkillsSection from "~/components/SkillsSection";
import AboutCTA from "~/components/AboutCTA";
import type { Experience, StrapiExperience, StrapiResponse } from "~/types";
import type { Route } from "./+types/index";
import Eyebrow from "~/components/ui/Eyebrow";
import { motion } from "framer-motion";
import {
  EASE,
  VIEW,
  viewFadeInUp,
  containerVariants,
  itemVariants,
} from "~/lib/motion";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ experiences: Experience[] }> {
  const res = await fetch(import.meta.env.VITE_API_URL + "/experiences");
  if (!res.ok) {
    throw new Response("Failed to fetch experiences", { status: res.status });
  }
  const json: StrapiResponse<StrapiExperience> = await res.json();
  const experiences = json.data.map((experience) => ({
    role: experience.role,
    company: experience.company,
    location: experience.location,
    startDate: experience.startDate,
    endDate: experience.endDate,
    description: experience.description,
    technologies: experience.technologies.split(', ')
  }))
  return { experiences };
}

const AboutPage = ({ loaderData }: Route.ComponentProps) => {
  const { experiences } = loaderData;

  return (
    <>
      <section className="relative pt-20 md:pt-28 pb-12 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <BioSection />
        </div>
      </section>
      {/* Experience */}
      <section id="experience" className="relative py-12 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-8"
            {...viewFadeInUp}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Eyebrow className="mb-4">Experience</Eyebrow>
            <h2 className="font-display">
              Experiences that{" "}
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Shaped me
              </span>
            </h2>
          </motion.div>
          <motion.div
            className="flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEW}
          >
            {experiences.map((exp) => (
              <motion.div
                key={`${exp.company}-${exp.startDate}`}
                variants={itemVariants}
              >
                <ExperienceCard {...exp} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Skills */}
      <SkillsSection />
      {/* CTA */}
      <AboutCTA />
    </>
  );
};

export default AboutPage;
