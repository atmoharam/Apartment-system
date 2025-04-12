import { ApartmentDetails } from "@/components/apartment-details"
import { BackToListings } from "@/components/back-to-listings"
import { getApartmentById } from "@/lib/api"

export default async function ApartmentPage({ params }:
{ params: Promise<{ id: string }> }){
    const {id} = await params
    const apartmentId =await Number.parseInt(id)
    let  apartment = null;
    if(apartmentId){
        apartment = await getApartmentById(apartmentId)
    }

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
