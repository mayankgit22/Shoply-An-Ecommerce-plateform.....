import React from 'react'
import Container from './Container'
import Logo from './Logo'
import Navigation from './Navigation'
import HeadAdmin from './HeadAdmin'
import MenuIcon  from './MenuIcon'

 async function Header() {
  // const Auth= await getAuth();
// const Auth= await auth();
// console.log(Auth)
  // console.log(user?.id)
  return (
    <div className='flex justify-center items-center relative min-h-[10vh] w-full z-50 mb-2 '>
      
      <header className='    fixed  w-[100%]   items-center justify-center bg-white/80 p-4 z-50  '>
          <Container  className=' grid grid-cols-3 '>
            
                <MenuIcon/>
            
            {/* logo */}
        <Logo className=' mt-3 sm:mt-1'/>
{/* navigation */}
<Navigation/>
{/* {admin?} */}
<HeadAdmin />

        </Container>
      </header></div>
  )
}

export default Header
