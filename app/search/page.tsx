import { fetchTrendingProducts } from "@/lib/db";
import SearchResults from "@/components/Home/SearchResults";
import { auth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar/Navbar";
export default async function page() {
  const productsList = (await fetchTrendingProducts()).rows;
  console.log(productsList)
  const authInfo = auth();
  return (
    <div className="overflow-x-hidden">
        <Navbar userId = {authInfo.userId} />
        <SearchResults productsList = {productsList} />
    </div>
  )
}
