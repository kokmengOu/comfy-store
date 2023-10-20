import { FeaturedProducts, Hero } from '../components'
import { customFetch } from '../utils'

const url = '/products?featured=true'

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch(url),
}

export const loader = (queryClient) => async () => {
  const response = await queryClient
    .ensureQueryData(featuredProductsQuery)
    .then((response) => response.data)
    .catch((err) => err.message)
  return response
}

function Landing() {
  return (
    <>
      <Hero></Hero>
      <FeaturedProducts />
    </>
  )
}

export default Landing
