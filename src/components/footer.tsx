import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { cafe } from "@/lib/cafe";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-cream/10 bg-[#0c0907] text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <LogoMark className="size-10 text-gold" />
            <span className="font-serif text-2xl tracking-[0.22em]">BEAN THEORY</span>
          </div>
          <p className="max-w-sm text-sm leading-7 text-cream/60">{cafe.description}</p>
        </div>
        <div>
          <p className="mb-4 text-[0.68rem] uppercase tracking-[0.3em] text-gold">Visit</p>
          <p className="text-sm leading-7 text-cream/70">
            {cafe.addressLine}
            <br />
            {cafe.area}
            <br />
            {cafe.hoursShort}
          </p>
        </div>
        <div>
          <p className="mb-4 text-[0.68rem] uppercase tracking-[0.3em] text-gold">Talk to us</p>
          <p className="text-sm leading-7 text-cream/70">
            <a className="hover:text-gold" href={`tel:${cafe.phoneTel}`}>
              {cafe.phoneDisplay}
            </a>
            <br />
            <a className="inline-flex items-center gap-2 hover:text-gold" href={cafe.instagram} target="_blank" rel="noreferrer">
              <InstagramIcon className="size-3.5" />
              {cafe.instagramHandle}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10 px-5 py-6 text-center text-[0.7rem] uppercase tracking-[0.22em] text-cream/40 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <span>© {new Date().getFullYear()} Bean Theory, Lahore</span>
          <div className="flex gap-6">
            <Link href="/manage" className="hover:text-cream/70">
              Management
            </Link>
            <Link href="/menu" className="hover:text-cream/70">
              Menu
            </Link>
            <Link href="/events" className="hover:text-cream/70">
              Tickets
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
