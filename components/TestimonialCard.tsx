import type { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const rating = parseInt(testimonial.metadata.rating.key)
  
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-secondary-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {/* Review Text */}
      <p className="text-secondary-700 mb-6 leading-relaxed">
        "{testimonial.metadata.review}"
      </p>
      
      {/* Client Info */}
      <div className="flex items-center gap-4 pt-6 border-t border-secondary-100">
        {testimonial.metadata?.client_photo && (
          <img
            src={`${testimonial.metadata.client_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
            alt={testimonial.metadata.client_name}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        
        <div>
          <p className="font-semibold text-secondary-900">
            {testimonial.metadata.client_name}
          </p>
          {testimonial.metadata?.property_type_purchased && (
            <p className="text-sm text-secondary-600">
              {testimonial.metadata.property_type_purchased}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}