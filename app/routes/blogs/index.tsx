import type { PostMeta } from "~/types";
import type { Route } from "./+types/index";
import { motion } from "framer-motion";
import BlogCard from "~/components/BlogCard";
import { containerVariants, itemVariants, EASE } from "~/lib/motion";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ postMeta: PostMeta[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/post-meta`);
  if (!res.ok) throw new Error("Failed to load blog posts...");
  const postMeta = await res.json();
  return { postMeta };
}

const BlogsPage = ({ loaderData }: Route.ComponentProps) => {
  const { postMeta } = loaderData;

  return (
    <>
      {/* ── Hero ── */}
      <div className="relative pt-20 md:pt-28 pb-10 md:pb-14 overflow-hidden">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Writing
          </motion.span>

          <motion.h1
            className="font-display leading-tight mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <span className="text-white">Notes from </span>
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              the build.
            </span>
          </motion.h1>

          <motion.p
            className="page-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            Thoughts on building digital experiences, solving problems, and
            learning along the way.
          </motion.p>

          {/* Divider */}
          <motion.div
            className="mt-10 h-px w-full bg-linear-to-r from-blue-500/40 via-purple-500/20 to-transparent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          />
        </div>
      </div>

      {/* ── Posts grid ── */}
      {postMeta.length === 0 ? (
        <p className="text-zinc-500 text-sm pb-20">
          No posts yet — check back soon.
        </p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {postMeta.map((post) => (
            <motion.div
              key={post.slug}
              variants={itemVariants}
              className="h-full"
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default BlogsPage;
