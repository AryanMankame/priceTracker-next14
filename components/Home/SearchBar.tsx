"use client"
import { scrapeProductAndStore } from "@/lib/actions"
import { useState } from "react";
const SearchBar = () => {
  const [url,seturl] = useState(''); 
  return (
    <form className= "flex flex-wrap gap-4 mt-12 ">
        <input type="input" placeholder="Enter Product Link" className="flex-1 p-3 border border-gray-300 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none"
        onChange={(e) => seturl(e.target.value)}></input>
        <button className="bg-gray-900 border border-gray-900 rounded-lg shadow-xs px-5 py-3 text-white text-base font-semibold hover:opacity-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40"
        onClick={(e) => {
          e.preventDefault();
          scrapeProductAndStore(url)
        }}
        >Search</button>
    </form>
  )
}

export default SearchBar