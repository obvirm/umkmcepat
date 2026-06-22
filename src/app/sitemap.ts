import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://umkmcepat.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    // Future: Fetch public projects from Prisma here and map them to /projects/[id]
  ];
}
