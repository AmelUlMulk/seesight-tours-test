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
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 44px;
    text-align: center;
    @media (max-width: 1100px) {
      font-size: 35px;
    }
    @media (max-width: 500px) {
      font-size: 30px;
    }
    font-size: 44px;
  `;
  const Newsletter = styled.p`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    @media (max-width: 1100px) {
      font-size: 24px;
    }
    @media (max-width: 500px) {
      font-size: 20px;
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
        <div className=" w-4/5  md:w-8/12   lg:w-[55%]">
          <NewsletterHeading className="2xl-text-3xl xl-text-3xl lg-text-2xl font-bold  2xl:text-center xl:text-center lg:text-center md:text-center sm:text-center xsm:text-center ">
            Subscribe to our newsletter!
          </NewsletterHeading>

          <Newsletter className="2xl:text-center xl:text-center lg:text-center md:text-center sm:text-center xsm:text-center  ">
            Signup to our newsletter and we will make sure to let you know
            whenever we have news!
          </Newsletter>

          <form onSubmit={handleSubmit}>
            <div className="flex mt-12 justify-center relative">
              <input
                className="bg-gray-100 lg:text-2xl   rounded-lg text-start md:pl-[10%]   text-gray-800 p-3 w-[100%] pr-[5%] border-2   border-gray-400   focus:outline-none focus:border-gray-500"
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
                className={` lg:text-2xl w-[42%] xsm:w-[36%] lg:[w-25%] cursor-pointer absolute top-0 right-0   bg-red-500 border-red-500 rounded-lg  font-medium border-2  leading-none text-white p-4 lg:p-3   hover:bg-red-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out`}
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
