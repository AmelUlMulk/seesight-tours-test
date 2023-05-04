import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';

interface MODAL_INTERFACE {
  show: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSoldOut?: boolean;
}
interface USER_INFO {
  firstName?: string;
  lastName?: string;
  budget?: string;
  days?: number;
  phone?: string;
  email?: string;
  message?: string;
  persons?: number;
}

const FormCard = styled.div`
  max-height:80vh;
  }
`;
const FormModal = ({ show, setShowModal, onSoldOut }: MODAL_INTERFACE) => {
  const [userInfo, setUserInfo] = useState<USER_INFO>({});
  const [emailLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!show) {
      setUserInfo({});
    }
  }, [show]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const submitInfo = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setLoading(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_APP_HEROKU_SMS_SERVER}/trip-shephered-email`,
        {
          ...userInfo
        }
      )
      .then((res: { status: number }) => {
        setLoading(false);
        if (res.status === 200) {
          toast.success('Email received you would be contacted soon');
          setShowModal(false);
          return;
        }
        toast.error('Something went wrong try again later');
      });
  };
  return (
    <>
      {show ? (
        <div className="mx-auto fixed top-0 flex justify-center items-center h-full w-full z-20 bg-black bg-opacity-50 ">
          <FormCard className="px-10 py-10 bg-slate-200 rounded-md relative  overflow-auto  ">
            <button
              onClick={() => setShowModal(false)}
              className=" absolute right-0 top-3.5  text-black hover:text-gray-500 px-6  rounded-full text-lg   "
            >
              X
            </button>
            <h2 className="text-black font-bold  text-3xl pb-5 ">
              Let us help you find what you are looking for!
            </h2>
            <form onSubmit={submitInfo}>
              <div className="grid gap-6 mb-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={userInfo.firstName}
                    onChange={onChange}
                    minLength={2}
                    maxLength={30}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={userInfo.lastName}
                    onChange={onChange}
                    minLength={2}
                    maxLength={30}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="john.doe@company.com"
                    value={userInfo.email}
                    onChange={onChange}
                    minLength={2}
                    maxLength={50}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="+1 123-4567-8910"
                    value={userInfo.phone}
                    onChange={onChange}
                    minLength={9}
                    maxLength={30}
                    required
                  />
                </div>
              </div>
              <div className="grid gap-6  md:grid-cols-3">
                <div>
                  <label
                    htmlFor="Number of people"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Number of people
                  </label>
                  <input
                    type="number"
                    id="number1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="#"
                    value={userInfo.persons}
                    onChange={onChange}
                    minLength={1}
                    maxLength={30}
                    min={1}
                    max={100}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="Duration"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Duration
                  </label>
                  <input
                    type="number"
                    id="number2"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={userInfo.days}
                    onChange={onChange}
                    placeholder="Days"
                    minLength={1}
                    maxLength={30}
                    min={2}
                    max={20}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="Budget"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Budget
                  </label>
                  <input
                    type="number"
                    id="number3"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="USD"
                    value={userInfo.budget}
                    onChange={onChange}
                    minLength={1}
                    maxLength={100}
                    min={1}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="optional information"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Optional information
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Hey, we require..."
                  value={userInfo.message}
                  required
                ></textarea>
              </div>
              <div className="h-100% flex justify-center">
                <button className="bg-red-500 text-white py-2 px-2 rounded text-lg w-60  hover:bg-red-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out">
                  Send
                </button>
              </div>
            </form>
          </FormCard>
        </div>
      ) : null}
    </>
  );
};

export default FormModal;
