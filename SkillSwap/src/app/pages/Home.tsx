"use client";

import { RequestInfo } from "rwsdk/worker";
import { PageLayout } from "./PageLayout";
import { colors, borderRadius, shadows, transition } from "../theme";
import { TopContributors, type Contributor } from "../components/home/TopContributors";
import { HowItWorks } from "../components/home/HowItWorks";
import { FeaturedOpportunities } from "../components/home/FeaturedOpportunities";
import { Hero } from "../components/home/Hero";
import ScrollToTop from "../components/ScrollToTop";
import TestUserToggle from "../components/TestUserToggle";

// TODO: Remove this import when integrating with backend
import { mockJobs } from "../../types/job";

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
  return (
    <PageLayout ctx={ctx}>
      <div className="min-h-screen" style={{ 
        background: `linear-gradient(to bottom, ${colors.secondary.cream} 0%, ${colors.secondary.pale} 100%)`,
      }}>
        {/* Hero Section */}
        <Hero isLoggedIn={!!ctx.user} />

        {/* Featured Opportunities */}
        <FeaturedOpportunities jobs={mockJobs} />
        
        {/* How It Works */}
        <HowItWorks />

        {/* Top Contributors This Month */}
        <TopContributors contributors={topContributors} />

        {/* CTA Section (Call to Action) */}
        {!ctx.user && (
          <section 
            className="py-16"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.dark} 100%)`,
            }}
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 
                className="text-3xl sm:text-4xl font-bold text-white mb-6"
                style={{ fontFamily: 'Space Grotesk' }}
              >
                Ready to Start Learning?
              </h2>
              <p className="text-xl mb-8" style={{ color: 'rgba(255, 255, 255, 0.92)' }}>
                Join thousands of learners and teachers in our community today.
              </p>
              <a
                href="/register"
                className="inline-block font-bold cursor-pointer"
                style={{ 
                  padding: '0.875rem 2rem',
                  backgroundColor: colors.neutral.white,
                  color: colors.primary.main,
                  borderRadius: borderRadius.md,
                  transition: `all ${transition.normal} ease-out`,
                  fontSize: '1.063rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Create Your Free Account
              </a>
            </div>
          </section>
        )}
      </div>
      <ScrollToTop />
      <TestUserToggle />
    </PageLayout>
  );
}
