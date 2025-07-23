import { Heart } from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { useCart } from '@/app/(client)/Context'
function Favoritebtn() {
  const {wishMap} =useCart();
  
  return (
    <div className='relative'>
      <Link href={'/favorite'}>
     <Heart className='w-6 h-6 hover:text-green-600 relative'/>
      <span className='absolute -top-0.5 -right-0.5 bg-red-600 text-white w-4 h-4 flex items-center justify-center rounded-full'>{wishMap.size}</span>
      </Link>

    </div>
  )
}

export default Favoritebtn
