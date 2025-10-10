import { useState } from 'react'
import { motion } from 'framer-motion'
import AuthModal from './AuthModal'
import { LogIn } from 'lucide-react'

export default function AuthDemo() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

    return (
        <>
            {/* Floating Demo Button */}
            <motion.button
                onClick={() => setIsAuthModalOpen(true)}
                className="fixed bottom-8 right-8 z-40 flex items-center gap-3 px-6 py-4 rounded-full font-semibold text-white shadow-2xl"
                style={{
                    background: 'linear-gradient(135deg, #E50914 0%, #B20710 100%)',
                    boxShadow: '0 10px 40px rgba(229, 9, 20, 0.4)'
                }}
                whileHover={{
                    scale: 1.05,
                    boxShadow: '0 15px 50px rgba(229, 9, 20, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
            >
                <LogIn className="w-5 h-5" />
                <span>Test Auth Modal</span>
            </motion.button>

            {/* Auth Modal */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </>
    )
}
