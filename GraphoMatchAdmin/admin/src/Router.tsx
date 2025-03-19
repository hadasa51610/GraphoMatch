import { createBrowserRouter } from 'react-router';
import Home from './pages/HomePage';
import DashboardPage from './dashboard/DashboardPage';

export const Router = createBrowserRouter([
    {
        path: '/', element: <Home />,
        errorElement: <h1>ERROR!! please try again</h1>,
        children: [
            { path: '/', element: <Home /> },
            { path:'/dashboard', element: <DashboardPage/> },
        ]
    }
])