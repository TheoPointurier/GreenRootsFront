import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { Suspense } from 'react';
import MainLayout from './layouts/MainLayout'

// Utilisation de React.lazy pour le chargement différé des composants
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
const OrderHistoryPage = React.lazy(() => import('./pages/OrderHistory'));
const ReviewsUser = React.lazy(() => import('./pages/ReviewsUser'));
const PaymentPage = React.lazy(() => import('./pages/Payment'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const About = React.lazy(() => import('./pages/About'));
const ContactForm = React.lazy(() => import('./pages/ContactForm'));

import { useUser } from './context/UserContext';

const Router = () => {
  const { user } = useUser();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Suspense fallback={<div>Chargement...</div>}><HomePage /></Suspense> },
        { path: '/trees', element: <Suspense fallback={<div>Chargement...</div>}><Trees /></Suspense> },
        { path: '/trees/:id', element: <Suspense fallback={<div>Chargement...</div>}><TreeDetail /></Suspense> },
        { path: '/campaigns', element: <Suspense fallback={<div>Chargement...</div>}><Campaigns /></Suspense> },
        { path: '/campaigns/:id', element: <Suspense fallback={<div>Chargement...</div>}><CampaignDetail /></Suspense> },
        { path: `/user/${user?.id}`, element: <Suspense fallback={<div>Chargement...</div>}><User /></Suspense> },
        { path: '/panier', element: <Suspense fallback={<div>Chargement...</div>}><Cart /></Suspense> },
        { path: '/payment', element: <Suspense fallback={<div>Chargement...</div>}><PrivateRoute><PaymentPage /></PrivateRoute></Suspense> },
        { path: '/user/orders',element: <Suspense fallback={<div>Chargement...</div>}><PrivateRoute><OrderHistoryPage /></PrivateRoute></Suspense>},
        { path: '/user/reviews',element: <Suspense fallback={<div>Chargement...</div>}><PrivateRoute><ReviewsUser /></PrivateRoute></Suspense>},
        { path: '/login', element: <Suspense fallback={<div>Chargement...</div>}><Login /></Suspense> },
        { path: '/register', element: <Suspense fallback={<div>Chargement...</div>}><Register /></Suspense> },
        { path: '/about', element: <Suspense fallback={<div>Chargement...</div>}><About /></Suspense> },
        { path: '/contact', element: <Suspense fallback={<div>Chargement...</div>}><ContactForm /></Suspense> },
        { path: '*', element: <Suspense fallback={<div>Chargement...</div>}><NotFound /></Suspense> },
        { path: '/500', element: <Suspense fallback={<div>Chargement...</div>}><ServerError /></Suspense> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
