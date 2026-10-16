import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fake Family WhatsApp Chat 🤣 — Desi Khandaan Simulator",
  description: "Generate funny fictional Indian family WhatsApp chats with custom names and classic desi family drama themes.",
  openGraph: {
    title: "Fake Family WhatsApp Chat 🤣 | FullTimePass.in",
    description: "Papaji's 6 AM suvichar meets Sharma Ji ke bete ki CTC! Generate your parody chat card.",
    url: "https://fulltimepass.in/family-whatsapp-chat",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
