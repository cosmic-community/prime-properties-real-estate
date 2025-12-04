// app/agents/[slug]/page.tsx
import { getAgentBySlug, getAgents, getPropertiesByAgent } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PropertyCard from '@/components/PropertyCard'

export async function generateStaticParams() {
  const agents = await getAgents()
  return agents.map(agent => ({
    slug: agent.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const agent = await getAgentBySlug(slug)
  
  if (!agent) {
    return {
      title: 'Agent Not Found',
    }
  }
  
  return {
    title: `${agent.metadata.full_name} | Prime Properties Real Estate`,
    description: agent.metadata?.bio || `Contact ${agent.metadata.full_name} for expert real estate services`,
  }
}

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const agent = await getAgentBySlug(slug)
  
  if (!agent) {
    notFound()
  }
  
  const agentProperties = await getPropertiesByAgent(agent.id)
  
  return (
    <div className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-secondary-600">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link href="/agents" className="hover:text-primary-600">Agents</Link>
          <span>/</span>
          <span className="text-secondary-900">{agent.metadata.full_name}</span>
        </div>
        
        {/* Agent Profile */}
        <div className="bg-secondary-50 rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            {agent.metadata?.profile_photo && (
              <img
                src={`${agent.metadata.profile_photo.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                alt={agent.metadata.full_name}
                className="w-48 h-48 rounded-full object-cover mx-auto md:mx-0"
              />
            )}
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-secondary-900 mb-3">
                {agent.metadata.full_name}
              </h1>
              
              {agent.metadata?.years_of_experience && (
                <p className="text-xl text-primary-600 font-semibold mb-4">
                  {agent.metadata.years_of_experience} Years of Experience
                </p>
              )}
              
              {agent.metadata?.bio && (
                <p className="text-secondary-700 mb-6 leading-relaxed">
                  {agent.metadata.bio}
                </p>
              )}
              
              {agent.metadata?.specialties && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">Specialties</h3>
                  <p className="text-secondary-700">{agent.metadata.specialties}</p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${agent.metadata.email}`}
                  className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {agent.metadata.email}
                </a>
                
                <a
                  href={`tel:${agent.metadata.phone}`}
                  className="flex items-center gap-2 bg-secondary-100 text-secondary-700 px-6 py-3 rounded-lg hover:bg-secondary-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {agent.metadata.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Agent's Listings */}
        <div>
          <h2 className="text-3xl font-bold text-secondary-900 mb-8">
            {agent.metadata.full_name}'s Listings
          </h2>
          
          {agentProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agentProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center text-secondary-600 py-12">
              No properties currently listed by this agent.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}