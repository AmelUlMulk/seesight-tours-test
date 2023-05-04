import { use, useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState<string>('');
  const [isvalid, setValid] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setValid(true);
    console.log('submitted:', email);
    setEmail('');
  };
  return (
    <section className="bg-[#fd5d5a]">
      <div className=" mx-auto">
        <div className="flex items-center bg-[#fd5d5a]  md:px-10 py-16">
          <div className="text-white px-10 flex-none w-full md:w-[50%]">
            <h2 className="text-[18px] sm:text-[26px] lg:text-[36px] font-[600] text-[#333333]">
              Subscribe to our Newsletter!
            </h2>
            <p className="text-[10px] sm:text-[12px] lg:text-[18px] font-[400] text-[#4F4F4F]">
              Signup to our newsletter and we will make sure to let you know
              whenever we have news!
            </p>
          </div>
          <div className="flex-none w-[50%] pl-3">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <input
                placeholder="Your E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="placeholder:text-2xl placeholder:text-white py-2 bg-[#fd5d5a] px-5 w-[100%] outline-none border-b-[1px] border-white"
              ></input>
              <div className="mt-8">
                <button className="text-[#a9a9a9] hover:text-[#ffffff] text-sm md:text-2xl font-[600] bg-[#d3d3d3] hover:bg-[#afadad] py-3 md:px-12 rounded-lg">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
