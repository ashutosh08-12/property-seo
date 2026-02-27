import { properties } from "@/lib/properties";

export default function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  return properties.map((property) => ({
    url: `${baseUrl}/property/${property.slug}`,
    lastModified: new Date(),
  }));
}