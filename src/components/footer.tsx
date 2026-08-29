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
    <footer className="border-t border-bean/12 bg-tan pb-[env(safe-area-inset-bottom)] text-bean">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-2">
        <div className="grid gap-10 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <LogoMark className="size-12 sm:size-14" />
              <span className="font-serif text-xl font-bold tracking-[0.16em] text-bean sm:text-2xl sm:tracking-[0.2em]">
                BEAN THEORY
              </span>
            </div>
            <p className="max-w-sm text-sm leading-7 text-bean/65">{cafe.description}</p>
          </div>
          <div>
            <p className="mb-4 text-[0.68rem] uppercase tracking-[0.3em] text-bean/70">Visit</p>
            <p className="text-sm leading-7 text-bean/75">
              {cafe.addressLine}
              <br />
              {cafe.area}
              <br />
              {cafe.hoursShort}
            </p>
          </div>
          <div>
            <p className="mb-4 text-[0.68rem] uppercase tracking-[0.3em] text-bean/70">Talk to us</p>
            <p className="text-sm leading-7 text-bean/75">
              <a className="hover:text-bean" href={`tel:${cafe.phoneTel}`}>
                {cafe.phoneDisplay}
              </a>
              <br />
              <a className="inline-flex items-center gap-2 hover:text-bean" href={cafe.instagram} target="_blank" rel="noreferrer">
                <InstagramIcon className="size-3.5" />
                {cafe.instagramHandle}
              </a>
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl ring-1 ring-bean/15">
          <iframe
            title="Bean Theory on Google Maps"
            src={cafe.mapsEmbed}
            className="h-56 w-full sm:h-72 lg:h-full lg:min-h-[20rem]"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
      <div className="border-t border-bean/12 px-5 py-6 text-center text-[0.7rem] uppercase tracking-[0.22em] text-bean/45 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <span>© {new Date().getFullYear()} Bean Theory, Lahore</span>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/manage" className="hover:text-bean/70">
              Management
            </Link>
            <Link href="/menu" className="hover:text-bean/70">
              Menu
            </Link>
            <Link href="/events" className="hover:text-bean/70">
              Tickets
            </Link>
            <a href={cafe.mapsUrl} className="hover:text-bean/70" target="_blank" rel="noreferrer">
              Maps
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
