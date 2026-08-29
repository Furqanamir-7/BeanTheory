import Image from "next/image";
import Link from "next/link";
import { events } from "@/lib/events";
import { formatDate, formatPkr } from "@/lib/format";
import { PageIntro } from "@/components/reveal";

export default function EventsPage() {
  return (
    <div className="pb-24">
      <PageIntro
        kicker="Tickets"
        title="Events"
        text="Workshops, vinyl nights, cuppings, open mics. Book a slot here. Management confirms every ticket before it is held — you will hear back on WhatsApp."
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-2">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="group overflow-hidden border border-cream/10 bg-[#14100c]"
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
                {formatDate(event.date)} · {event.slots.length} slot{event.slots.length > 1 ? "s" : ""}
              </p>
              <h2 className="mt-3 font-serif text-3xl">{event.title}</h2>
              <p className="mt-2 text-sm text-cream/60">{event.subtitle}</p>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-gold">{formatPkr(event.price)} / guest</span>
                <span className="uppercase tracking-[0.2em] text-cream/40">Book slot</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
