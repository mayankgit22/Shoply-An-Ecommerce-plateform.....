
import { productType } from '@/constants/data'
import Link  from 'next/link'
import React from 'react'
interface Props{
    selectedTab:string;
    setSelectedTab:(tab:string)=>void;
}
function HomeBar({selectedTab,setSelectedTab}:Props) {
    // console.log(selectedTab)
    // const title=selectedTab.item.title
  return (
    <div className='flex w-full m-1 justify-between items-center'>
        <div className='gap-3 flex'>
            {productType.map((item)=>{
                return <button onClick={()=>setSelectedTab(item?.title)} key={item?.title} className={`font-semibold text-[8px] sm:text-sm border-2 cursor-pointer transition-all duration-200 border-green-500 rounded-full p-1  ${
                    selectedTab===item?.title ? 'bg-green-500 text-white':'text-black hover:text-green-500 hover:bg-white'
                }`}>{item?.title}</button>
            })}
        </div>
    <div className=' mb-0.5'><Link href={"/shop"} className='font-semibold  border-2 cursor-pointer transition-all text-[8px] sm:text-sm duration-200 border-green-500 rounded-full hover:bg-green-500 p-2'>See all</Link></div>
    </div>
  )
}

export default HomeBar
