import { getNeighborhoods } from '@/lib/cosmic'
import Link from 'next/link'

export const metadata = {
  title: 'Neighborhoods | Prime Properties Real Estate',
  description: 'Explore different neighborhoods and find the perfect community for you',
}

export default async function NeighborhoodsPage() {
  const neighborhoods = await getNeighborhoods()
  
  return (
    <div className="py-12 px-4 bg-secondary-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-secondary-900 mb-4">Explore Neighborhoods</h1>
          <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
            Discover the perfect community that matches your lifestyle
          </p>
        </div>
        
        {neighborhoods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {neighborhoods.map(neighborhood => {
              const mainImage = neighborhood.metadata?.neighborhood_photos?.[0]
              
              return (
                <Link
                  key={neighborhood.id}
                  href={`/neighborhoods/${neighborhood.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  {mainImage && (
                    <img
                      src={`${mainImage.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
                      alt={neighborhood.metadata.neighborhood_name}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-secondary-900 mb-3">
                      {neighborhood.metadata.neighborhood_name}
                    </h2>
                    
                    {neighborhood.metadata?.average_price_range && (
                      <p className="text-primary-600 font-semibold mb-4">
                        {neighborhood.metadata.average_price_range}
                      </p>
                    )}
                    
                    {neighborhood.metadata?.description && (
                      <div 
                        className="text-secondary-600 mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: neighborhood.metadata.description }}
                      />
                    )}
                    
                    <div className="text-primary-600 font-semibold flex items-center gap-2">
                      Explore Neighborhood
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-center text-secondary-600 py-12">No neighborhoods available at this time.</p>
        )}
      </div>
    </div>
  )
}