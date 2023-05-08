import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
interface CITYCARDS {
  slug: string;
  image: string;
  name: string;
}

const CityCards = ({ image, slug, name }: CITYCARDS) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/${slug}`)}
      className="relative h-full w-full cursor-pointer "
    >
      <Image
        src={image}
        width={150}
        height={150}
        alt={name}
        className="w-full rounded-md h-full "
      />
      <div className="absolute z-50 bottom-0  p2-4 px-6 bg-black bg-opacity-70  max-w-[100%] ">
        <span className="text-white text-base md:text-xl font-semibold ">
          {name}
        </span>
      </div>
    </div>
  );
};

export default CityCards;
