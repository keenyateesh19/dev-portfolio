import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaLaptopCode, FaBars } from "react-icons/fa6";
import { NavLink } from "react-router";

const NavBar = () => {
  const base = "transition hover:text-blue-400";
  const active = "text-blue-400 font-semibold";
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-blue-300"
          onClick={closeMenu}
        >
          <FaLaptopCode className="text-blue-400 text-xl" />
          <span>YATEESH.TECH</span>
        </NavLink>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="space-x-4 text-sm text-gray-300">
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/projects"
            >
              Projects
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/blogs"
            >
              Blogs
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/contact"
            >
              Contact
            </NavLink>
          </div>
        </div>
        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-4">
          <button
            className="text-blue-400 text-xl cursor-pointer"
            title="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
      </div>
      {menuOpen && (
            <div className="bg-gray-800 border-gray-700 px-6 py-4 space-y-2 space-x-4 text-center">
              <NavLink
                className={({ isActive }) => (isActive ? active : base)}
                to="/"
                onClick={closeMenu}
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? active : base)}
                to="/projects"
                onClick={closeMenu}
              >
                Projects
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? active : base)}
                to="/blogs"
                onClick={closeMenu}
              >
                Blogs
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? active : base)}
                to="/about"
                onClick={closeMenu}
              >
                About
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? active : base)}
                to="/contact"
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </div>
          )}
    </nav>
  );
};

export default NavBar;
