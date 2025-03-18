import { createBrowserRouter } from 'react-router';
import Home from './pages/HomePage';

export const Router = createBrowserRouter([
    {
        path: '/', element: <Home />,
        errorElement: <h1>ERROR!! please try again</h1>,
        children: [
            { path: '/', element: <Home /> },
            {
               
            }
        ]
    }
])