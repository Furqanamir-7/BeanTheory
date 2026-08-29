"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { PageIntro } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cartCount, cartTotal, useCafe } from "@/lib/store";
import { formatPkr } from "@/lib/format";
import { orderMessage, waLink } from "@/lib/whatsapp";
import { cafe } from "@/lib/cafe";

export default function OrderPage() {
  const { cart, setQty, placeOrder, setCartOpen } = useCafe();
  const [fulfillment, setFulfillment] = useState<"pickup" | "dine-in">("pickup");
  const [sending, setSending] = useState(false);
  const total = cartTotal(cart);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!cart.length) {
      toast.error("Your bag is empty.");
      return;
    }
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const table = String(data.get("table") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();
    if (!name || !phone) {
      toast.error("Name and phone are required.");
      return;
    }
    setSending(true);
    const order = placeOrder({
      name,
      phone,
      fulfillment,
      table: table || undefined,
      notes: notes || undefined,
    });
    const message = orderMessage({
      ...order,
    });
    window.open(waLink(message), "_blank", "noopener,noreferrer");
    toast.success("Order sent to WhatsApp", {
      description: `Ref ${order.id}. The bar will confirm from ${cafe.phoneDisplay}.`,
    });
    setSending(false);
    event.currentTarget.reset();
  }

  return (
    <div className="pb-24">
      <PageIntro
        kicker="From the site"
        title="Order"
        text="Build a bag from the menu, then send it to the cafe on WhatsApp. Pickup at the counter or dine in — payment when you arrive."
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="border border-bean/12 bg-cream p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-3xl">Bag</h2>
            <button
              type="button"
              className="text-xs uppercase tracking-[0.22em] text-bean/70"
              onClick={() => setCartOpen(true)}
            >
              {cartCount(cart)} items
            </button>
          </div>
          {cart.length === 0 ? (
            <p className="text-sm leading-7 text-bean/60">
              Nothing here yet.{" "}
              <Link href="/menu" className="text-bean underline-offset-4 hover:underline">
                Open the menu
              </Link>{" "}
              and add a drink.
            </p>
          ) : (
            <ul className="divide-y divide-bean/10">
              {cart.map((item) => (
                <li key={`${item.id}-${item.note ?? ""}`} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-bean/75">{formatPkr(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <button type="button" onClick={() => setQty(item.id, item.qty - 1)}>
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => setQty(item.id, item.qty + 1)}>
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex items-center justify-between border-t border-bean/10 pt-4">
            <span className="text-bean/60">Total</span>
            <span className="font-serif text-2xl text-bean">{formatPkr(total)}</span>
          </div>
        </section>

        <form onSubmit={onSubmit} className="space-y-5 border border-bean/12 bg-cream p-6 sm:p-8">
          <h2 className="font-serif text-3xl">Details</h2>
          <Field label="Name" name="name" required placeholder="Your name" />
          <Field label="Phone" name="phone" required placeholder="03xx or +92" />
          <div>
            <Label className="mb-2">Fulfilment</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["pickup", "dine-in"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFulfillment(option)}
                  className={
                    fulfillment === option
                      ? "rounded-lg border border-bean bg-bean/10 px-3 py-2 text-sm"
                      : "rounded-lg border border-bean/15 px-3 py-2 text-sm text-bean/70"
                  }
                >
                  {option === "pickup" ? "Pickup" : "Dine in"}
                </button>
              ))}
            </div>
          </div>
          {fulfillment === "dine-in" ? (
            <Field label="Table number (if seated)" name="table" placeholder="Optional" />
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Oat milk, extra shot, no sugar…"
              className="min-h-24 border-bean/15 bg-transparent"
            />
          </div>
          <Button
            type="submit"
            disabled={sending}
            className="h-11 w-full bg-bean text-tan hover:bg-bean/90"
          >
            Send order on WhatsApp
          </Button>
          <p className="text-xs leading-5 text-bean/45">
            This prototype opens WhatsApp to {cafe.phoneDisplay}. The kitchen confirms from there.
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className="h-10 border-bean/15 bg-transparent"
      />
    </div>
  );
}
