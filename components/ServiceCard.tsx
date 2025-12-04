import type { Service } from '@/types'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
      {service.metadata?.service_icon && (
        <div className="mb-6">
          <img
            src={`${service.metadata.service_icon.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={service.metadata.service_name}
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-secondary-900 mb-4">
        {service.metadata.service_name}
      </h3>
      
      {service.metadata?.description && (
        <div 
          className="text-secondary-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: service.metadata.description }}
        />
      )}
    </div>
  )
}