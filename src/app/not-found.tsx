import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col items-center justify-center px-5 text-center">
      <p className="text-[0.7rem] uppercase tracking-[0.4em] text-gold">404</p>
      <h1 className="mt-4 font-serif text-5xl">This table is empty.</h1>
      <p className="mt-4 max-w-md text-sm text-cream/60">
        The page is gone, or it never existed. The coffee is still on.
      </p>
      <Link href="/" className="mt-8 text-sm uppercase tracking-[0.28em] text-gold">
        Back to Bean Theory
      </Link>
    </div>
  );
}
