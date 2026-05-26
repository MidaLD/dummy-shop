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
    placeholderData: () => {
      const cache = queryClient.getQueriesData<{ products: Product[] }>({
        queryKey: ["products"],
      });
      for (const [, data] of cache) {
        const found = data?.products.find((p) => p.id === id);
        if (found) return found;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return { product, isLoading, isFetching, error };
}
