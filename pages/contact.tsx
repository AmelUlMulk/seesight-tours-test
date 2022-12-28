import React from 'react';
import Image from 'next/image';
import PageHero from '../components/Contact/PageHero';

const Contact = () => {
  return (
    <div className="Contact">
      <PageHero />
      <div className="container pl-20 pb-10">
        <div className="Contact_details grid grid-cols-2 gap-20 px-5 pt-11 w-[70%] m-auto">
          <div className="Call_logo">
            <Image
              src={`https://res.cloudinary.com/see-sight-tours/image/upload/f_auto,fl_progressive:steep,q_auto,t_mobile/v1638579872/contact_page_nl2fuy.png`}
              alt="call_us_image"
              width={600}
              height={600}
            />
          </div>
          <div className="Call_us ">
            <h2 className="font-bold text-4xl text-slate-700">
              Call Us Anytime from: <br /> 8am-4pm <br /> Monday-Friday
            </h2>
            <p className="text-3xl pt-5">
              <span className="text-sky-500 text-2xl">Toll Free</span>{' '}
              1-888-961-6584
            </p>
            <p className="text-3xl">
              <span className="text-sky-500 text-2xl">Local:</span>{' '}
              1-888-961-6584
            </p>
            <p className="text-3xl">
              <span className="text-sky-500 text-2xl">Fax:</span> 1-888-908-6056
            </p>
            <p className="text-sky-500 text-3xl">info@seesight-tours.com</p>
          </div>
        </div>
      </div>
      <section className="bg-gray-100">
        <div className="container pt-20">
          <div className="contact_us_form w-[40%] m-auto text-center pl-20 ">
            <form className="flex flex-col text-center pb-20">
              <h2 className="text-4xl font-bold text-slate-700">
                Send us a message
              </h2>
              <h4 className="text-2xl ">We&apos;d love to hear from you</h4>
              <input
                className="text-2xl border-b-[1px] border-black mt-5 pb-3 bg-gray-100"
                placeholder="Your Name"
              ></input>
              <input
                className="text-2xl border-b-[1px] border-black mt-5 pb-3 bg-gray-100 "
                placeholder="Your Email"
              ></input>
              <textarea
                className="text-2xl border-b-[1px] border-black mt-5 pb-3 bg-gray-100  "
                placeholder="Message"
              ></textarea>
              <div className="font-bold mt-5 ml-auto ">
                <button className="bg-red-500 rounded-lg text-3xl text-white py-2 px-10">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
