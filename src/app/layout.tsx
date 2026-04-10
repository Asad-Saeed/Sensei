import type { Metadata } from "next";
import { Inter, DM_Serif_Text, Audiowide } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const dmSerifText = DM_Serif_Text({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});
const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
});

export const metadata: Metadata = {
  title: "Sensei - Next.js App",
  description: "A modern Next.js application with internationalization",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body
        className={`${inter.variable} ${inter.className} ${dmSerifText.variable} ${audiowide.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
