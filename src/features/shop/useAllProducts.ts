import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllProducts,
  GetAllProductsParams,
} from "../../services/apiDummyShop";

export function useAllProducts({
  category,
  page,
  limit,
}: GetAllProductsParams) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", category, page, limit],
    queryFn: () => getAllProducts({ category, page, limit }),
  });

  const pageCount = Math.ceil((data?.total ?? 0) / limit);

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
