"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { cartCount, cartTotal, useCafe } from "@/lib/store";
import { formatPkr } from "@/lib/format";
import { cn } from "@/lib/utils";

export function CartSheet() {
  const { cart, cartOpen, setCartOpen, setQty } = useCafe();
  const count = cartCount(cart);
  const total = cartTotal(cart);

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent
        side="right"
        className="w-full border-cream/10 bg-roast pb-[env(safe-area-inset-bottom)] text-cream sm:max-w-md"
      >
        <SheetHeader className="border-b border-cream/10">
          <SheetTitle className="font-serif text-2xl tracking-wide text-cream">Your order</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-6">
          {count === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag className="size-8 text-gold/70" />
              <p className="max-w-[16rem] text-sm leading-6 text-cream/60">
                Nothing in the bag yet. The Spanish latte is a reliable first move.
              </p>
              <Link
                href="/menu"
                onClick={() => setCartOpen(false)}
                className={cn(buttonVariants(), "bg-tan text-bean hover:bg-tan/90")}
              >
                Open the menu
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex flex-col gap-4 py-4">
                {cart.map((item) => (
                  <li key={`${item.id}-${item.note ?? ""}`} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      {item.note ? <p className="text-xs text-cream/45">{item.note}</p> : null}
                      <p className="mt-1 text-sm text-gold">{formatPkr(item.price * item.qty)}</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-cream/15 px-2 py-1">
                      <button type="button" onClick={() => setQty(item.id, item.qty - 1)} aria-label="Decrease">
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-4 text-center text-sm">{item.qty}</span>
                      <button type="button" onClick={() => setQty(item.id, item.qty + 1)} aria-label="Increase">
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-auto space-y-4 border-t border-cream/10 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-cream/60">Subtotal</span>
                  <span className="font-medium">{formatPkr(total)}</span>
                </div>
                <p className="text-xs leading-5 text-cream/40">
                  Pickup at the counter or dine in. Payment at the cafe. We will ping the kitchen on WhatsApp.
                </p>
                <Link
                  href="/order"
                  onClick={() => setCartOpen(false)}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 w-full bg-tan text-bean hover:bg-tan/90"
                  )}
                >
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
