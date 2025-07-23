import React from 'react'
import Container from './Container'
import FooterTop from './FooterTop'
import Logo from './Logo'
import Socialicon from './Socialicon'
import { Input } from './shad/input'
import { Button } from './shad/button'
function Footer() {
  return (
    <footer className='border-t-1 border-gray/60-400 w-full mb-5'>
      
   <Container className=''>
      <FooterTop/>
      <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-12 mb-6'>

      <div className='flex flex-col text-gray-600 mb-2 '>
        <Logo/>
        <p className='text-sm font-thin mt-1'>Discover curated furniture collections at Shopcart, blending style and comfort to elevate your living spaces</p>
        <Socialicon  />
      </div>
      <div className='flex flex-col text-gray-600  gap-4 text-sm ml-2 mb-2'>
        <h1 className='font-semibold text-xl'>Quick Links</h1>
        <a href="/about">About</a>
        <a href="/contact">Contact us</a>
        <a href="/terms">Terms & Conditions</a>
        <a href="/privacy">Privacy</a>
        <a href="/faqs">FAQs</a>
        <a href="/help">Help</a>
      </div>
      <div className='flex flex-col text-gray-600  gap-4 text-sm ml-2 mb-2'>
        <h1 className='font-semibold text-xl'>Categories</h1>
        <a href="/about">Mobiles</a>
        <a href="/contact">Appliances</a>
        <a href="/terms">Smartphones</a>
        <a href="/privacy">Air Conditioners</a>
        <a href="/faqs">Washing Machine</a>
        <a href="/help">Kitchen Appliances</a>
        <a href="/help">gadget accessories</a>
      </div>
      {/* <div></div> */}
      <div className='mb-2'>
        <h1 className='text-gray-600'>Newsletter</h1>
        <p className='text-gray-600 text-sm'>Subscribe to our newsletter to receive updates and exclusive offers.</p>
        <Input type="email" placeholder="Enter your email" />
        <Button className='mt-2'>Submit</Button>
      </div>
      </div>

   </Container>
    </footer>
  )
}

export default Footer
