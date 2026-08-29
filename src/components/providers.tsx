"use client";

import { ThemeProvider } from "next-themes";
import { CafeProvider } from "@/lib/store";
import { LoadingScreen } from "@/components/loading-screen";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartSheet } from "@/components/cart-sheet";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
      <CafeProvider>
        <LoadingScreen />
        <Header />
        <CartSheet />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster theme="light" position="top-center" />
      </CafeProvider>
    </ThemeProvider>
  );
}
