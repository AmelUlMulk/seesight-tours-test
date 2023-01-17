import { use, useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState<string>('');
  const [isvalid, setValid] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setValid(true);
    console.log('submitted:', email);
    setEmail("")
  };
  return (
    <section className="bg-[#fd5d5a]">
      <div className="container mx-auto">
        <div className="flex items-center bg-[#fd5d5a] p-10">
          <div className="text-white flex-none w-[50%]">
            <h1 className="text-5xl font-[600]">
              Subscribe to our Newsletter!
            </h1>
            <p className="text-2xl">
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
              <div className="mt-5">
                <button className="text-[#a9a9a9] hover:text-[#ffffff] text-2xl font-[600] bg-[#d3d3d3] hover:bg-[#afadad] py-3 px-12 rounded-lg">
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
