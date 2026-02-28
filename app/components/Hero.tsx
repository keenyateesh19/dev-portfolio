import LetterGlitch from "./LetterGlitch";
import Button from "~/components/ui/Button";
import { motion, useReducedMotion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import {
  EASE,
  fadeInUp,
  heroCTAContainerVariants,
  heroCTAItemVariants,
} from "~/lib/motion";

const pulseAnimation = {
  initial: { opacity: 0.25, scale: 1 },
  animate: { opacity: 1, scale: 1.5 },
  transition: {
    repeat: Infinity,
    duration: 1,
    repeatType: "mirror" as const,
  },
};

const textExpandAnimation = {
  initial: { width: 0 },
  animate: { width: "auto" },
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse" as const,
    repeatDelay: 1,
  },
};

const Hero = () => {
  const reducedMotion = useReducedMotion();

  return (
    <header className="h-svh max-w-full! px-0! mx-auto relative">
      <div className="absolute w-full h-svh z-0">
        {reducedMotion ? (
          <div className="w-full h-svh bg-gray-950" />
        ) : (
          <LetterGlitch
            glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
            glitchSpeed={20}
            centerVignette={true}
            characters="ಅಆಇಈಉಊಋಎಏಐಒಓಔಕಖಗಘಚಜಟಡತದನಪಬಮಯರಲವಶಸಹಳ೦೧೨೩೪೫೬೭೮೯ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$&*()-_+=/[]{};:<>.,"
          />
        )}
      </div>

      <div className="h-screen absolute z-1 left-0 right-0 flex flex-col justify-center items-center text-center gap-4">
        <motion.span
          className="glass px-4 flex justify-center items-center gap-3 font-thin text-sm"
          {...fadeInUp}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <motion.span
            className="block bg-green-500 h-2 w-2 rounded-full"
            {...(reducedMotion ? {} : pulseAnimation)}
          />
          <motion.span
            className="text-nowrap overflow-hidden"
            {...(reducedMotion ? {} : textExpandAnimation)}
          >
            Scanning for new challenges...
          </motion.span>
        </motion.span>

        <motion.h1
          className="font-display lg:max-w-[65%]"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          Helping founders turn ideas into seamless{" "}
          <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Digital Experiences
          </span>
        </motion.h1>

        <motion.p
          className="page-subtitle text-center"
          {...fadeInUp}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          Building meaningful things for the web. With a focus on performance
          and real-world impact.
        </motion.p>

        <motion.div
          className="grid grid-cols-2 gap-3 w-[min(100%,480px)] px-6 sm:px-0"
          variants={heroCTAContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={heroCTAItemVariants} className="col-span-2">
            <Button to="/projects" className="w-full py-3 text-base">
              View Projects
            </Button>
          </motion.span>
          <motion.span variants={heroCTAItemVariants}>
            <Button to="/about" variant="secondary" className="w-full">
              About Me
            </Button>
          </motion.span>
          <motion.span variants={heroCTAItemVariants}>
            <Button href="#cta" variant="secondary" className="w-full">
              Get In Touch
            </Button>
          </motion.span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 z-3 flex flex-col items-center gap-1 text-white/40"
        initial={{ opacity: 0, y: -4 }}
        animate={
          reducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: [0.3, 1, 0.3], y: [0, 6, 0] }
        }
        transition={
          reducedMotion
            ? { duration: 2 }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <span className="text-xs tracking-widest uppercase font-mono">
          scroll
        </span>
        <FaChevronDown className="text-lg" />
      </motion.div>

      {/* Bottom fade — dissolves into the page background */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 z-2 h-32 bg-linear-to-b from-transparent to-gray-950" />
    </header>
  );
};

export default Hero;
