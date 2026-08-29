import { cafe } from "@/lib/cafe";
import type { CartItem } from "@/lib/store";

export function waLink(text: string) {
  return `https://wa.me/${cafe.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function orderMessage(input: {
  id: string;
  name: string;
  phone: string;
  fulfillment: "pickup" | "dine-in";
  table?: string;
  notes?: string;
  items: CartItem[];
  total: number;
}) {
  const lines = [
    `New order — ${cafe.name}`,
    `Ref: ${input.id}`,
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Type: ${input.fulfillment === "pickup" ? "Pickup" : "Dine-in"}${input.table ? ` (table ${input.table})` : ""}`,
    "",
    ...input.items.map(
      (item) =>
        `• ${item.qty} × ${item.name} — Rs ${item.price * item.qty}${item.note ? ` (${item.note})` : ""}`
    ),
    "",
    `Total: Rs ${input.total.toLocaleString("en-PK")}`,
  ];
  if (input.notes) lines.push(`Notes: ${input.notes}`);
  return lines.join("\n");
}

export function bookingMessage(input: {
  id: string;
  eventTitle: string;
  date: string;
  slot: string;
  name: string;
  phone: string;
  guests: number;
  notes?: string;
}) {
  const lines = [
    `Event booking — ${cafe.name}`,
    `Ref: ${input.id}`,
    `Event: ${input.eventTitle}`,
    `Date: ${input.date}`,
    `Slot: ${input.slot}`,
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Guests: ${input.guests}`,
    "Status: pending confirmation",
  ];
  if (input.notes) lines.push(`Notes: ${input.notes}`);
  return lines.join("\n");
}

export function reservationMessage(input: {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}) {
  const lines = [
    `Table request — ${cafe.name}`,
    `Ref: ${input.id}`,
    `Name: ${input.name}`,
    `Phone: ${input.phone}`,
    `Date: ${input.date}`,
    `Time: ${input.time}`,
    `Guests: ${input.guests}`,
  ];
  if (input.notes) lines.push(`Notes: ${input.notes}`);
  return lines.join("\n");
}
