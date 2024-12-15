import React, { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "../components/Input";
import Button from "../components/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSignUp } = useAuth();
  const registerRef = useRef(null);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleRegister =  (e) => {
    e.preventDefault();

    const name = `${registerRef.current.firstName.value.trim()} ${registerRef.current.lastName.value.trim()}`;
    const email = registerRef.current.email.value.trim();
    const password = registerRef.current.password.value.trim();
    const userData = { name, email, password };
// validations for email and password
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    const minPasswordLength = 8;

    if (!name || !email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    if (!emailValidation.test(email)) {
      toast.error("Invalid Email");
      return;
    }

    if (password.length < minPasswordLength) {
      toast.error(`Password must be at least ${minPasswordLength} characters`);
      return;
    }
      const response = handleSignUp(userData); 
    
  };

  return (
    <>
      <ToastContainer />
      <section className="space-y-5 my-20 px-5">
        <h1 className="text-3xl md:text-4xl text-center font-extrabold text-white">
          Create Your Account
        </h1>
        <form
          ref={registerRef}
          onSubmit={handleRegister}
          className="rounded-lg bg-black p-10 flex flex-col gap-y-7 justify-center w-full max-w-2xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-5 w-full">
            <Input
              type="text"
              placeholder="First Name"
              name="firstName"
              className="w-full"
            />
            <Input
              type="text"
              placeholder="Last Name"
              name="lastName"
              className="w-full"
            />
          </div>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full"
          />
          <div className="relative w-full">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
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
          <p className="text-white text-center">
            Already have an account?{" "}
            <Link to="/" className="text-green-600 cursor-pointer">
              Login
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default SignUp;
