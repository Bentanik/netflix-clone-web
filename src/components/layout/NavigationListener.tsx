import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { subscribeToNavigate } from "@/services/navigation-service";

/**
 * NavigationListener Component
 * Listens to navigation events from non-React code and uses React Router's navigate
 */
export default function NavigationListener() {
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = subscribeToNavigate(({ path, replace }) => {
            navigate(path, { replace });
        });

        return unsubscribe;
    }, [navigate]);

    return null;
}
