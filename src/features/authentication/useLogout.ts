import { useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { setCart, setCartId } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useAppDispatch } from "../hooks/useAppDispatch";

export function useLogout() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  function logout() {
    logoutApi();
    queryClient.setQueryData(["user"], null);
    dispatch(setCart([]));
    dispatch(setCartId(null));
    toast.success("Successfully logged out");
  }

  return logout;
}
