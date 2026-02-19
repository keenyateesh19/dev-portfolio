import Hero from "~/components/Hero";
import FeaturedProjects from "~/components/FeaturedProjects";
import type { Route } from "./+types/index";
import type { Project } from "~/types";

export async function loader(): Promise<{ featuredProjects: Project[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects?featured=true`);
  const featuredProjects: Project[] = await res.json();
  return { featuredProjects };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { featuredProjects } = loaderData;

  return (
    <>
      <Hero />
      <FeaturedProjects projects={featuredProjects} />
    </>
  );
}
