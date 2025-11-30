"use client";

import { RequestInfo } from "rwsdk/worker";
import { PageLayout } from "./PageLayout";
import { colors } from "../theme";
import { TopContributors, type Contributor } from "../components/home/TopContributors";
import { HowItWorks } from "../components/home/HowItWorks";
import { FeaturedOpportunities } from "../components/home/FeaturedOpportunities";
import { Hero } from "../components/home/Hero";
import ScrollToTop from "../components/ScrollToTop";
import { useState, useEffect } from "react";
import { Job } from "../../types/job";

// Mock data for top contributors
// TODO: Replace with real data from backend
const topContributors: Contributor[] = [
  {
    id: 1,
    name: "Sara Hansen",
    avatar: "SJ",
    completedSwaps: 45,
    rating: 4.9,
    skills: ["Web Development", "UI/UX Design"],
    profileImage: null,
  },
  {
    id: 2,
    name: "Michael Johansen",
    avatar: "MC",
    completedSwaps: 38,
    rating: 4.8,
    skills: ["Photography", "Video Editing"],
    profileImage: null,
  },
  {
    id: 3,
    name: "Emma Steinbakken",
    avatar: "ER",
    completedSwaps: 35,
    rating: 5.0,
    skills: ["Language Teaching", "Cooking"],
    profileImage: null,
  },
  {
    id: 4,
    name: "Thomas Seltzer",
    avatar: "DK",
    completedSwaps: 32,
    rating: 4.7,
    skills: ["Guitar Lessons", "Music Theory"],
    profileImage: null,
  },
  {
    id: 5,
    name: "Lisa Andersen",
    avatar: "LA",
    completedSwaps: 28,
    rating: 4.9,
    skills: ["Yoga Instruction", "Meditation"],
    profileImage: null,
  },
];

export function Home({ ctx }: RequestInfo) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAds() {
      try {
        const response = await fetch('/api/v1/ads');
        const result = await response.json() as { success: boolean; data?: any[] };
        
        if (result.success && result.data) {
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
          setJobs(jobs);
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAds();
  }, []);

  return (
    <PageLayout ctx={ctx}>
      <div className="min-h-screen" style={{ backgroundColor: colors.secondary.pale }}>
        {/* Hero Section */}
        <Hero isLoggedIn={!!ctx.user} />

        {/* Featured Opportunities */}
        {loading ? (
          <div className="text-center py-12">Loading opportunities...</div>
        ) : (
          <FeaturedOpportunities jobs={jobs} />
        )}
        
        {/* How It Works */}
        <HowItWorks />

        {/* Top Contributors This Month */}
        <TopContributors contributors={topContributors} />

        {/* CTA Section (Call to Action) */}
        {!ctx.user && (
          <section className="py-16" style={{ backgroundColor: colors.primary.main }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Start Learning?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of learners and teachers in our community today.
              </p>
              <a
                href="/register"
                className="inline-block px-8 py-3 bg-white rounded-lg font-medium text-base transition-all duration-200 cursor-pointer"
                style={{ color: colors.primary.main }}
              >
                Create Your Free Account
              </a>
            </div>
          </section>
        )}
      </div>
      <ScrollToTop />
    </PageLayout>
  );
}
