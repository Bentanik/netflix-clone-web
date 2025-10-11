import { User, LogOut, Settings, HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserData {
  name: string;
  email: string;
  avatar?: string;
}

interface UserProfileProps {
  user?: UserData | null;
  onLogin?: () => void;
  onLogout?: () => void;
  onSettings?: () => void;
}

export default function UserProfile({
  user = null,
  onLogin,
  onLogout,
  onSettings
}: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <motion.button
        onClick={onLogin}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-sm font-medium transition-colors shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Đăng nhập
      </motion.button>
    );
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-9 h-9 rounded overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 ring-2 ring-transparent group-hover:ring-white/30 transition-all">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="text-white" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-14 w-64 bg-black/95 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-700/50 bg-gradient-to-r from-gray-900/50 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User size={24} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{user.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5 truncate">{user.email}</p>
                  </div>
                </div>
              </div>
              <motion.div
                className="py-2"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                <motion.button
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  onClick={() => {
                    onSettings?.();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-white text-sm hover:bg-gray-800/50 flex items-center gap-3 transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <Settings size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                  <span>Settings</span>
                </motion.button>
                <motion.button
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="w-full px-4 py-3 text-left text-white text-sm hover:bg-gray-800/50 flex items-center gap-3 transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <HelpCircle size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                  <span>Help Center</span>
                </motion.button>
                <div className="border-t border-gray-700/50 my-2" />
                <motion.button
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  onClick={() => {
                    onLogout?.();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-white text-sm hover:bg-red-600/20 flex items-center gap-3 transition-colors group"
                  whileHover={{ x: 4 }}
                >
                  <LogOut size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                  <span className="group-hover:text-red-500 transition-colors">Đăng xuất</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}