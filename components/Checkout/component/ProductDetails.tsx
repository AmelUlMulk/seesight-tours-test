import { useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { PRODUCT, PRODUCTINTERFACE } from '../../../api/my-tours';
import Image from 'next/image';
interface PRODUCTMODAL {
  open: boolean;
  close: React.Dispatch<React.SetStateAction<boolean>>;
  slug: string;
}
const ProductDetails = ({ open, close, slug }: PRODUCTMODAL) => {
  const [getDetails, { data, loading }] = useLazyQuery<PRODUCTINTERFACE>(
    PRODUCT,
    {
      variables: {
        slug
      }
    }
  );
  useEffect(() => {
    if (slug.length > 1 && open) {
      getDetails();
    }
  }, [open]);
  return (
    <div
      className={` transition-all  duration-500 ${
        !open ? 'hidden' : ''
      }  fixed flex justify-center align-middle w-full   h-full min-h-[50vh] items-center top-0 left-0 z-50 shadow-2xl `}
      onClick={e => {
        close(false);
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="flex bg-black min-h-[55vh] h-auto py-8 md:py-2 w-full   md:w-1/2 justify-center p-3 flex-col   items-center relative  "
      >
        <button
          className="absolute top-2 right-2 text-white "
          onClick={() => close(false)}
        >
          <Image src="/cross.png" width={20} height={20} alt="cross" />
        </button>
        <h2 className="text-2xl text-left text-white ">
          {data?.products[0].name}
        </h2>
        <div className="flex py-2 ">
          {data?.products[0].carousel_media.slice(0, 3).map(pic => (
            <Image
              src={pic.url}
              width={400}
              height={300}
              key={pic.url}
              alt={pic.url}
            />
          ))}
        </div>
        <p className="text-white ">{data?.products[0].short_description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
