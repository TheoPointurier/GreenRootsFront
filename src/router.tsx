import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import Trees from './pages/Trees';
import TreeDetail from './pages/TreeDetail';
import Campaigns from './pages/Campaigns';
import CampaignDetail from './pages/CampaignDetail';
import User from './pages/User';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path:'/trees',
        element: <Trees />,
      },
      {
        path:'/trees/:id',
        element: <TreeDetail />,
      },
      {
        path:'/campaigns',
        element: <Campaigns />,
      },
      {
        path:'/campaigns/:id',
        element: <CampaignDetail />,
      },
      {
        path:'/user/:id',
        element: <User />,
      },
      {
        path: '*', // 404, page not found / path '*', for every routes not resolved
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
