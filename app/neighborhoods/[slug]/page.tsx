// app/neighborhoods/[slug]/page.tsx
import { getNeighborhoodBySlug, getNeighborhoods, getPropertiesByNeighborhood } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PropertyCard from '@/components/PropertyCard'

export async function generateStaticParams() {
  const neighborhoods = await getNeighborhoods()
  return neighborhoods.map(neighborhood => ({
    slug: neighborhood.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const neighborhood = await getNeighborhoodBySlug(slug)
  
  if (!neighborhood) {
    return {
      title: 'Neighborhood Not Found',
    }
  }
  
  return {
    title: `${neighborhood.metadata.neighborhood_name} | Prime Properties Real Estate`,
    description: neighborhood.metadata?.description || `Explore properties in ${neighborhood.metadata.neighborhood_name}`,
  }
}

export default async function NeighborhoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const neighborhood = await getNeighborhoodBySlug(slug)
  
  if (!neighborhood) {
    notFound()
  }
  
  const properties = await getPropertiesByNeighborhood(neighborhood.id)
  const mainImage = neighborhood.metadata?.neighborhood_photos?.[0]
  const galleryImages = neighborhood.metadata?.neighborhood_photos?.slice(1) || []
  
  return (
    <div className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-secondary-600">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link href="/neighborhoods" className="hover:text-primary-600">Neighborhoods</Link>
          <span>/</span>
          <span className="text-secondary-900">{neighborhood.metadata.neighborhood_name}</span>
        </div>
        
        {/* Main Image */}
        {mainImage && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img
              src={`${mainImage.imgix_url}?w=1400&h=600&fit=crop&auto=format,compress`}
              alt={neighborhood.metadata.neighborhood_name}
              className="w-full h-[500px] object-cover"
            />
          </div>
        )}
        
        {/* Neighborhood Info */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-secondary-900 mb-4">
            {neighborhood.metadata.neighborhood_name}
          </h1>
          
          {neighborhood.metadata?.average_price_range && (
            <p className="text-xl text-primary-600 font-semibold mb-6">
              Average Price Range: {neighborhood.metadata.average_price_range}
            </p>
          )}
          
          {neighborhood.metadata?.description && (
            <div 
              className="prose prose-lg prose-secondary max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: neighborhood.metadata.description }}
            />
          )}
          
          {neighborhood.metadata?.features && (
            <div className="bg-secondary-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-secondary-900 mb-4">Neighborhood Features</h2>
              <div className="whitespace-pre-line text-secondary-700">
                {neighborhood.metadata.features}
              </div>
            </div>
          )}
        </div>
        
        {/* Photo Gallery */}
        {galleryImages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Photo Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className="rounded-xl overflow-hidden">
                  <img
                    src={`${image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                    alt={`${neighborhood.metadata.neighborhood_name} - Image ${index + 2}`}
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Properties in Neighborhood */}
        <div>
          <h2 className="text-3xl font-bold text-secondary-900 mb-8">
            Available Properties in {neighborhood.metadata.neighborhood_name}
          </h2>
          
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center text-secondary-600 py-12">
              No properties currently available in this neighborhood.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}