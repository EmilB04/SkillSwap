"use client";

import type { AppContext } from "@/worker";
import ProfileMenuFlyout from "./profile/HeaderMenuFlyout";
import SearchBar from "./SearchBar";

interface HeaderProps {
  ctx?: AppContext;
}

export default function Header({ ctx }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow mb-4">
      <a href="/" className="flex items-center gap-3">
        <img src="/src/app/assets/logo.png" alt="Logo" className="h-12 w-auto" />
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-[#439F8F] via-[#48ECA1] to-[#394251] bg-clip-text text-transparent inline-block">
          SkillSwap
        </h1>
      </a>

      <div className="flex-1 max-w-md mx-6">
        <SearchBar />
      </div>

      <nav className="flex items-center gap-10 text-gray-700">
        <a href="/explore" className="hover:text-green-600"> Explore </a>
        <a href="/contact" className="hover:text-green-600"> Contact us </a>
        <a href="#" className="flex items-center">
          <img src="./src/app/assets/icons/notification-icon.png" alt="Notifications" className="h-6 w-6" />
        </a>
        <a href="#" className="flex items-center">
          <img src="./src/app/assets/icons/email-icon.png" alt="Messages" className="h-6 w-6" />
        </a>
        
        {/* Profile Menu or Sign Up */}
        <ProfileMenuFlyout user={ctx?.user} />
      </nav>
    </header>
  );
}
