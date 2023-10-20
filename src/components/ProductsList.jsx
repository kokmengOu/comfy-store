import { formatPrice } from '../utils'
import { Link, useLoaderData } from 'react-router-dom'
// import PropTypes from 'prop-types'

function ProductsList() {
  const { data } = useLoaderData()
  return (
    <div className="mt-12 grid gap-y-8">
      {data.map((product) => {
        const { title, price, image, company } = product.attributes
        const dollarsAmount = formatPrice(price)
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
          >
            <img
              src={image}
              alt={title}
              className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
            />
            <div className="ml-0 sm:ml-16">
              <h3 className="capitalize font-medium text-lg">{title}</h3>
              <h4 className="capitalize text-md text-neutral-content">
                {company}
              </h4>

              {/* COLOR */}
            </div>

            <p className="font-medium ml-0 sm:ml-auto text-lg">
              {dollarsAmount}
            </p>
          </Link>
        )
      })}
    </div>
  )
}

ProductsList.propTypes = {}

export default ProductsList
