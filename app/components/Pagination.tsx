import { motion } from "framer-motion";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (currentPage >= totalPages - 3)
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pages = getPages();

  return (
    <motion.div
      className="flex justify-center items-center gap-2 mt-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Prev */}
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.95 }}
        className="glass-transparent px-4 py-2 text-sm text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-white/10 transition-all flex items-center gap-1.5"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Prev
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {pages.map((page, i) =>
          page === "..." ? (
            <span
              key={`ellipsis-${i}`}
              className="text-gray-500 px-1 select-none"
            >
              ···
            </span>
          ) : (
            <motion.button
              key={page}
              onClick={() => onPageChange(page as number)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className={`relative w-9 h-9 text-sm font-medium rounded cursor-pointer transition-all ${
                currentPage === page
                  ? "text-white"
                  : "glass-transparent text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {currentPage === page && (
                <motion.span
                  layoutId="activePage"
                  className="absolute inset-0 bg-blue-500/30 outline outline-blue-400/50 rounded"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{page}</span>
            </motion.button>
          ),
        )}
      </div>

      {/* Next */}
      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.95 }}
        className="glass-transparent px-4 py-2 text-sm text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer hover:bg-white/10 transition-all flex items-center gap-1.5"
      >
        Next
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default Pagination;
