"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import type { CafeEvent } from "@/lib/events";
import { formatDate, formatPkr } from "@/lib/format";
import { useCafe } from "@/lib/store";
import { bookingMessage, waLink } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cafe } from "@/lib/cafe";

export function BookingForm({ event }: { event: CafeEvent }) {
  const { addBooking } = useCafe();
  const [slotId, setSlotId] = useState(event.slots[0]?.id ?? "");
  const [guests, setGuests] = useState(1);
  const slot = event.slots.find((row) => row.id === slotId) ?? event.slots[0];

  function onSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    const data = new FormData(formEvent.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const notes = String(data.get("notes") ?? "").trim();
    if (!name || !phone) {
      toast.error("Name and phone are required.");
      return;
    }
    const booking = addBooking({
      eventId: event.id,
      eventTitle: event.title,
      date: event.date,
      slotId: slot.id,
      slot: slot.time,
      name,
      phone,
      guests,
      notes: notes || undefined,
    });
    window.open(
      waLink(
        bookingMessage({
          id: booking.id,
          eventTitle: event.title,
          date: formatDate(event.date),
          slot: slot.time,
          name,
          phone,
          guests,
          notes,
        })
      ),
      "_blank",
      "noopener,noreferrer"
    );
    toast.success("Ticket request sent", {
      description: `Ref ${booking.id}. Pending confirmation from the floor.`,
    });
    formEvent.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} className="h-fit space-y-5 border border-cream/10 bg-roast p-6 sm:p-8">
      <h2 className="font-serif text-3xl">Book a slot</h2>
      <p className="text-sm text-gold">{formatPkr(event.price)} per guest</p>
      <div>
        <Label className="mb-2">Time</Label>
        <div className="grid gap-2">
          {event.slots.map((row) => (
            <button
              key={row.id}
              type="button"
              onClick={() => setSlotId(row.id)}
              className={
                slotId === row.id
                  ? "flex items-center justify-between rounded-lg border border-gold bg-gold/15 px-3 py-2 text-sm"
                  : "flex items-center justify-between rounded-lg border border-cream/15 px-3 py-2 text-sm text-cream/70"
              }
            >
              <span>{row.time}</span>
              <span className="text-xs text-cream/40">{row.capacity} seats</span>
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required className="h-10 border-cream/15 bg-transparent" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" required className="h-10 border-cream/15 bg-transparent" />
      </div>
      <div className="space-y-2">
        <Label>Guests</Label>
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setGuests((n) => Math.max(1, n - 1))}>
            −
          </button>
          <span>{guests}</span>
          <button type="button" onClick={() => setGuests((n) => Math.min(8, n + 1))}>
            +
          </button>
          <span className="text-sm text-cream/45">{formatPkr(event.price * guests)} total</span>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder="Allergies, performer name, celebration…"
          className="min-h-20 border-cream/15 bg-transparent"
        />
      </div>
      <Button type="submit" className="h-11 w-full bg-tan text-bean hover:bg-tan/90">
        Request ticket
      </Button>
      <p className="text-xs leading-5 text-cream/40">
        Status stays pending until the floor confirms. A WhatsApp message goes to {cafe.phoneDisplay}.
      </p>
    </form>
  );
}
