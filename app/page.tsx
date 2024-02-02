import Hero from '@/components/Home/Hero'
import Navbar from '@/components/Navbar/Navbar'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'

export const metadata = {
  title : {
    default : 'PaisaBachat'
  }
}
export default function Home() {
  const authInfo = auth();
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar userId = {authInfo.userId} />
      <Hero authInfo = {authInfo} />
    </div>
  )
}
