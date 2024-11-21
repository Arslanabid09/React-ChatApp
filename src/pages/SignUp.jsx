import React, { useState } from 'react';
import { Button, Input } from '../components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const SignUp = () => {
  // States for user signup
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Custom hook
  const { handleSignUp } = useAuth();

  // Toggle password visibility
  const togglePassword = () => setShowPassword(!showPassword);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle form submission
  const handleUser = async (e) => {
    e.preventDefault();
    // Validation checks
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      toast.error('All fields are required!');
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error('Invalid email format!');
      return;
    }

    const Name = `${firstName} ${lastName}`; // Concatenate names with space
    try {
      const response = await handleSignUp(email, password, Name);

      // Log the response for debugging
      console.log('handleSignUp response:', response);

      // Check for success (adjust based on response structure)
      if (response.$id) {
        toast.success('Account created successfully!');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
      } else {
        toast.error('Account creation failed! Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Something went wrong! Please try again later.');
    }
  };


  return (
    <>
      <ToastContainer />
      <section className="space-y-5 my-20 px-5">
        <h1 className="text-3xl md:text-4xl text-center font-extrabold text-white">
          Create Your Account
        </h1>
        <form
          onSubmit={handleUser}
          className="rounded-lg bg-black p-10 flex flex-col gap-y-7 justify-center w-full max-w-2xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full"
              aria-label="First Name"
            />
            <Input
              type="text"
              placeholder="Last Name"
              className="w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              aria-label="Last Name"
            />
          </div>
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
            Already have an account? <Link to={'/'} className="text-green-600 cursor-pointer">Login</Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default SignUp;
