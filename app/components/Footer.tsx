import { useState } from "react";
import { NavLink } from "react-router";
import {
  FaHome,
  FaProjectDiagram,
  FaPager,
  FaUser,
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import logoLink from "/YTlogo.webp";

const navLinks = [
  { label: "Home", to: "/", icon: <FaHome /> },
  { label: "Projects", to: "/projects", icon: <FaProjectDiagram /> },
  { label: "Blogs", to: "/blogs", icon: <FaPager /> },
  { label: "About", to: "/about", icon: <FaUser /> },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(text);
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return Promise.resolve();
  };

  const handleCopy = () => {
    copyToClipboard("reachme@yateesh.tech");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative p-0! border-t border-white/10 glass w-screen!">
      {/* Subtle top glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-400/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8">
          {/* Left — Logo + blurb + availability pill */}
          <div className="flex flex-col gap-5 max-w-xs">
            {/* Logo */}
            <NavLink to="/" className="w-fit">
              <img
                src={logoLink}
                alt="Yateesh.tech Logo"
                className="w-12 md:w-14 opacity-90 hover:opacity-100 transition-opacity"
              />
            </NavLink>

            {/* Caption */}
            <p className="text-gray-400 text-sm leading-relaxed max-w-70">
              I&apos;m <span className="text-white font-medium">Yateesh</span> —
              a full stack developer, freelancer and problem solver. Thanks for
              checking out my site.
            </p>

            {/* Available for work pill */}
            <div className="flex items-center gap-2.5 w-fit px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-medium">
              {/* Pulsating dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              Available for work
            </div>
          </div>

          {/* Right — Nav links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ label, to, icon }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 text-sm transition-colors ${
                        isActive
                          ? "text-blue-400"
                          : "text-gray-400 hover:text-white"
                      }`
                    }
                  >
                    <span className="text-xs opacity-70">{icon}</span>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Contact
            </h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group w-fit"
              title={copied ? "Copied!" : "Copy email"}
            >
              <span className="text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
              </span>
              <span className={copied ? "text-green-400" : ""}>
                reachme@yateesh.tech
              </span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>&copy; {year} Yateesh. All rights reserved.</span>
          <span className="text-gray-400">
            Built with React Router V7, Tailwind CSS, Motion &amp; Strapi
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
