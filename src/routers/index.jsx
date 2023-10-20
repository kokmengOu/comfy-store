import {
  HomeLayout,
  Error,
  About,
  Cart,
  Landing,
  Login,
  Products,
  Register,
  SingleProduct,
  Checkout,
  Orders,
} from '../pages'

import { ErrorElement } from '../components'
//loader
import { loader as landingLoader } from '../pages/Landing'
import { loader as singleProductLoader } from '../pages/SingleProduct'
import { loader as productsLoader } from '../pages/Products'
import { loader as checkoutLoader } from '../pages/Checkout'
import { loader as orderLoader } from '../pages/Orders'

//action
import { action as registerAction } from '../pages/Register'
import { action as loginAction } from '../pages/Login'
import { action as checkoutAction } from '../components/CheckoutForm'

import { store } from '../store'

import { QueryClient } from '@tanstack/react-query'
import { createBrowserRouter } from 'react-router-dom'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader(queryClient),
        errorElement: ErrorElement,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'products',
        element: <Products />,
        loader: productsLoader(queryClient),
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader: singleProductLoader(queryClient),
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkoutLoader(store, queryClient),
        action: checkoutAction(store),
      },
      {
        path: 'orders',
        element: <Orders />,
        loader: orderLoader(store, queryClient),
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
    action: registerAction,
  },
  {
    path: '/login',
    element: <Login />,
    action: loginAction(store),
  },
])

export default router
