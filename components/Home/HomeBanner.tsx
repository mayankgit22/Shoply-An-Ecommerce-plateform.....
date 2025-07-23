import React from 'react'
import  {Button} from '@/components/ui/shad/button'
import  Image  from 'next/image'
import Link from 'next/link'
import  banner_1  from './banner_1.png'
function HomeBanner() {
  return (
    <div className=' mb-4 mt-4 h-[35vh] py-16 md:py-0 bg-shop_light_pink rounded-lg px-10 lg:px-24 flex items-center justify-between'>
       <div>
        <div className='text-center md:text-start' >
            <h1 className='text-xl mb-4   md:text-3xl w-full font-bold font-sans text-shop_btn_dark_green font-bold md:w-[60%]'>Grab Upto 50% Off on
Selected headphone</h1>
<Link href={'/shop'} className='bg-shop_btn_dark_green  font-semibold cursor rounded-3xl text-white p-2 '>Shop Now</Link>
        </div>
       </div>
       <div><Image src={banner_1} width={370} height={370} className='mb-1 hidden md:block' style={{objectFit:'contain' }}  alt='hh'/></div>
      
    </div>
  )
}

export default HomeBanner
