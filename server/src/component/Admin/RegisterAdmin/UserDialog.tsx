import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { BASE_URL } from "@/Constant/api";
// import { SignUpTypes, UserType } from "@/Types/LoginTypes";
import { ShipmentDetails } from "@/Types/TrackTypes";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GiArchiveRegister } from "react-icons/gi";

export interface SignUpTypes {
    name: string;
    email: string;
    password: string;
    
}
export function UserDialog() {

    const [shipmentDetail, setShipmentDetails] = useState<ShipmentDetails>()

    const [isSubmitting, setSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpTypes>();
    const [showPassword, setShowPassword] = useState(false);


    const onSubmit: SubmitHandler<SignUpTypes> = async (data) => {
        setSubmitting(true); // Start submission
        console.log("package")
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
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <GiArchiveRegister className="text-violet-400" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-4">
                <DialogHeader>
                    <DialogTitle className="text-center text-sm mt-4 text-neutral-700">Register User</DialogTitle>
                </DialogHeader>
                <div className="m-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                        {/* Username Field */}
                        <div className=" flex justify-between gap-4">

                            <div className="mb-2 w-full">
                                <label className="mb-2 inline-block text-xs font-medium text-gray-600">
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
                            <div className="mb-2 w-full">
                                <label className="mb-2 inline-block text-xs font-medium text-gray-600">
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
                        </div>


                        <div className=" flex justify-between gap-4">
                            <div className="mb-6 w-full">
                                <label className="mb-2 inline-block text-xs font-medium text-gray-600">
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
                </div>
            </DialogContent>
        </Dialog>
    );
}
