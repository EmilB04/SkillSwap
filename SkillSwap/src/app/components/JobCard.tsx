import { JobCardProps, defaultJobCardProps } from "@/types/job";

export default function JobCard(props: JobCardProps) {
    const {job, category, payment, imageUrl } = { ...defaultJobCardProps, ...props };

    return(
        <a href={`/job/${job?.slug}`} className="block h-full group">
            <article className="bg-white rounded-lg shadow-soft border border-gray-200 hover:-translate-y-1.5 hover:shadow-medium hover:border-primary-light overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-[280ms]">
            {/* Image */}
            <div className="relative overflow-hidden flex-shrink-0">
                <img 
                    src={imageUrl} 
                    alt={`${job?.title} opportunity`} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-[380ms]"
                />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Category Badge */}
                <div className="mb-3.5">
                    <span className="inline-block text-xs font-bold uppercase py-1.5 px-3 rounded-full bg-primary/20 text-primary-dark tracking-wider">
                        {category}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
                    {job?.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-normal mb-4 line-clamp-2">
                    {job?.description}
                </p>

                {/* Meta info */}
                <div className="flex items-center justify-between text-sm mt-auto mb-4">
                    <div className="flex items-center gap-1.5 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[0.813rem]">
                            {job?.date?.toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 font-bold text-primary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{payment}</span>
                    </div>
                </div>

                {/* Action Button */}
                <button className="w-full p-3 rounded-md bg-primary hover:bg-primary-hover text-white font-semibold text-center border-0 cursor-pointer transition-all duration-[140ms]"> 
                    View Details
                </button>
            </div>
        </article>
        </a>
    )
}