import { forwardRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InputAuthProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
    icon?: LucideIcon
}

const InputAuth = forwardRef<HTMLInputElement, InputAuthProps>(
    ({ label, error, icon: Icon, type = 'text', className, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false)
        const isPassword = type === 'password'
        const inputType = isPassword && showPassword ? 'text' : type

        return (
            <div className="relative">
                <label className="block text-xs font-medium text-white/80 mb-1.5">
                    {label}
                </label>
                <div className="relative">
                    {Icon && (
                        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    )}
                    <input
                        ref={ref}
                        type={inputType}
                        className={cn(
                            'w-full py-2.5 bg-white/5 border rounded-lg text-sm text-white placeholder-white/30',
                            'focus:outline-none focus:border-[#E50914] focus:bg-white/10',
                            'transition-all duration-300',
                            Icon ? 'pl-10' : 'pl-3',
                            isPassword ? 'pr-10' : 'pr-3',
                            error ? 'border-red-500' : 'border-white/10',
                            className
                        )}
                        {...props}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                        </button>
                    )}
                </div>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 mt-1"
                    >
                        {error}
                    </motion.p>
                )}
            </div>
        )
    }
)

InputAuth.displayName = 'InputAuth'

export default InputAuth
