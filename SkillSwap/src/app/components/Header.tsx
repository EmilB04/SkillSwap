export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow mb-4">
      <a href="/" className="flex items-center">
        <img src="./src/app/assets/logo.png" alt="Logo" className="h-10 w-auto"/>
      </a>

      <div className="flex-1 max-w-md mx-6">
        <form action="#" method="get" className="w-full">
          <input type="text" placeholder="Search..." className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"/>
        </form>
      </div>

      <nav className="flex items-center gap-10 text-gray-700">
        <a href="#" className="hover:text-green-600"> Explore </a>
        <a href="#" className="hover:text-green-600"> Contact us </a>
        <a href="#" className="flex items-center">
          <img src="./src/app/assets/icons/notification-icon.png" alt="Notifications" className="h-6 w-6" />
        </a>
        <a href="#" className="flex items-center">
          <img src="./src/app/assets/icons/email-icon.png" alt="Messages" className="h-6 w-6" />
        </a>
        <a href="#" className="flex items-center">
          <img src="./src/app/assets/icons/boy-icon.png" alt="Profile" className="h-6 w-6" />
        </a>
      </nav>
    </header>
  );
}
