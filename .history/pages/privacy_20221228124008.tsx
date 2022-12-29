import React from 'react';
import Image from 'next/image';

const Privacy = () => {
  return (
    <>
      <div className="relative">
        <Image
          className="w-full h-96"
          src="https://res.cloudinary.com/see-sight-tours/image/upload/w_1312,h_500/t_header/f_auto,q_auto,/fl_progressive:steep/v1581438789/top-ottawa-Parliament-Buildings.webP"
          width={500}
          height={500}
          alt="See sight Tours"
        />
        <div className="absolute top-6 p-20">
          <h1 className="text-white text-6xl font-bold ">Our Privacy Policy</h1>
          <h2 className="text-white text-3xl font-light mt-4">
            This page informs you of our policies regarding the collection, use,
            and disclosure of personal data when you use our Service and the
            choices you have associated with that data
          </h2>
        </div>
      </div>
      <div className="px-40 py-20">
        <h1 className="text-4xl">INFORMATION COLLECTED</h1>
        <p className="text-lg">
          When you access or use our Services, we collect information from and
          about you in order to book your tours
        </p>
        <ul className="list-decimal px-4">
          <li>
            Contact information, including name, phone number and postal and
            email addresses
          </li>
          <li>
            Billing or payment information (such as your credit card number,
            cardholder name, expiration date, authentication code and billing
            address)
          </li>
          <li>Username and password</li>
          <li>
            Photos, reviews and social posts and videos you may have provided to
            us
          </li>
          <li>Geolocation information</li>
          <li>Booking history/ information</li>
          <li>Information about your travel plans and preferences</li>
          <li>
            We may also collect, in instances where you have provided it,
            information about other travellers, including their email address
            and other travel-related information. If you are sharing information
            with us about other individuals, you must obtain their consent.
          </li>
        </ul>
        <h1 className="text-3xl">
          SAFEGUARDS TO PROTECT YOUR PERSONAL INFORMATION
        </h1>
        <p className="text-lg">
          Any questions or concerns about this Privacy Policy or See Sight Tours
          information handling practices may be submitted to See Sight Tours at
          <span className="text-blue-400"> info@seesight-tours.com</span> See
          Sight Tours 4673 Ontario Ave., Niagara Falls, ON
        </p>
      </div>
    </>
  );
};

export default Privacy;
