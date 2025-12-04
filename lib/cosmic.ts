import { createBucketClient } from '@cosmicjs/sdk'
import type { Property, Agent, Neighborhood, Service, Testimonial } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Properties
export async function getProperties(): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'properties' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Property[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch properties')
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'properties', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Property
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function getPropertiesByAgent(agentId: string): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'properties',
        'metadata.agent': agentId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Property[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch agent properties')
  }
}

export async function getPropertiesByNeighborhood(neighborhoodId: string): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'properties',
        'metadata.neighborhood': neighborhoodId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Property[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch neighborhood properties')
  }
}

// Agents
export async function getAgents(): Promise<Agent[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'agents' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Agent[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch agents')
  }
}

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'agents', slug })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.object as Agent
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

// Neighborhoods
export async function getNeighborhoods(): Promise<Neighborhood[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'neighborhoods' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Neighborhood[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch neighborhoods')
  }
}

export async function getNeighborhoodBySlug(slug: string): Promise<Neighborhood | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'neighborhoods', slug })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.object as Neighborhood
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

// Services
export async function getServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Service[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch services')
  }
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Testimonial[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch testimonials')
  }
}