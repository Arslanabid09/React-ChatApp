import React from 'react'
import { BiExit } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

const Navbar = () => {
    // useNavigation to navigate th user 
    let Navigate = useNavigate();
    // getting user from the custom hook
    let {user,handleLogOut} = useAuth();
    // handling logout function
  return (
    <header className='flex justify-between items-center px-16 py-4 bg-teal-600 border-b text-white'>
      <h1 className='text-xl sm:text-2xl md:text-4xl font-extrabold'>{user.name}</h1>
      <button className='text-xl sm:text-2xl md:text-3xl cursor-pointer' onClick={()=>{
        handleLogOut()
        Navigate('/')
      }}><BiExit/></button>
    </header>
  )
}

export default Navbar