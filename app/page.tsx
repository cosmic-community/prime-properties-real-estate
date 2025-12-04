import { getProperties, getServices, getTestimonials } from '@/lib/cosmic'
import PropertyCard from '@/components/PropertyCard'
import ServiceCard from '@/components/ServiceCard'
import TestimonialCard from '@/components/TestimonialCard'
import Link from 'next/link'

export default async function HomePage() {
  const [properties, services, testimonials] = await Promise.all([
    getProperties(),
    getServices(),
    getTestimonials(),
  ])
  
  // Get featured properties (first 3)
  const featuredProperties = properties.slice(0, 3)
  
  // Get featured services
  const featuredServices = services.filter(service => service.metadata?.featured)
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your Dream Home
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Discover exceptional properties with Prime Properties Real Estate. Your trusted partner in finding the perfect home.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/properties"
                className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                Browse Properties
              </Link>
              <Link
                href="/agents"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-500 transition-colors"
              >
                Meet Our Agents
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="py-16 px-4 bg-secondary-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-4xl font-bold text-secondary-900 mb-2">Featured Properties</h2>
              <p className="text-secondary-600">Discover our hand-picked luxury listings</p>
            </div>
            <Link
              href="/properties"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center text-secondary-600 py-12">No featured properties available at this time.</p>
          )}
        </div>
      </section>
      
      {/* Services Section */}
      {featuredServices.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-secondary-900 mb-4">Our Services</h2>
              <p className="text-secondary-600 max-w-2xl mx-auto">
                Comprehensive real estate services tailored to your needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 px-4 bg-secondary-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-secondary-900 mb-4">What Our Clients Say</h2>
              <p className="text-secondary-600 max-w-2xl mx-auto">
                Real experiences from satisfied homeowners
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map(testimonial => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Connect with our experienced agents and start your journey today
          </p>
          <Link
            href="/agents"
            className="inline-block bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Contact an Agent
          </Link>
        </div>
      </section>
    </div>
  )
}