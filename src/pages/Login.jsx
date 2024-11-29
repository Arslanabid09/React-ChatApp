import React,{useEffect, useRef, useState} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Input,Button } from '../components';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye,FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  // this way we can  extract the data from auth context  
 let {user,handleLogin} = useAuth();
 let Navigate = useNavigate(); 
 //  this creates a ref object to hold a refrence to a dom element without re-rendering on changes
 let userRef = useRef(null);
 //  this will navigate the user to chat box after logging in
 useEffect(()=>{
  if(user){
    Navigate('/Room')
  }
 },[user])
  // handling user auth    
  const handleUser =  (e) => {
    e.preventDefault();
  
    const email = userRef.current.email.value.trim();
    const password = userRef.current.password.value.trim();
    const userInfo = { email, password };
// validations for email and password
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const minPasswordLength = 8;
    // validation for empty fields
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    // validation for email 
    if (!emailValidation.test(email)) {
      toast.error("Invalid Email");
      return;
    }
  // validation for password 
    if (password.length < minPasswordLength) {
      toast.error(`Password must be at least ${minPasswordLength} characters`);
      return;
    }
    // handling user login 
      const response =  handleLogin(userInfo);
  };
  
  return (
    <>
    <ToastContainer />
      <section className="space-y-5 my-20 px-5">
        <h1 className="text-3xl md:text-4xl text-center font-extrabold text-white">
          Create Your Account
        </h1>
        <form
        ref={userRef}
          onSubmit={handleUser}
          className="rounded-lg bg-black p-10 flex flex-col gap-y-7 justify-center w-full max-w-2xl mx-auto"
        >
         
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full"
          />
          <div className="relative w-full">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="w-full"
            />
            {showPassword ? (
              <FaEyeSlash
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white cursor-pointer"
                onClick={togglePassword}
                role="button"
              />
            ) : (
              <FaEye
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white cursor-pointer"
                onClick={togglePassword}
                role="button"
              />
            )}
          </div>
          <Button label="Sign Up" type="submit" className="w-full" />
          <p className="text-white text-center font-medium">
            Don't have an account?<Link to={'/signUp'} className="text-green-600 cursor-pointer">Register Now</Link>
          </p>
        </form>
      </section> 
    </>
  )
}

export default Login