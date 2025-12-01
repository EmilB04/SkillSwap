"use client";

import { colors, borderRadius, transition } from "../../theme";
import JobCard from "../JobCard";
import type { Job } from "../../../types/job";

interface FeaturedOpportunitiesProps {
  jobs: Job[];
  title?: string;
  description?: string;
  showViewAllButton?: boolean;
  viewAllHref?: string;
  viewAllText?: string;
  backgroundColor?: string;
}

export function FeaturedOpportunities({
  jobs,
  title = "Featured Opportunities",
  description = "Discover the latest skill exchange opportunities from our community",
  showViewAllButton = true,
  viewAllHref = "/explore",
  viewAllText = "View All Opportunities",
  backgroundColor = "rgb(255 255 255 / 0.5)",
}: FeaturedOpportunitiesProps) {
  return (
    <section className="py-16" style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {jobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              category={job.category}
              payment={job.payment}
              imageUrl={job.imageUrl}
              date={job.date}
            />
          ))}
        </div>

        {showViewAllButton && (
          <div className="text-center">
            <a
              href={viewAllHref}
              className="inline-flex items-center gap-2 px-6 py-3 font-medium cursor-pointer"
              style={{
                color: colors.primary.main,
                border: `2px solid ${colors.primary.main}`,
                borderRadius: borderRadius.lg,
                backgroundColor: 'transparent',
                transition: `all ${transition.smooth} ease`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary.main;
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colors.primary.main;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {viewAllText}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
