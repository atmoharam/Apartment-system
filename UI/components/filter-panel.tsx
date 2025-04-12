"use client"
import type { Benefit, City, Neighborhood } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Filter, X } from "@/components/icons"

interface FilterPanelProps {
  filters: {
    search: string
    cityId: number | null
    neighborhoodId: number | null
    status: string
    minPrice: string
    maxPrice: string
    benefitIds: number[]
  }
  cities: City[]
  neighborhoods: Neighborhood[]
  benefits: Benefit[]
  onFilterChange: (name: string, value: any) => void
  onBenefitToggle: (benefitId: number) => void
  onResetFilters: () => void
}

export function FilterPanel({
  filters,
  cities,
  neighborhoods,
  benefits,
  onFilterChange,
  onBenefitToggle,
  onResetFilters,
}: FilterPanelProps) {
  const hasActiveFilters =
    filters.search ||
    filters.cityId ||
    filters.neighborhoodId ||
    filters.status ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.benefitIds.length > 0

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Filter className="h-5 w-5 mr-2 text-primary" />
          <h2 className="text-lg font-medium">Filters</h2>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onResetFilters} className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="search" className="text-sm font-medium">
            Search
          </Label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search by name or project"
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="city" className="text-sm font-medium">
            City
          </Label>
          <Select
            value={filters.cityId?.toString() || ""}
            onValueChange={(value) => onFilterChange("cityId", value ? Number.parseInt(value) : null)}
          >
            <SelectTrigger id="city" className="mt-1">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id.toString()}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="neighborhood" className="text-sm font-medium">
            Neighborhood
          </Label>
          <Select
            value={filters.neighborhoodId?.toString() || ""}
            onValueChange={(value) => onFilterChange("neighborhoodId", value ? Number.parseInt(value) : null)}
            disabled={!filters.cityId || neighborhoods.length === 0}
          >
            <SelectTrigger id="neighborhood" className="mt-1">
              <SelectValue placeholder="Select neighborhood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All neighborhoods</SelectItem>
              {neighborhoods.map((neighborhood) => (
                <SelectItem key={neighborhood.id} value={neighborhood.id.toString()}>
                  {neighborhood.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="listingType" className="text-sm font-medium">
            Listing Type
          </Label>
          <Select value={filters.status} onValueChange={(value) => onFilterChange("status", value)}>
            <SelectTrigger id="listingType" className="mt-1">
              <SelectValue placeholder="For Rent/Sale" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All listings</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
              <SelectItem value="sale">For Sale</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="minPrice" className="text-sm font-medium">
            Min Price
          </Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="Min price"
            value={filters.minPrice}
            onChange={(e) => onFilterChange("minPrice", e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="maxPrice" className="text-sm font-medium">
            Max Price
          </Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange("maxPrice", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="mt-6">
        <Label className="text-sm font-medium block mb-2">Benefits</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="flex items-center space-x-2">
              <Checkbox
                id={`benefit-${benefit.id}`}
                checked={filters.benefitIds.includes(benefit.id)}
                onCheckedChange={() => onBenefitToggle(benefit.id)}
              />
              <Label htmlFor={`benefit-${benefit.id}`} className="text-sm font-normal cursor-pointer">
                {benefit.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
