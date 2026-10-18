import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FullTimePass.in — India's Desi Timepass Hub 🔥",
    short_name: "FullTimePass",
    description: "20 Viral mini-tools, hilarious roast cards, treat roulette, and Indian satire quizzes.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0F19",
    theme_color: "#F59E0B",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
