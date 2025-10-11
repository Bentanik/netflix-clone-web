/**
 * Notification Demo Component
 * Để test và showcase notification system
 */

import { useNotificationContext } from "@/hooks/useNotificationContext";

export default function NotificationDemo() {
    const notification = useNotificationContext();

    return (
        <div className="fixed bottom-4 left-4 z-50 p-4 bg-gray-800 rounded-lg shadow-xl">
            <h3 className="text-white text-sm font-semibold mb-3">
                Notification Demo
            </h3>
            <div className="flex flex-col gap-2">
                <button
                    onClick={() =>
                        notification.success("Thành công!", "Thao tác đã hoàn thành.")
                    }
                    className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors"
                >
                    Success
                </button>
                <button
                    onClick={() =>
                        notification.error("Lỗi!", "Đã xảy ra lỗi trong quá trình xử lý.")
                    }
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                >
                    Error
                </button>
                <button
                    onClick={() =>
                        notification.warning("Cảnh báo!", "Vui lòng kiểm tra lại thông tin.")
                    }
                    className="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 text-white text-xs rounded transition-colors"
                >
                    Warning
                </button>
                <button
                    onClick={() =>
                        notification.info("Thông tin", "Đây là thông báo thông tin.")
                    }
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                >
                    Info
                </button>
                <button
                    onClick={() => notification.clearAll()}
                    className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors"
                >
                    Clear All
                </button>
            </div>
        </div>
    );
}
