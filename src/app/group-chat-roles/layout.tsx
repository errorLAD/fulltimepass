import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Group Chat Role Generator 😂 — WhatsApp Squad Cabinet",
  description: "Assign 4 to 8 friends hilarious titles like Plan Cancel CEO, Seen-Zone Minister, Group ATM, and Gossip CID.",
  openGraph: {
    title: "Group Chat Role Generator 😂 | FullTimePass.in",
    description: "Who is your group's Plan Cancel CEO? Generate your squad cabinet leaderboard now.",
    url: "https://fulltimepass.in/group-chat-roles",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
