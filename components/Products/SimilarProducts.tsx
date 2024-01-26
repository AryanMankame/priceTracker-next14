import { scrapesimilarProducts } from "@/lib/scrapper"
import ProductInfo from "./ProductInfo";

export default async function SimilarProducts({ data } : any) {
  const similarProducts = await scrapesimilarProducts(data.rows[0].url)
  // const similarProducts = [
  //   {
  //     img: 'https://images-eu.ssl-images-amazon.com/images/I/71Ftzmh3XWL._AC_UL160_SR160,160_.jpg',
  //     title: 'realme narzo N55 (Prime Blue, 6GB+128GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera',
  //     price: '₹9,499.00'
  //   },
  //   {
  //     img: 'https://images-eu.ssl-images-amazon.com/images/I/51V8-LZT2wL._AC_UL160_SR160,160_.jpg',
  //     title: 'TheGiftKart Crystal Clear Back Cover Case for Mi Redmi 13C 4G / Poco C65 | 360 Degree Protection | Shock Proof Design | Transparent Back Cover Case for Redmi 13C / Poco C65 (PC & TPU, Black Bumper)',
  //     price: '₹149.00'
  //   },
  //   {
  //     img: 'https://images-eu.ssl-images-amazon.com/images/I/81ogvU1j6qL._AC_UL160_SR160,160_.jpg',
  //     title: 'realme narzo N55 (Prime Black, 6GB+128GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera',
  //     price: '₹9,499.00'
  //   },
  //   {
  //     img: 'https://images-eu.ssl-images-amazon.com/images/I/61F+sOe7aqL._AC_UL160_SR160,160_.jpg',
  //     title: 'ZARALA Tempered Glass Compatible for Redmi 13C Advanced Border-Less Full Edge to Edge HD+ Screen Protector and Easy Installation Kit (Pack of 1)',
  //     price: '₹199.00'
  //   },
  //   {
  //     img: 'https://images-eu.ssl-images-amazon.com/images/I/61WGHQa+syL._AC_UL160_SR160,160_.jpg',
  //     title: undefined,
  //     price: '₹149.00'
  //   },
  //   {
  //     img: 'https://images-eu.ssl-images-amazon.com/images/I/61lAX2H8TRL._AC_UL160_SR160,160_.jpg',
  //     title: undefined,
  //     price: '₹295.00'
  //   }
  // ];
  // console.log(similarProducts)
  return (
    <div className="w-screen">
        <h1 className = "px-28 text-2xl font-bold">Similar Products</h1>
        <div className="flex flex-wrap pt-10 w-screen px-20 h-auto gap-5">
            {
                similarProducts.map((item : any,it) => {
                    if(item.img === undefined || item.title === undefined || item.price === undefined || item.url === undefined) {
                      return <div key = {it}></div>
                    }
                    return (
                        <ProductInfo key = {it} item = {item} baseurl = {data.rows[0].url} category = {data.rows[0].category} />
                    )
                })
            }
            {
              similarProducts.length === 0 && <div className="px-10">Nothing Found</div>
            }
        </div>
    </div>
  )
}
