import { useEffect, type ReactNode } from "react";
import useNotification from "@/hooks/useNotification";
import NotificationContainer from "@/components/ui/NotificationContainer";
import { NotificationContext } from "@/contexts/NotificationContext";
import { subscribeToNotifications } from "@/services/notification-service";

interface NotificationProviderProps {
    children: ReactNode;
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

export function NotificationProvider({
    children,
    position = "top-right",
}: NotificationProviderProps) {
    const notificationMethods = useNotification();

    // Listen to notification events from non-React code
    useEffect(() => {
        const unsubscribe = subscribeToNotifications((payload) => {
            notificationMethods.addNotification(payload);
        });

        return unsubscribe;
    }, [notificationMethods]);

    return (
        <NotificationContext.Provider value={notificationMethods}>
            {children}
            <NotificationContainer
                notifications={notificationMethods.notifications}
                position={position}
            />
        </NotificationContext.Provider>
    );
}