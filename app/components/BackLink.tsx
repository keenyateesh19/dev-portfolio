import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { fadeInLeft } from "~/lib/motion";

interface BackLinkProps {
  to: string;
  label: string;
}

const BackLink = ({ to, label }: BackLinkProps) => (
  <motion.div {...fadeInLeft} transition={{ duration: 0.4 }}>
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-10 group"
    >
      <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
      {label}
    </Link>
  </motion.div>
);

export default BackLink;
