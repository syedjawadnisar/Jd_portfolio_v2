import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/lib/utils";

const VARIANTS = {
  primary:
    "bg-accent text-accent-foreground border-transparent hover:bg-accent-hover hover:shadow-glow",
  secondary:
    "bg-surface-raised text-foreground border-border hover:border-border-strong hover:bg-surface",
  ghost:
    "bg-transparent text-muted border-transparent hover:bg-surface hover:text-foreground",
} as const;

/**
 * Every size clears a 44px tap target. `sm` reads small through type and
 * padding rather than by shrinking the thing a thumb has to hit.
 */
const SIZES = {
  sm: "h-11 px-4 text-sm gap-1.5",
  md: "h-12 px-5 text-sm gap-2",
  lg: "h-14 px-7 text-base gap-2.5",
} as const;

type BaseProps = {
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  className?: string;
};

type AsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type AsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    /** Presence of `href` switches the element to a link. */
    href: string;
  };

export type ButtonProps = AsButton | AsLink;

const BASE =
  "inline-flex items-center justify-center rounded-lg border font-medium " +
  "transition-[background-color,border-color,box-shadow,transform] duration-200 " +
  "ease-out-expo select-none touch-manipulation " +
  "hover:-translate-y-px active:translate-y-0 motion-reduce:hover:translate-y-0 " +
  "disabled:pointer-events-none disabled:opacity-50";

function isExternal(href: string): boolean {
  return /^(https?:)?\/\//.test(href);
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    iconLeft,
    iconRight,
    fullWidth,
    className,
    ...rest
  } = props;

  const classes = cn(
    BASE,
    VARIANTS[variant],
    SIZES[size],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {iconLeft ? <span aria-hidden="true">{iconLeft}</span> : null}
      {children}
      {iconRight ? <span aria-hidden="true">{iconRight}</span> : null}
    </>
  );

  if (typeof props.href === "string") {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };

    if (isExternal(href)) {
      return (
        <a
          {...anchorRest}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={classes}
        >
          {content}
        </a>
      );
    }

    return (
      <Link {...anchorRest} href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button {...buttonRest} type={buttonRest.type ?? "button"} className={classes}>
      {content}
    </button>
  );
}
