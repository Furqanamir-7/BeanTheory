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
    const timer = window.setTimeout(() => setVisible(false), first ? 2400 : 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-tan"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <LogoMark className="size-40 ring-1 ring-bean/10 sm:size-48" variant="framed" priority sizes="192px" />
            </motion.div>
            <motion.p
              className="font-serif text-3xl tracking-[0.38em] text-bean sm:text-4xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.55 }}
            >
              BEAN THEORY
            </motion.p>
            <motion.p
              className="font-serif text-sm italic tracking-[0.08em] text-bean/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Beyond Just Coffee!!
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
