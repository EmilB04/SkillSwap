"use client";

import Header from "../components/Header";
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { useState, useEffect } from 'react';
import { Job, mockJobs } from '@/types/job';
import { 
    ExploreHeader, 
    FilterSection, 
    ResultsSummary, 
    JobGrid, 
    EmptyState 
} from '../components/explore';
import { RequestInfo } from "rwsdk/worker";

export default function Explore({ ctx }: RequestInfo){
    const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
    const [filters, setFilters] = useState({
        category: 'all',
        dateRange: 'alltime',
        payment: ''
    });

    // State for search query
    const [searchQuery, setSearchQuery] = useState('');

    // Get search query from URL when component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            setSearchQuery(params.get('q') || '');
        }
    }, []);

    // Apply filters and search when component mounts or search query changes
    useEffect(() => {
        applyFilters();
    }, [searchQuery, filters]);

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

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(job => 
                job.title.toLowerCase().includes(query) ||
                job.description.toLowerCase().includes(query) ||
                job.category.toLowerCase().includes(query)
            );
        }

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

        // Filter by date range
        if (filters.dateRange !== 'alltime' && result.length > 0) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            result = result.filter(job => {
                if (!job.date) return false;
                const jobDate = new Date(job.date);
                jobDate.setHours(0, 0, 0, 0);
                
                switch (filters.dateRange) {
                    case 'today':
                        return jobDate.getTime() === today.getTime();
                    
                    case 'week':
                        const weekAhead = new Date(today);
                        weekAhead.setDate(today.getDate() + 6);
                        return jobDate >= today && jobDate <= weekAhead;
                    
                    case 'month':
                        const monthAhead = new Date(today);
                        monthAhead.setDate(today.getDate() + 30);
                        return jobDate >= today && jobDate <= monthAhead;
                    
                    case '3months':
                        const threeMonthsAhead = new Date(today);
                        threeMonthsAhead.setDate(today.getDate() + 90);
                        return jobDate >= today && jobDate <= threeMonthsAhead;
                    
                    case '6months':
                        const sixMonthsAhead = new Date(today);
                        sixMonthsAhead.setDate(today.getDate() + 180);
                        return jobDate >= today && jobDate <= sixMonthsAhead;
                    
                    default:
                        return true;
                }
            });
        }
        setFilteredJobs(result);
    };

    const handleClearFilters = () => {
        setFilters({ category: 'all', dateRange: 'alltime', payment: '' });
        setSearchQuery('');
        if (typeof window !== 'undefined') {
            window.history.replaceState({}, '', window.location.pathname);
        }
    };

    return(
        <div className="min-h-screen bg-secondary-pale">
            <Header ctx={ctx} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ExploreHeader />

                <FilterSection 
                    filters={filters}
                    searchQuery={searchQuery}
                    onFilterChange={handleFilterChange}
                    onSearch={applyFilters}
                />

                <ResultsSummary 
                    count={filteredJobs.length}
                    searchQuery={searchQuery}
                />

                {filteredJobs.length > 0 ? (
                    <JobGrid jobs={filteredJobs} />
                ) : (
                    <EmptyState onClearFilters={handleClearFilters} />
                )}
            </main>
            <Footer/>
            <ScrollToTop />
        </div>
    )
}