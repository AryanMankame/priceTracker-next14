"use client"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const carouselImages = [
  '/hero-1.svg',
  '/hero-2.svg',
  '/hero-3.svg',
]
function CarouselComponent() {
  return (
    <div className="min-h-screen w-screen flex flex-col md:w-2/5 justify-start items-center relative mt-24">
      <Carousel className="h-[95%] w-4/5 rounded-3xl bg-slate-200" showThumbs={false} showArrows={false} infiniteLoop autoPlay showStatus={false}>
        {
          carouselImages.map((ele) => 
            <div className="py-14" key = {ele}>
              <img src={ele} alt="" />
            </div>
          )
        }
      </Carousel>
      <img src="https://pricewise-jsm.vercel.app/assets/icons/hand-drawn-arrow.svg" alt="" 
       className="hidden absolute md:block  bottom-2 left-[-8vw]"
      />
    </div>
  )
}

export default CarouselComponent;