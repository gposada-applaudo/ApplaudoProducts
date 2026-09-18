import type { Metadata } from "next";
import localFont from "next/font/local";
import type { CSSProperties, ReactNode } from "react";
import { sitePath } from "@/lib/paths";
import "@/styles/globals.css";

const avenirNext = localFont({
  src: [
    {
      path: "../public/assets/fonts/AvenirNext-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/assets/fonts/AvenirNext-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["Avenir", "Helvetica Neue", "Arial"],
  variable: "--font-avenir-next",
});

export const metadata: Metadata = {
  title: "Applaudo — One partner, from idea to operation",
  description:
    "We build, deploy and operate digital products with AI in every layer. One company stays accountable across all of it.",
  icons: { icon: sitePath("/assets/brand/applaudo.svg") },
};

const assetStyles = {
  "--button-glass-dark": `url("${sitePath("/assets/effects/button-glass-dark.png")}")`,
  "--button-glass-light": `url("${sitePath("/assets/effects/button-glass-light.png")}")`,
} as CSSProperties;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={avenirNext.variable} style={assetStyles}>
      <body>{children}</body>
    </html>
  );
}
