import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getAllProducts,
  GetAllProductsParams,
} from "../../services/apiDummyShop";
import { useEffect } from "react";

type GetAllProductsHookParams = {
  enabled?: boolean;
} & GetAllProductsParams;

export function useAllProducts({
  category,
  page,
  limit,
  enabled = true,
}: GetAllProductsHookParams) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", category, page, limit],
    queryFn: () => getAllProducts({ category, page, limit }),
    enabled,
    placeholderData: keepPreviousData,
  });

  const pageCount = Math.ceil((data?.total ?? 0) / limit);

  useEffect(() => {
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
  }, [page, pageCount, category, limit, queryClient]);

  return { data, isLoading, error, isError };
}
