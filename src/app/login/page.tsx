'use client'

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";
// import { FaRegEnvelope } from "react-icons/fa";
// import { MdLockOutline } from "react-icons/md";

interface UserInfo {
    email: string;
    password: string;
}

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">

            <div className="bg-white rounded-3xl shadow-2xl flex w-2/3 max-w-4xl">

                <div className="w-3/5 p-5 rounded-tl-3xl rounded-bl-3xl">   

                    <div className="py-20">

                        <h2 className="text-3xl font-bold text-blue-800 mb-6">
                            Login to Account
                        </h2>

                        <div className="flex flex-col items-center">

                            <div className="bg-gray-100 w-64 p-2 flex items-center mb-4">
                                {/* <FaRegEnvelope className="text-gray-400 m-2"/> */}
                                <input 
                                type="email" 
                                name="email" 
                                placeholder="Email"
                                className="bg-gray-100 outline-none text-sm text-black flex-1"/>
                            </div>
                            <div className="bg-gray-100 w-64 p-2 flex items-center mb-6">
                                {/* <MdLockOutline className="text-gray-400 m-2"/> */}
                                <input 
                                type="password" 
                                name="password" 
                                placeholder="Password"
                                className="bg-gray-100 outline-none text-sm text-black flex-1"/>
                            </div> 
                            <a 
                            href="#"
                            className="border-2 border-blue-800 text-blue-800 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-800 hover:text-white">
                                Login
                            </a>

                        </div>
                        
                    </div>

                </div>
                <div className="w-2/5 bg-blue-800 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                    <h2 className="text-3xl font-bold mb-2">Create, Account!</h2>                  
                    <p className="mb-10">
                        Sign up if you still don't have an account ...
                    </p>
                    <a
                    href="\register"
                    className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-blue-800">
                        Sign Up
                    </a>
                </div>
            </div>
    </main>
   </div>
    )
}