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
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  address: string;
  district: string;
  province: string;
  zip: string;
}
interface StatusColors {
  [key: number]: string;
}
const statusColors: StatusColors = {
  0: 'border-project-pink',
  1: 'border-project-seablue',
  2: 'border-project-brown',
  3: 'border-project-green',
};
const timeButtonBaseClasses =
  'w-[80px] h-[35px] flex text-[14px] font-semibold justify-center items-center rounded-lg';

export default function AppointmentPage(prop: CardProps) {
  const toast = useToast();
  const [appointmentTime, setAppointmentTime] = useState<string | null>('-');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    if (prop.order.status === 1) {
      setSelectedDate(new Date());
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
      setValue('address', res.address);
      setValue('district', res.city);
      setValue('province', res.province);
      setValue('zip', res.zip);
    };

    fetchAppointment();
  }, [prop.order.orderID, setValue]);

  const updateSeller = async (FormData: FormData) => {
    const res = await updatePlace(
      FormData.address,
      FormData.district,
      FormData.province,
      FormData.zip,
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
      appointmentTime ?? '',
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

  const deliverDone = async () => {
    const updatePatch = await changeOrderStatus(3, prop.order.orderID);
    if (updatePatch) {
      toast?.setToast('success', 'Delivery completed!');
      window.location.href = '/order';
    } else {
      toast?.setToast('error', 'There is an error occurred!');
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (prop.order.status === 2) {
      deliverDone();
    } else {
      if (user?.userType === 'buyer') {
        updateBuyer();
      } else {
        await updateSeller(data);
      }
    }
  };

  const getStatusBasedColor = () => {
    if (prop.order.status != 1) {
      return 'bg-project-orange text-white';
    } else {
      return 'bg-project-seablue text-white';
    }
  };

  const dayPickerClassNames = {
    container: 'rdp-container',
    head_cell: 'rdp-head_cell',
    row: 'rdp-row',
    cell: 'rdp-cell',
    day: 'rdp-day',
    day_outside: 'rdp-day_outside',
    day_disabled: 'rdp-day_disabled',
    day_today: 'rdp-day_today',
    day_selected: 'rdp-day_selected',
    nav_button: 'rdp-nav_button',
    caption: 'rdp-caption',
    months: 'rdp-months',
  };

  const dayPickerStyles = `
    .rdp-day_selected {
      @apply bg-[#CC731B] text-white rounded-lg;
    }
    .rdp-day_today {
      @apply text-[#CC731B];
    }
  `;

  return (
    <div className="flex-col bg-white flex border-3 w-[500px] border-[30px] border-white h-full">
      <div
        className={cn(
          'flex flex-col h-fit justify-center w-full gap-[10px] px-[18px] py-[20px] rounded-xl border-[2px]',
          statusColors[prop.order.status ?? 0]
        )}
      >
        <div className="flex text-sm font-normal">Appointment Place</div>
        <div className="font-bold text-[24px]-">
          {prop.order.status === 1
            ? 'To be determined'
            : prop.order.status === 0
              ? status[prop.order.status]
              : prop.order.status === 2
                ? 'Waiting For Delivery'
                : 'Completed'}
        </div>
      </div>
      <div className="font-bold text-[24px] w-full">
        {prop.order.status === 0 && user?.userType === 'seller'
          ? 'Add Place'
          : prop.order.status === 1 && user?.userType === 'buyer'
            ? 'Add Appointment day and time'
            : 'You have to wait'}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {user?.userType === 'buyer' && prop.order.status === 1 && (
          <>
            <div className="w-full h-fit justify-center items-center shadow-lg mt-2 rounded-2xl p-3 ">
              <div className="w-fit ml-auto mr-auto">
                <style>{dayPickerStyles}</style>
                <DayPicker
                  classNames={dayPickerClassNames}
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  footer={
                    selectedDate
                      ? `Selected: ${selectedDate.toLocaleDateString()}`
                      : 'Pick a day.'
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-5 gap-[12px] mt-4 ">
              {timeAvilable.map((time: string) => (
                <button
                  type="button"
                  className={cn(
                    timeButtonBaseClasses,
                    appointmentTime === time
                      ? getStatusBasedColor()
                      : 'bg-[#F3F4F6] text-black'
                  )}
                  key={time}
                  onClick={() => setAppointmentTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </>
        )}
        {user?.userType === 'seller' && prop.order.status === 0 && (
          <>
            <div className="flex flex-col h-fit w-full gap-3">
              <div className="flex flex-col gap-3 w-full h-fit ">
                <div className="flex text-sm font-normal">Address*</div>
                <input
                  className="w-full h-[44px] rounded-lg border-[#D1D5DB] outline-none border-[1px] text-sm font-normal px-3 focus:border-[#808b96] focus:border-[1.5px]  focus:ring-0"
                  {...register('address', { required: true })}
                />
                {errors.address && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3 w-full h-fit">
                <div className="flex text-sm font-normal">District*</div>
                <input
                  className="w-full h-[44px] rounded-lg border-[#D1D5DB] outline-none border-[1px] text-sm font-normal px-3 focus:border-[#808b96] focus:border-[1.5px]  focus:ring-0"
                  {...register('district', { required: true })}
                />
                {errors.district && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3 w-full h-fit">
                <div className="flex text-sm font-normal">Province*</div>
                <input
                  className="w-full h-[44px] rounded-lg border-[#D1D5DB] outline-none border-[1px] text-sm font-normal px-3 focus:border-[#808b96] focus:border-[1.5px]  focus:ring-0"
                  {...register('province', { required: true })}
                />
                {errors.province && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3 w-full h-fit">
                <div className="flex text-sm font-normal">Zipcode*</div>
                <input
                  className="w-full h-[44px] rounded-lg border-[#D1D5DB] outline-none border-[1px] text-sm font-normal px-3 focus:border-[#808b96] focus:border-[1.5px]  focus:ring-0"
                  {...register('zip', { required: true })}
                />
                {errors.zip && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </>
        )}

        {((user?.userType === 'seller' && prop.order.status === 0) ||
          (user?.userType === 'buyer' && prop.order.status === 1) ||
          prop.order.status === 2) && (
          <div className="flex mt-4 h-fit items-center">
            <div className="text-[#777777] text-[14px] font-normal">
              You choose
            </div>
            <button
              type="submit"
              className={cn(
                'ml-auto flex justify-center items-center text-[16px] rounded-xl w-[107px] h-[41px] text-white',
                prop.order.status != 1
                  ? 'bg-project-orange'
                  : 'bg-project-seablue'
              )}
            >
              Save
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
