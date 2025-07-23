"use client"
import { AlignLeft } from 'lucide-react'
import React from 'react'
import SideMenu from './SideMenu';

function MenuIcon() {
    const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
   
  return (
    <div className='md:hidden gap-0.5 cursor-pointer hover:text-green-600 w-0 mt-5 '>
        <button onClick={()=>setSideMenuOpen(!sideMenuOpen)}>

      <AlignLeft/>
        </button>
        <div className='md:hidden'>
        <SideMenu 
        isOpen={sideMenuOpen}
        sideBarClose={()=>setSideMenuOpen(false)}/>

        </div>
        
    </div>
  )
}

export default MenuIcon
