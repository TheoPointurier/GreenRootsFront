import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { Suspense } from 'react';
import MainLayout from './layouts/MainLayout'
import { useUser } from './context/UserContext';
import Spinner from './components/Spinner';

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
// const OrderHistoryPage = React.lazy(() => import('./components/OrderHistory'));
// const ReviewCreate = React.lazy(() => import('./components/ReviewCreate'));
const PaymentPage = React.lazy(() => import('./pages/Payment'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const About = React.lazy(() => import('./pages/About'));
const ContactForm = React.lazy(() => import('./pages/ContactForm'));

const Router = () => {
  const { user } = useUser();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Suspense fallback={<div><Spinner /></div>}><HomePage /></Suspense> },
        { path: '/trees', element: <Suspense fallback={<div><Spinner /></div>}><Trees /></Suspense> },
        { path: '/trees/:id', element: <Suspense fallback={<div><Spinner /></div>}><TreeDetail /></Suspense> },
        { path: '/campaigns', element: <Suspense fallback={<div><Spinner /></div>}><Campaigns /></Suspense> },
        { path: '/campaigns/:id', element: <Suspense fallback={<div><Spinner /></div>}><CampaignDetail /></Suspense> },
        { path: `/user/${user?.id}`, element: <Suspense fallback={<div><Spinner /></div>}><User /></Suspense> },
        { path: '/panier', element: <Suspense fallback={<div><Spinner /></div>}><Cart /></Suspense> },
        { path: '/payment', element: <Suspense fallback={<div><Spinner /></div>}><PrivateRoute><PaymentPage /></PrivateRoute></Suspense> },
        // { path: '/user/orders',element: <Suspense fallback={<div><Spinner /></div>}><PrivateRoute><OrderHistoryPage /></PrivateRoute></Suspense>},
        // { path: '/user/review',element: <Suspense fallback={<div><Spinner /></div>}><PrivateRoute><ReviewCreate /></PrivateRoute></Suspense>},
        { path: '/login', element: <Suspense fallback={<div><Spinner /></div>}><Login /></Suspense> },
        { path: '/register', element: <Suspense fallback={<div><Spinner /></div>}><Register /></Suspense> },
        { path: '/about', element: <Suspense fallback={<div><Spinner /></div>}><About /></Suspense> },
        { path: '/contact', element: <Suspense fallback={<div><Spinner /></div>}><ContactForm /></Suspense> },
        { path: '*', element: <Suspense fallback={<div><Spinner /></div>}><NotFound /></Suspense> },
        { path: '/500', element: <Suspense fallback={<div><Spinner /></div>}><ServerError /></Suspense> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
