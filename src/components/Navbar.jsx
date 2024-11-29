import React, { useState } from 'react'
import {Button} from '../components/index';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
// import { logout } from '../AppWrite/Auth'
import { BiExit } from 'react-icons/bi';

const Navbar = () => {
    const [active, setActive] = useState(false)
    let {user,handleLogOut} = useAuth();
    // use navigate to navigate the user to the lgoin page after loggin out
    let Navigate = useNavigate();
// logginOut user and navigating it to the login page
    const handleClick = ()=>{
        handleLogOut()
         Navigate('/')
         }
   

    return (
        <div className=''>
           <ToastContainer/>
            <h1 className=''>
                {user.name}
            </h1>

            {/* Hamburger Menu */}
            <div
                className='sm:hidden flex flex-col items-end mr-4 cursor-pointer'
                
            >
                <div
                    className={`h-0.5 w-6 mb-1 rounded bg-white transition-transform duration-300 ease-in-out ${
                        active ? 'transform rotate-45 translate-y-2' : ''
                    }`} 
                ></div>
                <div
                    className={`h-0.5 w-6 mb-1 rounded bg-white transition-opacity duration-300 ease-in-out ${
                        active ? 'opacity-0' : ''
                    }`}
                ></div>
                <div
                    className={`h-0.5 w-6 rounded bg-white transition-transform duration-300 ease-in-out ${
                        active ? 'transform -rotate-45 -translate-y-2' : ''
                    }`}
                ></div>
            </div>

            {/* Navigation Links */}
            <div
                className={`flex-col sm:flex-row gap-y-2 sm:gap-y-0 gap-x-3 mt-4 sm:mt-0 sm:flex ${
                    active ? 'flex' : 'hidden'
                } sm:mr-16 absolute sm:static right-4 top-16 bg-black p-5 sm:p-0 rounded-lg sm:bg-transparent`}
            >
                 <Button  label={<BiExit/>} className={'tracking-wide bg-red-700 hover:bg-red-800 px-4 py-2 sm:py-1'} onClick={handleClick} />   
            </div>
        </div>
    )
}

export default Navbar
