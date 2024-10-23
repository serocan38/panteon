import React, { lazy } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import Loadable from './loadable';
import MainLayout from '../page/layout/mainLayout';


// PAGES
const HomePage = Loadable(lazy(() => import('../page/homePage')));

// LAYOUTS


const Router = () =>
  useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '', element: <HomePage /> },
      ],
    },
  ]);

export default Router;

