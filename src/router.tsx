import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from '@/pages/Home';
import MyList from '@/pages/MyList';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'home',
                element: <HomePage />,
            },
            {
                path: 'my-list',
                element: <MyList />,
            },
        ],
    },
]);

export default router;