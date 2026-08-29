import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { cafe } from "@/lib/cafe";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "BEAN THEORY — Specialty coffee in DHA Phase 6, Lahore",
    template: "%s — BEAN THEORY",
  },
  description: cafe.description,
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "BEAN THEORY, Lahore",
    description: cafe.tagline,
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Bean Theory — Beyond Just Coffee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BEAN THEORY, Lahore",
    description: cafe.tagline,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-espresso text-cream">
        <div className="grain" aria-hidden />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
