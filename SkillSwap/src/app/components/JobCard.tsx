import { JobCardProps, defaultJobCardProps } from "@/types/job";
import { colors, borderRadius, shadows, transition } from "@/app/theme";

export default function JobCard(props: JobCardProps) {
    const {job, category, payment, imageUrl } = { ...defaultJobCardProps, ...props };

    return(
        <a href={`/job/${job?.slug}`} className="block h-full group">
            <article 
                className="bg-white overflow-hidden cursor-pointer h-full flex flex-col"
                style={{
                    borderRadius: borderRadius.lg,
                    boxShadow: shadows.soft,
                    border: `1px solid ${colors.neutral.gray[200]}`,
                    transition: `all ${transition.normal} ease-out`,
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = shadows.medium;
                    e.currentTarget.style.borderColor = colors.primary.light;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = shadows.soft;
                    e.currentTarget.style.borderColor = colors.neutral.gray[200];
                }}
            >
            {/* Image */}
            <div className="relative overflow-hidden flex-shrink-0">
                <img 
                    src={imageUrl} 
                    alt={`${job?.title} opportunity`} 
                    className="w-full h-48 object-cover"
                    style={{
                        transition: `transform ${transition.smooth} ease-out`,
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>

            {/* Content */}
            <div style={{ padding: '1.25rem' }} className="flex flex-col flex-grow">
                {/* Category Badge */}
                <div style={{ marginBottom: '0.875rem' }}>
                    <span 
                        className="inline-block text-xs font-bold uppercase"
                        style={{ 
                            padding: '0.375rem 0.75rem',
                            borderRadius: borderRadius.full,
                            backgroundColor: `${colors.primary.main}20`,
                            color: colors.primary.dark,
                            letterSpacing: '0.05em',
                        }}
                    >
                        {category}
                    </span>
                </div>

                {/* Title */}
                <h3 
                    className="text-xl font-bold mb-2 line-clamp-2"
                    style={{
                        color: colors.neutral.gray[900],
                        lineHeight: '1.3',
                    }}
                >
                    {job?.title}
                </h3>

                {/* Description */}
                <p 
                    className="text-sm mb-4 line-clamp-2"
                    style={{
                        color: colors.neutral.gray[600],
                        lineHeight: '1.5',
                    }}
                >
                    {job?.description}
                </p>

                {/* Meta info */}
                <div className="flex items-center justify-between text-sm mt-auto" style={{ marginBottom: '1rem' }}>
                    <div 
                        className="flex items-center gap-1.5"
                        style={{ color: colors.neutral.gray[500] }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span style={{ fontSize: '0.813rem' }}>
                            {job?.date?.toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                    
                    <div 
                        className="flex items-center gap-1.5 font-bold"
                        style={{ color: colors.primary.main }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{payment}</span>
                    </div>
                </div>

                {/* Action Button */}
                <button 
                    className="w-full text-white font-semibold text-center"
                    style={{
                        padding: '0.75rem',
                        borderRadius: borderRadius.md,
                        backgroundColor: colors.primary.main,
                        border: 'none',
                        cursor: 'pointer',
                        transition: `all ${transition.quick} ease-out`,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.primary.hover;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = colors.primary.main;
                    }}
                > 
                    View Details
                </button>
            </div>
        </article>
        </a>
    )
}