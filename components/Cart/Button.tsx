"use client";

import { deletProductFromUserTracked, updateTrackingStatus } from "@/lib/db";
import { clsx } from 'clsx'
export default function Button({ email , product_id, tracking_status} : any) {
  return (
    <div className="flex justify-center items-center relative bottom-10 gap-2">
        <button className = {
          clsx(` text-white rounded-lg w-32 h-12 `,
          {
            'bg-green-500' : tracking_status,
            'bg-red-500' : !tracking_status 
          })}
        onClick={() => {
          updateTrackingStatus(email, product_id, tracking_status);
        }}>{ tracking_status ? <>Start</> : <>Stop</>}</button>
        {
          tracking_status ? 
          <div className="flex justify-center items-center relative">
              <button className = "bg-red-500 text-white rounded-lg w-32 h-12"
              onClick={() => {
                deletProductFromUserTracked(email, product_id);
              }}>Delete</button>
          </div> : <></>
        }
    </div>
  )
}

