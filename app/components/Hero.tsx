import { Link } from "react-router";
import LetterGlitch from "./LetterGlitch";

const Hero = () => {
  return (
    <header className="h-screen bg-amber-100 w-full relative">
      <div className="absolute w-full h-svh z-0">
        <LetterGlitch
          glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
          glitchSpeed={15}
          centerVignette={true}
          characters="ಅಆಇಈಉಊಋಎಏಐಒಓಔಕಖಗಘಚಜಟಡತದನಪಬಮಯರಲವಶಸಹಳ೦೧೨೩೪೫೬೭೮೯ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$&*()-_+=/[]{};:<>.,"
        />
      </div>
      <div className="h-screen absolute z-1 w-full flex flex-col justify-center items-center text-center px-6 gap-4">
        <h1 className="font-display lg:max-w-[65%]">
           Helping founder turn ideas into seamless <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Digital Experiences</span>
        </h1>
        <p>
          Building meaningful things for the web. <br />With a focus on performance
          and real-world impact.
        </p>
      </div>
    </header>
  );
};

export default Hero;
