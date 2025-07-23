import React from 'react'
import cn from '@/lib/utils'
import Link from 'next/link' 
const data = [
  {
    name: 'facebook',
    icon: '📘',
    href: 'https://facebook.com' // You can update this later with your real link
  },
  {
    name: 'github',
    icon: '🐱',
    href: 'https://github.com/mayakgit22'
  },
  {
    name: 'instagram',
    icon: '📸',
    href: 'https://instagram.com/mayank__forever'
  },
  {
    name: 'linkedin',
    icon: '💼',
    href: '/landing' // local route for landing page
  }
]


type SocialIconItem = {
  name: string
  icon: string
  href: string
}

type SocialIconProps = {
  data: SocialIconItem[]
  className?: string
}

function Socialicon({ data, className }: SocialIconProps) {
  return (
    <div className={cn('flex gap-4 flex-wrap ', className)}>
      {data.map((item, idx) => (
        <div
          key={idx}
          className="text-xl mt-4 flex flex-col justify-center items-center text-white"
        >
          <Link href={item.href} className="border-black border-2 hover:bg-gray-300 rounded-full flex justify-center items-center bg-white h-10 w-10">
            {item.icon}
          </Link>
          <Link href={item.href} className="text-sm text-gray-500 hover:text-green-400">{item.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default function Socialico() {
  return <Socialicon data={data} />
}
