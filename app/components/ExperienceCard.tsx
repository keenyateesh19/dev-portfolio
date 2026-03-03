import ReactMarkdown from "react-markdown";
interface ExperienceCardProps {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

const ExperienceCard = ({
  role,
  company,
  location,
  startDate,
  endDate,
  description,
  technologies,
}: ExperienceCardProps) => {
  return (
    <div className="glass p-5 rounded flex flex-col gap-4 rise transition-all duration-300 cursor-pointer">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
        <div>
          <h5 className="text-white font-semibold leading-tight">{role}</h5>
          <p className="text-blue-400 font-medium text-sm m-0 max-w-none">
            {company}
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
          <span className="text-xs font-mono text-zinc-400 whitespace-nowrap">
            {startDate} — {endDate}
          </span>
          <span className="text-xs text-zinc-500 whitespace-nowrap">
            {location}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Description */}
      <div className="text-zinc-400 text-sm leading-relaxed m-0 md:max-w-[73%] px-3 [&_li]:list-disc [&_li]:mb-1.5">
        <ReactMarkdown>
          {description}
          
          </ReactMarkdown>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 text-xs font-mono rounded-full bg-white/5 border border-white/10 text-zinc-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ExperienceCard;
