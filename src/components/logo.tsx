import Image from "next/image";
import { cn } from "@/lib/utils";

type Variant = "light" | "gold" | "dark";

const sources: Record<Variant, string> = {
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
  variant = "light",
  priority = false,
  sizes = "160px",
}: LogoMarkProps) {
  return (
    <span className={cn("relative inline-block size-9 shrink-0", className)}>
      <Image
        src={sources[variant]}
        alt="Bean Theory"
        fill
        priority={priority}
        sizes={sizes}
        className="object-contain"
      />
    </span>
  );
}

export function Logo({
  className,
  markClassName,
  showWordmark = true,
  variant = "light",
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  variant?: Variant;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-cream", className)}>
      <LogoMark className={cn("size-10", markClassName)} variant={variant} />
      {showWordmark ? (
        <span className="hidden font-serif text-[1.2rem] leading-none tracking-[0.22em] sm:inline">
          BEAN THEORY
        </span>
      ) : null}
    </span>
  );
}
