"use client";
import { searchProductsAlgo } from "@/lib/helper";
import ProductInfo from "../Products/ProductInfo"
import { useState } from "react";
export default function SearchResults({ productsList } : any) {
  const [query, setquery] = useState('');
  const products = searchProductsAlgo(query,productsList);
  return (
    <div className="overflow-x-hidden">
        <div className ="relative overflow-x-hidden flex items-center justify-center mt-10">
            <input type="search" id="default-search" className ="block w-4/5 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search the product" required 
                onChange={(e) => setquery(e.target.value)}
            />
        </div>
        <div className="flex flex-wrap pt-10 w-screen px-28 h-auto gap-10 overflow-x-hidden">
            {
                products?.map((item : any,it : any) => {
                    // console.log('item ===> ',item)
                    if(item.image === '' || item.title === '' || item.currentprice === -1 || item.url === '' || item.currency === null) {
                    return <div key = {it}></div>
                    }
                    return (
                        <ProductInfo key = {it} item = {item} baseurl = {item.url} category = {item.category}/>
                    )
                })
            }
            {
              query === '' && products?.length === 0 ? <div className="flex flex-wrap pt-10 w-screen px-28 h-auto gap-10">
                                            {
                                                productsList?.map((item : any,it : any) => {
                                                    // console.log('item ===> ',item)
                                                    if(item.image === '' || item.title === '' || item.currentprice === -1 || item.url === '' || item.currency === null) {
                                                    return <div key = {it}></div>
                                                    }
                                                    return (
                                                        <ProductInfo key = {it} item = {item} baseurl = {item.url} category = {item.category}/>
                                                    )
                                                })
                                            }
                                            {
                                                productsList?.length === 0 && <div className="px-10">Nothing Found</div>
                                            }
                                        </div> : <div className="px-10">Nothing Found</div>
            }
        </div>
    </div>
  )
}
