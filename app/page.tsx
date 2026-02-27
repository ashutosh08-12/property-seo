import Link from "next/link";
import Image from "next/image";
import { properties } from "@/lib/properties";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        Premium Properties Across India
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <Link
            key={property.slug}
            href={`/property/${property.slug}`}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <div className="relative w-full h-56">
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h2 className="text-lg font-semibold mb-2">
                {property.title}
              </h2>

              <p className="text-sm text-gray-600 line-clamp-2">
                {property.description}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-indigo-600">
                  ₹ {property.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">
                  {property.location}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}