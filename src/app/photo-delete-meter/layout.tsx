import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Kheench, Delete Kar 📸 — Selfie-to-Upload Failure Ratio",
  description: "237 photos taken, 4 filters, 0 uploads! Calculate your camera roll storage wastage and selfie deletion efficiency.",
  openGraph: {
    title: "Photo Kheench, Delete Kar 📸 | FullTimePass.in",
    description: "237 photos taken, 0 uploaded! Check your selfie rejection ratio now.",
    url: "https://fulltimepass.in/photo-delete-meter",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
