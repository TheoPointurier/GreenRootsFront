// src/router.tsx
import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { useUser } from './context/UserContext';
import Spinner from './components/Spinner';

// Importation des pages avec React.lazy
const HomePage = React.lazy(() => import('./pages/HomePage'));
const Trees = React.lazy(() => import('./pages/Trees'));
const TreeDetail = React.lazy(() => import('./pages/TreeDetail'));
const Campaigns = React.lazy(() => import('./pages/Campaigns'));
const CampaignDetail = React.lazy(() => import('./pages/CampaignDetail'));
const User = React.lazy(() => import('./pages/User'));
const Cart = React.lazy(() => import('./pages/Cart'));
const NotFound = React.lazy(() => import('./pages/404'));
const ServerError = React.lazy(() => import('./pages/500'));
const PrivateRoute = React.lazy(() => import('./components/PrivateRoute'));
const PaymentPage = React.lazy(() => import('./pages/Payment'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const About = React.lazy(() => import('./pages/About'));
const ContactForm = React.lazy(() => import('./pages/ContactForm'));

const Router: React.FC = () => {
  const { user } = useUser();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Suspense fallback={<Spinner />}><HomePage /></Suspense> },
        { path: '/trees', element: <Suspense fallback={<Spinner />}><Trees /></Suspense> },
        { path: '/trees/:id', element: <Suspense fallback={<Spinner />}><TreeDetail /></Suspense> },
        { path: '/campaigns', element: <Suspense fallback={<Spinner />}><Campaigns /></Suspense> },
        { path: '/campaigns/:id', element: <Suspense fallback={<Spinner />}><CampaignDetail /></Suspense> },
        { path: `/user/${user?.id}`, element: <Suspense fallback={<Spinner />}><User /></Suspense> },
        { path: '/panier', element: <Suspense fallback={<Spinner />}><Cart /></Suspense> },
        { path: '/payment', element: <Suspense fallback={<Spinner />}><PrivateRoute><PaymentPage /></PrivateRoute></Suspense> },
        { path: '/login', element: <Suspense fallback={<Spinner />}><Login /></Suspense> },
        { path: '/register', element: <Suspense fallback={<Spinner />}><Register /></Suspense> },
        { path: '/about', element: <Suspense fallback={<Spinner />}><About /></Suspense> },
        { path: '/contact', element: <Suspense fallback={<Spinner />}><ContactForm /></Suspense> },
        { path: '/404', element: <Suspense fallback={<Spinner />}><NotFound /></Suspense> },
        { path: '/500', element: <Suspense fallback={<Spinner />}><ServerError /></Suspense> },
        { path: '*', element: <Suspense fallback={<Spinner />}><NotFound /></Suspense> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
