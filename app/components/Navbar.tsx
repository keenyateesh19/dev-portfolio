import { useState, type JSX } from "react";
import {
  FaHome,
  FaProjectDiagram,
  FaPager,
  FaUser,
  FaEnvelope,
  FaBars,
} from "react-icons/fa";
import { NavLink } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import logoLink from "/YTlogo.webp";
import { FaBarsStaggered } from "react-icons/fa6";

const NavBar = () => {
  const base =
    "transition hover:text-blue-400 flex items-center gap-2 hover:glass-transparent p-2";
  const active =
    " glass-transparent p-2 border-b-3 border-b-white flex items-center gap-2";
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const pagePath: Record<string, string> = {
    Home: "/",
    Projects: "/projects",
    Blogs: "/blogs",
    About: "/about",
  };
  const linkIcons: Record<string, JSX.Element> = {
    Home: <FaHome />,
    Projects: <FaProjectDiagram />,
    Blogs: <FaPager />,
    About: <FaUser />,
    Contact: <FaEnvelope />,
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
            <span className="font-display">
              <img
                className="w-8 md:w-10"
                src={logoLink}
                alt="Yateesh.tech Logo"
              />
            </span>
          </NavLink>

          <div className="hidden md:flex items-center gap-6">
            <div className="space-x-6 text-sm text-gray-200 flex items-center">
              {Object.keys(pagePath).map((page) => (
                <NavLink
                  key={page}
                  className={({ isActive }) => (isActive ? active : base)}
                  to={pagePath[page as keyof typeof pagePath]}
                >
                  {linkIcons[page]}
                  {page}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="md:hidden grid place-items-center">
            <button
              className="text-xl cursor-pointer"
              title="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaBarsStaggered /> : <FaBars />}
            </button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden overflow-hidden"
            >
              <motion.div
                className="bg-white/5 border-t border-white/10 px-6 py-6 flex flex-col items-center gap-4 text-center"
                initial="start"
                animate="end"
                exit="start"
                variants={{
                  end: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
                  },
                  start: {
                    transition: { staggerChildren: 0.04, staggerDirection: -1 },
                  },
                }}
              >
                {Object.keys(pagePath).map((page) => (
                  <motion.span
                    key={page}
                    variants={{
                      start: { opacity: 0, x: 12 },
                      end: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <NavLink
                      className={({ isActive }) => (isActive ? active : base)}
                      to={pagePath[page as keyof typeof pagePath]}
                      onClick={closeMenu}
                    >
                      {linkIcons[page]}
                      {page}
                    </NavLink>
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

export default NavBar;
