import { fetchCategories, LISTINGS_QUERY_KEYS } from "./listings.api";


export const fetchCategoriesQueryOptions = {
    queryKey: LISTINGS_QUERY_KEYS.fetchCategories,
    queryFn: fetchCategories
}
