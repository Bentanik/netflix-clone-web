import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBox from './SearchBox';
import NotificationBell from './NotificationBell';
import UserProfile from './UserProfile';
import AuthModal from './AuthModal';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/home' },
    { label: 'TV Shows', path: '/tv-shows' },
    { label: 'Movies', path: '/movies' },
    { label: 'New & Popular', path: '/new' },
    { label: 'My List', path: '/my-list' },
    { label: 'Collections', path: '/collections' },
    { label: 'Friends', path: '/friends' },
  ];

  // Mock user data - thay thế bằng data thật từ context/store
  const mockUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/100',
  };

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      title: 'New Episode',
      message: 'Stranger Things Season 5 Episode 1 is now available',
      time: '2 hours ago',
      isNew: true,
    },
    {
      id: 2,
      title: 'Coming Soon',
      message: 'The Witcher Season 4 premieres next week',
      time: '1 day ago',
      isNew: true,
    },
  ];

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    onSearch?.(query);
  };

  const handleLogin = () => {
    console.log('Login clicked');
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Implement logout logic
  };

  const handleSettings = () => {
    console.log('Settings clicked');
    // Navigate to settings
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Background with better gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />

        <div className="relative flex items-center justify-between px-12 py-6">
          {/* Logo */}
          <div className="flex items-center gap-10">
            <h1 className="text-red-600 text-3xl font-bold tracking-wider cursor-pointer hover:text-red-700 transition-colors">
              NETFLIX
            </h1>

            {/* Navigation */}
            <nav className="hidden md:flex gap-7">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-sm transition-colors font-medium relative group ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-7">
            <SearchBox onSearch={handleSearch} placeholder="Titles, people, genres" />
            <NotificationBell notifications={mockNotifications} />
            <UserProfile
              user={mockUser}
              onLogin={handleLogin}
              onLogout={handleLogout}
              onSettings={handleSettings}
            />
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
