import { Link } from "react-router";
import LetterGlitch from "./LetterGlitch";
import { motion } from "framer-motion";

const Hero = () => {
  const fadeInUp = { opacity: 0, y: 10 };
  const fadeInVisible = { opacity: 1, y: 0 };

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

  const buttonContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <header className="h-screen bg-amber-100 w-full relative">
      <div className="absolute w-full h-svh z-0">
        <LetterGlitch
          glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
          glitchSpeed={100}
          centerVignette={true}
          characters="ಅಆಇಈಉಊಋಎಏಐಒಓಔಕಖಗಘಚಜಟಡತದನಪಬಮಯರಲವಶಸಹಳ೦೧೨೩೪೫೬೭೮೯ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$&*()-_+=/[]{};:<>.,"
        />
      </div>

      <div className="h-screen absolute z-1 w-full flex flex-col justify-center items-center text-center px-6 gap-4">
        <motion.span
          className="glass px-4 flex justify-center items-center gap-3 font-thin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.span
            className="block bg-green-500 h-2 w-2 rounded-full"
            {...pulseAnimation}
          />
          <motion.span
            className="text-nowrap overflow-hidden"
            {...textExpandAnimation}
          >
            Scanning for new challenges...
          </motion.span>
        </motion.span>

        <motion.h1
          className="font-display lg:max-w-[65%]"
          initial={fadeInUp}
          animate={fadeInVisible}
          transition={{ type: "spring" }}
        >
          Helping founders turn ideas into seamless{" "}
          <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Digital Experiences
          </span>
        </motion.h1>

        <motion.p
          className="text-zinc-200"
          initial={fadeInUp}
          animate={fadeInVisible}
        >
          Building meaningful things for the web. <br />
          With a focus on performance and real-world impact.
        </motion.p>

        <motion.div
          className="flex gap-2 md:gap-4"
          variants={buttonContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={buttonVariants} whileHover={{ y: -5 }}>
            <Link to="/projects" className="btn-primary">
              View Projects
            </Link>
          </motion.span>
          <motion.span variants={buttonVariants} whileHover={{ y: -5 }}>
            <Link to="/contact" className="btn-secondary">
              Contact Me
            </Link>
          </motion.span>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;
