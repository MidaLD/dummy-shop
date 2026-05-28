import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  searchProducts,
  SearchProductsParams,
} from "../../services/apiDummyShop";

export function useSearchProducts({
  query,
  page,
  limit,
}: SearchProductsParams) {
  const {
    data: searchedProducts,
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch,
    isError,
    error,
  } = useQuery({
    queryFn: ({ signal }) => searchProducts({ query, page, limit, signal }),
    queryKey: ["search", query, page, limit],
    enabled: !!query,
    placeholderData: keepPreviousData,
  });

  return { searchedProducts, isLoadingSearch, isFetchingSearch, isError, error };
}
