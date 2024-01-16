import { SignIn } from "@clerk/nextjs"

const MobileLogin = () => {
  return (
    <div className = "lg:hidden h-screen w-screen flex justify-center items-center ml-4">
        <SignIn />   
    </div>
  )
}

export default MobileLogin