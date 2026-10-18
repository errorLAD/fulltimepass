import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reply Ka Bhikhari Meter ⏳ — Online Waiting & Seen-Zone Audit",
  description: "Calculate how desperately you are waiting for their reply while they remain online 24/7 on Instagram and WhatsApp.",
  openGraph: {
    title: "Reply Ka Bhikhari Meter ⏳ | FullTimePass.in",
    description: "7 ghante ho gaye, online status ki attendance 100%! Check your dignity score.",
    url: "https://fulltimepass.in/reply-ka-bhikhari",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
