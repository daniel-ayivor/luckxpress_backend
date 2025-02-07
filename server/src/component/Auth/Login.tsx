import {  useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Loader from "../../Utils/Loader";
import { LoginTypes } from "../../Types/LoginTypes";

import bckgroundImg from '../../assets/pexels-kelly-1179532-12530458.jpg';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginTypes>();
  const [showPassword, setShowPassword] = useState(false);
const navigate= useNavigate()
  // Handle form submission

  const handleLogin = async (data: LoginTypes) => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok && result.token) {
        // Save the token in localStorage or cookies
        localStorage.setItem('access_token', result.token);
        navigate("/index")
  
        // Use user data for personalization
        console.log('Logged in user:', result.user);
  
        toast.success('Login successful!');
      } else {
        toast.error(result.message || 'Failed to login.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Something went wrong.');
    }
  };
  

  return (
    <div
      style={{
        backgroundImage: `url(${bckgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="flex min-h-screen w-screen items-center justify-center text-gray-600"
    >
      <div className="bg-opacity-70 bg-black absolute inset-0"></div>
      <div className="relative">
        {/* Pattern 1 */}
        <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute -left-20 -top-20">
          <svg id="patternId" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="a"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
                patternTransform="scale(0.6) rotate(0)"
              >
                <rect x="0" y="0" width="100%" height="100%" fill="none" />
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  strokeWidth="1"
                  stroke="none"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#a)" />
          </svg>
        </div>

        {/* Pattern 2 */}
        <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute -right-20 -bottom-20">
          <svg id="patternId" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="b"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
                patternTransform="scale(0.5) rotate(0)"
              >
                <rect x="0" y="0" width="100%" height="100%" fill="none" />
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  strokeWidth="1"
                  stroke="none"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#b)" />
          </svg>
        </div>

        {/* Form Container */}
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-transparent backdrop-blur-2xl shadow-lg px-4">
          <div className="flex-auto p-6">
            {/* Logo Section */}
            <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
              <a href="#" className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
                <span className="flex-shrink-0 text-3xl font-black lowercase tracking-tight opacity-100">
                  Futurism Courier.
                </span>
              </a>
            </div>

            <h4 className="mb-2 font-medium text-gray-100 xl:text-xl">Welcome to futurism!</h4>

            {/* Form */}
            <form onSubmit={handleSubmit(handleLogin)} className="mb-4">
              <div className="mb-2">
                <label className="mb-2 inline-block text-xs font-medium text-gray-100">
                  User name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg-transparent py-2 px-3 pl-10 text-sm outline-none focus:border-indigo-500 focus:text-gray-200 focus:shadow"
                    id="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Enter your username"
                    autoFocus
                  />
                  {/* Envelope Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12l-10 6-10-6" />
                    <path d="M22 4l-10 6-10-6" />
                  </svg>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-gray-100">Password</label>
                  <a href="#" className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500">
                    <small>Forgot Password?</small>
                  </a>
                </div>

                <div className="relative w-full">
                  {/* Password Input Field */}
                  <input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Password is required" })}
                    className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg-transparent py-2 pl-10 px-3 text-sm outline-none focus:border-indigo-500 focus:text-gray-200 focus:shadow"
                  />

                  {/* Lock Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 17a4 4 0 004-4V7a4 4 0 10-8 0v6a4 4 0 004 4z" />
                    <path d="M8 11V7a6 6 0 1112 0v4" />
                  </svg>

                  {/* Toggle Password Visibility Button */}
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.94 10.94 0 0112 21a10.94 10.94 0 01-5.94-3.06m0-11.88A10.94 10.94 0 0112 3a10.94 10.94 0 015.94 3.06M1 1l22 22"></path>
                        <path d="M9.88 9.88a3 3 0 104.24 4.24"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-4 mt-6">
                <button
                  className="w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none flex justify-center items-center"
                  type="submit"
                >
                  {isSubmitting ? <Loader /> : "Sign In"}
                </button>
              </div>
            </form>

            <p className="mb-4 text-xs text-center">
              New on futurism?{" "}
              <a href="/signup" className="cursor-pointer text-sm text-indigo-500 no-underline hover:text-indigo-500">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
