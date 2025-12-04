// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  status: string
  thumbnail?: string
}

// Property type literals
export type PropertyType = 'house' | 'condo' | 'apartment' | 'townhouse'
export type PropertyStatus = 'for-sale' | 'pending' | 'sold'

// Rating type for testimonials
export type Rating = '5' | '4' | '3' | '2' | '1'

// Image interface for Cosmic file metafields
export interface CosmicImage {
  url: string
  imgix_url: string
}

// Agent interface
export interface Agent extends CosmicObject {
  type: 'agents'
  metadata: {
    full_name: string
    profile_photo?: CosmicImage
    bio?: string
    email: string
    phone: string
    years_of_experience?: number
    specialties?: string
  }
}

// Neighborhood interface
export interface Neighborhood extends CosmicObject {
  type: 'neighborhoods'
  metadata: {
    neighborhood_name: string
    description?: string
    features?: string
    average_price_range?: string
    neighborhood_photos?: CosmicImage[]
  }
}

// Property interface
export interface Property extends CosmicObject {
  type: 'properties'
  metadata: {
    address: string
    price: number
    bedrooms: number
    bathrooms: number
    square_footage: number
    property_type: {
      key: PropertyType
      value: string
    }
    status: {
      key: PropertyStatus
      value: string
    }
    description?: string
    features?: string
    property_images?: CosmicImage[]
    agent?: Agent
    neighborhood?: Neighborhood
  }
}

// Service interface
export interface Service extends CosmicObject {
  type: 'services'
  metadata: {
    service_name: string
    description?: string
    service_icon?: CosmicImage
    featured?: boolean
  }
}

// Testimonial interface
export interface Testimonial extends CosmicObject {
  type: 'testimonials'
  metadata: {
    client_name: string
    client_photo?: CosmicImage
    rating: {
      key: Rating
      value: string
    }
    review: string
    property_type_purchased?: string
  }
}

// API response type
export interface CosmicResponse<T> {
  objects: T[]
  total: number
}

// Type guard functions
export function isProperty(obj: CosmicObject): obj is Property {
  return obj.type === 'properties'
}

export function isAgent(obj: CosmicObject): obj is Agent {
  return obj.type === 'agents'
}

export function isNeighborhood(obj: CosmicObject): obj is Neighborhood {
  return obj.type === 'neighborhoods'
}

export function isService(obj: CosmicObject): obj is Service {
  return obj.type === 'services'
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials'
}