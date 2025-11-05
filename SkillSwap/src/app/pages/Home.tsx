"use client";

import { RequestInfo } from "rwsdk/worker";
import { PageLayout } from "./PageLayout";
import { colors } from "../theme";
import JobCard from "../components/JobCard";

// TODO: Remove this import when integrating with backend
import { mockJobs } from "../../types/job";

export function Home({ ctx }: RequestInfo) {
  return (
    <PageLayout ctx={ctx}>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                <span
                  className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"
                >
                  Exchange Skills,
                </span>
                <br />
                <span className="text-gray-900">Grow Together</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Connect with people who want to learn what you know, and teach what they master.
                SkillSwap makes peer-to-peer learning simple and rewarding.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {ctx.user ? (
                  <>
                    <a
                      href="/explore"
                      className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                      style={{ backgroundColor: colors.primary.main }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primary.hover}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary.main}
                    >
                      Explore Opportunities
                    </a>
                    <a
                      href="/profile"
                      className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-gray-700 font-semibold text-lg shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                    >
                      View My Profile
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="/register"
                      className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                      style={{ backgroundColor: colors.primary.main }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.primary.hover}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.primary.main}
                    >
                      Get Started Free
                    </a>
                    <a
                      href="/login"
                      className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-gray-700 font-semibold text-lg shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer"
                    >
                      Sign In
                    </a>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold" style={{ color: colors.primary.main }}>
                    500+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold" style={{ color: colors.primary.main }}>
                    1,200+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Skills Shared</div>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold" style={{ color: colors.primary.main }}>
                    350+
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Swaps Completed</div>
                </div>
              </div>
                <p className="text-sm text-gray-600 mt-10 italic">Disclaimer: All statistics are for demonstration purposes only and may not reflect real user activity.</p>
            </div>
          </div>
        </section>

        {/* Featured Opportunities */}
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Featured Opportunities
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the latest skill exchange opportunities from our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {mockJobs.map(job => (
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

            <div className="text-center">
              <a
                href="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 cursor-pointer"
                style={{
                  color: colors.primary.main,
                  borderColor: colors.primary.main
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary.main;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = colors.primary.main;
                }}
              >
                View All Opportunities
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                How SkillSwap Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Start exchanging skills in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 text-center hover:shadow-xl transition-shadow duration-200">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${colors.primary.main}15` }}
                >
                  <svg className="w-8 h-8" fill="none" stroke={colors.primary.main} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Find Skills</h3>
                <p className="text-gray-600">
                  Browse through hundreds of skills offered by our community members.
                  Find exactly what you want to learn.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 text-center hover:shadow-xl transition-shadow duration-200">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${colors.primary.main}15` }}
                >
                  <svg className="w-8 h-8" fill="none" stroke={colors.primary.main} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Make a Swap</h3>
                <p className="text-gray-600">
                  Connect with someone who has what you need and wants what you offer.
                  Agree on a fair exchange.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 text-center hover:shadow-xl transition-shadow duration-200">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${colors.primary.main}15` }}
                >
                  <svg className="w-8 h-8" fill="none" stroke={colors.primary.main} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Learn & Teach</h3>
                <p className="text-gray-600">
                  Meet up, share your knowledge, and grow together.
                  Build lasting connections in the process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!ctx.user && (
          <section className="py-16 bg-gradient-to-r from-teal-500 to-emerald-500">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Start Learning?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of learners and teachers in our community today.
              </p>
              <a
                href="/register"
                className="inline-block px-8 py-4 bg-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                style={{ color: colors.primary.main }}
              >
                Create Your Free Account
              </a>
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
}
