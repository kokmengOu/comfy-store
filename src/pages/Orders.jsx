import { redirect, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { customFetch } from '../utils'
import {
  OrdersList,
  SectionTitle,
  ComplexPaginationContainer,
} from '../components'

export const orderQuery = (params, user) => {
  return {
    queryKey: [
      'orders',
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get('/orders', {
        params,
        headers: { Authorization: `Bearer ${user.token}` },
      }),
  }
}

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const { user } = store.getState().userState
    if (!user) {
      toast.warn('You must be logged in to view orders')
      return redirect('/login')
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])
    return await queryClient
      .ensureQueryData(orderQuery(params, user))
      .then((response) => {
        return { orders: response.data.data, meta: response.data.meta }
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.error?.message ||
          'there was an error accessing your orders'

        toast.error(errorMessage)
        if (error?.response?.status === 401 || error?.response?.status === 403)
          return redirect('/login')

        return null
      })
  }

function Orders() {
  const { meta } = useLoaderData()
  if (meta.pagination.total < 1)
    return <SectionTitle text="Please make an order" />
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  )
}

export default Orders
