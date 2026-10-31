import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a Cricket Team | FullTimePass",
  description: "Pick your cricket squad, choose a captain, and save your teams on this device.",
  openGraph: {
    title: "Create Your Cricket Team 🏏 | FullTimePass.in",
    description: "Build a squad of up to 11 players and choose its captain.",
    url: "https://fulltimepass.in/create-team",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
