'use client'

import React, { useState } from 'react'
import Link from 'next/link';
import ThemeToggle from '../ThemeToggle/page';
import {AiOutlineMenu,AiOutlineClose} from 'react-icons/ai'
import { signOut} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import {auth} from '../../Firebase/page'
import {useAuthState} from 'react-firebase-hooks/auth'


const Navbar = () => {
  const [nav,setNav] = useState(false)
  const router = useRouter();
  const [user] = useAuthState(auth);

  const logout = () => {
    return signOut(auth)
} 

  const handelNav = () => {
   
           setNav(!nav)

}
const handleSignOut = async () => {
    try {
      await logout()
      router.push('/')
    }catch (e) {
      console.log(e.message)
    }
  }
      

  


  return (
    <div className='rounded-div flex items-center justify-between h-20 font-bold ' >
        <Link href="/"   onClick={()=> setNav(false)}>
            <h1  className=' text-2xl' >CryptoInChbit</h1>
        </Link>
        <div   className='hidden md:block'>
            <ThemeToggle/>
        </div>

  



         
{user?.email ? (
        <div>
          <Link href='/routs/Account' className='p-4'>
            Account
          </Link>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      ) :(
                
          <div  className='hidden md:block' >
          <Link  href='/routs/Signin' className='p-4 hover:text-accent' >Sign In </Link>
          <Link  href='/routs/Signup' className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl '  > Sign Up </Link>
          </div>
            ) }

        {/* mENU PHONE */}
        <div onClick={handelNav} className='block md:hidden cursor-pointer z-10 ' >
          {nav ? <AiOutlineClose  size={20} /> :<AiOutlineMenu size={20} /> }
        </div>
        <div   className={nav ? ' md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10 ':'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'}>
            <ul className='w-full p-4'>
                <li className='border-b py-6'>
                    <Link href='/routs/Home' onClick={()=> setNav(false)} >Home</Link>
                </li>
                <li className='border-b py-6'>
                    <Link href='/routs/Account'  onClick={()=> setNav(false)}>Account</Link>
                </li>
                <li className=' py-6'    onClick={()=> setNav(false)}>
                    <ThemeToggle/>
                </li>
            </ul>
            <div  className='flex flex-col w-full p-4' >
                <Link  href="/routs/Signin" onClick={()=> setNav(false)} > <button   className='w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl'>Sign In</button> </Link>
                <Link  href="/routs/Signup"  onClick={()=> setNav(false)} > <button  className=' w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl '>Sign Up</button> </Link>
            </div>
        </div>
        
    </div>
  )
}


export default Navbar