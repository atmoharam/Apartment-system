"use client"

import type React from "react"

import { useState } from "react"
import type { Apartment, Benefit, City, Neighborhood } from "@/lib/types"
import { createApartment, getNeighborhoodsByCity } from "@/lib/api"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AddApartmentModalProps {
  isOpen: boolean
  onClose: () => void
  onApartmentAdded: (apartment: Apartment) => void
  cities: City[]
  benefits: Benefit[]
}

export function AddApartmentModal({ isOpen, onClose, onApartmentAdded, cities, benefits }: AddApartmentModalProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photoUrls, setPhotoUrls] = useState<string[]>([])
  const [newPhotoUrl, setNewPhotoUrl] = useState("")

  const [apartmentData, setApartmentData] = useState({
    name: "",
    ownerCompany: "",
    status: "rent",
    type: "apartment",
    price: "",
    size: "",
    roomsCount: "",
    bathroomsCount: "",
    cityId: "",
    neighborhoodId: "",
    description: "",
    streetName: "",
    buildingNumber: "",
    zipCode: "",
    latitude: "",
    longitude: "",
    headerDescription: "",
    benefits: [] as number[],
  })

  const [publisherData, setPublisherData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  })

  const handleCityChange = async (cityId: string) => {
    setApartmentData((prev) => ({ ...prev, cityId, neighborhoodId: "" }))

    if (cityId) {
      try {
        const data = await getNeighborhoodsByCity(Number.parseInt(cityId))
        setNeighborhoods(data)
      } catch (error) {
        console.error("Error fetching neighborhoods:", error)
      }
    } else {
      setNeighborhoods([])
    }
  }

  const handleBenefitToggle = (benefitId: number) => {
    setApartmentData((prev) => {
      const benefits = [...prev.benefits]
      const index = benefits.indexOf(benefitId)

      if (index === -1) {
        benefits.push(benefitId)
      } else {
        benefits.splice(index, 1)
      }

      return { ...prev, benefits }
    })
  }

  const handleAddPhoto = () => {
    if (newPhotoUrl.trim()) {
      setPhotoUrls((prev) => [...prev, newPhotoUrl.trim()])
      setNewPhotoUrl("")
    }
  }

  const handleRemovePhoto = (index: number) => {
    setPhotoUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setApartmentData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePublisherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPublisherData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      // Validate required fields
      if (
          !apartmentData.name ||
          !apartmentData.ownerCompany ||
          !apartmentData.price ||
          !apartmentData.cityId ||
          !publisherData.name ||
          !publisherData.email
      ) {
        alert("Please fill in all required fields")
        return
      }

      const newApartment = await createApartment({
        apartment: {
          ...apartmentData,
          price: Number.parseFloat(apartmentData.price),
          size: Number.parseFloat(apartmentData.size),
          roomsCount: Number.parseInt(apartmentData.roomsCount),
          bathroomsCount: Number.parseInt(apartmentData.bathroomsCount),
          cityId: Number.parseInt(apartmentData.cityId),
          neighborhoodId: apartmentData.neighborhoodId ? Number.parseInt(apartmentData.neighborhoodId) : undefined,
          latitude: apartmentData.latitude ? Number.parseFloat(apartmentData.latitude) : null,
          longitude: apartmentData.longitude ? Number.parseFloat(apartmentData.longitude) : null,
          photoUrls,
        },
        publisher: publisherData,
      })

      onApartmentAdded(newApartment)

      // Reset form
      setApartmentData({
        name: "",
        ownerCompany: "",
        status: "rent",
        type: "apartment",
        price: "",
        size: "",
        roomsCount: "",
        bathroomsCount: "",
        cityId: "",
        neighborhoodId: "",
        description: "",
        streetName: "",
        buildingNumber: "",
        zipCode: "",
        latitude: "",
        longitude: "",
        headerDescription: "",
        benefits: [],
      })
      setPublisherData({
        name: "",
        email: "",
        phoneNumber: "",
      })
      setPhotoUrls([])
      setActiveTab("basic")
    } catch (error) {
      console.error("Error creating apartment:", error)
      alert("Failed to create apartment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Apartment</DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Apartment Name</Label>
                  <Input
                      id="name"
                      name="name"
                      placeholder="e.g. Luxury Downtown Apartment"
                      value={apartmentData.name}
                      onChange={handleInputChange}
                      required
                  />
                </div>

                <div>
                  <Label htmlFor="ownerCompany">Project</Label>
                  <Input
                      id="ownerCompany"
                      name="ownerCompany"
                      placeholder="e.g. City Towers"
                      value={apartmentData.ownerCompany}
                      onChange={handleInputChange}
                      required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Property Type</Label>
                  <Select
                      name="type"
                      value={apartmentData.type}
                      onValueChange={(value) => setApartmentData((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="chalet">Chalet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">For Rent/Sale</Label>
                  <Select
                      name="status"
                      value={apartmentData.status}
                      onValueChange={(value) => setApartmentData((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">For Rent</SelectItem>
                      <SelectItem value="sale">For Sale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="$"
                      value={apartmentData.price}
                      onChange={handleInputChange}
                      required
                  />
                </div>

                <div>
                  <Label htmlFor="size">Size (m²)</Label>
                  <Input
                      id="size"
                      name="size"
                      type="number"
                      placeholder="0"
                      value={apartmentData.size}
                      onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="roomsCount">Bedrooms</Label>
                  <Input
                      id="roomsCount"
                      name="roomsCount"
                      type="number"
                      placeholder="0"
                      value={apartmentData.roomsCount}
                      onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="bathroomsCount">Bathrooms</Label>
                  <Input
                      id="bathroomsCount"
                      name="bathroomsCount"
                      type="number"
                      placeholder="0"
                      value={apartmentData.bathroomsCount}
                      onChange={handleInputChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="headerDescription">Header Description</Label>
                  <Input
                      id="headerDescription"
                      name="headerDescription"
                      placeholder="Brief description of the property"
                      value={apartmentData.headerDescription}
                      onChange={handleInputChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                      id="description"
                      name="description"
                      placeholder="Detailed description of the property"
                      value={apartmentData.description}
                      onChange={handleInputChange}
                      className="h-32"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Publisher Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="publisherName">Name</Label>
                    <Input
                        id="publisherName"
                        name="name"
                        placeholder="Publisher name"
                        value={publisherData.name}
                        onChange={handlePublisherInputChange}
                        required
                    />
                  </div>

                  <div>
                    <Label htmlFor="publisherEmail">Email</Label>
                    <Input
                        id="publisherEmail"
                        name="email"
                        type="email"
                        placeholder="publisher@example.com"
                        value={publisherData.email}
                        onChange={handlePublisherInputChange}
                        required
                    />
                  </div>

                  <div>
                    <Label htmlFor="publisherPhone">Phone Number</Label>
                    <Input
                        id="publisherPhone"
                        name="phoneNumber"
                        placeholder="Phone number"
                        value={publisherData.phoneNumber}
                        onChange={handlePublisherInputChange}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="cityId">City</Label>
                  <Select value={apartmentData.cityId} onValueChange={handleCityChange}>
                    <SelectTrigger id="cityId">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                          <SelectItem key={city.id} value={city.id.toString()}>
                            {city.name}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="neighborhoodId">Neighborhood</Label>
                  <Select
                      value={apartmentData.neighborhoodId}
                      onValueChange={(value) => setApartmentData((prev) => ({ ...prev, neighborhoodId: value }))}
                      disabled={!apartmentData.cityId || neighborhoods.length === 0}
                  >
                    <SelectTrigger id="neighborhoodId">
                      <SelectValue placeholder="Select neighborhood" />
                    </SelectTrigger>
                    <SelectContent>
                      {neighborhoods.map((neighborhood) => (
                          <SelectItem key={neighborhood.id} value={neighborhood.id.toString()}>
                            {neighborhood.name}
                          </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="streetName">Street Name</Label>
                  <Input
                      id="streetName"
                      name="streetName"
                      placeholder="e.g. Main Street"
                      value={apartmentData.streetName}
                      onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="buildingNumber">Building Number</Label>
                  <Input
                      id="buildingNumber"
                      name="buildingNumber"
                      placeholder="e.g. 123"
                      value={apartmentData.buildingNumber}
                      onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                      id="zipCode"
                      name="zipCode"
                      placeholder="e.g. 12345"
                      value={apartmentData.zipCode}
                      onChange={handleInputChange}
                  />
                </div>

                <div className="md:col-span-2 grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                        id="latitude"
                        name="latitude"
                        type="number"
                        step="0.000001"
                        placeholder="e.g. 40.7128"
                        value={apartmentData.latitude}
                        onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                        id="longitude"
                        name="longitude"
                        type="number"
                        step="0.000001"
                        placeholder="e.g. -74.0060"
                        value={apartmentData.longitude}
                        onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="space-y-6">
              <h3 className="font-semibold mb-4">Amenities & Benefits</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {benefits.map((benefit) => (
                    <div key={benefit.id} className="flex items-center space-x-2">
                      <Checkbox
                          id={`benefit-${benefit.id}`}
                          checked={apartmentData.benefits.includes(benefit.id)}
                          onCheckedChange={() => handleBenefitToggle(benefit.id)}
                      />
                      <Label htmlFor={`benefit-${benefit.id}`} className="font-normal">
                        {benefit.name}
                      </Label>
                    </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="photos" className="space-y-6">
              <h3 className="font-semibold mb-4">Photos</h3>

              <div className="flex space-x-2">
                <Input
                    placeholder="Enter photo URL"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                />
                <Button type="button" onClick={handleAddPhoto}>
                  Add
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {photoUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="relative h-40 rounded-md overflow-hidden">
                        <Image src={url || "/placeholder.svg"} alt={`Photo ${index + 1}`} fill className="object-cover" />
                      </div>
                      <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemovePhoto(index)}
                      >
                        ✕
                      </Button>
                    </div>
                ))}

                {photoUrls.length === 0 && (
                    <div className="col-span-full text-center py-8 text-gray-500 border border-dashed rounded-md">
                      No photos added yet
                    </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Apartment"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
  )
}
