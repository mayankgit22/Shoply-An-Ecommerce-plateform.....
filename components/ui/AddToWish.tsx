import { Product } from '@/sanity.types'
import { Heart } from 'lucide-react'
import React from 'react'

function AddToWish({product,className,fun}:{product:Product,className?:string,fun:()=>void}) {
  
  return (
    <div onClick={fun} className={`border p-2 rounded-full transition-all duration-200 hover:text-white  hover:bg-green-800 ${className}`}>
      <Heart className='rounded-full w-5 h-5 ' />
    </div>
  )
}

export default AddToWish
