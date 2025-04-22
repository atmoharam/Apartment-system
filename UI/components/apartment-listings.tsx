"use client"

import {useState, useEffect} from "react"
import type {Apartment, Benefit, City, Neighborhood} from "@/lib/types"
import {getAllApartments, getAllBenefits, getAllCities, getNeighborhoodsByCity} from "@/lib/api"
import {ApartmentCard} from "./apartment-card"
import {FilterPanel} from "./filter-panel"
import {AddApartmentModal} from "./add-apartment-modal"
import {Button} from "@/components/ui/button"
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"

export default function ApartmentListings() {
    const [apartments, setApartments] = useState<Apartment[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])
    const [benefits, setBenefits] = useState<Benefit[]>([])
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState("all")

    const [filters, setFilters] = useState({
        search: "",
        cityId: null as number | null,
        neighborhoodId: null as number | null,
        status: "" as string,
        minPrice: "" as string,
        maxPrice: "" as string,
        benefitIds: [] as number[],
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [citiesData, benefitsData] = await Promise.all([
                    getAllCities(),
                    getAllBenefits(),
                ])
                setCities(citiesData)
                setBenefits(benefitsData)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        if (filters.cityId) {
            const fetchNeighborhoods = async () => {
                try {
                    const neighborhoodsData = await getNeighborhoodsByCity(filters.cityId!)
                    setNeighborhoods(neighborhoodsData)
                } catch (error) {
                    console.error("Error fetching neighborhoods:", error)
                }
            }

            fetchNeighborhoods()
        } else {
            setNeighborhoods([])
        }
    }, [filters.cityId])

    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const apiFilters: Record<string, any> = {}

                if (filters.search) {
                    apiFilters.search = filters.search
                }
                if (filters.cityId) {
                    apiFilters.cityId = filters.cityId
                }
                if (filters.neighborhoodId) {
                    apiFilters.neighborhoodId = filters.neighborhoodId
                }
                if (filters.minPrice) {
                    apiFilters.minPrice = filters.minPrice
                }
                if (filters.maxPrice) {
                    apiFilters.maxPrice = filters.maxPrice
                }
                if (filters.benefitIds.length > 0) {
                    apiFilters.benefitIds = filters.benefitIds
                }
                if (activeTab !== 'all') {
                    apiFilters.status = activeTab
                }

                const apartmentsData = await getAllApartments(apiFilters)
                setApartments(apartmentsData)
            } catch (error) {
                console.error("Error fetching apartments:", error)
            }
        }

        fetchApartments()
    }, [filters, activeTab])

    const handleFilterChange = ( name: string, value: any ) => {
        setFilters(( prev ) => ({...prev, [name]: value}))
    }

    const handleBenefitToggle = ( benefitId: number ) => {
        setFilters(( prev ) => {
            const benefitIds = [...prev.benefitIds]
            const index = benefitIds.indexOf(benefitId)

            if (index === -1) {
                benefitIds.push(benefitId)
            } else {
                benefitIds.splice(index, 1)
            }

            return {...prev, benefitIds}
        })
    }

    const handleResetFilters = () => {
        setFilters({
            search: "",
            cityId: null,
            neighborhoodId: null,
            status: "",
            minPrice: "",
            maxPrice: "",
            benefitIds: [],
        })
    }

    const handleApartmentAdded = async ( newApartment: Apartment ) => {
        setApartments(( prev ) => [...prev, newApartment])
        setIsAddModalOpen(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Apartment Listings</h1>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <span className="mr-1">+</span> Add New Apartment
                </Button>
            </div>

            <FilterPanel
                filters={filters}
                cities={cities}
                neighborhoods={neighborhoods}
                benefits={benefits}
                onFilterChange={handleFilterChange}
                onBenefitToggle={handleBenefitToggle}
                onResetFilters={handleResetFilters}
            />

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="rent">For Rent</TabsTrigger>
                    <TabsTrigger value="sale">For Sale</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apartments.map(( apartment ) => (
                    <ApartmentCard key={apartment.id} apartment={apartment}/>
                ))}
                {apartments.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        No apartments found matching your criteria.
                    </div>
                )}
            </div>

            <AddApartmentModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onApartmentAdded={handleApartmentAdded}
                cities={cities}
                benefits={benefits}
            />
        </div>
    )
}