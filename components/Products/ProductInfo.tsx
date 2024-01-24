"use client";
import { scrapeProductAndStore } from "@/lib/actions";
import { getDomainFromUrl } from "@/lib/helper";
import { useRouter } from "next/navigation";
export default function ProductInfo({ item , baseurl , category} : any) {
  const domain = getDomainFromUrl(baseurl);
  const router = useRouter();
  var url = ''; 
  var imgURL = '';
  var price = '';
  if(item.url[0] === '/') {
        url = `https://${domain}${item.url}`;
        imgURL = item?.img;
        price = item?.price;
    }
    else {
        url = item?.url;
        imgURL = item?.image;
        price = `${item?.currency} ${item?.currentprice}`
    }
  return (
    <div className="w-72 h-96 hover:cursor-pointer" onClick={async (e) => {
        e.preventDefault();
        const prodId = await scrapeProductAndStore(url);
        router.push(`/product/${prodId}`);
    }}>
        <img className="h-56 w-56 ml-auto mr-auto" src={imgURL} alt="" />
        <div className="pt-10 pb-2 text-secondary text-lg leading-6 font-semibold truncate">
            {item?.title}
        </div>
        <div className="flex px-2">
            <span>{category}</span>
            <span className="ml-auto font-bold">{price}</span>
        </div>
    </div>
  )
}
