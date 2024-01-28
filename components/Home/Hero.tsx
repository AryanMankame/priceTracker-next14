import SimilarProducts from "../Products/SimilarProducts"
import CarouselComponent from "./CarouselComponent"
import SearchBar from "./SearchBar"
import SearchModal from "./SearchModal"
import Trending from "./Trending"

const Hero = ({authInfo} : any) => {
  // console.log(authInfo)
  return (
    <div>
      <div className = "sm:flex min-h-screen">
          <div className = "flex flex-col w-screen sm:w-3/5 justify-center px-6 md:px-36">
              <p className = "text-red-600 text-sm flex mt-20 mb-[16px]">
                  <span>Smart Shopping Starts Here:&ensp;</span><span><img src="https://pricewise-jsm.vercel.app/assets/icons/arrow-right.svg" alt="" /></span>
              </p>
              <span className="text-6xl leading-snug font-bold">Unleash the Power of <span className="text-red-600">PriceWise</span></span>
              <span className="mt-6">Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.</span>
              <SearchBar sessionId = {authInfo.sessionId} userId = {authInfo.userId} />
          </div>
          <CarouselComponent />
      </div>
      <Trending />
    </div>
  )
}

export default Hero