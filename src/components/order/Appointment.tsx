import {useState} from 'react';
import { Product } from '@/types/product';
import { CardProps } from './Card';
import { useAuth } from '@/context/AuthContext';

export default function Appointment(prop: CardProps) {
    const { user } = useAuth();
    const [time, setTime] = useState('-');
    const [date, setDate] = useState('-');

    const status: { [key: number]: string } = {
        0: 'Pending payment',
        1: 'Add appointment',
        2: 'Edit appointment',
        3: 'Completed',
      };
      const BorderColorCode: { [key: number]: string } = {
        0: 'border-pink-500',
        1: 'border-blue-500',
        2: 'border-brown-500',
        3: 'border-green-500',
      };
      const BGColorCode: { [key: number]: string } = {
        0: 'bg-pink-500',
        1: 'bg-blue-500',
        2: 'bg-brown-500',
        3: 'bg-green-500',
      };

    return(
        // <div className='flex-col flex border-3 w-[500px] border-[30px] border-white h-full'>
        //     <div className='flex h-fit items-center w-full border-x-[2px] border-y-5 border-blue-700'>
        //         <div className="flex text-[13px] font-normal">Appointment Place</div>
        //         <div className="font-bold text-[24px]-">status</div>
        //     </div>
        // </div>

        <div className="px-6 gap-6 flex flex-col items-center justify-center">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-black mt-4">Appointment Summary</h1>
                <p className="text-m font-normal text-gray-600 mt-2">
                    We appreciate your punctuality for a seamless experience. 
                </p>
                <p className="text-m font-normal text-gray-600 mt-2">
                    Late arrivals may result in rescheduling.
                </p>
            </div>
            <div className={`w-full h-[150px] p-4 rounded-lg border-2 relative ${BorderColorCode[prop.status]}`}>
                <p className="text-m font-bold text-gray-600">
                    Appointment Date 
                </p>
                {user?.userType === 'buyer' && (
                    <button className={`rounded-lg absolute bottom-2 right-2 text-white px-4 py-2 ${BGColorCode[prop.status]}`}>
                        Edit
                    </button>
                )}
            </div>
            <div className={`w-full h-[150px] p-4 rounded-lg border-2 relative ${BorderColorCode[prop.status]}`}>
                <p className="text-m font-bold text-gray-600">
                    Appointment Place
                </p>
                {user?.userType === 'seller' && (
                    <button className={`rounded-lg absolute bottom-2 right-2 text-white px-4 py-2 ${BGColorCode[prop.status]}`}>
                        Edit
                    </button>
                )}
            </div>
        </div>
    )
}