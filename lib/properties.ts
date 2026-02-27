export type Property = {
  slug: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
};

export const properties: Property[] = [
  {
    slug: "luxury-villa-goa",
    title: "Luxury Beachside Villa in Goa",
    description:
      "Premium 4BHK beachside villa with private pool, sea view terrace, and modern interiors.",
    price: 25000000,
    location: "Goa, India",
    image: "/villa.avif",
  },
  {
    slug: "modern-apartment-delhi",
    title: "Modern 3BHK Apartment in Delhi",
    description:
      "Spacious and well-ventilated apartment located in a prime residential area.",
    price: 12000000,
    location: "Delhi, India",
    image: "/apartment.avif",
  },
  {
    slug: "penthouse-mumbai",
    title: "Luxury Penthouse in Mumbai",
    description:
      "Ultra-modern penthouse with skyline views, rooftop lounge, and premium amenities.",
    price: 48000000,
    location: "Mumbai, India",
    image: "/villa.avif",
  },
  {
    slug: "hill-view-cottage-manali",
    title: "Hill View Cottage in Manali",
    description:
      "Cozy wooden cottage surrounded by mountains, perfect for peaceful living.",
    price: 8500000,
    location: "Manali, India",
    image: "/apartment.avif",
  },
  {
    slug: "tech-park-flat-bangalore",
    title: "2BHK Near Tech Park Bangalore",
    description:
      "Modern 2BHK apartment near IT hub with gym, parking, and 24x7 security.",
    price: 9500000,
    location: "Bangalore, India",
    image: "/villa.avif",
  },
];

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}