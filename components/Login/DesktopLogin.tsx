import { SignIn } from '@clerk/nextjs'
import React from 'react'
const DesktopLogin = () => {
  return (
    <div className = "hidden h-screen w-screen lg:flex justify-center items-center">
        <div className="flex w-2/3 h-4/5 bg-white border-2 rounded-xl">
            <div className="w-1/2 flex justify-center items-center">
                <SignIn />
            </div>
            <div className="w-1/2 relative">
                <img src="login-rect.png" alt="" className="h-full w-full absolute"/>
                <div className="w-2/3 h-2/3 bg-[rgba(255,255,255,.1)] z-10 absolute top-20 left-20 backdrop-blur-md rounded-xl">
                    <p className="pl-10 z-10 absolute top-10 text-slate-100 text-xl font-extrabold w-2/3">Spend you hard earned Money Wise</p>
                </div>
                <img className="z-10 absolute bottom-[30%] left-10" src="login-icon.svg"></img>
                <img className="z-10 absolute bottom-[10%] right-10" src="https://png.pngtree.com/png-vector/20230808/ourmid/pngtree-saving-money-clipart-boy-giving-piggy-bank-coins-to-save-money-vector-png-image_6866400.png" alt="" />
            </div> 
        </div>
    </div>
  )
}

export default DesktopLogin