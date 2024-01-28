"use client";

import { deletProductFromUserTracked } from "@/lib/db";

export default function DeleteButton({ email , product_id} : any) {
  return (
    <div className="relative bottom-10">
        <button className = "bg-red-500 text-white rounded-lg w-32 h-12"
        onClick={() => {
          deletProductFromUserTracked(email, product_id);
        }}>Delete</button>
    </div>
  )
}

