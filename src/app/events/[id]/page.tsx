import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { events, getEvent } from "@/lib/events";
import { formatDate } from "@/lib/format";
import { BookingForm } from "@/app/events/[id]/booking-form";

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = getEvent(id);
  return { title: event?.title ?? "Event" };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEvent(id);
  if (!event) notFound();

  return (
    <div className="pb-24 pt-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Link href="/events" className="text-xs uppercase tracking-[0.28em] text-gold">
            All events
          </Link>
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={event.image} alt={event.title} fill className="object-cover" />
          </div>
          <p className="mt-8 text-[0.7rem] uppercase tracking-[0.32em] text-gold">
            {formatDate(event.date)}
          </p>
          <h1 className="mt-3 font-serif text-5xl">{event.title}</h1>
          <p className="mt-3 text-lg text-cream/70">{event.subtitle}</p>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-cream/65">{event.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {event.perks.map((perk) => (
              <li
                key={perk}
                className="rounded-full border border-cream/15 px-3 py-1 text-xs text-cream/70"
              >
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <BookingForm event={event} />
      </div>
    </div>
  );
}
