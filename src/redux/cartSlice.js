import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cartId: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action) {
      state.products = action.payload.products;
    },
    addToCart(state, action) {
      const existingItem = state.products.find(
        (p) => p.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity = existingItem.quantity + action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    removeCartItem(state, action) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    },
    incItemQty(state, action) {
      const product = state.products.find((p) => p.id === action.payload);

      if (product) product.quantity += 1;
    },
    decItemQty(state, action) {
      const product = state.products.find((p) => p.id === action.payload);

      if (product && product.quantity >= 0) product.quantity -= 1;
    },
    setCartId(state, action) {
      state.cartId = action.payload;
    },
    clearCart(state) {
      state.products = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  removeCartItem,
  incItemQty,
  decItemQty,
  setCartId,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
