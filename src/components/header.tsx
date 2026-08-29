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
    <header className="fixed inset-x-0 top-0 z-40 border-b border-cream/10 bg-[#100c09]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="shrink-0 text-cream" onClick={() => setOpen(false)}>
          <Logo className="gap-2.5" markClassName="size-11" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[0.72rem] uppercase tracking-[0.28em] transition-colors",
                pathname === link.href ? "text-gold" : "text-cream/65 hover:text-cream"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-cream hover:bg-cream/10"
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingBag className="size-4" />
            {count > 0 ? (
              <span className="absolute -top-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-gold text-[0.6rem] font-semibold text-[#1a120c]">
                {count}
              </span>
            ) : null}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-cream hover:bg-cream/10 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-cream/10 bg-[#100c09] px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-sm uppercase tracking-[0.28em]",
                  pathname === link.href ? "text-gold" : "text-cream/80"
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={cafe.instagram}
              className="text-sm uppercase tracking-[0.28em] text-cream/50"
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
