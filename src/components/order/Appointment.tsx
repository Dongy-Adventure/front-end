import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { CardProps } from './Card';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

export default function Appointment(prop: CardProps) {
  const [appointmentTime, setAppointmentTime] = useState('-');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const [color, setColor] = useState('bg-[#003FFD] text-white');
  const [css, setCss] = useState("");

  useEffect(() => {
    if (prop.status == 2) {
      setSelectedDate(new Date());
      setColor('bg-[#CC731B] text-white');
      setCss(`
        .selected {
          background-color: #CC731B;
          color: white;
          border-radius: 10px;
        }
        .today {
          color: #CC731B;
        }
        .selected.today {
          background-color: #CC731B !important;
          color: white !important;
        }
      `);
    } else {
      setColor('bg-[#003FFD] text-white');
      setCss(`
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
        `);
    }
  }, [prop.status]); // Add prop.status as dependency

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

  const today = new Date();
  const saveAppointment = () => {
    if (selectedDate && selectedDate < today) {
      console.log('cannot select previous date');
    } else {
      console.log('post');
    }
  };
  return (
    <div className="flex-col bg-white flex border-3 w-[500px] border-[30px] border-white h-full">
      <div
        className={`flex flex-col h-fit justify-center w-full gap-[10px] px-[18px] py-[20px] rounded-xl border-[2px]  
        
        ${prop.status == 2 ? 'border-[#CC731B]' : 'border-[#003FFD]'}`}
      >
        <div className="flex text-[13px] font-normal">Appointment Place</div>
        <div className="font-bold text-[24px]-">status</div>
      </div>
      <div className="font-bold text-[24px] w-full">
        Add Appointment Date & Time
      </div>
      {/* calenda */}
      <div className="w-full h-fit justify-center items-center shadow-lg mt-2 rounded-2xl p-3 ">
        <div className="w-fit ml-auto mr-auto">
          <style>{css}</style>
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
      <div className="grid grid-cols-5 gap-[12px] mt-4 ">
        {timeAvilable.map((time: string) => (
          <div
            className={`w-[80px] h-[35px] flex text-[14px] font-semibold justify-center items-center rounded-lg ${appointmentTime === time ? color : 'bg-[#F3F4F6] text-black'}`}
            key={time}
            onClick={() => setAppointmentTime(time)}
          >
            {time}
          </div>
        ))}
      </div>
      <div className="flex mt-4 h-fit items-center">
        <div className="color-[#777777] text-[14px] font-normal">
          You choose
        </div>
        <div
          onClick={() => saveAppointment()}
          className={`ml-auto flex justify-center items-center ${color} text-[16px] rounded-xl w-[107px] h-[41px] text-white`}
        >
          Save
        </div>
      </div>
    </div>
  );
}
