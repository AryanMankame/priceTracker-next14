import Button from "@/components/Cart/Button";
import DeleteButton from "@/components/Cart/DeleteButton";
import Navbar from "@/components/Navbar/Navbar";
import ProductInfo from "@/components/Products/ProductInfo";
import { fetchTrackedProductsforEmail } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
export default async function page() { 
  const authInfo = auth();
  const currentusr = await currentUser();
  const userEmail = currentusr?.emailAddresses[0].emailAddress as string;
  const userTracked = (await fetchTrackedProductsforEmail(userEmail)).rows;
//   console.log(userTracked);
  const activeProducts = userTracked.filter(product => product.trackingstatus)
  const inactiveProducts = userTracked.filter(product => !product.trackingstatus)
  console.log("active ===> ",activeProducts)
  console.log("inactive ===> ",inactiveProducts);
  return (
    <div className="min-h-screen overflow-x-hidden">
        <Navbar userId = {authInfo.userId}/>
        <div className = "w-screen">
        <div className="w-screen mt-32">
        <h1 className = "px-28 text-2xl font-bold">Active</h1>
        <div className="flex flex-wrap pt-10 w-screen px-28 h-auto gap-10">
            {
                activeProducts?.map((item : any,it) => {
                    // console.log('item ===> ',item)
                    if(item.image === '' || item.title === '' || item.currentprice === -1 || item.url === '' || item.currency === null) {
                      return <div key = {it}></div>
                    }
                    return (
                        <div key = {it}>
                            <ProductInfo key = {it} item = {item} baseurl = {item.url} category = {item.category}/>
                            <Button email = {userEmail} product_id = {item.id} tracking_status = {false}/>
                        </div>
                    )
                })
            }
            {
              activeProducts?.length === 0 && <div className="px-10">Nothing Found</div>
            }

        </div>
    </div>
        </div>
        <div className = "w-screen">
            <div className="w-screen mt-32">
            <h1 className = "px-28 text-2xl font-bold">Stopped</h1>
            <div className="flex flex-wrap pt-10 w-screen px-28 h-auto gap-10">
                {
                    inactiveProducts?.map((item : any,it) => {
                        // console.log('item ===> ',item)
                        if(item.image === '' || item.title === '' || item.currentprice === -1 || item.url === '' || item.currency === null) {
                          return <div key = {it}></div>
                        }
                        return (
                          <div key = {it}>
                              <ProductInfo key = {it} item = {item} baseurl = {item.url} category = {item.category}/>
                              <Button email = {userEmail} product_id = {item.id} tracking_status = {true} />
                          </div>
                        )
                    })
                }
                {
                  inactiveProducts?.length === 0 && <div className="px-10">Nothing Found</div>
                }

            </div>
          </div>
        </div>
    </div>
  )
}
