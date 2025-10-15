import { Outlet } from 'react-router-dom';
import { Header } from '@/components';

/**
 * UserLayout - Layout cho người dùng thường
 * Bao gồm Header và nội dung chính
 */
export default function UserLayout() {
    return (
        <div className="min-h-screen bg-[#141414] text-white">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}
