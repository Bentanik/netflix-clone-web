import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import InputAuth from '../ui/InputAuth';
import CustomButton from '../ui/CustomButton';
import { registerSchema } from '@/schemas/authSchema';
import type { RegisterFormData } from '@/schemas/authSchema';

interface RegisterFormProps {
    onSubmit: (data: RegisterFormData) => void;
    onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSubmit, onSwitchToLogin }: RegisterFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Logo */}
            <div className="text-center mb-6">
                <h1 className="text-red-600 text-5xl font-bold tracking-wider">N</h1>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-1 text-center">Đăng ký</h2>
            <p className="text-gray-400 text-sm mb-6 text-center">Tạo tài khoản mới</p>

            {/* Register Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputAuth
                    {...register('displayName')}
                    label="Tên hiển thị"
                    type="text"
                    placeholder="Tên hiển thị"
                    icon={User}
                    error={errors.displayName?.message}
                />

                <InputAuth
                    {...register('email')}
                    label="Email"
                    type="email"
                    placeholder="Email"
                    icon={Mail}
                    error={errors.email?.message}
                />

                <InputAuth
                    {...register('password')}
                    label="Mật khẩu"
                    type="password"
                    placeholder="Mật khẩu"
                    icon={Lock}
                    error={errors.password?.message}
                />

                <InputAuth
                    {...register('confirmPassword')}
                    label="Xác nhận mật khẩu"
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    icon={Lock}
                    error={errors.confirmPassword?.message}
                />

                <CustomButton
                    type="submit"
                    variant="danger"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting}
                >
                    Đăng ký
                </CustomButton>
            </form>

            {/* Switch to Login */}
            <div className="mt-4 text-center">
                <p className="text-gray-400 text-xs">
                    Đã có tài khoản?{' '}
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-white hover:underline font-medium"
                    >
                        Đăng nhập ngay
                    </button>
                </p>
            </div>
        </motion.div>
    );
}
