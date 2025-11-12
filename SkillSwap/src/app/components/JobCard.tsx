import { JobCardProps, defaultJobCardProps } from "@/types/job";
import { colors } from "@/app/theme";

export default function JobCard(props: JobCardProps) {
    const {job, category, payment, imageUrl } = { ...defaultJobCardProps, ...props };

    return(
        <a href={`/job/${job?.id}`} className="block">
            <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
            {/* Image with overlay on hover */}
            <div className="relative overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={`${job?.title} opportunity`} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Category Badge */}
                <div className="mb-3">
                    <span 
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ 
                            backgroundColor: `${colors.primary.main}15`,
                            color: colors.primary.main
                        }}
                    >
                        {category}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {job?.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {job?.description}
                </p>

                {/* Meta info */}
                <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>
                            {job?.date?.toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-1 font-semibold" style={{ color: colors.primary.main }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{payment}</span>
                    </div>
                </div>

                {/* Action Button */}
                <div 
                    className="w-full py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-center"
                    style={{ backgroundColor: colors.primary.main }}
                > 
                    View Details
                </div>
            </div>
        </article>
        </a>
    )
}