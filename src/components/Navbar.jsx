import React from 'react'
import { BiExit } from 'react-icons/bi'
import {useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const Navbar = () => {
    // useNavigation to navigate th user 
    let Navigate = useNavigate();
    // getting user from the custom hook
    let {user,handleLogOut} = useAuth();
    // handling logout function
  return (
    <header className='flex justify-between items-center px-6 py-4  border-b text-white'>
      <h1 className='text-xl sm:text-2xl md:text-4xl font-extrabold underline underline-offset-2'>{user.name}</h1>
      <button className='text-xl sm:text-2xl md:text-3xl cursor-pointer' onClick={()=>{
        handleLogOut()
        Navigate('/')
      }}><BiExit/></button>
    </header>
  )
}

export default Navbar