import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
}

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem(state, action) {
      const { product } = action.payload
      const item = state.cartItems.find(
        (item) => item.cartID === product.cartID
      )
      if (item) {
        item.amount += product.amount
      } else {
        state.cartItems.push({ ...product })
      }
      state.numItemsInCart += product.amount
      state.cartTotal += product.price * product.amount
      cartSlice.caseReducers.calculateTotals(state)
      toast.success('item added to cart')
    },
    clearCart() {
      localStorage.setItem('cart', JSON.stringify(defaultState))
      return defaultState
    },
    removeItem(state, action) {
      const { cartID } = action.payload
      const product = state.cartItems.find((item) => item.cartID === cartID)
      state.cartItems = state.cartItems.filter((item) => item.cartID !== cartID)
      state.numItemsInCart -= product.amount
      state.cartTotal -= product.price * product.amount
      cartSlice.caseReducers.calculateTotals(state)
      toast.info(`${product.name} removed`)
    },
    editItem(state, action) {
      const { cartID, amount } = action.payload
      const items = state.cartItems.find((item) => item.cartID === cartID)
      state.numItemsInCart += amount - items.amount
      state.cartTotal += items.price * (amount - items.amount)
      items.amount = amount
      cartSlice.caseReducers.calculateTotals(state)
      toast.success(`${items.name} updated`)
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal
      state.orderTotal = state.shipping + state.cartTotal + state.tax
      localStorage.setItem('cart', JSON.stringify(state))
    },
  },
})

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions
export default cartSlice.reducer
