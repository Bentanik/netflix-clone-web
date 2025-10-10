import { Bell } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isNew: boolean;
}

interface NotificationBellProps {
  notifications?: Notification[];
}

export default function NotificationBell({ notifications = [] }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => n.isNew).length;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-white hover:text-gray-300 transition-colors p-1"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell size={22} />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold px-1"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
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
              className="absolute right-0 top-12 w-96 bg-black/95 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-700/50 bg-gradient-to-r from-gray-900/50 to-transparent">
                <h3 className="text-white font-semibold text-base">Notifications</h3>
                {unreadCount > 0 && (
                  <p className="text-gray-400 text-xs mt-1">{unreadCount} new notification{unreadCount > 1 ? 's' : ''}</p>
                )}
              </div>
              <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                {notifications.length > 0 ? (
                  <motion.div
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
                    {notifications.map((notif, index) => (
                      <motion.div
                        key={notif.id}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 }
                        }}
                        className={`p-4 border-b border-gray-800/50 hover:bg-gray-800/50 cursor-pointer transition-colors ${
                          notif.isNew ? 'bg-gray-900/30' : ''
                        } ${index === notifications.length - 1 ? 'border-b-0' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h4 className="text-white text-sm font-medium mb-1">{notif.title}</h4>
                            <p className="text-gray-400 text-xs leading-relaxed">{notif.message}</p>
                            <p className="text-gray-500 text-xs mt-2">{notif.time}</p>
                          </div>
                          {notif.isNew && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0"
                            />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="p-12 text-center">
                    <Bell size={40} className="text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400 text-sm">No notifications</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
