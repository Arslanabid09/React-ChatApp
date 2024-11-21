import React, { useState } from 'react'
import {Button} from '../components/index';
// import { logout } from '../AppWrite/Auth'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [active, setActive] = useState(false)
    let navigate = useNavigate();


    const handleHamburger = () => {
        setActive(!active)
    }
    const handleLogout =  () => {
       let res = current.logOut();
    
       if(res) {navigate('/login')}

    }

    return (
        <div className='flex border-b  md:flex-row justify-between bg-slate-900 py-5 text-white items-center relative'>
            <h1 className='text-3xl sm:text-4xl mx-4 sm:mx-10 mt-2 font-extrabold tracking-widest text-green-600 hover:text-green-700 duration-300 cursor-pointer'>
                LinkUp
            </h1>

            {/* Hamburger Menu */}
            <div
                className='sm:hidden flex flex-col items-end mr-4 cursor-pointer'
                onClick={handleHamburger}
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
                <Button label={'Signup'} className={'tracking-wide bg-blue-700 hover:bg-blue-800 px-4 py-2 sm:py-1'} />
                 <Button  label={'Logout'} className={'tracking-wide bg-red-700 hover:bg-red-800 px-4 py-2 sm:py-1'} onClick={handleLogout} />   
                 <Button label={'Login'} className={'tracking-wide bg-blue-700 px-4 py-2 sm:py-1 hover:bg-blue-800'} />
            </div>
        </div>
    )
}

export default Navbar
