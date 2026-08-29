"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "@/components/logo";

export function LoadingScreen() {
  const pathname = usePathname();
  return <BrandLoader key={pathname} />;
}

function BrandLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const first = !sessionStorage.getItem("bt-booted");
    sessionStorage.setItem("bt-booted", "1");
    const timer = window.setTimeout(() => setVisible(false), first ? 2200 : 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#100c09]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex flex-col items-center gap-7">
            <motion.div
              className="relative text-gold"
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="absolute inset-[-18%] rounded-full border border-gold/25"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[-8%] rounded-full border border-cream/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
              />
              <LogoMark className="relative size-28" />
            </motion.div>
            <motion.p
              className="font-serif text-3xl tracking-[0.38em] text-cream sm:text-4xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              BEAN THEORY
            </motion.p>
            <motion.span
              className="h-px w-24 origin-center bg-gold"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            />
            <motion.p
              className="text-[0.68rem] uppercase tracking-[0.42em] text-cream/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Lahore
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
