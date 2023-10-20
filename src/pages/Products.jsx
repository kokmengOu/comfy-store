import { Filters, PaginationContainer, ProductsContainer } from '../components'
// import { useLoaderData } from 'react-router-dom'
import { customFetch } from '../utils'

const url = '/products'

const allProductsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } = queryParams

  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params: queryParams,
      }),
  }
}

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    const response = await queryClient
      .ensureQueryData(allProductsQuery(params))
      .then((res) => res.data)
      .catch((err) => err.message)
    const { meta, data } = response
    return { meta, data, params }
  }

function Products() {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  )
}

export default Products
