import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function LogoMark({
  className,
  priority = false,
  sizes = "160px",
}: LogoMarkProps) {
  return (
    <span className={cn("relative inline-block size-9 shrink-0 overflow-hidden rounded-full", className)}>
      <Image
        src="/logo.png"
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
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2 text-bean sm:gap-3", className)}>
      <LogoMark className={cn("size-9 ring-1 ring-bean/20 sm:size-10", markClassName)} />
      {showWordmark ? (
        <span className="whitespace-nowrap font-serif text-[0.92rem] leading-none tracking-[0.14em] sm:text-[1.2rem] sm:tracking-[0.22em]">
          BEAN THEORY
        </span>
      ) : null}
    </span>
  );
}
