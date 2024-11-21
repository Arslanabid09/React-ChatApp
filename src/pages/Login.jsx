import React,{useState} from 'react';
import { ToastContainer } from 'react-toastify';
import { Input,Button } from '../components';
import { Link } from 'react-router-dom';
import { FaEye,FaEyeSlash } from 'react-icons/fa';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const togglePassword = () => setShowPassword(!showPassword);
//   handling user Sign-in
const handleUser = ()=>{

}
  return (
    <>
    <ToastContainer />
      <section className="space-y-5 my-20 px-5">
        <h1 className="text-3xl md:text-4xl text-center font-extrabold text-white">
          Create Your Account
        </h1>
        <form
          onSubmit={''}
          className="rounded-lg bg-black p-10 flex flex-col gap-y-7 justify-center w-full max-w-2xl mx-auto"
        >
         
          <Input
            type="email"
            placeholder="Email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />
          <div className="relative w-full">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
            {showPassword ? (
              <FaEyeSlash
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white cursor-pointer"
                onClick={togglePassword}
                role="button"
                aria-label="Hide password"
              />
            ) : (
              <FaEye
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white cursor-pointer"
                onClick={togglePassword}
                role="button"
                aria-label="Show password"
              />
            )}
          </div>
          <Button label="Sign Up" type="submit" className="w-full" />
          <p className="text-white text-center">
            Already have an account? <Link to={'signUp'} className="text-green-600 cursor-pointer">Login</Link>
          </p>
        </form>
      </section> 
    </>
  )
}

export default Login