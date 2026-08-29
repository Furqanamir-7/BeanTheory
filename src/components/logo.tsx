import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  invert?: boolean;
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("overflow-visible", className)}
      aria-hidden="true"
    >
      <ellipse
        cx="60"
        cy="60"
        rx="46"
        ry="18"
        stroke="currentColor"
        strokeWidth="1.4"
        className="origin-center opacity-70"
        transform="rotate(-28 60 60)"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="46"
        ry="18"
        stroke="currentColor"
        strokeWidth="1.4"
        className="origin-center opacity-70"
        transform="rotate(28 60 60)"
      />
      <circle cx="102" cy="48" r="2.4" fill="currentColor" />
      <circle cx="22" cy="74" r="2.4" fill="currentColor" />
      <path
        d="M60 32c16 0 28 12.4 28 28s-12 28-28 28-28-12.4-28-28 12-28 28-28Z"
        fill="currentColor"
      />
      <path
        d="M60 38.5c.8 6.5 1 13.4.2 20.4-.7 6.4-2.2 12.2-4.4 17.1 8.6-1.4 15.2-9.2 15.2-18 0-9.4-6.8-17.2-15.6-19.5.8-.1 2.4 0 4.6 0Z"
        fill="#1A120C"
        opacity="0.55"
      />
      <path
        d="M58.2 39c-1.4 7.2-1.6 14.8-.4 22.2 1 6.2 2.8 11.8 5.2 16.4-9.2-.2-16.6-8.2-16.6-18.1 0-8.6 5.6-16 13.6-18.4.6-.1 1.4-.2 2.2-.2Z"
        fill="#F6EFE4"
        opacity="0.22"
      />
    </svg>
  );
}

export function Logo({ className, markClassName, showWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-cream", className)}>
      <LogoMark className={cn("size-9", markClassName)} />
      {showWordmark ? (
        <span className="hidden font-serif text-[1.2rem] leading-none tracking-[0.22em] sm:inline">
          BEAN THEORY
        </span>
      ) : null}
    </span>
  );
}
