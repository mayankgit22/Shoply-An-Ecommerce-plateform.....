import React from 'react'
import  { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/app/(client)/Context'
function CartButton() {
  const {cartMap}=useCart();
let cartCount=0;
for (const [key, value] of cartMap.entries()) {
cartCount+=value;
}
  return (
    <div className='relative'>
        <Link href={'/cart'}>
      <ShoppingBag className='w-6 h-6 hover:text-green-600 relative'/>
      <span className='absolute -top-0.5 -right-0.5 bg-red-600 text-white w-4 h-4 flex items-center justify-center rounded-full'>{cartCount}</span>
        </Link>
    </div>
  )
}

export default CartButton
