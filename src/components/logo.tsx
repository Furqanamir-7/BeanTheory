import Image from "next/image";
import { cn } from "@/lib/utils";

type Variant = "framed" | "original" | "light" | "gold" | "dark";

const sources: Record<Variant, string> = {
  framed: "/logo-framed.jpg",
  original: "/logo-original.jpg",
  light: "/logo-light.png",
  gold: "/logo-gold.png",
  dark: "/logo.png",
};

type LogoMarkProps = {
  className?: string;
  variant?: Variant;
  priority?: boolean;
  sizes?: string;
};

export function LogoMark({
  className,
  variant = "framed",
  priority = false,
  sizes = "160px",
}: LogoMarkProps) {
  return (
    <span className={cn("relative inline-block size-9 shrink-0 overflow-hidden rounded-full", className)}>
      <Image
        src={sources[variant]}
        alt="Bean Theory"
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </span>
  );
}

export function Logo({
  className,
  markClassName,
  showWordmark = true,
  variant = "framed",
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  variant?: Variant;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-tan", className)}>
      <LogoMark className={cn("size-10 ring-1 ring-tan/30", markClassName)} variant={variant} />
      {showWordmark ? (
        <span className="hidden font-serif text-[1.2rem] leading-none tracking-[0.22em] sm:inline">
          BEAN THEORY
        </span>
      ) : null}
    </span>
  );
}
