import Hero from "~/components/Hero";
import BioSection from "~/components/BioSection";
import BentoSection from "~/components/BentoSection";
import FeaturedProjects from "~/components/FeaturedProjects";
import SkillsSection from "~/components/SkillsSection";
import type { Route } from "./+types/index";
import type { Project } from "~/types";

export async function loader(): Promise<{ featuredProjects: Project[] }> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?featured=true`,
  );
  const featuredProjects: Project[] = await res.json();
  return { featuredProjects };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { featuredProjects } = loaderData;

  return (
    <>
      <Hero />
      <section className="py-12">
        <BioSection ctaHref="/about#experience" ctaLabel="See my experience" />
      </section>
      <FeaturedProjects projects={featuredProjects} />
      <BentoSection />
      <SkillsSection />
    </>
  );
}
