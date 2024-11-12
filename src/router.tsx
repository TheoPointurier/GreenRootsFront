import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import Trees from './pages/Trees';
import TreeDetail from './pages/TreeDetail';
import Campaigns from './pages/Campaigns';
import CampaignDetail from './pages/CampaignDetail';
import User from './pages/User';
import Cart from './pages/Cart';
import NotFound from './pages/404';
import ServerError from './pages/500';
import PrivateRoute from './components/PrivateRoute';
import PaymentPage from './pages/PaymentPage';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import ContactForm from './pages/ContactForm';
import { useUser } from './context/UserContext';

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
        { path: '/payment', element: <PrivateRoute><PaymentPage /></PrivateRoute> },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/about', element: <About /> },
        { path: '/contact', element: <ContactForm /> },
        { path: '*', element: <NotFound /> },
        { path: '/500', element: <ServerError /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
