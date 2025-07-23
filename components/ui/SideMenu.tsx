import React from 'react'
import{X}from 'lucide-react'
import Logo from './Logo'
import Link from 'next/link'
import { headerData} from '@/constants/data'
import cn from '@/lib/utils'
// import { usePathname } from 'next/navigation'
// import Navigation from './Navigation'
import {useOutsideClick} from '@/hooks/index'
import Socialico from './Socialicon'
interface SidebarProps{
    isOpen:boolean;
    sideBarClose:()=>void;
}
function SideMenu({isOpen,sideBarClose}:SidebarProps) {
    // const path=usePathname();
    const sidbarRef=useOutsideClick<HTMLDivElement>(sideBarClose);
  return (
    <div
  className={`fixed inset-y-0 left-0 h-screen z-50 w-[90%] md:hidden bg-black/40 shadow-2xl 
  transform transition-transform duration-500 
  ${isOpen ? 'translate-x-0' : '-translate-x-full'} hoverEffect`}>
 <div ref={sidbarRef} className=' flex flex-col   gap-0 relative   inset-y-0 left-0 h-screen z-51 min-w-72 max-w-96 bg-gray-800 p-10'>
    <Logo className='text-white '/>
 <span>
    <X onClick={sideBarClose} className='absolute right-10 top-5 cursor-pointer text-4xl font-bold text-white'/>
    </span>
    <div className='flex flex-col gap-4 w-1/4'>

 {headerData.map((item, index) => (
     <Link 
     key={index}
     href={item.href}
     className={cn(
         'relative group text-white  mt-2'
      )}
    >
      {item.title}
    </Link>
  ))}
  </div>
  <div>
    <Socialico />
  </div>

 </div>
 

</div>
  )
}

export default SideMenu
