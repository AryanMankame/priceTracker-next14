import { fetchTrendingProducts } from "@/lib/db";
import SearchResults from "./SearchResults";

export default async function SearchModal() {
  const productsList = await fetchTrendingProducts();
  return (
    <div className="w-4/5 h-4/5">
        <SearchResults productsList = {productsList} />
    </div>
  )
}
