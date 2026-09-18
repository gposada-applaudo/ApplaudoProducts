import type { Metadata } from "next";
import Landing from "@/components/landing/Landing";

export const metadata: Metadata = {
  title: "Launch Landing | Applaudo",
  description: "Applaudo launch presentation.",
};

export default function LaunchLandingPage() {
  return <Landing homeHref="/launch-landing/" />;
}
