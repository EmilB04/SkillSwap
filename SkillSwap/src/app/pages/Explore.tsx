"use client";

import Header from "../components/Header";
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import { colors } from '../theme';
import { 
    ExploreHeader, 
    FilterSection, 
    ResultsSummary, 
    JobGrid, 
    EmptyState 
} from '../components/explore';
import { RequestInfo } from "rwsdk/worker";

const Explore = (props: any) => {
    // You may need to get ctx from props or context if required
    const ctx = props.ctx;

    const [allJobs, setAllJobs] = useState<Job[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: 'all',
        dateRange: 'alltime',
        payment: '',
        sortBy: ''
    });

    // State for search query
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch ads from API when component mounts
    useEffect(() => {
        async function fetchAds() {
            try {
                setLoading(true);
                const response = await fetch('/api/v1/ads');
                const result = await response.json() as { success: boolean; data?: any[] };
                
                if (result.success && result.data) {
                    // Transform API data to Job format
                    const jobs: Job[] = result.data.map((ad: any) => ({
                        id: ad.id,
                        slug: ad.slug || `${ad.category?.toLowerCase()}-${ad.id}`,
                        title: ad.title,
                        description: ad.description,
                        userId: ad.userId,
                        category: ad.category || 'Other',
                        payment: ad.payment || 'Negotiable',
                        imageUrl: ad.imageUrl || '/src/app/assets/gardening.jpeg',
                        date: ad.date ? new Date(ad.date) : new Date(),
                        location: ad.location || 'Location not specified',
                        createdAt: ad.createdAt ? new Date(ad.createdAt) : undefined,
                        updatedAt: ad.updatedAt ? new Date(ad.updatedAt) : undefined,
                    }));
                    setAllJobs(jobs);
                    setFilteredJobs(jobs);
                }
            } catch (error) {
                console.error('Error fetching ads:', error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchAds();
    }, []);

    // Get search query from URL when component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            setSearchQuery(params.get('q') || '');
        }
    }, []);

    // Apply filters and search when component mounts or search query changes
    useEffect(() => {
        if (!loading) {
            applyFilters();
        }
    }, [searchQuery, filters, allJobs, loading]);

    // Handle filter changes
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle search input change from FilterSection
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Apply filters to jobs
    const applyFilters = () => {
        let result = [...allJobs];

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

        // Sort results
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'new':
                    result.sort((a, b) => {
                        const dateA = a.date ? new Date(a.date).getTime() : 0;
                        const dateB = b.date ? new Date(b.date).getTime() : 0;
                        return dateB - dateA;
                    });
                    break;
                case 'popular':
                    // Mock popularity - in real app, would use view count or similar metric
                    result.sort(() => Math.random() - 0.5);
                    break;
                case 'high-paid':
                    result.sort((a, b) => {
                        const paymentA = parseFloat(a.payment.replace(/[^0-9.]/g, '')) || 0;
                        const paymentB = parseFloat(b.payment.replace(/[^0-9.]/g, '')) || 0;
                        return paymentB - paymentA;
                    });
                    break;
                case 'low-paid':
                    result.sort((a, b) => {
                        const paymentA = parseFloat(a.payment.replace(/[^0-9.]/g, '')) || 0;
                        const paymentB = parseFloat(b.payment.replace(/[^0-9.]/g, '')) || 0;
                        return paymentA - paymentB;
                    });
                    break;
            }
        }

        setFilteredJobs(result);
    };

    const handleClearFilters = () => {
        setFilters({ category: 'all', dateRange: 'alltime', payment: '', sortBy: '' });
        setSearchQuery('');
        if (typeof window !== 'undefined') {
            window.history.replaceState({}, '', window.location.pathname);
        }
    };

    return(
        <div className="min-h-screen" style={{ 
            backgroundColor: colors.secondary.pale
        }}>
            <Header ctx={ctx} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ExploreHeader />

                <FilterSection 
                    filters={filters}
                    searchQuery={searchQuery}
                    onFilterChange={handleFilterChange}
                    onSearch={applyFilters}
                    onSearchInputChange={handleSearchInputChange}
                />

                <ResultsSummary 
                    count={filteredJobs.length}
                    searchQuery={searchQuery}
                />

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-lg">Loading ads...</p>
                    </div>
                ) : filteredJobs.length > 0 ? (
                    <JobGrid jobs={filteredJobs} />
                ) : (
                    <EmptyState onClearFilters={handleClearFilters} />
                )}
            </main>
            <Footer/>
            <ScrollToTop />
        </div>
    )
};

export default Explore;