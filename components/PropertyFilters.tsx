'use client'

import { useState } from 'react'
import type { Property, PropertyType, PropertyStatus } from '@/types'
import PropertyCard from './PropertyCard'

interface PropertyFiltersProps {
  properties: Property[]
}

export default function PropertyFilters({ properties }: PropertyFiltersProps) {
  const [selectedType, setSelectedType] = useState<PropertyType | 'all'>('all')
  const [selectedStatus, setSelectedStatus] = useState<PropertyStatus | 'all'>('all')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [minBedrooms, setMinBedrooms] = useState<string>('')
  
  const filteredProperties = properties.filter(property => {
    // Type filter
    if (selectedType !== 'all' && property.metadata.property_type.key !== selectedType) {
      return false
    }
    
    // Status filter
    if (selectedStatus !== 'all' && property.metadata.status.key !== selectedStatus) {
      return false
    }
    
    // Price filters
    if (minPrice && property.metadata.price < parseInt(minPrice)) {
      return false
    }
    if (maxPrice && property.metadata.price > parseInt(maxPrice)) {
      return false
    }
    
    // Bedrooms filter
    if (minBedrooms && property.metadata.bedrooms < parseInt(minBedrooms)) {
      return false
    }
    
    return true
  })
  
  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-secondary-900 mb-4">Filter Properties</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Property Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as PropertyType | 'all')}
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Types</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="apartment">Apartment</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>
          
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as PropertyStatus | 'all')}
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="for-sale">For Sale</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          
          {/* Min Price */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Min Price
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="$0"
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          {/* Max Price */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Max Price
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Any"
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          {/* Min Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Min Bedrooms
            </label>
            <select
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(e.target.value)}
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Results */}
      <div className="mb-6">
        <p className="text-secondary-600">
          Showing {filteredProperties.length} of {properties.length} properties
        </p>
      </div>
      
      {/* Property Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-secondary-600 text-lg">No properties match your filters.</p>
          <button
            onClick={() => {
              setSelectedType('all')
              setSelectedStatus('all')
              setMinPrice('')
              setMaxPrice('')
              setMinBedrooms('')
            }}
            className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}