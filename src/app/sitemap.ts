import { MetadataRoute } from "next";
import { TOOLS } from "@/lib/data/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fulltimepass.in";

  const staticPages = [
    "",
    "/about",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.6,
  }));

  const toolPages = TOOLS.map((tool) => ({
    url: `${baseUrl}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: tool.featured ? 0.9 : 0.8,
  }));

  return [...staticPages, ...toolPages];
}
