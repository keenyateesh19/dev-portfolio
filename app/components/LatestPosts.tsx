import { Link } from "react-router";
import { motion } from "framer-motion";
import BlogCard from "~/components/BlogCard";
import Eyebrow from "~/components/ui/Eyebrow";
import {
  EASE,
  VIEW,
  containerVariants,
  itemVariants,
  viewFadeInUp,
} from "~/lib/motion";
import type { PostMeta } from "~/types";

const LatestPosts = ({ posts }: { posts: PostMeta[] }) => {
  const latest = posts.slice(0, 3);

  if (!latest.length) return null;

  return (
    <section className="relative py-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12"
          {...viewFadeInUp}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Eyebrow>From the blog</Eyebrow>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-display text-white">
              Latest{" "}
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Posts
              </span>
            </h2>
            <Link
              to="/blogs"
              className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 group shrink-0"
            >
              View all posts
              <motion.span
                className="inline-block"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEW}
        >
          {latest.map((post) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <BlogCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestPosts;
