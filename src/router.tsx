import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import Trees from './pages/Trees';
import TreeDetail from './pages/TreeDetail';
import Campaigns from './pages/Campaigns';
import CampaignDetail from './pages/CampaignDetail';
import User from './pages/User';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import { useUser } from './context/UserContext';
//test
const Router = () => {
  const { user } = useUser();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/trees', element: <Trees /> },
        { path: '/trees/:id', element: <TreeDetail /> },
        { path: '/campaigns', element: <Campaigns /> },
        { path: '/campaigns/:id', element: <CampaignDetail /> },
        { path: `/user/${user?.id}`, element: <User /> },
        { path: '/panier', element: <Cart /> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
