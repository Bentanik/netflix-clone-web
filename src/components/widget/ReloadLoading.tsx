import { motion } from 'framer-motion'

// Floating particles background component
function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        backgroundColor: i % 3 === 0 ? '#E50914' : i % 3 === 1 ? '#B20710' : '#831010',
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: 0.3,
                        filter: 'blur(1px)'
                    }}
                    animate={{
                        scale: [0, 1.8, 0],
                        opacity: [0, 0.6, 0],
                        y: [0, -100, -200],
                        x: [0, Math.random() * 30 - 15, Math.random() * 60 - 30]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 4,
                        ease: [0.4, 0, 0.2, 1]
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
            className="absolute inset-0 opacity-30"
            animate={{
                background: [
                    `radial-gradient(circle at 20% 50%, #E5091420 0%, transparent 50%)`,
                    `radial-gradient(circle at 80% 20%, #B2071030 0%, transparent 50%)`,
                    `radial-gradient(circle at 40% 80%, #83101015 0%, transparent 50%)`,
                    `radial-gradient(circle at 20% 50%, #E5091420 0%, transparent 50%)`
                ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
        />
    )
}

// Animated logo component - Netflix "N" style
function AnimatedLogo() {
    return (
        <div className="relative w-32 h-32 mx-auto mb-10">
            {/* Outer rotating ring */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `conic-gradient(from 0deg, #E50914, #B20710, #831010, #E50914)`,
                    filter: 'blur(8px)',
                    opacity: 0.6
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            {/* Main logo container */}
            <motion.div
                className="relative w-full h-full rounded-full flex items-center justify-center"
                style={{
                    background: `linear-gradient(135deg, #E50914 0%, #B20710 100%)`,
                    boxShadow: `0 0 60px rgba(229, 9, 20, 0.5), 0 0 100px rgba(229, 9, 20, 0.3), inset 0 2px 20px rgba(255, 255, 255, 0.1)`
                }}
                animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                        '0 0 60px rgba(229, 9, 20, 0.5), 0 0 100px rgba(229, 9, 20, 0.3)',
                        '0 0 80px rgba(229, 9, 20, 0.7), 0 0 120px rgba(229, 9, 20, 0.4)',
                        '0 0 60px rgba(229, 9, 20, 0.5), 0 0 100px rgba(229, 9, 20, 0.3)'
                    ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
            >
                {/* Inner rotating ring */}
                <motion.div
                    className="absolute inset-3 rounded-full border-2 border-white/20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                />

                {/* Netflix "N" Letter */}
                <motion.div
                    className="text-7xl font-black text-white tracking-tighter"
                    style={{
                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)',
                        fontFamily: 'system-ui, -apple-system, sans-serif'
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        textShadow: [
                            '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)',
                            '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 50px rgba(255, 255, 255, 0.5)',
                            '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)'
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
                >
                    N
                </motion.div>

                {/* Shine effect */}
                <motion.div
                    className="absolute inset-0 rounded-full overflow-hidden"
                    style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
            </motion.div>
        </div>
    )
}

// Loading title component
function LoadingTitle() {
    return (
        <>
            <motion.h1
                className="text-5xl md:text-6xl font-black mb-4 tracking-wider"
                style={{
                    background: 'linear-gradient(to right, #fff, #E50914, #fff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 40px rgba(229, 9, 20, 0.3)'
                }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
                <motion.span
                    animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    style={{
                        background: 'linear-gradient(90deg, #fff 0%, #E50914 25%, #fff 50%, #E50914 75%, #fff 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}
                >
                    ĐANG TẢI
                </motion.span>
            </motion.h1>

            <motion.p
                className="text-xl md:text-2xl font-medium mb-10 tracking-wide text-white/90"
                style={{
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
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
            className="relative w-80 h-1.5 mx-auto rounded-full overflow-hidden mb-8"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Main progress bar */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `linear-gradient(90deg, #E50914 0%, #FF0A16 50%, #E50914 100%)`,
                    boxShadow: `0 0 20px rgba(229, 9, 20, 0.6), 0 0 40px rgba(229, 9, 20, 0.4)`
                }}
                animate={{
                    x: ['-100%', '100%'],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.2, 1],
                    repeatDelay: 0.2
                }}
            />

            {/* Shimmer overlay */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                    filter: 'blur(4px)'
                }}
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />

            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `radial-gradient(ellipse at center, rgba(229, 9, 20, 0.6) 0%, transparent 70%)`,
                    filter: 'blur(8px)',
                }}
                animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
            />
        </motion.div>
    )
}

// Loading dots component
function LoadingDots() {
    return (
        <motion.div
            className="flex justify-center items-center space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
        >
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="rounded-full"
                    style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: '#E50914',
                        boxShadow: '0 0 10px rgba(229, 9, 20, 0.5)'
                    }}
                    animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.4, 1, 0.4],
                        y: [0, -8, 0]
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: [0.4, 0, 0.2, 1]
                    }}
                />
            ))}
        </motion.div>
    )
}

export default function ReloadLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
            style={{
                backgroundColor: 'var(--background-primary)',
            }}>

            {/* Background layers */}
            <AnimatedBackground />
            <FloatingParticles />

            {/* Vignette effect */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)'
                }}
            />

            {/* Main content */}
            <motion.div
                className="relative z-10 text-center max-w-2xl mx-auto px-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
                <AnimatedLogo />
                <LoadingTitle />
                <ProgressBar />
                <LoadingDots />
            </motion.div>

            {/* Bottom glow effect */}
            <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1/3 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center bottom, rgba(229, 9, 20, 0.15) 0%, transparent 70%)',
                    filter: 'blur(40px)'
                }}
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.2, 1]
                }}
            />
        </div>
    )
}