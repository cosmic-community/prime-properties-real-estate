import { getAgents } from '@/lib/cosmic'
import Link from 'next/link'

export const metadata = {
  title: 'Our Agents | Prime Properties Real Estate',
  description: 'Meet our experienced real estate agents',
}

export default async function AgentsPage() {
  const agents = await getAgents()
  
  return (
    <div className="py-12 px-4 bg-secondary-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-secondary-900 mb-4">Meet Our Agents</h1>
          <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
            Our experienced team of real estate professionals is dedicated to helping you find your dream home
          </p>
        </div>
        
        {agents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agents.map(agent => (
              <Link
                key={agent.id}
                href={`/agents/${agent.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    {agent.metadata?.profile_photo && (
                      <img
                        src={`${agent.metadata.profile_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                        alt={agent.metadata.full_name}
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    )}
                    
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-secondary-900 mb-2">
                        {agent.metadata.full_name}
                      </h2>
                      
                      {agent.metadata?.years_of_experience && (
                        <p className="text-primary-600 font-semibold mb-3">
                          {agent.metadata.years_of_experience} years of experience
                        </p>
                      )}
                      
                      {agent.metadata?.bio && (
                        <p className="text-secondary-600 mb-4 line-clamp-3">
                          {agent.metadata.bio}
                        </p>
                      )}
                      
                      {agent.metadata?.specialties && (
                        <div className="mb-4">
                          <p className="text-sm font-semibold text-secondary-700 mb-1">Specialties:</p>
                          <p className="text-sm text-secondary-600">{agent.metadata.specialties}</p>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-secondary-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm">{agent.metadata.email}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-secondary-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-sm">{agent.metadata.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-secondary-600 py-12">No agents available at this time.</p>
        )}
      </div>
    </div>
  )
}