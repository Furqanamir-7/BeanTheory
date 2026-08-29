"use client";

import { FormEvent } from "react";
import { Clock3, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { cafe } from "@/lib/cafe";
import { PageIntro } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCafe } from "@/lib/store";
import { reservationMessage, waLink } from "@/lib/whatsapp";

const times = ["10:00 AM", "12:00 PM", "2:00 PM", "5:00 PM", "7:00 PM", "9:00 PM", "11:00 PM"];

export default function VisitPage() {
  const { addReservation } = useCafe();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const date = String(data.get("date") ?? "").trim();
    const time = String(data.get("time") ?? "").trim();
    const guests = Number(data.get("guests") ?? 2);
    const notes = String(data.get("notes") ?? "").trim();
    if (!name || !phone || !date || !time) {
      toast.error("Please fill the table request.");
      return;
    }
    const reservation = addReservation({
      name,
      phone,
      date,
      time,
      guests,
      notes: notes || undefined,
    });
    window.open(
      waLink(
        reservationMessage({
          id: reservation.id,
          name,
          phone,
          date,
          time,
          guests,
          notes,
        })
      ),
      "_blank",
      "noopener,noreferrer"
    );
    toast.success("Table request sent", { description: `Ref ${reservation.id}` });
    event.currentTarget.reset();
  }

  return (
    <div className="pb-24">
      <PageIntro
        kicker="CCA 1"
        title="Visit"
        text="109, CCA 1, Sector C, DHA Phase 6. Open when the rest of the block has gone home. Hold a table if you are more than four, or just walk in."
      />

      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="overflow-hidden rounded-2xl border border-bean/12">
          <iframe
            title="Bean Theory on Google Maps"
            src={cafe.mapsEmbed}
            className="h-[320px] w-full sm:h-[480px]"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <div className="space-y-8 border border-bean/15 bg-bean p-6 text-tan sm:p-8">
          <div className="flex gap-3">
            <MapPin className="size-4 text-tan" />
            <p className="text-sm leading-7 text-tan/85">
              {cafe.addressLine}
              <br />
              {cafe.area}
              <br />
              <a href={cafe.mapsUrl} className="text-tan underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
                Open in Google Maps
              </a>
            </p>
          </div>
          <div className="flex gap-3">
            <Clock3 className="size-4 text-tan" />
            <ul className="space-y-2 text-sm text-tan/85">
              {cafe.hours.map((row) => (
                <li key={row.label}>
                  <span className="text-tan/55">{row.label}: </span>
                  {row.value}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-3">
            <Phone className="size-4 text-tan" />
            <a href={`tel:${cafe.phoneTel}`} className="text-sm hover:text-tan">
              {cafe.phoneDisplay}
            </a>
          </div>
          <div className="flex gap-3">
            <svg viewBox="0 0 24 24" fill="none" className="size-4 text-tan" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            <a href={cafe.instagram} className="text-sm hover:text-tan" target="_blank" rel="noreferrer">
              {cafe.instagramHandle}
            </a>
          </div>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="mx-auto mt-12 grid max-w-6xl gap-6 border border-bean/15 bg-bean p-6 text-tan sm:p-8 lg:grid-cols-2"
      >
        <div>
          <h2 className="font-serif text-4xl">Hold a table</h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-tan/70">
            Walk-ins are welcome. If you are coming as a group, send a request — the floor confirms
            on WhatsApp. This is a hold, not a lock, until they reply.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" required />
          <Field label="Phone" name="phone" required />
          <Field label="Date" name="date" type="date" required />
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <select
              id="time"
              name="time"
              required
              className="h-10 w-full rounded-lg border border-tan/25 bg-transparent px-2.5 text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Choose
              </option>
              {times.map((time) => (
                <option key={time} value={time} className="bg-bean">
                  {time}
                </option>
              ))}
            </select>
          </div>
          <Field label="Guests" name="guests" type="number" />
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" className="min-h-20 border-tan/25 bg-transparent" />
          </div>
          <Button type="submit" className="h-11 bg-tan text-bean hover:bg-tan/90 sm:col-span-2">
            Request a table
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        min={type === "number" ? 1 : undefined}
        defaultValue={type === "number" ? 2 : undefined}
        className="h-10 border-tan/25 bg-transparent"
      />
    </div>
  );
}
