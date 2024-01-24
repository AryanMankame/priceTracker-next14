import Navbar from "@/components/Navbar/Navbar"
import ProductDescription from "@/components/Products/ProductDescription";
import ProductDisplay from "@/components/Products/ProductDisplay";
import SimilarProducts from "@/components/Products/SimilarProducts";
import { fetchProductById } from "@/lib/db";
import { auth } from "@clerk/nextjs"
async function page({ params } : any) {
  const authInfo = auth();
  const productData = await fetchProductById(params.id);
  return (
    <div className = "min-h-screen min-w-screen overflow-x-hidden">
        <Navbar userId = {authInfo.userId} />
        <ProductDisplay data = {productData} />
        <ProductDescription data = {productData} />
        <SimilarProducts data = {productData} />
    </div>
  )
}

export default page