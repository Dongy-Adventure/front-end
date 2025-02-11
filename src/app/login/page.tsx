'use client';

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [userType, setUserType] = useState("Buyer");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
    };

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        
        
        
    };

    const buttonClass = (type: any) =>
        `px-6 py-2 font-semibold border-b-2 transition-all duration-300 ${
            userType === type ? "border-blue-900 text-blue-900" : "border-transparent text-black"
        }`;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gray-100">
            <main className="flex flex-col items-center justify-center w-full px-4 sm:px-10 text-center">
                <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl">
                    {/* Left Section */}
                    <div className="flex flex-col w-full md:w-3/5 p-6 md:p-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 mt-6">
                            Login to Your Account
                        </h2>

                        {/* User Type Toggle */}
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

                        {/* Login Form */}
                        <form className="flex flex-col items-center">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={username}
                                onChange={handleInputChange}
                                className="bg-gray-100 w-full sm:w-72 p-2 mb-4 rounded outline-none text-sm text-black"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleInputChange}
                                className="bg-gray-100 w-full sm:w-72 p-2 mb-4 rounded outline-none text-sm text-black"
                            />
                            <button
                                type="submit"
                                className="border-2 border-blue-900 text-blue-900 rounded-full px-12 py-2 font-semibold hover:bg-blue-900 hover:text-white"
                            >
                                Login
                            </button>
                            {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
                        </form>
                    </div>

                    {/* Right Section */}
                    <div className="w-full md:w-2/5 bg-blue-900 text-white py-10 px-6 md:py-36 md:px-12 rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">Hello!</h2>
                        <p className="mb-8 text-sm md:text-base">
                            Sign up if you still don’t have an account...
                        </p>
                        <Link
                            href="/register"
                            className="border-2 border-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-blue-900"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
