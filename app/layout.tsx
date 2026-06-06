import type { Metadata } from "next";
import {
  Fraunces,
  Hanken_Grotesk,
  JetBrains_Mono,
  Bricolage_Grotesque,
  Caveat,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Mohit Dewan — Personal AI projects + the playbook",
    template: "%s · Mohit Dewan",
  },
  description:
    "Personal site of Mohit Dewan — case studies of personal AI projects and a trail anyone can follow to start their own. For builders, PMs, and curious tinkerers.",
  metadataBase: new URL("https://build-ai-with-mohit.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} ${jetbrainsMono.variable} ${bricolage.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        {/* Add .animate to <html> before first paint when the user hasn't
            requested reduce-motion. The Reveal CSS is gated on this class so
            no-JS / reduce-motion visitors see content immediately. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('animate');}}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
