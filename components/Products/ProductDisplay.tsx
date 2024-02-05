import Link from "next/link"
import Modal from "./Modal";

function ProductDisplay({ data } : any) {
  data = data.rows[0];
  return (
    <div className = "min-h-screen w-screen flex flex-col lg:flex-row mt-24 justify-center gap-24" >
        <div className = "h-1/2 lg:min-h-screen w-4/5 lg:w-2/5 flex justify-center ml-auto mr-auto lg:mr-0 lg:ml-0 border-[1px] py-14 border-blue-300 rounded-lg" >
            <img className = "h-[70%] w-[80%]" src={data.image} alt="" />
        </div>
        <div className = "w-screen px-20 lg:w-2/5">
            <div className="text-2xl font-bold mb-3">
                {data.title}
            </div>
            <Link className = "text-slate-400 text-lg" href = {data.url}>Visit Product</Link>
            <div className = "flex gap-3 mt-3">
                <span className = "bg-red-100 flex w-20 h-10 justify-center items-center rounded-lg gap-2">
                    <img className = "h-5" src="https://raw.githubusercontent.com/adrianhajdin/pricewise/94b72079a2f7928d194087df60e9fb1c04446636/public/assets/icons/red-heart.svg" alt="" />
                    <span className="text-red-400">100</span>
                </span>
                <span className = "bg-slate-100 w-9 h-9 flex justify-center items-center rounded-lg">
                    <img className = "h-5" src="https://raw.githubusercontent.com/adrianhajdin/pricewise/94b72079a2f7928d194087df60e9fb1c04446636/public/assets/icons/bookmark.svg" alt="" />
                </span>
                <span className = "bg-slate-100 w-9 h-9 flex justify-center items-center rounded-lg">
                    <img className = "h-5" src="https://raw.githubusercontent.com/adrianhajdin/pricewise/94b72079a2f7928d194087df60e9fb1c04446636/public/assets/icons/share.svg" alt=""/>
                </span>
            </div>
            <div className="flex min-h-36 gap-5 border-y-2 border-y-gray-200 my-5">
                <span className="w-32 flex flex-col items-start justify-center">
                    <div className="mb-3 font-bold text-3xl">
                        <span>{data.currency}</span>
                        <span>{data.currentprice}</span>
                    </div>
                    <div className = "text-xl text-slate-400">
                        <span>{data.currency}</span>
                        <span>{data.originalprice}</span>
                    </div>
                </span>
                <span className="flex flex-col justify-center">
                    <span className = "flex gap-3">
                        <span className = "bg-orange-100 mb-3 flex w-20 h-10 justify-center items-center rounded-3xl gap-1">
                            <img className = "h-5" src="https://raw.githubusercontent.com/adrianhajdin/pricewise/94b72079a2f7928d194087df60e9fb1c04446636/public/assets/icons/star.svg" alt="" />
                            <span className="text-orange-400 text-sm font-bold">{data.stars}</span>
                        </span>
                        <span className = "bg-slate-100 flex w-36 h-10 justify-center items-center rounded-3xl gap-2">
                            <img className = "h-5" src="https://raw.githubusercontent.com/adrianhajdin/pricewise/94b72079a2f7928d194087df60e9fb1c04446636/public/assets/icons/comment.svg" alt="" />
                            <span className="text-sm font-bold">{data.reviewscount} Reviews</span>
                        </span>
                    </span>
                    <div className="flex gap-2">
                        <span className="text-green-400">93%</span>
                        <span>of buyers have recommended this.</span>
                    </div>
                </span>
            </div>
            <div className="min-h-212 flex flex-wrap gap-5">
                <div className = "w-52 h-24 bg-gray-200 py-4 flex-grow rounded-xl pl-5 shadow-md">
                    <div className = "mb-2">Current Price</div>
                    <div className="flex gap-1 font-bold text-xl">
                        <span>
                            <img className = "w-6 h-8" src="https://raw.githubusercontent.com/adrianhajdin/pricewise/94b72079a2f7928d194087df60e9fb1c04446636/public/assets/icons/price-tag.svg" alt="" />
                        </span>
                        <span>{data.currency}</span>
                        <span>{data.currentprice}</span>
                    </div>
                </div>
                <div className = "w-52 h-24 bg-gray-200 py-4 flex-grow rounded-xl pl-5 shadow-md">
                    <div className = "mb-2">Average Price</div>
                    <div className="flex gap-1 font-bold text-xl">
                        <span>
                            <img className = "w-6 h-8" src="https://raw.githubusercontent.com/adrianhajdin/pricewise/94b72079a2f7928d194087df60e9fb1c04446636/public/assets/icons/chart.svg" alt="" />
                        </span>
                        <span>{data.currency}</span>
                        <span>{data.averageprice}</span>
                    </div>
                </div>
                <div className = "w-52 h-24 bg-gray-200 py-4 flex-grow rounded-xl pl-5 shadow-md">
                    <div className = "mb-2">Highest Price</div>
                    <div className="flex gap-1 font-bold text-xl">
                        <span>
                            <img className = "w-6 h-8" src="https://raw.githubusercontent.com/adrianhajdin/pricewise/94b72079a2f7928d194087df60e9fb1c04446636/public/assets/icons/arrow-up.svg" alt="" />
                        </span>
                        <span>{data.currency}</span>
                        <span>{data.highestprice}</span>
                    </div>
                </div>
                <div className = "w-52 h-24 bg-gray-200 py-4 flex-grow rounded-xl pl-5 shadow-md">
                    <div className = "mb-2">Lowest Price</div>
                    <div className="flex gap-1 font-bold text-xl">
                        <span>
                            <img className = "w-6 h-8" src="https://raw.githubusercontent.com/adrianhajdin/pricewise/94b72079a2f7928d194087df60e9fb1c04446636/public/assets/icons/arrow-down.svg" alt="" />
                        </span>
                        <span>{data.currency}</span>
                        <span>{data.lowestprice}</span>
                    </div>
                </div>
            </div>
            <Modal productInfo = {data} />
        </div>
    </div>
  )
}

export default ProductDisplay