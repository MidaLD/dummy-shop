import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct } from "../services/apiDummyShop";

export type CartState = {
  products: CartProduct[];
  cartId: number | null;
};

export type CartProductPayload = Omit<CartProduct, "total" | "discountedTotal">;

const initialState: CartState = {
  products: [],
  cartId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartProduct[]>) {
      state.products = action.payload;
    },
    setCartId(state, action: PayloadAction<number | null>) {
      state.cartId = action.payload;
    },
    addToCart(state, action: PayloadAction<CartProductPayload>) {
      const existingItem = state.products.find(
        (p) => p.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity = existingItem.quantity + action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    removeCartItem(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
    },
    incItemQty(state, action: PayloadAction<number>) {
      const product = state.products.find((p) => p.id === action.payload);

      if (product) product.quantity += 1;
    },
    decItemQty(state, action: PayloadAction<number>) {
      const product = state.products.find((p) => p.id === action.payload);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.products = state.products.filter((p) => p.id !== action.payload);
      }
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
