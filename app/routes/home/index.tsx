import Hero from "~/components/Hero";
import BioSection from "~/components/BioSection";
import BentoSection from "~/components/BentoSection";
import FeaturedProjects from "~/components/FeaturedProjects";
import LatestPosts from "~/components/LatestPosts";
import AboutCTA from "~/components/AboutCTA";
import type { Route } from "./+types/index";
import type { Project, PostMeta, StrapiResponse, StrapiProject, StrapiPostMeta } from "~/types";

export async function loader(): Promise<{
  featuredProjects: Project[];
  postMeta: PostMeta[];
}> {
  const [projectsRes, postsRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`),
    fetch(`${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc&pagination[limit]=3`),
  ]);

  if(!projectsRes.ok ) throw new Error('Failed to fetch projects or posts');

  const projectsJson: StrapiResponse<StrapiProject> = await projectsRes.json();
  const postJson: StrapiResponse<StrapiPostMeta> =  await postsRes.json();

  const postMeta = postJson.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    date: item.date,
    body: item.body,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : "/image/no-image.png" 
  }))

  const featuredProjects = projectsJson.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}` : '/images/no-image.png',
    url: item.url,
    date: item.date,
    category: item.category,
    featured: item.featured,
    keyFeatures: item.keyFeatures.split(', '),
    techStack: item.techStack.split(', '),
    challenges: item.challenges,
    learnings: item.learnings
  }))

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
      { featuredProjects.length > 1 && (<FeaturedProjects projects={featuredProjects} />)}
      <BentoSection />

      <LatestPosts posts={postMeta} />
      <AboutCTA />
    </>
  );
}
