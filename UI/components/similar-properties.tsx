"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Apartment } from "@/lib/types"
import { getSimilarProperties } from "@/lib/api"

interface SimilarPropertiesProps {
  apartmentId: number
}

export function SimilarProperties({ apartmentId }: SimilarPropertiesProps) {
  const [properties, setProperties] = useState<Apartment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      try {
        setLoading(true)
        const data = await getSimilarProperties(apartmentId)
        setProperties(data)
      } catch (error) {
        console.error("Error fetching similar properties:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSimilarProperties()
  }, [apartmentId])

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="font-semibold mb-4">Similar Properties</h3>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (properties.length === 0) {
    return null
  }

  return (
    <div className="bg-white p-6 rounded-lg border">
      <h3 className="font-semibold mb-4">Similar Properties</h3>
      <div className="space-y-4">
        {properties.map((property) => {
          const formattedPrice = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(property.price)

          const priceDisplay = property.status === "rent" ? `${formattedPrice}/mo` : formattedPrice

          return (
            <Link key={property.id} href={`/apartments/${property.id}`} className="block group">
              <div className="flex space-x-3">
                <div className="relative h-20 w-24 flex-shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={property.photoUrls?.[0] || "/placeholder.svg?height=200&width=200"}
                    alt={property.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-1">
                    {property.name}
                  </h4>
                  <p className="text-sm text-gray-500 mb-1">{property.cityName}</p>
                  <p className="font-semibold text-sm">{priceDisplay}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
