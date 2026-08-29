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
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <Image
          src={gallery[0].src}
          alt={gallery[0].alt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-tan/82" />
        <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center px-4 pt-24 pb-10 text-center sm:max-w-xl sm:px-8 sm:pb-12">
          <Reveal className="flex w-full flex-col items-center">
            <div className="mb-5 w-28 overflow-hidden rounded-full shadow-[0_16px_40px_rgba(41,23,20,0.18)] ring-1 ring-bean/20 sm:mb-6 sm:w-36">
              <div className="relative aspect-square">
                <Image
                  src="/logo.png"
                  alt="Bean Theory — Beyond Just Coffee"
                  fill
                  priority
                  sizes="144px"
                  className="object-cover"
                />
              </div>
            </div>
            <p className="text-[0.65rem] uppercase tracking-[0.38em] text-bean/70 sm:text-[0.7rem]">
              DHA Phase 6 · Lahore
            </p>
            <h1 className="mt-2.5 font-serif text-4xl leading-[0.95] text-bean sm:text-6xl">
              Coffee, after dark.
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-bean/75 sm:text-[0.95rem] sm:leading-7">
              {cafe.tagline} Specialty espresso, late plates, and a room that stays open until 3 AM.
            </p>
            <div className="mt-6 flex w-full flex-col items-center justify-center gap-2.5 sm:w-auto sm:flex-row sm:gap-3">
              <Link
                href="/order"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 w-full bg-bean px-5 text-tan hover:bg-bean/90 sm:w-auto"
                )}
              >
                Order from the bar
              </Link>
              <Link
                href="/events"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-11 w-full border-bean/25 px-5 text-bean hover:bg-bean/8 sm:w-auto"
                )}
              >
                Book an event ticket
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-bean/12 bg-cream">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-6 sm:grid-cols-3 sm:px-8">
          <div className="flex items-start gap-3 text-sm text-bean/75">
            <MapPin className="mt-0.5 size-4 text-bean" />
            <span>
              {cafe.addressLine}
              <br />
              {cafe.area}
            </span>
          </div>
          <div className="flex items-start gap-3 text-sm text-bean/75">
            <Clock3 className="mt-0.5 size-4 text-bean" />
            <span>{cafe.hoursShort}</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-bean/75">
            <Phone className="mt-0.5 size-4 text-bean" />
            <a href={`tel:${cafe.phoneTel}`} className="hover:text-bean">
              {cafe.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="mb-4 text-[0.7rem] uppercase tracking-[0.4em] text-bean/60">The theory</p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            A neighbourhood cafe with a late last call.
          </h2>
          <p className="mt-6 text-sm leading-8 text-bean/70 sm:text-base">
            Bean Theory sits on CCA 1 in DHA Phase 6 — espresso in the morning, laptops through the
            afternoon, vinyl and cold brew after dark. The room is small on purpose. The menu is not.
            Order from the site, book a ticket for what happens next, or just walk in.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <LogoMark className="size-16" />
            <p className="text-xs uppercase tracking-[0.28em] text-bean/50">
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

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="mb-12 flex items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-[0.7rem] uppercase tracking-[0.4em] text-bean/60">House pours</p>
                <h2 className="font-serif text-4xl sm:text-5xl">Start here.</h2>
              </div>
              <Link href="/menu" className="hidden items-center gap-1 text-sm text-bean sm:inline-flex">
                Full menu <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {signatures.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06}>
                <article className="flex h-full flex-col border border-bean/12 bg-tan p-6">
                  <p className="text-[0.65rem] uppercase tracking-[0.28em] text-bean/60">
                    {item.tags?.[0] ?? "featured"}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl">{item.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-bean/65">{item.description}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-bean">{formatPkr(item.price)}</span>
                    <AddButton item={item} className="bg-bean text-tan hover:bg-bean/90" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Link href="/menu" className="mt-8 inline-flex items-center gap-1 text-sm text-bean sm:hidden">
            Full menu <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <Reveal>
          <div className="mb-12">
            <p className="mb-3 text-[0.7rem] uppercase tracking-[0.4em] text-bean/60">Tickets</p>
            <h2 className="font-serif text-4xl sm:text-5xl">What is happening in the room.</h2>
          </div>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {nextEvents.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.08}>
              <Link href={`/events/${event.id}`} className="group block overflow-hidden border border-bean/12">
                <div className="relative aspect-[16/10]">
                  <Image src={event.image} alt={event.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="bg-cream p-6">
                  <p className="text-[0.65rem] uppercase tracking-[0.28em] text-bean/60">
                    {formatDate(event.date)}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl">{event.title}</h3>
                  <p className="mt-2 text-sm text-bean/60">{event.subtitle}</p>
                  <p className="mt-4 text-sm text-bean">{formatPkr(event.price)}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl border border-bean/12 lg:grid-cols-2">
          <div className="grid grid-cols-2">
            {gallery.slice(2, 6).map((shot) => (
              <div key={shot.src} className="relative aspect-square">
                <Image src={shot.src} alt={shot.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center bg-cream p-8 sm:p-12">
            <p className="mb-3 text-[0.7rem] uppercase tracking-[0.4em] text-bean/60">Find us</p>
            <h2 className="font-serif text-4xl">CCA 1, Phase 6.</h2>
            <p className="mt-5 text-sm leading-7 text-bean/65">
              Walk in, order ahead, or hold a table. The map is exact. The hours are long.
            </p>
            <Link
              href="/visit"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 h-12 w-fit bg-bean px-6 text-tan hover:bg-bean/90"
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
