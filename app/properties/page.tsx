import { getProperties } from '@/lib/cosmic'
import PropertyCard from '@/components/PropertyCard'
import PropertyFilters from '@/components/PropertyFilters'

export const metadata = {
  title: 'Properties | Prime Properties Real Estate',
  description: 'Browse our complete collection of luxury properties',
}

export default async function PropertiesPage() {
  const properties = await getProperties()
  
  return (
    <div className="py-12 px-4 bg-secondary-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-secondary-900 mb-4">All Properties</h1>
          <p className="text-secondary-600 text-lg">
            Browse our complete collection of {properties.length} properties
          </p>
        </div>
        
        <PropertyFilters properties={properties} />
      </div>
    </div>
  )
}