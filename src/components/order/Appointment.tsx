import {useState} from 'react';
import { Product } from '@/types/product';
import { CardProps } from './Card';

export default function Appointment() {
    const [time, setTime] = useState('-');
    const [date, setDate] = useState('-');

    return(
        <div className='flex-col flex border-3 w-[500px] border-[30px] border-white h-full'>
            <div className='flex h-fit items-center w-full border-x-[2px] border-y-5 border-blue-700'>
                <div className="flex text-[13px] font-normal">Appointment Place</div>
                <div className="font-bold text-[24px]-">status</div>
            </div>
        </div>

    )


}