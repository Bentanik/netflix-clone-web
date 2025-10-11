import { useState, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBox from '@/components/widget/SearchBox';
import NotificationBell from '@/components/widget/NotificationBell';
import UserProfile from '@/components/widget/UserProfile';
import { useAppSelector } from '@/stores';
import { useLogout } from '@/services';

const AuthModal = lazy(() => import('@/components/auth/AuthModal'));

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();

  const user = useAppSelector(state => state.user);
  const { mutate: logout } = useLogout();

  const navItems = [
    { label: 'Home', path: '/home', authRequired: false },
    { label: 'TV Shows', path: '/tv-shows', authRequired: false },
    { label: 'Movies', path: '/movies', authRequired: false },
    { label: 'New & Popular', path: '/new', authRequired: false },
    { label: 'My List', path: '/my-list', authRequired: true },
    { label: 'Collections', path: '/collections', authRequired: true },
    { label: 'Friends', path: '/friends', authRequired: true },
  ];

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
    logout();
  };

  const handleSettings = () => {
    console.log('Settings clicked');
    // Navigate to settings
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Background with better gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none" />

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
                if (item.authRequired && !user.displayName) return null;
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
            {user.displayName ? (
              <>
                <SearchBox onSearch={handleSearch} placeholder="Titles, people, genres" />
                <NotificationBell notifications={mockNotifications} />
                <UserProfile
                  user={{
                    name: user.displayName || 'User',
                    email: user.email || "Email",
                    avatar: user.avatarUrl || undefined,
                  }}
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                  onSettings={handleSettings}
                />
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modal - Lazy loaded */}
      <Suspense fallback={null}>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </Suspense>
    </>
  );
}
