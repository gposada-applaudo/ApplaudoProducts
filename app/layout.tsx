import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Applaudo — One partner, from idea to operation",
  description:
    "We build, deploy and operate digital products with AI in every layer. One company stays accountable across all of it.",
  icons: { icon: "/assets/brand/applaudo.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
