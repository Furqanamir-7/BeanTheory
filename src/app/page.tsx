import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import { cafe, gallery } from "@/lib/cafe";
import { featuredItems } from "@/lib/menu";
import { events } from "@/lib/events";
import { formatDate, formatPkr } from "@/lib/format";
import { AddButton } from "@/components/add-button";
import { Reveal } from "@/components/reveal";
import { LogoMark } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const signatures = featuredItems().slice(0, 4);
  const nextEvents = events.slice(0, 3);

  return (
    <div>
      <section className="min-h-[100svh] pt-[4.25rem]">
        <div className="grid min-h-[calc(100svh-4.25rem)] lg:grid-cols-2">
          <div className="flex items-center justify-center bg-tan px-6 py-14 sm:px-12">
            <Reveal>
              <div className="relative mx-auto aspect-square w-[min(78vw,28rem)] overflow-hidden rounded-[1.75rem] shadow-[0_30px_70px_rgba(49,34,28,0.22)] ring-1 ring-bean/15">
                <Image
                  src="/logo-framed.jpg"
                  alt="Bean Theory — Beyond Just Coffee"
                  fill
                  priority
                  sizes="(max-width: 1024px) 78vw, 448px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="relative flex min-h-[58vh] items-end overflow-hidden lg:min-h-full">
            <Image
              src={gallery[0].src}
              alt={gallery[0].alt}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bean via-bean/75 to-bean/35" />
            <div className="relative z-10 w-full px-6 pb-12 pt-24 sm:px-12 sm:pb-16">
              <Reveal>
                <p className="mb-4 text-[0.72rem] uppercase tracking-[0.42em] text-tan">
                  DHA Phase 6 · Lahore
                </p>
                <h1 className="max-w-xl font-serif text-5xl leading-[0.92] text-cream sm:text-7xl">
                  Coffee, after dark.
                </h1>
                <p className="mt-6 max-w-md text-base leading-8 text-tan">
                  {cafe.tagline} Specialty espresso, late plates, and a room that stays open until 3 AM.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/order"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "h-12 bg-tan px-6 text-bean hover:bg-tan/90"
                    )}
                  >
                    Order from the bar
                  </Link>
                  <Link
                    href="/events"
                    className={cn(
                      buttonVariants({ size: "lg", variant: "outline" }),
                      "h-12 border-tan/40 px-6 text-cream hover:bg-tan/10"
                    )}
                  >
                    Book an event ticket
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-tan/15 bg-roast">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-6 sm:grid-cols-3 sm:px-8">
          <div className="flex items-start gap-3 text-sm text-cream/70">
            <MapPin className="mt-0.5 size-4 text-gold" />
            <span>
              {cafe.addressLine}
              <br />
              {cafe.area}
            </span>
          </div>
          <div className="flex items-start gap-3 text-sm text-cream/70">
            <Clock3 className="mt-0.5 size-4 text-gold" />
            <span>{cafe.hoursShort}</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-cream/70">
            <Phone className="mt-0.5 size-4 text-gold" />
            <a href={`tel:${cafe.phoneTel}`} className="hover:text-gold">
              {cafe.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.4em] text-gold">The theory</p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            A neighbourhood cafe with a late last call.
          </h2>
          <p className="mt-6 text-sm leading-8 text-cream/65 sm:text-base">
            Bean Theory sits on CCA 1 in DHA Phase 6 — espresso in the morning, laptops through the
            afternoon, vinyl and cold brew after dark. The room is small on purpose. The menu is not.
            Order from the site, book a ticket for what happens next, or just walk in.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <LogoMark className="size-16" variant="framed" />
            <p className="text-xs uppercase tracking-[0.28em] text-cream/45">
              Est. as a late-night coffee room
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image src={gallery[1].src} alt={gallery[1].alt} fill className="object-cover" />
          </div>
        </Reveal>
      </section>

      <section className="bg-roast py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-[0.7rem] uppercase tracking-[0.4em] text-gold">House pours</p>
                <h2 className="font-serif text-4xl sm:text-5xl">Start here.</h2>
              </div>
              <Link href="/menu" className="hidden items-center gap-1 text-sm text-gold sm:inline-flex">
                Full menu <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {signatures.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06}>
                <article className="flex h-full flex-col border border-tan/15 bg-espresso p-6">
                  <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold/80">
                    {item.tags?.[0] ?? "featured"}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl">{item.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-cream/55">{item.description}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-gold">{formatPkr(item.price)}</span>
                    <AddButton item={item} className="bg-tan text-bean hover:bg-tan/90" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Link href="/menu" className="mt-8 inline-flex items-center gap-1 text-sm text-gold sm:hidden">
            Full menu <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <Reveal>
          <div className="mb-12">
            <p className="mb-3 text-[0.7rem] uppercase tracking-[0.4em] text-gold">Tickets</p>
            <h2 className="font-serif text-4xl sm:text-5xl">What is happening in the room.</h2>
          </div>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {nextEvents.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.08}>
              <Link href={`/events/${event.id}`} className="group block overflow-hidden border border-cream/10">
                <div className="relative aspect-[16/10]">
                  <Image src={event.image} alt={event.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="bg-espresso p-6">
                  <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
                    {formatDate(event.date)}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl">{event.title}</h3>
                  <p className="mt-2 text-sm text-cream/55">{event.subtitle}</p>
                  <p className="mt-4 text-sm text-gold">{formatPkr(event.price)}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl border border-cream/10 lg:grid-cols-2">
          <div className="grid grid-cols-2">
            {gallery.slice(2, 6).map((shot) => (
              <div key={shot.src} className="relative aspect-square">
                <Image src={shot.src} alt={shot.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center bg-espresso p-8 sm:p-12">
            <p className="mb-3 text-[0.7rem] uppercase tracking-[0.4em] text-gold">Find us</p>
            <h2 className="font-serif text-4xl">CCA 1, Phase 6.</h2>
            <p className="mt-5 text-sm leading-7 text-cream/60">
              Walk in, order ahead, or hold a table. The map is exact. The hours are long.
            </p>
            <Link
              href="/visit"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 h-12 w-fit bg-tan px-6 text-bean hover:bg-tan/90"
              )}
            >
              Hours, map & tables
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
