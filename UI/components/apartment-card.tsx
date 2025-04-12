import Link from "next/link"
import Image from "next/image"
import type { Apartment } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, SquareFoot, MapPin } from "@/components/icons"

interface ApartmentCardProps {
  apartment: Apartment
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  // Format price based on status (rent or sale)
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(apartment.price)

  const priceDisplay = apartment.status === "rent" ? `${formattedPrice}/mo` : formattedPrice

  return (
    <Link href={`/apartments/${apartment.id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
        <div className="relative h-48">
          <Badge
            className="absolute top-2 right-2 z-10"
            variant={apartment.status === "rent" ? "default" : "secondary"}
          >
            For {apartment.status === "rent" ? "Rent" : "Sale"}
          </Badge>
          <Image
            src={apartment.photoUrls?.[0] || "/placeholder.svg?height=400&width=600"}
            alt={apartment.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{apartment.name}</h3>
            <span className="font-bold text-right">{priceDisplay}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            {apartment.neighborhoodName ? `${apartment.neighborhoodName}, ` : ""}
            {apartment.cityName || "Location"}
          </div>
          <div className="text-sm text-gray-600 mb-3">Project: {apartment.ownerCompany}</div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span className="text-sm">{apartment.roomsCount}</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span className="text-sm">{apartment.bathroomsCount}</span>
              </div>
            </div>
            <div className="flex items-center">
              <SquareFoot className="h-4 w-4 mr-1" />
              <span className="text-sm">{apartment.size} m²</span>
            </div>
          </div>
          {apartment.benefitNames && apartment.benefitNames.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {apartment.benefitNames.slice(0, 3).map((benefit, index) => (
                <span key={index} className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-600">
                  {benefit}
                </span>
              ))}
              {apartment.benefitNames.length > 3 && (
                <span className="inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-600">
                  +{apartment.benefitNames.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
