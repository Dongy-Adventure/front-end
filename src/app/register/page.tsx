'use client'

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { Axios } from "axios";

function RegisterPage() {
    const router = useRouter();

    const [userType, setUserType] = useState("Buyer");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">

            <div className="bg-white rounded-3xl shadow-2xl flex w-2/3 max-w-4xl">

                <div className="w-3/5 p-5 rounded-tl-3xl rounded-bl-3xl">   

                    <div className="py-20">

                        <h2 className="text-3xl font-bold text-blue-900 mb-4">
                            Sigh Up Your Account
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
                            <div className="bg-gray-100 w-64 p-2 flex items-center mb-6">
                                {/* <MdLockOutline className="text-gray-400 m-2"/> */}
                                <input onChange={(e) => setConfirmPassword(e.target.value)} 
                                type="confirmPassword" 
                                name="confirmPassword" 
                                placeholder="ConfirmPassword"
                                className="bg-gray-100 outline-none text-sm text-black flex-1"/>
                            </div> 
                            <a 
                            href="#"
                            className="border-2 border-blue-900 text-blue-900 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-900 hover:text-white">
                                Sign In
                            </a>   
                        
                        </div>
                        
                        
                    </div>

                </div>
                <div className="w-2/5 bg-project-blue text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                    <h2 className="text-3xl font-bold mb-6">Create, Account!</h2>                  
                    <p className="mb-8">
                        If you already have an account, Please go to login page...
                    </p>
                    <a
                    href="\login"
                    className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-900">
                        Login
                    </a>
                </div>
            </div>
        </main>
    </div>
  )
}

export default RegisterPage