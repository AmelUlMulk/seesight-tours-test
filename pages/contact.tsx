import React from 'react';
import Image from 'next/image';
import PageHero from '../components/Contact/PageHero';

const Contact = () => {
  const canada_address: string[] = [
    '5779 Desson Avenue',
    'Niagara Falls',
    'Ontario, Canada L2G 3T5'
  ];
  const usa_address: string[] = [
    '486 19th street',
    'Niagara Falls',
    'Buffalo, USA NY 14303'
  ];
  return (
    <div className="Contact">
      <PageHero
        title={'Contact Us'}
        snippet={"We'd love to hear from you"}
        media={
          'https://res.cloudinary.com/see-sight-tours/image/upload/q_auto,f_auto,c_fill,g_faces,h_570,w_1920,y_0/v1582036498/Happy-group-tour-guides.jpg'
        }
        video={false}
      />
      <section className="Call_us container pl-20 pb-10">
        <div className="Contact_details grid grid-cols-2 gap-20 px-5 pt-11 w-[70%] m-auto">
          <div className="Call_logo">
            <Image
              src={`https://res.cloudinary.com/see-sight-tours/image/upload/f_auto,fl_progressive:steep,q_auto,t_mobile/v1638579872/contact_page_nl2fuy.png`}
              alt="call_us_image"
              width={600}
              height={600}
            />
          </div>
          <div className=" ">
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
      </section>
      <section className="contact_us_form bg-gray-100">
        <div className="container pt-20">
          <div className="w-[40%] m-auto text-center pl-20 ">
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
      <section className="location">
        <div className="location1_content grid grid-cols-2">
          <div className="location_Text bg-red-500 text-white text-center px-10 py-20">
            <h2 className="text-4xl font-bold">
              Where are we Canada
              <br />
            </h2>
            <br />
            <div className="text-3xl">
              <p>5779 Desson Avenue</p>
              <p>Niagara Falls</p>
              <p>Ontario, Canada L2G 3T5</p>
            </div>
          </div>
          <div className="location_map">
            <iframe
              title="Where are we Canada"
              src={`https://www.google.com/maps?q=${canada_address[0]}${canada_address[1]}${canada_address[2]}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: '0' }}
              loading="lazy"
            />
          </div>
        </div>
        <div className="location2_content grid grid-cols-2">
          <div className="location_map">
            <iframe
              title="Where are we USA"
              src={`https://www.google.com/maps?q=${usa_address[0]}${usa_address[1]}${usa_address[2]}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: '0' }}
              loading="lazy"
            />
          </div>
          <div className="location_Text bg-red-500 text-white text-center p-20">
            <h2 className="text-3xl font-bold">Where are we USA</h2>
            <br />
            <div className="text-3xl">
              <p>486 19th street</p>
              <p>Niagara Falls</p>
              <p>Buffalo, USA NY 14303</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
