'use client';

import React, { useState } from "react";
import Link from "next/link";
import { buyerAuth } from "@/utils/auth";
import { sellerAuth } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const {register, handleSubmit} = useForm();
    const [userType, setUserType] = useState<string>("ผู้ซื้อ");
    const [isUploading, setIsUpLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const onSubmit = async (data: any) => {
        setErrorMessage("");
        setIsUpLoading(true);
        const {username, password} = data;

        if (!username || !password) {
            setErrorMessage("โปรดใส่ข้อมูลให้ครบถ้วน");
            setIsUpLoading(false);
            return;
        }

        const loadingToast = toast.loading('กำลังเข้าสู่ระบบ', {
            position: "top-center", 
            style: {
                marginTop: "50vh", 
                transform: "translateY(-50%)",
                width: "500",
                height: "500"
            }
        });

        try {
            let user;
            if (userType === "ผู้ซื้อ") {
                user = await buyerAuth(username, password);
            } else if (userType === "ผู้ขาย"){
                user = await sellerAuth(username, password);
            } else {
                setErrorMessage("Something is wrong");
                setIsUpLoading(false);
                return;
            }

            if (user) {
                setTimeout(() => {
                    toast.success('ลงทะเบียนสำเร็จ!', { id: loadingToast })
                }, 1100);  
                
                setTimeout(() => {
                    router.push("/profile");
                }, 2000)

            } else {
                setTimeout(() => {
                    toast.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', { id: loadingToast });
                    setIsUpLoading(false);
                }, 1500);
                return;
            }
            
        } catch(error) {
            setTimeout(() => {
                toast.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', { id: loadingToast });
            }, 500);
            setIsUpLoading(false);
        }
         
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gray-100">
            <main className="flex flex-col items-center justify-center w-full px-4 sm:px-10 text-center">
                <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl">
                    <div className="flex flex-col w-full md:w-3/5 p-6 md:p-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 mt-6">
                            ลงชื่อเข้าใช้
                        </h2>

                        <div className="flex justify-center mb-6">
                                <button
                                    type="button"
                                    onClick={() => setUserType("ผู้ซื้อ")}
                                    className={`px-6 py-2 font-semibold border-b-2 transition-all duration-300 ${
                                        userType === "ผู้ซื้อ"
                                            ? "border-blue-900 text-blue-900"
                                            : "border-transparent text-black"
                                    }`}
                                >
                                    ผู้ซื้อ
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUserType("ผู้ขาย")}
                                    className={`px-6 py-2 font-semibold border-b-2 transition-all duration-300 ${
                                        userType === "ผู้ขาย"
                                            ? "border-blue-900 text-blue-900"
                                            : "border-transparent text-black"
                                    }`}
                                >
                                    ผู้ขาย
                                </button>
                            </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
                            
                            <input
                                type="text"
                                placeholder="ชื่อผู้ใช้"
                                {...register("username")}
                                className="bg-gray-100 w-full sm:w-72 p-2 mb-4 rounded outline-none text-sm text-black"
                            />
                            <input
                                type="password"
                                placeholder="รหัสผ่าน"
                                {...register("password")}
                                className="bg-gray-100 w-full sm:w-72 p-2 mb-4 rounded outline-none text-sm text-black"
                            />
                            <button
                                type="submit"
                                disabled={isUploading}
                                className={`border-2  rounded-full px-12 py-2 inline-block font-semibold ${!isUploading ? "border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white" : "bg-gray-500 text-white"}`}
                                >
                                ลงชื่อเข้าใช้   
                            </button>
                            {errorMessage && <p className="mt-4 text-red-500 text-sm">{errorMessage}</p>}
                        </form>
                    </div>

                    <div className="w-full md:w-2/5 bg-blue-900 text-white py-10 px-6 md:py-36 md:px-12 rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">สวัสดี!</h2>
                        <p className="mb-8 text-sm md:text-base">
                            ลงทะเบียน ถ้าคุณยังไม่มีบัญชี
                        </p>
                        <Link
                            href="/register"
                            className="border-2 border-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-blue-900"
                        >
                            ลงทะเบียน
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
