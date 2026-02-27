interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

/** Static eyebrow badge. For animated usage wrap in `motion.span className="eyebrow"`. */
const Eyebrow = ({ children, className = "" }: EyebrowProps) => (
  <span className={`eyebrow ${className}`}>{children}</span>
);

export default Eyebrow;
