import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct, Product } from "../../services/apiDummyShop";

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
    placeholderData: () =>
      queryClient
        .getQueryData<{ products: Product[] }>(["products", null, 1, 12])
        ?.products.find((p) => p.id === id),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return { product, isLoading, isFetching, error };
}
