import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputAuth from './InputAuth'
import { loginSchema, registerSchema } from '@/schemas/authSchema'
import type { LoginFormData, RegisterFormData } from '@/schemas/authSchema'

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

type AuthMode = 'login' | 'register'

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [mode, setMode] = useState<AuthMode>('login')

    // Login form
    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: loginErrors },
        reset: resetLogin
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    // Register form
    const {
        register: registerRegister,
        handleSubmit: handleSubmitRegister,
        formState: { errors: registerErrors },
        reset: resetRegister
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    })

    const onLoginSubmit = (data: LoginFormData) => {
        console.log('Login:', data)
        // Handle login logic here
    }

    const onRegisterSubmit = (data: RegisterFormData) => {
        console.log('Register:', data)
        // Handle register logic here
    }

    const switchMode = () => {
        setMode(mode === 'login' ? 'register' : 'login')
        // Reset forms when switching
        resetLogin()
        resetRegister()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                    />

                    {/* Modal Container with scroll */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
                        <motion.div
                            className="relative w-full max-w-md pointer-events-auto my-8"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        >
                            {/* Background with gradient */}
                            <div
                                className="absolute inset-0 rounded-2xl"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.98) 0%, rgba(10, 10, 10, 0.98) 100%)',
                                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 100px rgba(229, 9, 20, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)'
                                }}
                            />

                            {/* Content */}
                            <div className="relative p-6">
                                {/* Close button */}
                                <motion.button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>

                                {/* Logo/Title */}
                                <motion.div
                                    className="text-center mb-6"
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
                                >
                                    <motion.div
                                        className="inline-block text-5xl font-black mb-2"
                                        style={{
                                            background: 'linear-gradient(135deg, #E50914 0%, #FF0A16 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            textShadow: '0 0 40px rgba(229, 9, 20, 0.3)'
                                        }}
                                        animate={{
                                            textShadow: [
                                                '0 0 40px rgba(229, 9, 20, 0.3)',
                                                '0 0 60px rgba(229, 9, 20, 0.5)',
                                                '0 0 40px rgba(229, 9, 20, 0.3)'
                                            ]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        N
                                    </motion.div>
                                    <h2 className="text-2xl font-bold text-white mb-1.5">
                                        {mode === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}
                                    </h2>
                                    <p className="text-white/60 text-sm">
                                        {mode === 'login'
                                            ? 'Chào mừng bạn quay trở lại'
                                            : 'Tạo tài khoản mới để tiếp tục'}
                                    </p>
                                </motion.div>

                                {/* Form */}
                                <AnimatePresence mode="wait">
                                    {mode === 'login' ? (
                                        <motion.form
                                            key="login"
                                            onSubmit={handleSubmitLogin(onLoginSubmit)}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: 20, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            {/* Email Input */}
                                            <InputAuth
                                                label="Email"
                                                type="email"
                                                placeholder="example@email.com"
                                                icon={Mail}
                                                error={loginErrors.email?.message}
                                                {...registerLogin('email')}
                                            />

                                            {/* Password Input */}
                                            <InputAuth
                                                label="Mật khẩu"
                                                type="password"
                                                placeholder="••••••••"
                                                icon={Lock}
                                                error={loginErrors.password?.message}
                                                {...registerLogin('password')}
                                            />

                                            {/* Forgot Password */}
                                            <div className="text-right">
                                                <button
                                                    type="button"
                                                    className="text-xs text-white/60 hover:text-[#E50914] transition-colors"
                                                >
                                                    Quên mật khẩu?
                                                </button>
                                            </div>

                                            {/* Submit Button */}
                                            <motion.button
                                                type="submit"
                                                className="w-full mt-5 py-3 rounded-lg font-semibold text-white relative overflow-hidden group"
                                                style={{
                                                    background: 'linear-gradient(135deg, #E50914 0%, #B20710 100%)',
                                                    boxShadow: '0 4px 20px rgba(229, 9, 20, 0.3)'
                                                }}
                                                whileHover={{ scale: 1.02, boxShadow: '0 6px 30px rgba(229, 9, 20, 0.5)' }}
                                                whileTap={{ scale: 0.98 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                    initial={{ x: '-100%' }}
                                                    whileHover={{ x: '100%' }}
                                                    transition={{ duration: 0.6 }}
                                                />
                                                <span className="relative z-10">Đăng Nhập</span>
                                            </motion.button>
                                        </motion.form>
                                    ) : (
                                        <motion.form
                                            key="register"
                                            onSubmit={handleSubmitRegister(onRegisterSubmit)}
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: 20, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            {/* Display Name Input */}
                                            <InputAuth
                                                label="Tên hiển thị"
                                                type="text"
                                                placeholder="Nguyễn Văn A"
                                                icon={User}
                                                error={registerErrors.displayName?.message}
                                                {...registerRegister('displayName')}
                                            />

                                            {/* Email Input */}
                                            <InputAuth
                                                label="Email"
                                                type="email"
                                                placeholder="example@email.com"
                                                icon={Mail}
                                                error={registerErrors.email?.message}
                                                {...registerRegister('email')}
                                            />

                                            {/* Password Input */}
                                            <InputAuth
                                                label="Mật khẩu"
                                                type="password"
                                                placeholder="••••••••"
                                                icon={Lock}
                                                error={registerErrors.password?.message}
                                                {...registerRegister('password')}
                                            />

                                            {/* Confirm Password Input */}
                                            <InputAuth
                                                label="Xác nhận mật khẩu"
                                                type="password"
                                                placeholder="••••••••"
                                                icon={Lock}
                                                error={registerErrors.confirmPassword?.message}
                                                {...registerRegister('confirmPassword')}
                                            />

                                            {/* Submit Button */}
                                            <motion.button
                                                type="submit"
                                                className="w-full mt-5 py-3 rounded-lg font-semibold text-white relative overflow-hidden group"
                                                style={{
                                                    background: 'linear-gradient(135deg, #E50914 0%, #B20710 100%)',
                                                    boxShadow: '0 4px 20px rgba(229, 9, 20, 0.3)'
                                                }}
                                                whileHover={{ scale: 1.02, boxShadow: '0 6px 30px rgba(229, 9, 20, 0.5)' }}
                                                whileTap={{ scale: 0.98 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                    initial={{ x: '-100%' }}
                                                    whileHover={{ x: '100%' }}
                                                    transition={{ duration: 0.6 }}
                                                />
                                                <span className="relative z-10">Đăng Ký</span>
                                            </motion.button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>

                                {/* Switch Mode */}
                                <motion.div
                                    className="mt-5 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <p className="text-white/60 text-sm">
                                        {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                                        <button
                                            type="button"
                                            onClick={switchMode}
                                            className="ml-2 text-[#E50914] font-semibold hover:underline transition-all"
                                        >
                                            {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
                                        </button>
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
