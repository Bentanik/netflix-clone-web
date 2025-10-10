import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

type CustomButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type CustomButtonSize = 'sm' | 'md' | 'lg';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: CustomButtonVariant;
    size?: CustomButtonSize;
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    isLoading?: boolean;
    fullWidth?: boolean;
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            icon: Icon,
            iconPosition = 'left',
            isLoading = false,
            fullWidth = false,
            className = '',
            disabled,
            ...props
        },
        ref
    ) => {
        // Variant styles
        const variantStyles = {
            primary: 'bg-white hover:bg-white/90 text-black font-bold shadow-lg',
            secondary: 'bg-gray-700/90 hover:bg-gray-600 text-white font-semibold shadow-lg backdrop-blur-sm',
            ghost: 'bg-transparent hover:bg-white/10 text-white border border-white/40 hover:border-white',
            danger: 'bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg',
        };

        // Size styles
        const sizeStyles = {
            sm: 'text-xs py-1.5 px-3',
            md: 'text-sm py-2.5 px-4',
            lg: 'text-base py-3 px-6',
        };

        // Icon size
        const iconSizes = {
            sm: 'w-3 h-3',
            md: 'w-4 h-4',
            lg: 'w-5 h-5',
        };

        const baseStyles = 'flex items-center justify-center gap-2 rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed';
        const widthStyle = fullWidth ? 'w-full' : '';

        return (
            <motion.div
                whileHover={{ scale: disabled || isLoading ? 1 : 1.05 }}
                whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
            >
                <button
                    ref={ref}
                    className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
                    disabled={disabled || isLoading}
                    {...props}
                >
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                    ) : (
                        <>
                            {Icon && iconPosition === 'left' && <Icon className={iconSizes[size]} />}
                            {children}
                            {Icon && iconPosition === 'right' && <Icon className={iconSizes[size]} />}
                        </>
                    )}
                </button>
            </motion.div>
        );
    }
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;
