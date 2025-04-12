"use client"

import Image from "next/image"
import { useState } from "react"
import type { Apartment, Publisher } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, SquareFoot, Share, Phone, Mail, MapPin, Check } from "@/components/icons"
import { SimilarProperties } from "./similar-properties"

interface ApartmentDetailsProps {
  apartment: Apartment & { publisher?: Publisher }
}

export function ApartmentDetails({ apartment }: ApartmentDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(apartment.photoUrls?.[0] || "")

  // Format price based on status (rent or sale)
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(apartment.price)

  const priceDisplay = apartment.status === "rent" ? `${formattedPrice}/mo` : formattedPrice

  return (
    <div className="mt-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{apartment.name}</h1>
          </div>

          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-4 w-4 mr-2" />
            <span>
              {apartment.streetName && `${apartment.streetName}, `}
              {apartment.neighborhoodName && `${apartment.neighborhoodName}, `}
              {apartment.cityName || ""}
            </span>
          </div>

          <div className="flex items-center text-gray-600 mb-6">
            <span className="mr-1">🏢</span>
            <span>Project: {apartment.ownerCompany}</span>
          </div>

          <div className="relative h-80 mb-4 rounded-lg overflow-hidden">
            <Badge
              className="absolute top-3 right-3 z-10"
              variant={apartment.status === "rent" ? "default" : "secondary"}
            >
              For {apartment.status === "rent" ? "Rent" : "Sale"}
            </Badge>
            <Image
              src={selectedImage || "/placeholder.svg?height=600&width=800"}
              alt={apartment.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {apartment.photoUrls?.map((url, index) => (
              <div
                key={index}
                className={`relative h-20 w-28 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${
                  selectedImage === url ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setSelectedImage(url)}
              >
                <Image
                  src={url || "/placeholder.svg"}
                  alt={`${apartment.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Bed className="h-6 w-6 mx-auto mb-2" />
                <div className="text-gray-500">Bedrooms</div>
                <div className="font-semibold text-lg">{apartment.roomsCount}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Bath className="h-6 w-6 mx-auto mb-2" />
                <div className="text-gray-500">Bathrooms</div>
                <div className="font-semibold text-lg">{apartment.bathroomsCount}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <SquareFoot className="h-6 w-6 mx-auto mb-2" />
                <div className="text-gray-500">Area</div>
                <div className="font-semibold text-lg">{apartment.size} m²</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">$</div>
                <div className="text-gray-500">Price</div>
                <div className="font-semibold text-lg">{priceDisplay}</div>
              </div>
            </div>
          </div>

          {apartment.benefitNames && apartment.benefitNames.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Amenities & Benefits</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {apartment.benefitNames.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{apartment.description || apartment.headerDescription}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="lg:w-80 space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <div className="text-2xl font-bold mb-4">{priceDisplay}</div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Contact Agent</h3>
              {apartment.publisher ? (
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    {apartment.publisher.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{apartment.publisher.name}</div>
                    <div className="text-sm text-gray-500">Property Agent</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                    A
                  </div>
                  <div>
                    <div className="font-medium">Agent</div>
                    <div className="text-sm text-gray-500">Property Agent</div>
                  </div>
                </div>
              )}

              <Button className="w-full mb-2" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                {apartment.publisher?.phoneNumber || "+1 (555) 123-4567"}
              </Button>

              <Button className="w-full" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                {apartment.publisher?.email || "realestate@build.com"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
