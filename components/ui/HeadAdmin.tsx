"use client"
import  { Search}  from 'lucide-react'
import React from 'react'
import CartButton from './CartButton'
import FavoriteBtn from './FavoriteBtn'

function HeadAdmin() {


  return (
    <div className='flex gap-4 justify-center items-center  w-auto'>
        <Search className='hidden md:block  md:w-6 md:h-6 hover:text-green-600'/>
        <CartButton/>
        <FavoriteBtn />

      
    </div>
  )
}

export default HeadAdmin
