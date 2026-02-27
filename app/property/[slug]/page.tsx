import { getPropertyBySlug, properties } from "@/lib/properties";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  return properties.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property Not Found",
      description: "This property listing could not be found.",
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const url = `${baseUrl}/property/${slug}`;

  return {
    title: property.title,
    description:
      property.description +
      " Explore pricing, location details, and premium features of this real estate listing.",

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: property.title,
      description: property.description,
      url,
      type: "website",
      siteName: "Real Estate Platform",
      images: [
        {
          url: property.image,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function PropertyPage(
  { params }: Props
) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) return notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: property.title,
    description: property.description,
    image: property.image,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressCountry: "IN",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: property.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
  <div className="min-h-screen bg-gray-100 py-4 px-6">
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-md overflow-hidden">
        <div className="px-8 pt-6">
          <Link
            href="/"
            className="text-indigo-600 font-medium hover:underline"
          >
            ← Back to Listings
          </Link>
        </div>
        <div className="relative w-full h-80 mt-4">
          <Image
            src={property.image}
            alt={property.title}
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="px-2 py-10">
          <h1 className="text-2xl font-bold mb-2">
            {property.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
            <span className="text-2xl font-bold text-indigo-600">
              ₹ {property.price.toLocaleString()}
            </span>

            <span className="text-gray-600 text-lg">
              📍 {property.location}
            </span>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            {property.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            <div className="bg-gray-50 border rounded-xl p-6 text-center">
              <p className="text-sm text-gray-500 mb-1">
                Property Type
              </p>
              <p className="font-semibold text-lg">
                Residential
              </p>
            </div>

            <div className="bg-gray-50 border rounded-xl p-6 text-center">
              <p className="text-sm text-gray-500 mb-1">
                Availability
              </p>
              <p className="font-semibold text-lg text-green-600">
                Available
              </p>
            </div>

            <div className="bg-gray-50 border rounded-xl p-6 text-center">
              <p className="text-sm text-gray-500 mb-1">
                Investment Grade
              </p>
              <p className="font-semibold text-lg">
                Premium
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  </div>
);
}