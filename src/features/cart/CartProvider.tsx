import { ReactNode } from "react";
import { useCurrentUser } from "../authentication/useCurrentUser";
import { useCartSync } from "./useCartSync";

function CartProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useCurrentUser();
  useCartSync(currentUser?.id);
  return children;
}

export default CartProvider;
