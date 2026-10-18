import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food Delivery Detective 🍕 — Fictional Delayed Food Mystery",
  description: "Order late by 45 mins? Track your delivery rider's mysterious tea stops, wrong turns, and wormhole detours.",
  openGraph: {
    title: "Food Delivery Detective 🍕 | FullTimePass.in",
    description: "Bhai khana nahi, ab delivery partner ki location par PhD kar raha hai! Investigate your order delay now.",
    url: "https://fulltimepass.in/food-delivery-detective",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
