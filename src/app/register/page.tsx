'use client'

import React, { useState } from "react";
import { createBuyer } from "@/utils/buyer";
import { createSeller } from "@/utils/seller";

function RegisterPage() {
    const [userType, setUserType] = useState("Buyer");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confrimPassword, setConfrimPassword] = useState("");
    const [error, setError] = useState("");


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
    };

    const handleSubmit = async (e: any) => {
        e.defaultPrevented();

        if (password != confrimPassword) {
            setError("Password do not match!");
            return;
        }

        if (!username || !password || !confrimPassword) {
            setError("Please complete all inputs")
        }


    }
    
        

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-10 text-center">
                <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl">
                    {/* Left Section */}
                    <div className="w-full md:w-3/5 p-6 md:p-10">
                        <div className="py-10 md:py-20">
                            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
                                Sign Up Your Account
                            </h2>

                            {/* User Type Buttons */}
                            <div className="flex justify-center mb-6">
                                <button
                                    type="button"
                                    onClick={() => setUserType("Buyer")}
                                    className={`px-6 py-2 font-semibold border-b-2 transition-all duration-300 ${
                                        userType === "Buyer"
                                            ? "border-blue-900 text-blue-900"
                                            : "border-transparent text-black"
                                    }`}
                                >
                                    Buyer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUserType("Seller")}
                                    className={`px-6 py-2 font-semibold border-b-2 transition-all duration-300 ${
                                        userType === "Seller"
                                            ? "border-blue-900 text-blue-900"
                                            : "border-transparent text-black"
                                    }`}
                                >
                                    Seller
                                </button>
                            </div>

                            {/* Form Fields */}
                            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                                {error && (
                                    <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 round-md mt-2">
                                        {error}
                                    </div>
                                ) }
                            
                                <input
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="bg-gray-100 w-full sm:w-72 p-2 mb-4 rounded outline-none text-sm text-black"
                                />
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="bg-gray-100 w-full sm:w-72 p-2 mb-4 rounded outline-none text-sm text-black"
                                />
                                <input
                                    onChange={(e) => setConfrimPassword(e.target.value)}
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="bg-gray-100 w-full sm:w-72 p-2 mb-4 rounded outline-none text-sm text-black" 
                                />
                                <button
                                    type = "submit"
                                    className="border-2 border-blue-900 text-blue-900 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-900 hover:text-white"
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-2/5 bg-blue-900 text-white py-10 px-6 md:py-36 md:px-12 rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">Create an Account!</h2>
                        <p className="mb-8 text-sm md:text-base">
                            If you already have an account, please go to the login page...
                        </p>
                        <a
                            href="\login"
                            className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-900"
                        >
                            Login
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default RegisterPage;
