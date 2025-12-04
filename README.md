# 🏡 Prime Properties Real Estate

A modern, responsive real estate website built with Next.js 16 and Cosmic CMS. This comprehensive platform showcases properties, agents, neighborhoods, and services with advanced filtering, detailed property pages, and an intuitive user experience.

![App Preview](https://imgix.cosmicjs.com/783a0b50-d0c5-11f0-b20e-1d251587b0cd-photo-1568605114967-8130f3a36994-1764820698819.jpg?w=1200&h=300&fit=crop&auto=format,compress)

## ✨ Features

- **Advanced Property Search** - Filter properties by type, price range, bedrooms, bathrooms, and status
- **Property Detail Pages** - Comprehensive property information with image galleries and agent details
- **Agent Profiles** - Detailed agent pages with bio, specialties, contact info, and their listings
- **Neighborhood Guides** - Explore different neighborhoods with descriptions, features, and photo galleries
- **Service Showcase** - Featured real estate services with icons and detailed descriptions
- **Client Testimonials** - Customer reviews with ratings and property type information
- **Responsive Design** - Optimized for all devices with modern UI and smooth animations
- **TypeScript Integration** - Full type safety with comprehensive type definitions
- **SEO Optimized** - Server-side rendering for optimal search engine visibility

## 🚀 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=693105fd3584465d0a2f6916&clone_repository=693108313584465d0a2f69b0)

## 📋 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a real estate agency website with content models for properties, real estate agents, property listings, neighborhoods, testimonials, and services. Include property details like price, bedrooms, bathrooms, square footage, images, and descriptions. Add agent profiles with contact information and listings."

### Code Generation Prompt

> Based on the content model I created for "Create a real estate agency website with content models for properties, real estate agents, property listings, neighborhoods, testimonials, and services. Include property details like price, bedrooms, bathrooms, square footage, images, and descriptions. Add agent profiles with contact information and listings.", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 16** - React framework with App Router for server-side rendering
- **TypeScript** - Type-safe development with comprehensive type definitions
- **Tailwind CSS** - Utility-first CSS framework for modern styling
- **Cosmic CMS** - Headless CMS for content management
- **Cosmic SDK v1.5.6** - Official SDK for Cosmic API integration

## 📦 Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with your real estate content models set up

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd prime-properties
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. **Run the development server**
```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Cosmic SDK Examples

### Fetching Properties with Related Data

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all properties with agent and neighborhood data
export async function getProperties(): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'properties' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1) // Includes connected agent and neighborhood objects
    
    return response.objects as Property[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch properties')
  }
}

// Fetch single property by slug
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'properties', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Property
  } catch (error) {
    if (error.status === 404) {
      return null
    }
    throw error
  }
}
```

### Fetching Agents with Their Properties

```typescript
// Fetch all agents
export async function getAgents(): Promise<Agent[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'agents' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Agent[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch agents')
  }
}

// Fetch properties for a specific agent
export async function getPropertiesByAgent(agentId: string): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'properties',
        'metadata.agent': agentId // Query by agent ID
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Property[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch agent properties')
  }
}
```

### Filtering Properties by Status

```typescript
// Fetch only properties for sale
export async function getAvailableProperties(): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'properties',
        'metadata.status.key': 'for-sale'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Property[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch available properties')
  }
}
```

## 🌐 Cosmic CMS Integration

This application uses Cosmic CMS with the following content structure:

### Content Types

1. **Properties** - Main property listings with:
   - Address, price, bedrooms, bathrooms, square footage
   - Property type (house, condo, apartment, townhouse)
   - Status (for-sale, pending, sold)
   - Description, features, and multiple images
   - Connected agent and neighborhood objects

2. **Agents** - Real estate agent profiles with:
   - Full name, profile photo, bio
   - Email, phone, years of experience
   - Specialties (text area)

3. **Neighborhoods** - Neighborhood guides with:
   - Name, description, features
   - Average price range
   - Multiple neighborhood photos

4. **Services** - Real estate services with:
   - Service name, description
   - Service icon image
   - Featured toggle

5. **Testimonials** - Client reviews with:
   - Client name, photo, rating (1-5 stars)
   - Review text
   - Property type purchased

### Key Integration Features

- **Connected Objects**: Properties automatically include full agent and neighborhood data using `depth(1)`
- **Image Optimization**: All images use imgix URLs with dynamic optimization parameters
- **Type Safety**: Complete TypeScript definitions for all Cosmic object types
- **Error Handling**: Proper 404 handling for empty results from Cosmic API
- **Server-Side Rendering**: All data fetching happens server-side for optimal SEO

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Create new site in Netlify
3. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy!

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Support

For questions or issues, please contact your development team or refer to the [Cosmic documentation](https://www.cosmicjs.com/docs).

<!-- README_END -->