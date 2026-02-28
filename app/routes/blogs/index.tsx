import { useState } from "react";
import type { PostMeta } from "~/types";
import type { Route } from "./+types/index";
import { motion } from "framer-motion";
import BlogCard from "~/components/BlogCard";
import PostFilter from "~/components/PostFilter";
import { containerVariants, itemVariants, EASE, fadeInUp } from "~/lib/motion";
import Pagination from "~/components/Pagination";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = searchQuery.trim()
    ? postMeta.filter((post) => {
        const q = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q)
        );
      })
    : postMeta;

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const postPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postPerPage);
  const indexOfLast = currentPage * postPerPage;
  const indexOfFirst = indexOfLast - postPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="pb-20">
      {/* ── Hero ── */}
      <div className="relative pt-20 md:pt-28 pb-10 md:pb-14 overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <motion.span
            className="eyebrow"
            {...fadeInUp}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Writing
          </motion.span>

          <motion.h1
            className="font-display leading-tight mb-5"
            {...fadeInUp}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <span className="text-white">Notes from </span>
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              the build.
            </span>
          </motion.h1>

          <motion.p
            className="page-subtitle"
            {...fadeInUp}
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

      {/* ── Search + Posts grid ── */}
      <PostFilter
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        totalResults={filteredPosts.length}
        totalPosts={postMeta.length}
      />

      {currentPosts.length === 0 ? (
        <p className="text-zinc-500 text-sm pb-20">
          {searchQuery.trim()
            ? `No posts matched "${searchQuery}" — try a different term.`
            : "No posts yet — check back soon."}
        </p>
      ) : (
        <>
          <motion.div
            key={`${searchQuery}-${currentPage}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {currentPosts.map((post) => (
              <motion.div
                key={post.slug}
                variants={itemVariants}
                className="h-full"
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BlogsPage;
