import Image from 'next/image';

const Trustbar = () => {
  return (
    <div className="trust mt-5 border-b-[2px] border-slate-400">
      <div className="grid grid-cols-3 w-[90%] mx-auto">
        <div className="flex flex-col justify-center items-center">
          <div className="image">
            <Image
              src="/fausers.svg"
              width={60}
              height={60}
              alt="small group tours"
            />
          </div>
          <div className="text-xl">
            <p>Small-Groups Tour</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="image">
            <Image
              src="/md-verified-user.svg"
              width={60}
              height={60}
              alt="faqs "
            />
          </div>
          <div className="text-xl">
            <p>Free Cancellation</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="image">
            <Image
              src="/reviews-black-36dp.svg"
              width={60}
              height={60}
              alt="5000+ reviews"
            />
          </div>
          <div className="text-xl">
            <p>5000+ 5Star Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trustbar;
