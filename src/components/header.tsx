"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Logo } from "@/components/logo";
import { cafe } from "@/lib/cafe";
import { cartCount, useCafe } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order" },
  { href: "/events", label: "Events" },
  { href: "/visit", label: "Visit" },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block size-5" aria-hidden>
      <span
        className={cn(
          "absolute top-[5px] left-[2px] h-[1.75px] w-4 origin-center bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open && "translate-y-[7px] rotate-45"
        )}
      />
      <span
        className={cn(
          "absolute top-[9.5px] left-[2px] h-[1.75px] w-4 bg-current transition-all duration-200 ease-out",
          open && "scale-x-0 opacity-0"
        )}
      />
      <span
        className={cn(
          "absolute top-[14px] left-[2px] h-[1.75px] w-4 origin-center bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open && "-translate-y-[7px] -rotate-45"
        )}
      />
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const { cart, setCartOpen } = useCafe();
  const [open, setOpen] = useState(false);
  const count = cartCount(cart);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-bean/12 bg-tan/92 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:h-[4.25rem] sm:px-8">
        <Link href="/" className="min-w-0 shrink text-bean" onClick={() => setOpen(false)}>
          <Logo className="gap-2" markClassName="size-9 sm:size-11" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[0.74rem] font-bold uppercase tracking-[0.22em] transition-colors",
                pathname === link.href ? "text-bean" : "text-bean/60 hover:text-bean"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-2">
          <Button
            variant="ghost"
            className="relative h-9 gap-1.5 px-2 font-bold text-bean hover:bg-bean/10 sm:px-3"
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingBag className="size-4" />
            <span className="text-[0.68rem] uppercase tracking-[0.2em] sm:text-[0.72rem]">Cart</span>
            {count > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-bean text-[0.6rem] font-semibold text-tan">
                {count}
              </span>
            ) : null}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-bean hover:bg-bean/10 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <HamburgerIcon open={open} />
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-bean/12 bg-tan md:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-5">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ delay: 0.04 * i, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-2 text-sm font-bold uppercase tracking-[0.22em]",
                      pathname === link.href ? "text-bean" : "text-bean/70"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href={cafe.instagram}
                className="py-2 text-sm font-bold uppercase tracking-[0.22em] text-bean/45"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.22, duration: 0.28 }}
              >
                Instagram
              </motion.a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
