import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Newsletter = () => {
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
  return (
    <>
      <section className=" text-gray-800 bg-slate-100">
        <ToastContainer
          position="bottom-right"
          toastStyle={{ backgroundColor: 'green', color: 'white' }}
        />
        <div className="px-6 py-12 md:px-12 text-center lg:text-left">
          <div className="container mx-auto xl:px-32">
            <div className="grid lg:grid-cols-2 gap-12  items-center">
              <div className="mt-12 lg:mt-0">
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12 color: hsl(218, 81%, 95%)">
                  Do not miss <br />
                  <span className="color: hsl(218, 81%, 75%)">any updates</span>
                </h1>
                <p className="mb-4 opacity-70 lead color: hsl(218, 81%, 85%)">
                  We will write rarely and only high-quality content.
                </p>
              </div>
              <div className="mb-12 lg:mb-0">
                <div className="block rounded-lg shadow-lg bg-white px-6 py-12 md:px-12">
                  <h2 className="text-3xl font-bold mb-12 2xl:text-center">
                    Subscribe to our newsletter
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-6">
                      <input
                        type="email"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-500 focus:outline-none"
                        id="exampleInput91"
                        placeholder="Email address"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-500 active:shadow-lg transition duration-150 ease-in-out"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
