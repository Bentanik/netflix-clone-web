import { motion } from 'framer-motion'
import { PlayIcon } from 'lucide-react'

// Floating particles background component
function FloatingParticles() {
    return (
        <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        backgroundColor: i % 4 === 0 ? '#ff69b4' : i % 4 === 1 ? '#ff1493' : i % 4 === 2 ? '#ba55d3' : '#da70d6',
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: 0.4
                    }}
                    animate={{
                        scale: [0, 1.5, 0],
                        opacity: [0, 0.8, 0],
                        y: [0, -80, -160],
                        x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20]
                    }}
                    transition={{
                        duration: 4 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "easeOut"
                    }}
                />
            ))}
        </div>
    )
}

// Animated background gradient component
function AnimatedBackground() {
    return (
        <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
                background: [
                    `radial-gradient(circle at 20% 50%, #ff69b415 0%, transparent 50%)`,
                    `radial-gradient(circle at 80% 20%, #ff149320 0%, transparent 50%)`,
                    `radial-gradient(circle at 40% 80%, #ba55d310 0%, transparent 50%)`,
                    `radial-gradient(circle at 20% 50%, #ff69b415 0%, transparent 50%)`
                ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
    )
}

// Animated logo component
function AnimatedLogo() {
    return (
        <motion.div
            className="relative w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-8"
            style={{
                background: `linear-gradient(135deg, #ff69b4, #ff1493)`,
                boxShadow: `0 0 60px #ff69b450, 0 0 120px #ff149320, inset 0 2px 10px rgba(255, 255, 255, 0.1)`
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
            {/* Inner rotating elements */}
            <motion.div
                className="absolute inset-2 rounded-full border-2 opacity-30"
                style={{ borderColor: 'var(--text-primary)' }}
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            <motion.div
                className="absolute inset-4 rounded-full border opacity-20"
                style={{ borderColor: 'var(--text-primary)' }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />

            {/* Play icon with animation */}
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
                <PlayIcon className="w-10 h-10 text-white fill-current drop-shadow-lg" />
            </motion.div>
        </motion.div>
    )
}

// Loading title component
function LoadingTitle() {
    return (
        <>
            <motion.h1
                className="text-4xl md:text-5xl font-black mb-3 tracking-wider text-white"
                style={{
                    textShadow: '0 0 30px rgba(255, 105, 180, 0.4)'
                }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            >
                ĐANG TẢI
            </motion.h1>

            <motion.p
                className="text-lg md:text-xl font-medium mb-8 tracking-wide text-white"
                style={{
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)'
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                Chuẩn bị trải nghiệm điện ảnh của bạn
            </motion.p>
        </>
    )
}

// Progress bar component
function ProgressBar() {
    return (
        <motion.div
            className="relative w-64 h-2 mx-auto rounded-full overflow-hidden mb-6"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: 'inset 0 2px 4px rgba(255, 105, 180, 0.2)'
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
        >
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `linear-gradient(90deg, #ff69b4, #ff1493, #ff69b4)`,
                    boxShadow: `0 0 20px #ff69b460`
                }}
                animate={{
                    x: ['-120%', '120%'],
                    scaleX: [0.2, 1.2, 0.2]
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />

            {/* Shimmer effect */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 105, 180, 0.6), transparent)'
                }}
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
        </motion.div>
    )
}

// Loading dots component
function LoadingDots() {
    return (
        <motion.div
            className="flex justify-center space-x-2"
        >
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#ff69b4' }}
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                        y: [0, -6, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: 'easeInOut'
                    }}
                />
            ))}
        </motion.div>
    )
}

export default function ReloadLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
            style={{ backgroundColor: 'var(--background-primary)' }}>

            <AnimatedBackground />
            <FloatingParticles />

            <motion.div
                className="relative z-10 text-center max-w-md mx-auto px-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
            >
                <AnimatedLogo />
                <LoadingTitle />
                <ProgressBar />
                <LoadingDots />
            </motion.div>
        </div>
    )
}