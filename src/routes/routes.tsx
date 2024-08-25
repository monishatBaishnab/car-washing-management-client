import {createBrowserRouter} from 'react-router-dom';
import MainLayout from '../layout/ClientView';
import routeGenerator from '../utils/routeGenerator';
import clientViewConfig from './clientViewRoutes/clientViewRoutes';
const routes = createBrowserRouter([
    {
        path: '/', 
        element: <MainLayout />,
        children: routeGenerator(clientViewConfig)
    }, 
    {
        path: 'sign-up',
        element: 'Sign Up'
    }, 
    {
        path: 'sign-in',
        element: 'Sign In'
    }
])

export default routes;