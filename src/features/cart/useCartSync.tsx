import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useUserCart } from "./useUserCart";
import { setCart, setCartId } from "../../redux/cartSlice";

export function useCartSync(userId?: number) {
  const dispatch = useAppDispatch();
  const { cartId } = useAppSelector((state) => state.cart);
  const { userCart, isSuccess } = useUserCart(userId);

  useEffect(() => {
    if (!isSuccess || !userCart || userCart.id === cartId) return;
    dispatch(setCart(userCart.products));
    dispatch(setCartId(userCart.id));
  }, [isSuccess, userCart, dispatch, cartId]);
}
