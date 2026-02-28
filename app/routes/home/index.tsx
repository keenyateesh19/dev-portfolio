import Hero from "~/components/Hero";
import BioSection from "~/components/BioSection";
import BentoSection from "~/components/BentoSection";
import FeaturedProjects from "~/components/FeaturedProjects";
import LatestPosts from "~/components/LatestPosts";
import AboutCTA from "~/components/AboutCTA";
import type { Route } from "./+types/index";
import type { Project, PostMeta } from "~/types";

export async function loader(): Promise<{
  featuredProjects: Project[];
  postMeta: PostMeta[];
}> {
  const [projectsRes, postsRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects?featured=true`),
    fetch(`${import.meta.env.VITE_API_URL}/post-meta`),
  ]);
  const featuredProjects: Project[] = await projectsRes.json();
  const postMeta: PostMeta[] = postsRes.ok ? await postsRes.json() : [];
  return { featuredProjects, postMeta };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { featuredProjects, postMeta } = loaderData;

  return (
    <>
      <Hero />
      <section className="relative py-12 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <BioSection
            ctaHref="/about#experience"
            ctaLabel="See my experience"
            headingAs="h2"
          />
        </div>
      </section>
      <FeaturedProjects projects={featuredProjects} />
      <BentoSection />

      <LatestPosts posts={postMeta} />
      <AboutCTA />
    </>
  );
}
