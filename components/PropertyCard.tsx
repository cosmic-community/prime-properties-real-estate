import Link from 'next/link'
import type { Property } from '@/types'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const mainImage = property.metadata?.property_images?.[0]
  
  return (
    <Link 
      href={`/properties/${property.slug}`}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      {mainImage && (
        <div className="relative h-64 overflow-hidden">
          <img
            src={`${mainImage.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={property.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary-600">
              {property.metadata.status.value}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-2 py-1 bg-secondary-100 text-secondary-700 rounded">
            {property.metadata.property_type.value}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold text-secondary-900 mb-2">{property.title}</h3>
        
        <div className="flex items-center gap-2 text-secondary-600 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{property.metadata.address}</span>
        </div>
        
        <div className="text-3xl font-bold text-primary-600 mb-4">
          ${property.metadata.price.toLocaleString()}
        </div>
        
        <div className="flex items-center gap-6 text-secondary-600 mb-4">
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="font-semibold">{property.metadata.bedrooms}</span>
            <span className="text-sm">beds</span>
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            <span className="font-semibold">{property.metadata.bathrooms}</span>
            <span className="text-sm">baths</span>
          </div>
          
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span className="font-semibold">{property.metadata.square_footage.toLocaleString()}</span>
            <span className="text-sm">sqft</span>
          </div>
        </div>
        
        {property.metadata?.agent && (
          <div className="flex items-center gap-2 pt-4 border-t border-secondary-100">
            {property.metadata.agent.metadata?.profile_photo && (
              <img
                src={`${property.metadata.agent.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={property.metadata.agent.metadata.full_name}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-xs text-secondary-600">Listed by</p>
              <p className="text-sm font-semibold text-secondary-900">
                {property.metadata.agent.metadata.full_name}
              </p>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}