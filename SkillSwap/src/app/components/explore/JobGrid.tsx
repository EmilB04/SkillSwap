"use client";

import JobCard from '../JobCard';
import { Job } from '@/types/job';

interface JobGridProps {
    jobs: Job[];
}

export default function JobGrid({ jobs }: JobGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {jobs.map((job) => (
                <JobCard
                    key={job.id}
                    job={job}
                    category={job.category}
                    payment={job.payment}
                    imageUrl={job.imageUrl}
                    date={job.date}
                    onRequestJob={(id) => console.log(`Requested job ${id}`)}
                />
            ))}
        </div>
    );
}
