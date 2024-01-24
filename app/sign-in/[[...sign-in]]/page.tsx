import DesktopLogin from "@/components/Login/DesktopLogin"
import MobileLogin from "@/components/Login/MobileLogin"
import { auth } from "@clerk/nextjs"
function Page() {
  return (
    <>
        <>
            <DesktopLogin />
        </>
        <>
            <MobileLogin />
        </>
    </>
  )
}

export default Page