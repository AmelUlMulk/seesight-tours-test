import React, { useState } from 'react';
import PageHero from '../components/Contact/PageHero';
import styled from 'styled-components';
import FormModal from '../layouts/FormModal/FormModal';

const TripShepherdCard = styled.div`
  background-color: #57b8e8;
`;

const TripShepherd = () => {
  const [show, setShowModal] = useState<boolean>(false);
  return (
    <>
      <PageHero
        title={'Trip Shepherd'}
        snippet={
          'We can help you plan the perfect trip, our local expertise from the comfort of your home'
        }
        media={
          'https://res.cloudinary.com/see-sight-tours/image/upload/q_auto,f_auto,c_fill,g_faces,h_570,w_1920,y_0/v1582036498/Happy-group-tour-guides.jpg'
        }
        video={false}
      />
      <section className=" text-black-800  bg-white">
        <div className=" px-6 py-20  text-center lg:text-left">
          <div className="container mx-auto xl:px-64">
            <div className="grid lg:grid-cols-2 gap-12  items-center">
              <div className="">
                <h1 className="text-2xl md:text-2xl xl:text-2xl font-bold tracking-tight mb-3 text-left">
                  TripShepherd is an in-destination travel agent and plan-ahead
                  concierge service.
                </h1>
                <p className="opacity-70 lead color: hsl(218, 81%, 85%) text-justify text-lg">
                  Traditionally, travel agents make money from the commissions
                  on the products they sell you and concierges meet with you
                  once you arrive in-destination. With TripShepherd, we charge a
                  flat fee so we will never push extra products on you that
                  don’t make sense and we can help you get planning from the get
                  go. We’ll help create and execute the perfect trip for you
                  with authentic local expertise and pass along any of those
                  savings back to you. You’ll also have access to your
                  TripShepherd while you’re in-destination to help with
                  additional requests during your stay.
                </p>
              </div>
              <div className="mb-15 lg:mb-0">
                <TripShepherdCard className="block rounded-lg shadow-lg  px-6 py-12 md:px-12">
                  <div className="h-100% flex justify-center">
                    <h2 className="text-2xl font-bold mb-5 2xl:text-center  text-white">
                      Start your consultation now!
                    </h2>
                  </div>
                  <div className="h-100% flex justify-center">
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-red-500 text-white py-2 px-2 rounded text-lg w-60  hover:bg-red-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Find out more
                    </button>
                  </div>
                </TripShepherdCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" text-black-800  bg-slate-100">
        <div className=" px-6 py-12  text-center lg:text-left">
          <div className="container mx-auto xl:px-64">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 lg:gap-12 xsm:gap-6 ">
              <div className="">
                <h2 className="text-3xl font-bold lg:grid-center ">
                  How it Works
                </h2>
              </div>
              <div className="">
                <h2 className="text-2xl font-bold text-blue-400 mb-3">
                  1) Book free initial 15-minute call
                </h2>
                <p className="text-justify text-lg">
                  Your TripShepherd will call you for your initial 15-minute
                  consultation to get to know you - your likes, interests, and
                  everything else we need to help create your perfect trip.
                </p>
              </div>
              <div className="">
                <h2 className="text-2xl font-bold text-blue-400 mb-3">
                  2) Designing your perfect trip package
                </h2>
                <p className="text-justify text-lg">
                  Your TripShepherd will send you a package with recommendations
                  you would enjoy during your trip. This may include things like
                  dining, accomodations, attractions and other activities.
                </p>
              </div>
              <div className="">
                <h2 className="text-2xl font-bold text-blue-400 mb-3">
                  3) Confirmations
                </h2>
                <p className="text-justify text-lg">
                  After reviewing your package options (and discussing with your
                  TripShepherd if applicable), you will confirm which items you
                  would like to select for your trip. Your TripShepherd will
                  build you a final itinerary and share your total savings with
                  our exclusive partner discounts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" text-black-800  bg-white">
        <div className=" px-6 py-12  text-center lg:text-left">
          <div className="container mx-auto xl:px-64">
            <div className="grid lg:grid-cols-2 gap-12  items-center">
              <div className="mb-15 lg:mb-0">
                <TripShepherdCard className="block rounded-lg shadow-lg  px-6 py-12 md:px-12">
                  <div className="h-100% flex justify-center">
                    <h2 className="text-2xl font-bold mb-5 2xl:text-center  text-white">
                      Start your consultation now!
                    </h2>
                  </div>
                  <div className="h-100% flex justify-center">
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-red-500 text-white py-2 px-2 rounded text-lg w-60  hover:bg-red-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Find out more
                    </button>
                  </div>
                </TripShepherdCard>
              </div>
              <div className="">
                <h1 className="text-2xl md:text-2xl xl:text-2xl font-bold tracking-tight mb-3 text-left">
                  Your TripShepherd Service Includes:
                </h1>
                <ul className="list-disc text-left pl-5 text-lg">
                  <li className="leading-9  ">
                    2 Phone Consultations prior to in-destination arrival
                  </li>
                  <li>Packages tailored to your interests and needs</li>
                  <li>
                    Support during your trip - unlimited support to answer
                    questions via email and/or phone
                  </li>
                  <li>In-person meeting tbd</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" text-black-800  bg-white">
        <div className=" px-6 py-5  text-center lg:text-left">
          <div className="container mx-auto xl:px-64">
            <div className="mb-15 lg:mb-0">
              <div className="block rounded-lg shadow-lg  bg-slate-100 px-6 py-12 md:px-12">
                <div className="h-100% flex justify-center">
                  <h2 className="text-2xl font-bold mb-5 2xl:text-center   text-black">
                    Important Information!
                  </h2>
                </div>
                <p className="text-center text-lg">
                  Packages will vary based on individual interests, let your
                  shepherd know if you have any specific interests!
                </p>
              </div>
            </div>
          </div>
        </div>
        <FormModal show={show} setShowModal={setShowModal} />
      </section>
    </>
  );
};

export default TripShepherd;
