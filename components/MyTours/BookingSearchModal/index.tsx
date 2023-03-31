import { useLazyQuery } from '@apollo/client';
import Router from 'next/router';
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { FIND_BOOKING, FIND_BOOKING_INTERFACE } from '../../../api/myTour';

interface ModalData {
  open: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

function Modal({ open, setOpenModal }: ModalData) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<boolean>(false);
  const [findBooking, { loading }] =
    useLazyQuery<FIND_BOOKING_INTERFACE>(FIND_BOOKING);
  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    findBooking({
      variables: {
        id: inputValue
      },
      onCompleted: value => {
        if (!value.boatnew_booking[0]) {
          setError(true);
          return;
        }
        setInputValue('');
        setOpenModal(false);
        setError(false);
        Router.push(`/my-tours/${value.boatnew_booking[0].id}`);
      }
    });
  };
  useEffect(() => {
    if (!open) {
      setInputValue('');
      setError(false);
    }
  }, [open]);
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center xl:items-start py-12  min-h-screen ${
        !open && 'hidden'
      } `}
      onClick={e => {
        setOpenModal(false);
      }}
    >
      <div
        className="bg-white p-4  w-11/12 md:w-9/12 lg:w-8/12   xl:w-2/5   2xl:max-w-[30%] text-center py-16 "
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-2 text-center ">My Tours</h2>
        <p className="mb-4 ">
          Please Enter Your Booking Code To Find Your Booked Tour!
        </p>
        <form onSubmit={e => handleForm(e)}>
          <div className="mb-4">
            {error && (
              <label
                className="block  font-bold mb-2 text-red-600 "
                htmlFor="inputField"
              >
                Booking Not Found, Please Enter A Valid Booking Code
              </label>
            )}
            <input
              className=" border rounded w-full  px-3 pt-4 pb-3  bg-slate-100  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="inputField"
              placeholder="Booking Number"
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              minLength={7}
              maxLength={7}
            />
          </div>
          <div className="flex w-full justify-end ">
            <button
              className={`bg-[#F15C5A] hover:bg-red-500 text-white  py-2 px-4 rounded-md focus:outline-none focus:shadow-outline ${
                loading && ' animate-pulse'
              } `}
              type="submit"
            >
              {loading ? 'Please wait..' : 'Find Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Modal;
