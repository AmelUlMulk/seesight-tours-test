import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
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
  return (
    <>
      <section className=" text-gray-800 bg-slate-100">
        <ToastContainer
          position="bottom-right"
          toastStyle={{ backgroundColor: 'green', color: 'white' }}
        />
        <div className="mt-8 px-6 py-12 md:px-12 text-center lg:text-left">
          <div className="container mx-auto xl:px-32">
            <div className="grid lg:grid-cols-2 gap-12  items-center">
              <div className="mt-12 lg:mt-0">
                <h1 className="text-5xl md:text-6xl xl:text-6xl font-bold tracking-tight mb-12 color: hsl(218, 81%, 95%)">
                  Do not miss <br />
                  <span className="color: hsl(218, 81%, 75%)">any updates</span>
                </h1>
                <p className="mb-4 opacity-70 lead color: hsl(218, 81%, 85%)">
                  We will write rarely and only high-quality content.
                </p>
              </div>
              <div className="mb-12 lg:mb-0">
                <div className="block rounded-lg shadow-lg bg-white px-6 py-12 md:px-12 lg:text-center">
                  <h2 className="text-3xl font-bold mb-12 2xl:text-center">
                    Subscribe to our newsletter
                  </h2>

                  <form onSubmit={handleSubmit}>
                    <div className="flex items-stretch mt-12">
                      <input
                        className="bg-gray-100 rounded-lg rounded-r-none text-base leading-none text-gray-800 p-3 w-4/5 border border-transparent focus:outline-none focus:border-gray-500"
                        placeholder="Email address"
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
