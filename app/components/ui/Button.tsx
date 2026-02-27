import { Link } from "react-router";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary";

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
};

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

interface AsLink extends BaseProps {
  to: string;
  href?: never;
  onClick?: never;
  disabled?: never;
  type?: never;
}

interface AsAnchor
  extends
    BaseProps,
    Omit<ComponentPropsWithoutRef<"a">, "className" | "children"> {
  href: string;
  to?: never;
  onClick?: never;
  disabled?: never;
  type?: never;
}

interface AsButton
  extends
    BaseProps,
    Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> {
  to?: never;
  href?: never;
}

type ButtonProps = AsLink | AsAnchor | AsButton;

export default function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [variantClass[variant], className].filter(Boolean).join(" ");

  if ("to" in rest && rest.to !== undefined) {
    return (
      <Link to={rest.to} className={classes}>
        {children}
      </Link>
    );
  }

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AsAnchor;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const { ...buttonRest } = rest as AsButton;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
