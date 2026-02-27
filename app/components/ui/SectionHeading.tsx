type AccentColor = "blue" | "purple" | "orange" | "green";

const accentMap: Record<AccentColor, string> = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  green: "bg-green-500",
};

interface SectionHeadingProps {
  children: React.ReactNode;
  color?: AccentColor;
}

const SectionHeading = ({ children, color = "blue" }: SectionHeadingProps) => (
  <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
    <span className={`w-1 h-5 ${accentMap[color]} rounded-full inline-block`} />
    {children}
  </h2>
);

export default SectionHeading;
