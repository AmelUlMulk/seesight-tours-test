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
    <>
      <section>
        <ToastContainer
          position="bottom-right"
          toastStyle={{ backgroundColor: 'green', color: 'white' }}
        />
        <div className="flex justify-center">
          <div className="w-[60%]">
            <NewsletterHeading className="2xl-text-3xl xl-text-3xl lg-text-2xl font-bold  2xl:text-center xl:text-center lg:text-center md:text-center sm:text-center xsm:text-center ">
              Subscribe to our newsletter!
            </NewsletterHeading>

            <Newsletter className="2xl:text-center xl:text-center lg:text-center md:text-center sm:text-center xsm:text-center  ">
              Signup to our newsletter and we will make sure to let you know
              whenever we have news!
            </Newsletter>

            <form onSubmit={handleSubmit}>
              <div className="flex items-stretch mt-12 justify-center">
                <input
                  className="bg-gray-100 rounded-lg rounded-r-none text-base leading-none text-gray-800 p-3 w-[60%] border border-transparent focus:outline-none focus:border-gray-500"
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
                  className="disabled:bg-red-400 w-32 cursor-pointer rounded-l-none bg-red-500 rounded text-base font-medium leading-none text-white p-5 uppercase hover:bg-red-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out"
                  disabled={email.length <= 0}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
