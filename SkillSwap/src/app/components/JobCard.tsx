"use client";

import { JobCardProps, defaultJobCardProps } from "@/types/job";

export default function JobCard(props: JobCardProps) {
    const {job, category, payment, imageUrl, onRequestJob } = { ...defaultJobCardProps, ...props };
    
    const handleRequestClick = () => {
        if (onRequestJob && job?.id) {
            onRequestJob(job.id);
            console.log(`Requested job with ID: ${job.id}`);
        }
    };

    return(
        <div className="bg-white rounded-lg shadow-md p-4 max-w-[280px] min-w-[200px]">
            <img src={imageUrl} alt={`${job?.title} job`} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold mb-2">{job?.title}</h3>
            <p className="text-gray-600 mb-2">{category}</p>
            <p className="text-gray-500 text-sm mb-3">{job?.description}</p>
            <p className="text-gray-500 text-sm mb-3 font-semibold">
                {job?.date?.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).replace(/\//g, '.')}
            </p>
            <p className="text-green-600 font-medium mb-4">{payment}</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium" onClick={handleRequestClick}> 
                Request Job
            </button>
        </div>
    )
}