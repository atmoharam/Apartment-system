import { ApartmentDetails } from "@/components/apartment-details"
import { BackToListings } from "@/components/back-to-listings"
import { getApartmentById } from "@/lib/api"

export default async function ApartmentPage({ params }: { params: { id: string } }) {
  const apartmentId = Number.parseInt(params.id)
  const apartment = await getApartmentById(apartmentId)

  if (!apartment) {
    return <div>Apartment not found</div>
  }

  return (
    <div>
      <BackToListings />
      <ApartmentDetails apartment={apartment} />
    </div>
  )
}
