import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Cricket Team Generator | FullTimePass",
  description: "Search a starter cricket player directory, add your own names, shuffle two teams of nine, pick both captains, and see the substitutes.",
  openGraph: {
    title: "Random Cricket Team Generator 🏏 | FullTimePass.in",
    description: "Make two random cricket teams and choose both captains.",
    url: "https://fulltimepass.in/create-team",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
