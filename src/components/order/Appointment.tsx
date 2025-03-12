import { useEffect, useState } from 'react';
import { CardProps } from './Card';
import { useAuth } from '@/context/AuthContext';
import { getAppointmentByOrderID } from '@/utils/appointment';
import { useToast } from '@/context/ToastContext';
import { Appointment } from '@/types/appointment';

export default function AppointmentComponent(prop: CardProps) {
  const { user } = useAuth();
  const toast = useToast();
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    const getUserOrders = async () => {
      const res = await getAppointmentByOrderID(prop.order.orderID);
      if (!res) {
        toast?.setToast('error', 'There is an error fetching the appointment!');
      } else {
        setAppointment(res);
      }
    };
    getUserOrders();
  }, []);

  // 0 -> wait for seller
  // 1 -> wait for buyer
  // 2 -> wait for deliver
  // 3 -> complete

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

  return (
    <div className="px-6 gap-6 flex flex-col items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-black mt-4">
          Appointment Summary
        </h1>
        <p className="text-m font-normal text-gray-600 mt-2">
          We appreciate your punctuality for a seamless experience.
        </p>
        <p className="text-m font-normal text-gray-600 mt-2">
          Late arrivals may result in rescheduling.
        </p>
      </div>
      <div
        className={`w-full h-[150px] p-4 rounded-lg border-2 relative ${BorderColorCode[prop.status]}`}
      >
        <p className="text-m font-bold text-gray-600">Appointment Date</p>
        {appointment?.address ? (
          <p className="text-m font-normal text-gray-600">
            {appointment.address}
          </p>
        ) : (
          <p className="text-m font-normal text-gray-600">
            No Data - Waiting For Buyer
          </p>
        )}
        {user?.userType === 'buyer' && (
          <button
            className={`rounded-lg absolute bottom-2 right-2 text-white px-4 py-2 ${BGColorCode[prop.status]}`}
          >
            Edit
          </button>
        )}
      </div>
      <div
        className={`w-full h-[150px] p-4 rounded-lg border-2 relative ${BorderColorCode[prop.status]}`}
      >
        <p className="text-m font-bold text-gray-600">Appointment Place</p>
        {appointment?.address ? (
          <p className="text-m font-normal text-gray-600">
            {appointment.address}
          </p>
        ) : (
          <p className="text-m font-normal text-gray-600">
            No Data - Waiting For Seller
          </p>
        )}
        {user?.userType === 'seller' && (
          <button
            className={`rounded-lg absolute bottom-2 right-2 text-white px-4 py-2 ${BGColorCode[prop.status]}`}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
