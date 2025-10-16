'use client';

import Header from "../components/Header";
import Footer from '../components/Footer';
import JobCard from "../components/JobCard";
import { useState } from 'react';
import { Job, mockJobs } from '@/types/job';

export default function Explore(){
    const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
    const [filters, setFilters] = useState({
        keyword: 'popular',
        category: 'all',
        dateRange: 'alltime',
        payment: ''
    });

    // Handle filter changes
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Apply filters to jobs
    const applyFilters = () => {
        let result = [...mockJobs];

        // Filter by category
        if (filters.category !== 'all') {
            result = result.filter(job => 
                job.category.toLowerCase() === filters.category.toLowerCase()
            );
        }

        // Filter by payment type
        if (filters.payment) {
            result = result.filter(job => {
                if (filters.payment === 'cash') {
                    return job.payment.includes('$');
                } else if (filters.payment === 'swap') {
                    return job.payment.toLowerCase().includes('swap');
                }
                return true;
            });
        }

        // Filter by keyword (sorting)
        if (filters.keyword) {
            switch (filters.keyword) {
                case 'high-paid':
                    result.sort((a, b) => {
                        const aPrice = parseInt(a.payment.replace(/[^0-9]/g, '')) || 0;
                        const bPrice = parseInt(b.payment.replace(/[^0-9]/g, '')) || 0;
                        return bPrice - aPrice;
                    });
                    break;
                case 'low-paid':
                    result.sort((a, b) => {
                        const aPrice = parseInt(a.payment.replace(/[^0-9]/g, '')) || 0;
                        const bPrice = parseInt(b.payment.replace(/[^0-9]/g, '')) || 0;
                        return aPrice - bPrice;
                    });
                    break;
                case 'new':
                    // In the future, this will sort by createdAt
                    result.sort((a, b) => b.id - a.id);
                    break;
                // 'popular' will be implemented when we have a way to track popularity
            }
        }

        setFilteredJobs(result);
    };
    return(
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Header/>
            <main className="max-w-3/4 justify-center mx-auto px-6 py-3">
                <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                    <h1 className="text-2xl font-bold mb-2">Explore Jobs</h1>
                    <p className="mb-2">Filter and find the perfect job for you</p>
                    <div className="p-4 pl-0">
                        <form className="flex flex-wrap items-center justify-between">
                            <div>
                                <label htmlFor="keyword" className="font-bold mr-2">Filter</label>
                                <select 
                                    id="keyword" 
                                    name="keyword" 
                                    className="p-2 border rounded-md"
                                    value={filters.keyword}
                                    onChange={handleFilterChange}
                                >
                                    <option value="popular">Popular</option>
                                    <option value="new">New</option>
                                    <option value="high-paid">High paid</option>
                                    <option value="low-paid">Low paid</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="category" className="font-bold mr-2">Category:</label>
                                <select 
                                    id="category" 
                                    name="category" 
                                    className="p-2 border rounded-md"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                >
                                    <option value="all">All</option>
                                    <option value="design">Design</option>
                                    <option value="development">Development</option>
                                    <option value="language">Language</option>
                                    <option value="gardening">Gardening</option>
                                    <option value="cooking">Cooking</option>
                                    <option value="tutoring">Tutoring</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <label htmlFor="dateRange" className="font-bold">Period:</label>
                                <select id="dateRange" name="dateRange" className="p-2 border rounded-md">
                                    <option value="alltime">All time</option>
                                    <option value="today">Today</option>
                                    <option value="week">This week</option>
                                    <option value="month">Next month</option>
                                    <option value="3months">3 months</option>
                                    <option value="6months">6 months</option>
                                </select>
                            </div>

                            <div className="flex flex-row gap-2 items-center">
                                <legend className="mr-2 font-bold">Payment:</legend>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="radio" 
                                            id="cash" 
                                            name="payment" 
                                            value="cash"
                                            checked={filters.payment === 'cash'}
                                            onChange={handleFilterChange}
                                            className="form-radio h-4 w-4 text-blue-600" />
                                        <label htmlFor="cash" className="text-sm">Cash</label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="radio" 
                                            id="swap" 
                                            name="payment" 
                                            value="swap"
                                            checked={filters.payment === 'swap'}
                                            onChange={handleFilterChange}
                                            className="form-radio h-4 w-4 text-blue-600" />
                                        <label htmlFor="swap" className="text-sm">Swap</label>
                                    </div>
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                                onClick={(e) => {
                                    e.preventDefault();
                                    applyFilters();
                                }}>
                                Search
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-wrap gap-6 mb-12 justify-center">
                    {filteredJobs.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                            category={job.category}
                            payment={job.payment}
                            imageUrl={job.imageUrl}
                            onRequestJob={(id) => console.log(`Requested job ${id}`)}
                        />
                    ))}
                    {filteredJobs.length === 0 && (<p>No jobs found matching the selected filters.</p>)}
                </div>
            </main>
            <Footer/>
        </div>
    )
}