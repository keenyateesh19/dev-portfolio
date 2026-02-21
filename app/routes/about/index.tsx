import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router";
import ExperienceCard from "~/components/ExperienceCard";
import ProfileCard from "~/components/ProfileCard";
import type { Experience } from "~/types";
import type { Route } from "./+types";

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ experiences: Experience[] }> {
  const res = await fetch(import.meta.env.VITE_API_URL + "/experiences");
  if (!res.ok) {
    throw new Response("Failed to fetch experiences", { status: res.status });
  }
  const experiences = await res.json();
  return { experiences };
}

const AboutPage = ({ loaderData }: Route.ComponentProps) => {
  let navigate = useNavigate();
  const { experiences } = loaderData;

  return (
    <>
      <section className="mb-24 grid md:grid-cols-2 items-center justify-center mt-35 gap-8 md:gap-6">
        {/* Bio + Card */}
        <div>
          <span className="glass px-3 py-1 text-xs font-mono tracking-widest text-zinc-400 uppercase mb-4 inline-block">
            More about me
          </span>
          <h1 className="font-display mb-4">
            Adrenaline Fueled.{" "}
            <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Impact Driven.
            </span>
          </h1>
          <div className="text-zinc-400">
            <p className="mb-2">
              I live for the thrill of the unknown on treks, in ideas and in the
              things I build. As an explorer at heart and a builder by passion,
              I’m driven to create meaningful solutions that empower people at
              scale.
            </p>
            <p className="mb-2">
              Trekking has taught me resilience, adaptability, and the value of
              stepping outside comfort zones lessons that deeply influence how I
              approach building and problem-solving.
            </p>
            <p className="mb-4">
              I’m fueled by curiosity and a constant desire to learn,
              experiment, and push limits. I believe real growth happens when we
              challenge what exists today and that’s what keeps me chasing ideas
              that can make a lasting impact.
            </p>
          </div>
          <div className="flex gap-6 md:gap-8">
            <a href="https://github.com/keenyateesh19" target="_blank">
              <FaGithub className="size-8 hover:text-blue-400" />
            </a>
            <a href="https://www.linkedin.com/in/keen-yateesh/" target="_blank">
              <FaLinkedin className="size-8 hover:text-blue-400" />
            </a>
            <a href="https://x.com/keenyateesh" target="_blank">
              <FaTwitter className="size-8 hover:text-blue-400" />
            </a>
          </div>
        </div>
        <div className="">
          <ProfileCard
            className="w-full max-w-sm mx-auto"
            name="Yateesh S"
            title="Full Stack Developer"
            status="“Thrill-seeker. Builder. Problem-solver.”"
            contactText="Contact"
            avatarUrl="/profile.webp"
            showUserInfo={false}
            enableTilt={true}
            innerGradient="linear-gradient(145deg,transparent 0%, transparent 100%)"
          />
        </div>
      </section>
      {/* Experience */}
      <section className="my-16">
        <span className="glass px-3 py-1 text-xs font-mono tracking-widest text-zinc-400 uppercase mb-6 inline-block">
          Experience
        </span>
        <h3 className="font-display mb-6">
          Experiences that{" "}
          <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Shaped me
          </span>
        </h3>
        <div className="flex flex-col gap-4">
          {experiences.map((exp) => (
            <ExperienceCard key={`${exp.company}-${exp.startDate}`} {...exp} />
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutPage;
