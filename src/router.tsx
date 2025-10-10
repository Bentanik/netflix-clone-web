import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from '@/pages/Home';
import MyList from '@/pages/MyList';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'home',
                element: <Home />,
            },
            {
                path: 'my-list',
                element: <MyList />,
            },
        ],
    },
]);

export default router;