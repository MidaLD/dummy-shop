import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProducts } from "../../services/apiDummyShop";

export function useAllProducts({ category, page, limit }) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", category, page, limit],
    queryFn: () => getAllProducts({ category, page, limit }),
  });

  const pageCount = Math.ceil(data?.total / limit);

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["products", category, page - 1, limit],
      queryFn: () => getAllProducts({ category, page: page - 1, limit }),
    });

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["products", category, page + 1, limit],
      queryFn: () => getAllProducts({ category, page: page + 1, limit }),
    });

  return { data, isLoading, error, isError };
}
