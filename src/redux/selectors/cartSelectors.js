import { createSelector } from "reselect";

const selectProducts = (state) => state.cart.products;

export const selectDiscountedTotal = createSelector(
  [selectProducts],
  (cart) => {
    const total = cart.reduce((sum, product) => {
      const subtotal = product.price * product.quantity;
      return sum + (subtotal - subtotal * (product.discountPercentage / 100));
    }, 0);

    return Number(total.toFixed(2));
  },
);

export const selectTotalQuantity = createSelector([selectProducts], (cart) =>
  cart.reduce((sum, product) => sum + product.quantity, 0),
);
