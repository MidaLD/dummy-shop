export function getDiscountedPrice(price: number, discountPercentage: number) {
  const discountedPrice = Number(
    (price * (1 - discountPercentage / 100)).toFixed(2),
  );

  return discountedPrice;
}
