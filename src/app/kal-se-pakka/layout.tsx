import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kal Se Pakka Generator 🛋️ — Official Procrastination Certificate",
  description: "Generate your official Day 847 Procrastination Certificate for gym, coding, UPSC, and waking up early.",
  openGraph: {
    title: "Kal Se Pakka Generator 🛋️ | FullTimePass.in",
    description: "Day 847: Kal se pakka. Kal ne bhi ab block kar diya! Get certified now.",
    url: "https://fulltimepass.in/kal-se-pakka",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
