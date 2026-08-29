"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
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

export function Header() {
  const pathname = usePathname();
  const { cart, setCartOpen } = useCafe();
  const [open, setOpen] = useState(false);
  const count = cartCount(cart);

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
                "text-[0.72rem] uppercase tracking-[0.28em] transition-colors",
                pathname === link.href ? "text-bean" : "text-bean/55 hover:text-bean"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-bean hover:bg-bean/8"
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingBag className="size-4" />
            {count > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-bean text-[0.6rem] font-semibold text-tan">
                {count}
              </span>
            ) : null}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-bean hover:bg-bean/8 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-bean/12 bg-tan px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-sm uppercase tracking-[0.28em]",
                  pathname === link.href ? "text-bean" : "text-bean/70"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={cafe.instagram}
              className="text-sm uppercase tracking-[0.28em] text-bean/45"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
