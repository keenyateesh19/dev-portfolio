import { Link } from "react-router";
import { motion } from "framer-motion";
import type { PostMeta } from "~/types";

const BlogCard = ({ post }: { post: PostMeta }) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="h-full"
    >
      <Link to={`/blogs/${post.slug}`} className="group block h-full">
        <div className="relative glass rounded-2xl overflow-hidden h-full flex flex-col">
          {/* Hover glow — sits behind content */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-radial-[ellipse_80%_50%_at_50%_0%] from-blue-500/10 to-transparent" />

          {/* Top gradient bar */}
          <div className="h-0.5 w-full bg-linear-to-r from-blue-500/0 via-blue-400/60 to-purple-500/0 group-hover:via-blue-400 transition-colors duration-500" />

          {/* Content */}
          <div className="relative p-6 flex-1 flex flex-col gap-4">
            {/* Meta row */}
            <div className="flex items-center">
              <span className="text-xs font-mono text-blue-400/70 tracking-wide">
                {formattedDate}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors duration-200 leading-snug line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 flex-1">
              {post.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/8">
              <span className="text-xs text-zinc-600">
                #{post.slug.split("-")[0]}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                Read article
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  →
                </motion.span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
