import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import bckgroundImg from "../../assets/pexels-kelly-1179532-12530458.jpg"; // Adjust the path as needed
import { BASE_URL } from "@/Constant/api";

interface SignUpTypes {
    name: string;
    email: string;
    password: string;
    
}

const SignUp = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpTypes>();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<SignUpTypes> = async (data) => {
        setSubmitting(true); // Start submission
        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result, "result")
            if (response.ok) {
                toast.success("Registration successful!");
                navigate("/signin");
            } else {
                toast.error(result.message || "Registration failed. Please try again.");
            }
        } catch (error: any) {
            console.error("Error during registration:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setSubmitting(false); // End submission
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
                <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-transparent backdrop-blur-2xl shadow-lg px-4">
                    <div className="flex-auto p-6">
                        <div className="mb-10 flex items-center justify-center">
                            <a href="#" className="flex items-center gap-2 text-indigo-500">
                                <span className="text-3xl font-black lowercase tracking-tight">
                                    Futurism Courier.
                                </span>
                            </a>
                        </div>
                        <h4 className="mb-2 font-medium text-gray-200 xl:text-xl">
                            Welcome to Futurism!
                        </h4>
                        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                            {/* Username Field */}
                            <div className="mb-2">
                                <label className="mb-2 inline-block text-xs font-medium text-gray-200">
                                    User name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg-transparent py-2 pl-10 px-3 text-sm outline-none focus:border-indigo-500 focus:text-gray-200 focus:shadow"
                                        {...register("name", {
                                            required: "Name is required", // Validation rule
                                        })}
                                        placeholder="Enter your user name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="mb-2">
                                <label className="mb-2 inline-block text-xs font-medium text-gray-200">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg-transparent py-2 pl-10 px-3 text-sm outline-none focus:border-indigo-500 focus:text-gray-200 focus:shadow"
                                        {...register("email", {
                                            required: "Email is required", // Validation rule
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Invalid email format",
                                            },
                                        })}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="mb-6">
                                <label className="mb-2 inline-block text-xs font-medium text-gray-200">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg-transparent py-2 pl-10 px-3 text-sm outline-none focus:border-indigo-500 focus:text-gray-200 focus:shadow"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters",
                                            },
                                        })}
                                        placeholder="Enter your password"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mb-4 ">
                                <button
                                    className="w-full mt-2 rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600"
                                    type="submit"
                                >
                                    {isSubmitting ? "Submitting..." : "Sign Up"}
                                </button>
                            </div>
                        </form>

                        <p className="text-xs text-center text-gray-200">
                            Already have an account?{" "}
                            <a href="/signin" className="text-indigo-500 hover:underline">
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;