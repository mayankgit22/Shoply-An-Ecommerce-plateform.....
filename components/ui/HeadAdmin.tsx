"use client"
import  { Search}  from 'lucide-react'
import React from 'react'
import CartButton from './CartButton'
import FavoriteBtn from './FavoriteBtn'
// import SignInbtn from './SignInbtn'
import {
  ClerkProvider,
ClerkLoaded,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
// import { auth } from '@clerk/nextjs/server'
function HeadAdmin() {
  // const auth=getAuth(req);
  // console.log(auth);
 

  return (
    <div className='flex gap-4 justify-center items-center  w-auto'>
        <Search className='hidden md:block  md:w-6 md:h-6 hover:text-green-600'/>
        <CartButton/>
        <FavoriteBtn />
        <ClerkProvider>
          <ClerkLoaded>

        <SignedOut>
          <div className=' justify-center items-center bg-black text-white rounded-4xl p-2 mt-1 cursor-pointer'>
<div className='cursor-pointer m-0 text-sm sm:font-semibold md:text-md '>

              <SignInButton mode='modal' />
</div>
          </div>
          <div className='hidden sm:flex md:block'><SignUpButton mode='modal' /></div>
            </SignedOut>
            <SignedIn>
              <div className=' flex justify-center items-center w-20 border-2 border-black rounded-full '>
              <UserButton    />

              </div>
            </SignedIn>
          </ClerkLoaded>
        </ClerkProvider>
      
    </div>
  )
}

export default HeadAdmin
