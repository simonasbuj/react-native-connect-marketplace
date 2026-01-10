

export const LISTINGS_QUERY_KEYS = {
    fetchCategories: ["fetchCategories"],
    fetchListings: (category?: string, keyword?: string) => ["fetchListings", category, keyword],
    fetchListing: (id: string) => ["fetchListing", id],
}

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/v1`

interface Category {
  id: string
  title: string
  description: string
  color: string
  image_path: string
}

interface CategoriesResponse {
  data: Category[]
};

export const fetchCategories = async (): Promise<Category[]> => {
  const url = `${API_URL}/categories`
  console.log("fetching from: ", url)

  const response = await fetch(url);

  if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  const json: CategoriesResponse = await response.json();
  return json.data;
}

interface Image {
  id: string
  path: string
}

interface Seller {
  id: string
  username: string
  created_at: string
}

export interface Listing {
  id: string
  title: string
  description: string
  price_in_cents: number 
  currency: string
  images: Image[]
  seller: Seller
}

type ListingsResponse = {
  data: {
    listings: Listing[]
  }
}

type FetchListingsParams = {
  category?: string
  keyword?: string
  page: number
};

export const fetchListings = async({
  category,
  keyword,
  page
}: FetchListingsParams): Promise<Listing[]> => {
  const queryParams = new URLSearchParams()

  if (category) queryParams.append("category", category)
  if (keyword) queryParams.append("keyword", keyword)
  queryParams.append("page", page.toString())

  const url = `${API_URL}/listings${queryParams.toString() ? `?${queryParams.toString()}` : ""}`

  console.log("fetching from: ", url)

  const response = await fetch(url)

  if (!response.ok) {
      throw new Error(`Failed to fetch listings: ${response.status}`);
  }

  const json: ListingsResponse = await response.json();
  return json.data.listings;
}

type ListingResponse = {
  data: Listing
}

export const fetchListing = async({id}: {id: string}): Promise<Listing> => {
  const url = `${API_URL}/listings/${id}`
  console.log("fetching from: ", url)

  const response = await fetch(url)

  if (!response.ok) {
      throw new Error(`Failed to fetch listing: ${response.status}`);
  }

  const json: ListingResponse = await response.json();

  return json.data;
}
