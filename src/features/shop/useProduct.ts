import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct } from "../../services/apiDummyShop";

export function useProduct(id: number) {
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getProduct(id),
    placeholderData: () => queryClient.getQueryData(["item", id]),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return { product, isLoading, isFetching, error };
}
