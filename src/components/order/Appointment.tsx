import { useEffect, useState } from 'react';
import { CardProps } from './Card';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import moment from 'moment';
import { status } from './Popup';
import { useAuth } from '@/context/AuthContext';
import {
  getAppointmentByOrderID,
  updatePlace,
  updateTime,
} from '@/utils/appointment';
import { changeOrderStatus } from '@/utils/order';
import { useToast } from '@/context/ToastContext';
import { cn } from '@/lib/utils';
import { Appointment } from '@/types/appointment';

export default function AppointmentPage(prop: CardProps) {
  const toast = useToast();
  const [appointmentTime, setAppointmentTime] = useState('-');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { user } = useAuth();
  const [color, setColor] = useState('bg-[#003FFD] text-white');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [dateShow, setDateShow] = useState('');

  const calendarBlueTheme = `
        .selected {
        background-color: #003FFD;
        color: white;
        border-radius: 10px;
        }
        .today {
        color: #003FFD;
        }
        .selected.today {
        background-color: #003FFD !important;
        color: white !important;
        }
        `;

  const bgColor: { [key: number]: string } = {
    0: 'bg-[#F33CB4]',
    1: 'bg-[#003FFD]',
    2: 'bg-[#CC731B]',
    3: 'bg-[#0D9C72]',
  };
  useEffect(() => {
    if (prop.order.status == 1) {
      setSelectedDate(new Date());
      setColor('bg-[#003FFD] text-white');
    } else {
      setColor('bg-[#CC731B] text-white');
    }
  }, [prop.order.status]);

  const timeAvilable = [
    '08.00',
    '09.00',
    '10.00',
    '11.00',
    '12.00',
    '13.00',
    '14.00',
    '15.00',
    '16.00',
    '17.00',
  ];

  useEffect(() => {
    const fetchAppointment = async () => {
      const res: Appointment | null = await getAppointmentByOrderID(
        prop.order.orderID
      );
      if (!res) {
        return;
      }

      setAddress(res.address);
      setDistrict(res.city);
      setProvince(res.province);
      setAppointmentTime(res.timeSlot);

      const dateOnly = new Date(res.date);
      dateOnly.setHours(0, 0, 0, 0); // Reset time part

      setDateShow(dateOnly.toLocaleDateString()); // This should be a Date object
    };

    fetchAppointment();
  }, []); // Runs only once when component mounts
  const saveAppointment = () => {
    if (prop.order.status === 2) {
      doneDeliver();
    } else {
      if (user?.userType === 'buyer') {
        updateBuyer();
      } else {
        updateSeller();
      }
    }
  };

  const updateSeller = async () => {
    const res = await updatePlace(
      address,
      district,
      province,
      zipcode,
      prop.order.appointmentID
    );

    if (res) {
      const updatePatch = await changeOrderStatus(1, prop.order.orderID);
      if (updatePatch) {
        toast?.setToast('success', 'Add appointment successfully!');
        window.location.href = '/order';
      } else {
        toast?.setToast('error', 'There is an error occurred!');
      }
    } else {
      toast?.setToast('error', 'There is an error occurred!');
    }
  };

  const updateBuyer = async () => {
    const res = await updateTime(
      moment(selectedDate).format('YYYY-MM-DD'),
      appointmentTime,
      prop.order.appointmentID
    );

    if (res) {
      const updatePatch = await changeOrderStatus(2, prop.order.orderID);
      if (updatePatch) {
        toast?.setToast('success', 'Add appointment successfully!');
        window.location.href = '/order';
      } else {
        toast?.setToast('error', 'There is an error occurred!');
      }
    } else {
      toast?.setToast('error', 'There is an error occurred!');
    }
  };

  const doneDeliver = async () => {
    const updatePatch = await changeOrderStatus(3, prop.order.orderID);
    if (updatePatch) {
      toast?.setToast('success', 'Add appointment successfully!');
      window.location.href = '/order';
    } else {
      toast?.setToast('error', 'There is an error occurred!');
    }
  };

  return (
    <div className="flex-col bg-white flex border-3 w-[500px] border-[30px] border-white h-full">
      <div
        className={cn(
          'flex flex-col h-fit justify-center w-full gap-[10px] px-[18px] py-[20px] rounded-xl border-[2px]',

          prop.order.status == 0
            ? 'border-project-pink'
            : prop.order.status == 1
              ? 'border-[#003FFD]'
              : prop.order.status == 2
                ? 'border-project-brown'
                : 'border-project-green'
        )}
      >
        <div className="flex text-[13px] font-normal">Appointment</div>
        <div className="font-bold text-[24px]">
          {prop.order.status === 1
            ? address != ''
              ? `${address} ${district} ${province} `
              : 'No Data - Waiting For Seller'
            : prop.order.status === 0
              ? status[prop.order.status]
              : prop.order.status === 2
                ? `${dateShow} ${appointmentTime}`
                : 'Completed'}
        </div>
      </div>
      <div className="font-bold text-[24px] w-full">
        {prop.order.status === 0 && user?.userType === 'seller'
          ? 'Add Place'
          : prop.order.status === 1 && user?.userType === 'buyer'
            ? 'Add Appointment day and time'
            : prop.order.status === 2
              ? `${address} ${district} ${province}`
              : ''}
      </div>
      {/* BUGGGGG FUCKKKKK calenda color cannot change */}
      {user?.userType === 'buyer' && prop.order.status === 1 && (
        <>
          <div className="w-full h-fit justify-center items-center  mt-2 rounded-2xl p-3 ">
            <div className="w-fit ml-auto mr-auto">
              <div className="relative">
                <style>{calendarBlueTheme}</style>
                {/* <style>{calendarOrangeTheme}</style> */}

                {/* Blue Theme Calendar (Visible when status is 1) */}
                <div className={prop.order.status === 1 ? 'flex' : 'hidden'}>
                  <DayPicker
                    animate
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    footer={
                      selectedDate
                        ? `Selected: ${selectedDate.toLocaleDateString()}`
                        : 'Pick a day.'
                    }
                    modifiersClassNames={{
                      selected: 'selected',
                      today: 'today',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-[12px] mt-4 ">
            {timeAvilable.map((time: string) => (
              <div
                className={cn(
                  'w-[80px] h-[35px] flex text-[14px] font-semibold justify-center items-center rounded-lg',
                  appointmentTime === time ? color : 'bg-[#F3F4F6] text-black'
                )}
                key={time}
                onClick={() => setAppointmentTime(time)}
              >
                {time}
              </div>
            ))}
          </div>
        </>
      )}
      {user?.userType === 'seller' && prop.order.status === 1 && (
        <>
          <div className="flex flex-col h-fit w-full gap-3">
            <div className="flex flex-col gap-3 w-full h-fit ">
              <div className="flex text-[13px] font-normal">Address*</div>
              <input
                className="w-full h-[44px] rounded-lg border-[#D1D5DB] outline-none border-[1px] text-[15px] font-normal px-3 no- focus:border-[#808b96] focus:border-[1.5px]  focus:ring-0"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 w-full h-fit">
              <div className="flex text-[13px] font-normal">District*</div>
              <input
                className="w-full h-[44px] rounded-lg border-[#D1D5DB] outline-none border-[1px] text-[15px] font-normal px-3 focus:border-[#808b96] focus:border-[1.5px]  focus:ring-0"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 w-full h-fit">
              <div className="flex text-[13px] font-normal">Province*</div>
              <input
                className="w-full h-[44px] rounded-lg border-[#D1D5DB] outline-none border-[1px] text-[15px] font-normal px-3 focus:border-[#808b96] focus:border-[1.5px]  focus:ring-0"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 w-full h-fit">
              <div className="flex text-[13px] font-normal">Zipcode*</div>
              <input
                className="w-full h-[44px] rounded-lg border-[#D1D5DB] outline-none border-[1px] text-[15px] font-normal px-3 focus:border-[#808b96] focus:border-[1.5px]  focus:ring-0"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      {((user?.userType === 'seller' &&
        (prop.order.status === 1 || prop.order.status === 0)) ||
        (user?.userType === 'buyer' &&
          (prop.order.status === 2 || prop.order.status === 1))) && (
        <div className="flex mt-4 h-fit items-center">
          <div
            onClick={saveAppointment}
            className={cn(
              `ml-auto flex justify-center items-center text-[16px] rounded-xl w-[107px] h-[41px] text-white`,
              bgColor[prop.order.status]
            )}
          >
            {prop.order.status === 2 ? 'Completed':'Save'}
          </div>
        </div>
      )}
    </div>
  );
}
