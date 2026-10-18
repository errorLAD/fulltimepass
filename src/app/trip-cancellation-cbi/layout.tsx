import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trip Cancellation CBI 🕵️‍♂️ — Fictional Plan Sabotage Inquiry",
  description: "Who murdered your squad's trip plan? Enter your friends' names and destination to generate a satirical CBI investigation chargesheet.",
  openGraph: {
    title: "Trip Cancellation CBI 🕵️‍♂️ | FullTimePass.in",
    description: "Kaun hai tumhare group ka Last-Minute Saanp? CBI investigation open now.",
    url: "https://fulltimepass.in/trip-cancellation-cbi",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
