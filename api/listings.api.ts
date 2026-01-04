

export const LISTINGS_QUERY_KEYS = {
    fetchCategories: ["fetchCategories"]
}

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/categories`

type Category = {
  id: string
  title: string
  description: string
  color: string
  image_path: string
}

type CategoriesResponse = {
  data: Category[];
};

export const fetchCategories = async (): Promise<Category[]> => {
    console.log("fetching from: ", API_URL, new Date().toISOString())

    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const json: CategoriesResponse = await response.json();
    return json.data;
}
