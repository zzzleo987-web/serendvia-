import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import LayoutShell from "@/components/layout/LayoutShell";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SERENDIVIA | Sri Lanka Tourism",
  description: "Exquisite journeys through the heart of the Indian Ocean.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logoo.png" />
        <link rel="apple-touch-icon" href="/logoo.png" />
      </head>
      <body className="font-sans antialiased text-white bg-[#050505]" suppressHydrationWarning>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>

  );
}
