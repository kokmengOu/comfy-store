// import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import CartItem from './CartItem'

function CartItemsList() {
  const { cartItems } = useSelector((state) => state.cartState)
  return (
    <div>
      {cartItems.map((item) => {
        return <CartItem key={item.cartID} cartItem={item} />
      })}
    </div>
  )
}

CartItemsList.propTypes = {}

export default CartItemsList
