import { useNavigate } from "react-router";
import BioSection from "~/components/BioSection";
import ExperienceCard from "~/components/ExperienceCard";
import SkillsSection from "~/components/SkillsSection";
import type { Experience } from "~/types";
import type { Route } from "./+types/index";
import Eyebrow from "~/components/ui/Eyebrow";

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ experiences: Experience[] }> {
  const res = await fetch(import.meta.env.VITE_API_URL + "/experiences");
  if (!res.ok) {
    throw new Response("Failed to fetch experiences", { status: res.status });
  }
  const experiences = await res.json();
  return { experiences };
}

const AboutPage = ({ loaderData }: Route.ComponentProps) => {
  let navigate = useNavigate();
  const { experiences } = loaderData;

  return (
    <>
      <section className="mt-35">
        <BioSection />
      </section>
      {/* Experience */}
      <section id="experience" className="my-16">
        <Eyebrow>Experience</Eyebrow>
        <h2 className="font-display mb-6">
          Experiences that{" "}
          <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Shaped me
          </span>
        </h2>
        <div className="flex flex-col gap-4">
          {experiences.map((exp) => (
            <ExperienceCard key={`${exp.company}-${exp.startDate}`} {...exp} />
          ))}
        </div>
      </section>
      {/* Skills */}
      <SkillsSection />
    </>
  );
};

export default AboutPage;
