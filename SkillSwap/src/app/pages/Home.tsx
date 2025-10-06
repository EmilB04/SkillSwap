import { RequestInfo } from "rwsdk/worker";
import JobCard from "../components/JobCard";

export function Home({ ctx }: RequestInfo) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Welcome to SkillSwap</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Connect, learn, and share skills with others in your community</p>
        </header>

        <div className="flex gap-6 overflow-x-auto mb-12">
          <JobCard />
          <JobCard />
          <JobCard />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          {ctx.user?.name ? (
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-6">Welcome back, {ctx.user.name}!</p>
              <div className="flex justify-center space-x-4">
                <a href="/protected" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
                  Dashboard
                </a>
                <a href="/user/logout" className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-200 font-medium">
                  Logout
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-6">Join SkillSwap to start your learning journey</p>
              <div className="flex justify-center space-x-4">
                <a href="/user/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
                  Get Started
                </a>
                <a href="/user/login" className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-200 font-medium">
                  Sign In
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Skills</h3>
            <p className="text-gray-600">Discover people with the skills you want to learn</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Knowledge</h3>
            <p className="text-gray-600">Teach others and build your reputation in the community</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect</h3>
            <p className="text-gray-600">Message and coordinate with other learners and teachers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
