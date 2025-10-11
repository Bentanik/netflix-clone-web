import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";
import { useEffect } from "react";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface NotificationProps {
    id: string;
    type: NotificationType;
    title: string;
    message?: string;
    duration?: number;
    onClose: (id: string) => void;
}

const notificationConfig = {
    success: {
        icon: CheckCircle2,
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500",
        iconColor: "text-green-500",
        titleColor: "text-green-400",
    },
    error: {
        icon: XCircle,
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500",
        iconColor: "text-red-500",
        titleColor: "text-red-400",
    },
    warning: {
        icon: AlertCircle,
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500",
        iconColor: "text-yellow-500",
        titleColor: "text-yellow-400",
    },
    info: {
        icon: Info,
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500",
        iconColor: "text-blue-500",
        titleColor: "text-blue-400",
    },
};

export default function Notification({
    id,
    type,
    title,
    message,
    duration = 5000,
    onClose,
}: NotificationProps) {
    const config = notificationConfig[type];
    const Icon = config.icon;

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose(id);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [id, duration, onClose]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.5 }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
            }}
            className={`
        relative flex items-start gap-3 p-4 rounded-lg border-l-4
        ${config.bgColor} ${config.borderColor}
        backdrop-blur-sm shadow-lg
        min-w-[320px] max-w-md
      `}
        >
            {/* Icon */}
            <motion.div
                initial={{ rotate: 0, scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1,
                }}
                className="flex-shrink-0"
            >
                <Icon className={`w-6 h-6 ${config.iconColor}`} />
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-semibold ${config.titleColor}`}>
                    {title}
                </h4>
                {message && (
                    <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                        {message}
                    </p>
                )}
            </div>

            {/* Close Button */}
            <button
                onClick={() => onClose(id)}
                className="flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors group"
                aria-label="Close notification"
            >
                <X className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </button>

            {/* Progress Bar */}
            {duration > 0 && (
                <motion.div
                    className={`absolute bottom-0 left-0 h-1 ${config.borderColor.replace(
                        "border",
                        "bg"
                    )} rounded-bl-lg`}
                    initial={{ width: "100%" }}
                    animate={{ width: "0%" }}
                    transition={{ duration: duration / 1000, ease: "linear" }}
                />
            )}
        </motion.div>
    );
}
