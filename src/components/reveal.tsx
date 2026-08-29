"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function PageIntro({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-24 pb-10 text-center sm:px-8 sm:pt-32 sm:pb-12">
      <Reveal>
        <p className="mb-4 text-[0.7rem] uppercase tracking-[0.42em] text-gold">{kicker}</p>
        <h1 className="font-serif text-5xl leading-none text-cream sm:text-6xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-cream/65 sm:text-base">{text}</p>
      </Reveal>
    </div>
  );
}
