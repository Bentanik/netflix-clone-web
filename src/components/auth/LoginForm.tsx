import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import InputAuth from '../ui/InputAuth';
import CustomButton from '../ui/CustomButton';
import { loginSchema } from '@/schemas/authSchema';
import type { LoginFormData } from '@/schemas/authSchema';

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => void;
    onSwitchToRegister: () => void;
}

export default function LoginForm({ onSubmit, onSwitchToRegister }: LoginFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Logo */}
            <div className="text-center mb-6">
                <h1 className="text-red-600 text-5xl font-bold tracking-wider">N</h1>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-1 text-center">Đăng nhập</h2>
            <p className="text-gray-400 text-sm mb-6 text-center">Chào mừng trở lại!</p>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputAuth
                    {...register('email')}
                    label="Email"
                    type="text"
                    placeholder="Email"
                    icon={Mail}
                    error={errors.email?.message}
                    autoComplete='off'
                />

                <InputAuth
                    {...register('password')}
                    label="Mật khẩu"
                    type="password"
                    placeholder="Mật khẩu"
                    icon={Lock}
                    error={errors.password?.message}
                    autoComplete='off'
                />

                <CustomButton
                    type="submit"
                    variant="danger"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting}
                >
                    Đăng nhập
                </CustomButton>
            </form>

            {/* Switch to Register */}
            <div className="mt-4 text-center">
                <p className="text-gray-400 text-xs">
                    Chưa có tài khoản?{' '}
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="text-white hover:underline font-medium"
                    >
                        Đăng ký ngay
                    </button>
                </p>
            </div>
        </motion.div>
    );
}
