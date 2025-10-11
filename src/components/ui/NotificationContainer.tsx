import { AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import Notification, { type NotificationProps } from "@/components/ui/Notification";

interface NotificationContainerProps {
    notifications: NotificationProps[];
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

export default function NotificationContainer({
    notifications,
    position = "top-right",
}: NotificationContainerProps) {
    return createPortal(
        <div
            className={`fixed z-[9999] flex flex-col gap-3 ${positionClasses[position]}`}
            aria-live="polite"
            aria-atomic="true"
        >
            <AnimatePresence mode="popLayout">
                {notifications.map((notification) => (
                    <Notification key={notification.id} {...notification} />
                ))}
            </AnimatePresence>
        </div>,
        document.body
    );
}
