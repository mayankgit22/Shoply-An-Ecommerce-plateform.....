import React from 'react'
import  cn  from '@/lib/utils'
import Link from 'next/link'
function Logo({className}:{className?:string}) {
  return (
    <div>
        <Link href={'/'}>
          <h1 className={cn("sm:text-3xl text-2xl Uppercase tracking-wider text-transparent hoverEffect group font-bold hover:bg-green-600  bg-shop_dark_green bg-clip-text",className)}>SHOPL<span className='text-3xl text-transparent font-bold hover:bg-green-600  bg-green-600 bg-clip-text'>Y</span></h1>
        </Link>
      
    </div>
  )
}

export default Logo
