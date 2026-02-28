import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";
import type { PostMeta } from "~/types";

interface PostFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalResults: number;
  totalPosts: number;
}

const PostFilter = ({
  searchQuery,
  onSearchChange,
  totalResults,
  totalPosts,
}: PostFilterProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isFiltering = searchQuery.trim().length > 0;

  return (
    <div className="mb-8 flex flex-col gap-3">
      {/* Search input */}
      <div
        className="glass flex items-center gap-3 px-4 py-3 rounded focus-within:outline focus-within:outline-blue-500/50 transition-all"
        onClick={() => inputRef.current?.focus()}
      >
        <FaSearch className="text-zinc-500 shrink-0 text-sm" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search posts by title or excerpt…"
          className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
          aria-label="Search blog posts"
        />
        <AnimatePresence>
          {isFiltering && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              onClick={() => {
                onSearchChange("");
                inputRef.current?.focus();
              }}
              className="text-zinc-500 hover:text-white transition-colors shrink-0 cursor-pointer"
              aria-label="Clear search"
            >
              <FaTimes className="text-sm" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Result count */}
      <AnimatePresence>
        {isFiltering && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-zinc-500 font-mono px-1"
          >
            {totalResults === 0 ? (
              <span className="text-zinc-600">
                No posts matched &ldquo;{searchQuery}&rdquo;
              </span>
            ) : (
              <span>
                {totalResults} of {totalPosts} post
                {totalPosts !== 1 ? "s" : ""} matched
              </span>
            )}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostFilter;
