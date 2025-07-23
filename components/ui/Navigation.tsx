"use client"
import React from 'react'
import Link from 'next/link'
import cn from '@/lib/utils'
import {headerData}from'@/constants/data'
import  {usePathname}  from 'next/navigation'
function Navigation() {
    const path = usePathname();
    // console.log(path)
  return (
    <div className=' hidden md:flex text-lightColor capitalize  font-semibold   items-center justify-center'>
        <nav className='gap-7 flex'>
           {headerData.map((item, index) => (
    <Link
      key={index}
      href={item.href}
      className={cn(
        'relative group  hover:text-green-600',
        path === item.href && 'text-green-600 '
      )}
    >
      {item.title}
      <span className='bg-green-600 absolute left-1/2 -bottom-0.5 h-0.5 w-0 group-hover:left-0 group-hover:w-1/2 transition-all duration-300'></span>
      <span className='bg-green-600 absolute right-1/2 -bottom-0.5 h-0.5 w-0 group-hover:right-0 group-hover:w-1/2 transition-all duration-300'></span>
    </Link>
  ))
}

        </nav>
      
    </div>
  )
}

export default Navigation
