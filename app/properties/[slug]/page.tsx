// app/properties/[slug]/page.tsx
import { getPropertyBySlug, getProperties } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const properties = await getProperties()
  return properties.map(property => ({
    slug: property.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)
  
  if (!property) {
    return {
      title: 'Property Not Found',
    }
  }
  
  return {
    title: `${property.title} | Prime Properties Real Estate`,
    description: property.metadata?.description || `${property.metadata.bedrooms} bed, ${property.metadata.bathrooms} bath property in ${property.metadata.address}`,
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)
  
  if (!property) {
    notFound()
  }
  
  const mainImage = property.metadata?.property_images?.[0]
  const galleryImages = property.metadata?.property_images?.slice(1) || []
  const agent = property.metadata?.agent
  const neighborhood = property.metadata?.neighborhood
  
  return (
    <div className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-secondary-600">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-primary-600">Properties</Link>
          <span>/</span>
          <span className="text-secondary-900">{property.title}</span>
        </div>
        
        {/* Main Image */}
        {mainImage && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img
              src={`${mainImage.imgix_url}?w=1400&h=700&fit=crop&auto=format,compress`}
              alt={property.title}
              className="w-full h-[500px] object-cover"
            />
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                  {property.metadata.status.value}
                </span>
                <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-semibold">
                  {property.metadata.property_type.value}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-secondary-900 mb-4">{property.title}</h1>
              
              <div className="flex items-center gap-2 text-secondary-600 mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{property.metadata.address}</span>
              </div>
              
              <div className="text-4xl font-bold text-primary-600 mb-6">
                ${property.metadata.price.toLocaleString()}
              </div>
            </div>
            
            {/* Property Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-secondary-50 rounded-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-900 mb-1">{property.metadata.bedrooms}</div>
                <div className="text-sm text-secondary-600">Bedrooms</div>
              </div>
              <div className="text-center border-x border-secondary-200">
                <div className="text-2xl font-bold text-secondary-900 mb-1">{property.metadata.bathrooms}</div>
                <div className="text-sm text-secondary-600">Bathrooms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-900 mb-1">{property.metadata.square_footage.toLocaleString()}</div>
                <div className="text-sm text-secondary-600">Sq Ft</div>
              </div>
            </div>
            
            {/* Description */}
            {property.metadata?.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">About This Property</h2>
                <div 
                  className="prose prose-secondary max-w-none"
                  dangerouslySetInnerHTML={{ __html: property.metadata.description }}
                />
              </div>
            )}
            
            {/* Features */}
            {property.metadata?.features && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Features & Amenities</h2>
                <div className="bg-secondary-50 rounded-xl p-6">
                  <div className="whitespace-pre-line text-secondary-700">
                    {property.metadata.features}
                  </div>
                </div>
              </div>
            )}
            
            {/* Image Gallery */}
            {galleryImages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {galleryImages.map((image, index) => (
                    <div key={index} className="rounded-xl overflow-hidden">
                      <img
                        src={`${image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                        alt={`${property.title} - Image ${index + 2}`}
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Agent Card */}
            {agent && (
              <div className="bg-white border border-secondary-200 rounded-xl p-6 mb-6 sticky top-6">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">Contact Agent</h3>
                
                {agent.metadata?.profile_photo && (
                  <img
                    src={`${agent.metadata.profile_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                    alt={agent.metadata.full_name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                )}
                
                <div className="text-center mb-6">
                  <h4 className="text-lg font-semibold text-secondary-900 mb-1">
                    {agent.metadata.full_name}
                  </h4>
                  {agent.metadata?.years_of_experience && (
                    <p className="text-sm text-secondary-600">
                      {agent.metadata.years_of_experience} years experience
                    </p>
                  )}
                </div>
                
                <div className="space-y-3">
                  <a
                    href={`mailto:${agent.metadata.email}`}
                    className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Agent
                  </a>
                  
                  <a
                    href={`tel:${agent.metadata.phone}`}
                    className="w-full flex items-center justify-center gap-2 bg-secondary-100 text-secondary-700 px-4 py-3 rounded-lg hover:bg-secondary-200 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {agent.metadata.phone}
                  </a>
                  
                  <Link
                    href={`/agents/${agent.slug}`}
                    className="w-full block text-center text-primary-600 hover:text-primary-700 font-semibold py-2"
                  >
                    View Agent Profile
                  </Link>
                </div>
              </div>
            )}
            
            {/* Neighborhood Card */}
            {neighborhood && (
              <div className="bg-secondary-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-secondary-900 mb-4">Neighborhood</h3>
                
                <h4 className="text-lg font-semibold text-secondary-900 mb-2">
                  {neighborhood.metadata.neighborhood_name}
                </h4>
                
                {neighborhood.metadata?.average_price_range && (
                  <p className="text-sm text-secondary-600 mb-4">
                    Average Price: {neighborhood.metadata.average_price_range}
                  </p>
                )}
                
                <Link
                  href={`/neighborhoods/${neighborhood.slug}`}
                  className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
                >
                  Explore Neighborhood
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}