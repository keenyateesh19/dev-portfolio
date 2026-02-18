import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { NavLink } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

const NavBar = () => {
  const base =
    "transition hover:text-blue-400 font-semibold px-1 text-[1.25rem]";
  const active =
    "text-blue-400 font-semibold px-1 text-[1.25rem] glass-transparent py-3 px-4";
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const pagePath: Record<string, string> = {
    Home: "/",
    Projects: "/projects",
    Blogs: "/blogs",
    About: "/about",
    Contact: "/contact",
  };
  const navContainer = {
    start: { opacity: 0, y: -10 },
    end: { opacity: 1, y: 0 },
  };

  const links = {
    start: { opacity: 0, x: 10 },
    end: { opacity: 1, x: 0 },
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4">
      <motion.div
        className="max-w-6xl mx-auto glass"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="px-6 py-4 flex justify-between items-center">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-lg font-bold text-blue-300"
            onClick={closeMenu}
          >
            <span className="font-display">YATEESH.TECH</span>
          </NavLink>

          <div className="hidden md:flex items-center gap-6">
            <div className="space-x-4 text-sm text-gray-200">
              {Object.keys(pagePath).map((page) => (
                <NavLink
                  className={({ isActive }) => (isActive ? active : base)}
                  to={pagePath[page as keyof typeof pagePath]}
                >
                  {page}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="md:hidden grid place-items-center">
            <button
              className="text-blue-400 text-xl cursor-pointer"
              title="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {menuOpen && (
            <motion.div
              className="md:hidden bg-white/5 border-t border-white/10 px-6 py-6 space-y-2 text-center flex flex-col items-center gap-4"
              variants={navContainer}
              initial="start"
              animate="end"
              exit="start"
              transition={{staggerChildren: 0.15, duration: 0.85}}
              
            >
              {Object.keys(pagePath).map((page) => (
                <motion.span variants={links}>
                  <NavLink
                    className={({ isActive }) => (isActive ? active : base)}
                    to={pagePath[page as keyof typeof pagePath]}
                    onClick={closeMenu}
                  >
                    {page}
                  </NavLink>
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

export default NavBar;
