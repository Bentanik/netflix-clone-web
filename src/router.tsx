import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { UserLayout, AdminLayout } from '@/components/layout';
import PageLoader from '@/components/layout/PageLoader';

const HomePage = lazy(() => import('@/pages/Home'));
const MyList = lazy(() => import('@/pages/MyList'));
const MovieDetail = lazy(() => import('@/pages/MovieDetail'));
const VideoPlayer = lazy(() => import('@/pages/VideoPlayer'));
const AdminDashboard = lazy(() => import('@/pages/Admin/Dashboard'));
const Categories = lazy(() => import('@/pages/Admin/Categories'));
const People = lazy(() => import('@/pages/Admin/People'));
const MediaList = lazy(() => import('@/pages/Admin/MediaList'));

const router = createBrowserRouter([
    // User Routes
    {
        path: '/',
        element: <UserLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: 'home',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: 'my-list',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <MyList />
                    </Suspense>
                ),
            },
            {
                path: 'movie/:id',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <MovieDetail />
                    </Suspense>
                ),
            },
            {
                path: 'watch/:id',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <VideoPlayer />
                    </Suspense>
                ),
            },
        ],
    },
    // Admin Routes
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <AdminDashboard />
                    </Suspense>
                ),
            },
            {
                path: 'categories',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <Categories />
                    </Suspense>
                ),
            },
            {
                path: 'people',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <People />
                    </Suspense>
                ),
            },
            {
                path: 'media',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <MediaList />
                    </Suspense>
                ),
            },
            {
                path: 'movies',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <div className="p-8">
                            <h1 className="text-3xl font-bold">Movies Management</h1>
                            <p className="text-zinc-400 mt-2">Manage your movie library here.</p>
                        </div>
                    </Suspense>
                ),
            },
            {
                path: 'users',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <div className="p-8">
                            <h1 className="text-3xl font-bold">Users Management</h1>
                            <p className="text-zinc-400 mt-2">Manage platform users here.</p>
                        </div>
                    </Suspense>
                ),
            },
            {
                path: 'settings',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <div className="p-8">
                            <h1 className="text-3xl font-bold">Settings</h1>
                            <p className="text-zinc-400 mt-2">Configure platform settings.</p>
                        </div>
                    </Suspense>
                ),
            },
        ],
    },
]);

export default router;