'use client';

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { axios } from "axios";

export default function LoginPage() {
    const router = useRouter();

    const [userType, setUserType] = useState("Buyer");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">

                <div className="bg-white rounded-3xl shadow-2xl flex w-2/3 max-w-4xl">

                    <div className="w-3/5 p-5 rounded-tl-3xl rounded-bl-3xl">   

                        <div className="py-20">

                            <h2 className="text-3xl font-bold text-blue-900 mb-6">
                                Login to Account
                            </h2>

                            <button
                            type="button"
                            onClick={() => setUserType("Buyer")}
                            className={`px-6 py-2 font-semibold border-b-2 transition-all duration-300 ${
                                userType === "Buyer"
                                ? "border-blue-900 text-blue-900"
                                : "border-transparent text-black"
                            }`}
                            > Buyer </button>
                        
                            <button
                            type="button"
                            onClick={() => setUserType("Seller")}
                            className={`px-6 py-2 font-semibold border-b-2 transition-all duration-300 ${
                                userType === "Seller"
                                ? "border-blue-900 text-blue-900"
                                : "border-transparent text-black"
                            }`}
                            > Seller </button>

                            <div className="flex flex-col items-center">

                            <div className="bg-gray-100 w-64 p-2 flex items-center mb-4 mt-4">
                                {/* <FaRegEnvelope className="text-gray-400 m-2"/> */}
                                <input onChange={(e) => setName(e.target.value)} 
                                type="name" 
                                name="name" 
                                placeholder="Name"
                                className="bg-gray-100 outline-none text-sm text-black flex-1"/>
                            </div>
                            <div className="bg-gray-100 w-64 p-2 flex items-center mb-4">
                                {/* <MdLockOutline className="text-gray-400 m-2"/> */}
                                <input onChange={(e) => setPassword(e.target.value)} 
                                type="password" 
                                name="password" 
                                placeholder="Password"
                                className="bg-gray-100 outline-none text-sm text-black flex-1"/>
                            </div> 
                                <a 
                                href="#"
                                className="border-2 border-blue-900 text-blue-900 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-900 hover:text-white">
                                    Login
                                </a>

                            </div>
                            

                        </div>

                    </div>
                    <div className="w-2/5 bg-project-blue text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                        <h2 className="text-3xl font-bold mb-6">Hello!</h2>                  
                        <p className="mb-8">
                            Sign up if you still don't have an account ...
                        </p>
                        <a
                        href="\register"
                        className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-900">
                            Sign Up
                        </a>
                    </div>
                </div>
        </main>
       </div>
    )
}