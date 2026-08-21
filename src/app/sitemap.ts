import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://samuraybjj.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/historia`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/comunidad`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/credenciales-y-afiliaciones`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
