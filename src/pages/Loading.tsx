import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Loading() {
    const navigate = useNavigate();
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setShowContent(true);
        const timer = setTimeout(() => {
            navigate('/app/home');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center overflow-hidden"
        >
            <div className="text-center relative">
                {/* Background particles effect */}
                <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-red-500 rounded-full opacity-20"
                            initial={{
                                x: Math.random() * 1920,
                                y: Math.random() * 1080,
                                scale: 0
                            }}
                            animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 0.3, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                    animate={showContent ? { scale: 1, opacity: 1, rotate: 0 } : {}}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                    className="relative z-10"
                >
                    <motion.h1
                        animate={{
                            scale: [1, 1.05, 1],
                            textShadow: [
                                "0 0 20px rgba(239, 68, 68, 0.5)",
                                "0 0 40px rgba(239, 68, 68, 0.8)",
                                "0 0 20px rgba(239, 68, 68, 0.5)"
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-9xl font-black mb-6 tracking-wider"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                        ĐIỆN ẢNH
                    </motion.h1>

                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={showContent ? { width: "300px", opacity: 1 } : {}}
                        transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                        className="h-2 bg-gradient-to-r from-red-500 via-red-400 to-red-500 mx-auto rounded-full mb-8 relative overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={showContent ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="space-y-4"
                    >
                        <motion.p
                            animate={{
                                opacity: [0.7, 1, 0.7],
                                scale: [1, 1.02, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="text-white text-2xl font-light tracking-wide"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >
                            Chuẩn bị trải nghiệm điện ảnh của bạn
                        </motion.p>

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="inline-block"
                        >
                            <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full mx-auto"></div>
                        </motion.div>
                    </motion.div>

                    {/* Floating elements */}
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 5, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -top-16 -right-16 text-red-400 opacity-30"
                    >
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, 10, 0],
                            rotate: [0, -5, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                        className="absolute -bottom-16 -left-16 text-red-300 opacity-20"
                    >
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}