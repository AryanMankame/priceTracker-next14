import { UserButton, auth } from "@clerk/nextjs"

const Navbar = () => {
  const { userId } = auth();
  console.log(userId);
  return (
    <div className="w-screen h-[8vh] flex justify-between items-center px-6 pr-14 md:px-16">
        <div className="flex text-xl font-bold">
            <img src="https://pricewise-jsm.vercel.app/assets/icons/logo.svg" alt="" />
            Price <span className="text-red-600">Wise</span>
        </div>
        <div className="flex w-[10%] justify-around">
            <img className = "w-8 h-8" src="https://cdn-icons-png.flaticon.com/128/954/954591.png" alt="search-icon" />
            <img className = "w-8 h-8" src="https://cdn-icons-png.flaticon.com/128/2331/2331970.png" alt="cart-icon" />
            { userId && 
                <UserButton />
            }
        </div>
    </div>
  )
}

export default Navbar