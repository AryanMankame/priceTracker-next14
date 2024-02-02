import React from 'react'
export default function loading() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
        <img className = "h-1/2 w-1/4" src="https://assets.materialup.com/uploads/29924b31-4e83-4055-b891-acd567d822a7/preview.gif" alt="" />
        <div className="flex text-xl font-bold hover:cursor-pointer">
            <img src="https://pricewise-jsm.vercel.app/assets/icons/logo.svg" alt="" />
            Price <span className="text-red-600">Wise</span>
        </div> 
    </div>
  )
}
