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
      <div className="px-36 py-10">
        <h1 className="text-3xl ">INFORMATION COLLECTED</h1>
        <p className="text-lg ">
          When you access or use our Services, we collect information from and
          about you in order to book your tours
        </p>
        <ul className="list-decimal px-4 text-lg">
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
        <h1 className="text-3xl leading-9">
          SAFEGUARDS TO PROTECT YOUR PERSONAL INFORMATION
        </h1>
        <p className="text-lg ">
          Any questions or concerns about this Privacy Policy or See Sight Tours
          information handling practices may be submitted to See Sight Tours at
          <span className="text-blue-400"> info@seesight-tours.com</span> See
          Sight Tours 4673 Ontario Ave., Niagara Falls, ON
        </p>
        <h1 className="text-3xl py-4">
          COLLECTION OF NON-IDENTIFIABLE INFORMATION
        </h1>
        <p className="text-lg ">
          As it is typical of many websites, the See Sight Tours website
          automatically collects certain anonymous and non-identifiable
          information regarding its users, such as the Internet Protocol (IP)
          address of your computer, the IP address of your Internet Service
          Provider, Google cookie ID, the date and time you access the Website,
          the Internet address of the website from which you linked directly to
          the Website, the operating system and browser type you are using, the
          paid ad (and the location of the ad) that you saw before visiting the
          Website, the sections of the Website you visit, the Website pages read
          and images viewed, and any content you download. This
          anonymous/non-personal information which is gathered may be used for
          research and analytical purposes and we also use this non-identifiable
          information for Website and system administration purposes and to
          improve our website.
        </p>
        <h1 className="text-3xl py-4">INFORMATION COLLECTED BY “COOKIES”</h1>
        <p className="text-lg break-all">
          Our website uses “cookies”, a technology that installs information on
          a website user’s computer to permit the Website to recognize future
          visits by that computer. Cookies enhance the convenience and use of
          the Website. Cookies do not contain any personally identifying
          information. They cannot view or retrieve data from other cookies, nor
          can they capture files and data stored on your computer. You may reset
          your computer’s browser to accept or block cookies or allow your
          computer’s browser to show you when a cookie is being sent. If you
          choose not to accept cookies from See Sight Tours, your experience at
          our site and other websites may be diminished and some features may
          not work as intended. Any questions or concerns about this Privacy
          Policy or See Sight Tours information handling practices may be
          submitted to info@seesight-tours.com
        </p>
        <h1 className="text-3xl py-4">OPT OUT PROCESS</h1>
        <p className="text-lg ">
          Set your browser to decline third party cookies Make use of Google's
          cookie management processes Make use of Ad choices cookie management
          process You can easily opt out of cookie tracking by clicking on the
          ‘opting out’ link Opt out of Interest based advertising Please note
          that cookies are specific to your browser and computer. If you change
          browsers and/or computers, your settings will not carry over. Opting
          out does not mean you will no longer receive advertisements. It does
          mean that See Sight Tours from which you opted out will no longer
          customize ads based on your interests and web usage patterns using
          cookie-based technology. You may, at any time, view and update any of
          your personal information, or tell us to stop using or retaining it.
          You can do so by clicking on the appropriate buttons that appear on
          any e-communications we send to you or by emailing your request to
          info@seesight-tours.com. If you tell us to stop using your
          information, we will immediately honour your instructions and delete
          your personal information. We may, however, retain a summary of your
          demographic information for research purposes. None of this summarized
          demographic information will be capable of identifying you.
        </p>
        <h1 className="text-3xl py-4">ELECTRONIC NEWSLETTERS</h1>
        <p className="text-lg ">
          See-Sight Tours sends out information regarding upcoming openings, new
          tour information, and exclusive discounts in our electronic newsletter
          based upon your voluntary subscription. You will only receive an
          electronic newsletter if you have opted in by providing an email
          address. We do not share our mailing lists with any third parties,
          including advertisers or partners. You can unsubscribe (opt-out) from
          our electronic newsletter at any time.
        </p>
      </div>
    </>
  );
};

export default Privacy;
