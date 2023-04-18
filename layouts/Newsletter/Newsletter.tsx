import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

const Newsletter = ({}) => {
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
  };
  useEffect(() => {
    if (validated) {
      toast.success('Successfully subscribed to our Newsletters!');
      setEmail('');
      setValidated(false);
    }
  }, [validated]);

  const NewsletterHeading = styled.h2`
    font-weight: 600;
    font-size: 36px;
    text-align: center;
    color: #333333;
    @media (max-width: 1024px) {
      font-size: 26px;
    }
    @media (max-width: 640px) {
      font-size: 18px;
    }
  `;
  const Newsletter = styled.p`
    font-weight: 400;
    font-size: 18px;
    text-align: center;
    color: #4f4f4f;
    @media (max-width: 1024px) {
      font-size: 14px;
    }
    @media (max-width: 640px) {
      font-size: 12px;
    }
    text-align: center;
  `;
  return (
    <section className="w-full flex justify-center items-center bg-[#F5F5F5] ">
      <ToastContainer
        position="bottom-right"
        toastStyle={{ backgroundColor: 'green', color: 'white' }}
      />
      <div className="flex justify-center pt-10">
        <div className=" w-4/5 md:w-8/12 lg:w-[65%]">
          <NewsletterHeading>Subscribe to our newsletter!</NewsletterHeading>

          <Newsletter className="px-10 sm:px-20 lg:px-10">
            Signup to our newsletter and we will make sure to let you know
            whenever we have news!
          </Newsletter>

          <form onSubmit={handleSubmit}>
            <div className="flex mt-6 lg:mt-12 justify-center relative">
              <input
                className="bg-gray-100 text-[12px] sm:text-sm lg:text-xl   rounded-xl text-start md:pl-[3%]   text-gray-800 p-3 w-[100%] pr-[5%] border-2   border-gray-400   focus:outline-none focus:border-gray-500"
                placeholder="Your e-mail address"
                name="email"
                required
                type="email"
                onChange={e => setEmail(e.target.value)}
                maxLength={50}
                minLength={2}
                value={email}
              />
              <button
                className={`text-[16px] sm:text-sm lg:text-xl w-[35%] sm:w-[30%] lg:w-[25%] cursor-pointer absolute top-0 right-0   bg-red-500 border-red-500 rounded-xl  font-medium border-2  leading-none text-white p-3   hover:bg-red-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out`}
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
