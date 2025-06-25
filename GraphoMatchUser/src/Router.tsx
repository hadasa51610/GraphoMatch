import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/HomePage';
import DashboardPage from './dashboard/DashboardPage';
import DashboardLayout from './dashboard/DashboardLayout';
import AnalysisPage from './dashboard/analysis/AnalysisPage';
import JobsPage from './dashboard/jobs/JobsPage';
import FeedbackPage from './dashboard/feedback/FeedBackPage';
import RootLayout from './pages/Layout';
import ProfilePage from './dashboard/DashboardPage';

export const Router = createBrowserRouter([
    {
        path: '/', element: <RootLayout />,
        errorElement: <h1>ERROR!! please try again</h1>,
        children: [
            { path: '/', element: <Home /> },
            {
                path: 'dashboard', element: <DashboardLayout />,
                children: [
                    { path: '', element: <DashboardPage /> },
                    { path: 'profile', element: <ProfilePage /> },
                    { path: 'analysis', element: <AnalysisPage /> },
                    { path: 'jobs', element: <JobsPage /> },
                    { path: 'feedback', element: <FeedbackPage /> }
                ]
            },
        ]
    }
])