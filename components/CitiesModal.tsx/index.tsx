import React, { useEffect, useState } from 'react';
import CityCards from './cityCards';
import Image from 'next/image';
import { useLazyQuery } from '@apollo/client';
import CITIESMODAL from '../../api/citiesSearch';
interface CITYMODAL {
  cities: CITY[];
}
interface CITY {
  id: string;
  name: string;
  slug: string;
  card_media: [
    {
      url: string;
    }
  ];
}
const CitiesModal = () => {
  const [getData, { data, loading }] = useLazyQuery(CITIESMODAL);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [filteredCards, setFilteredCards] = useState<CITY[]>([]);
  const [searchItem, setSearchItem] = useState<string | undefined>();

  useEffect(() => {
    if (searchItem)
      setFilteredCards(() =>
        data?.cities?.filter((item: { name: string }) =>
          item.name.toLowerCase().includes(searchItem.toLocaleLowerCase())
        )
      );

    if (!searchItem && data && data.cities.length > 0) {
      setFilteredCards(data?.cities);
      console.log('fuck me dead');
    }
  }, [searchItem]);

  useEffect(() => {
    if (data) {
      setFilteredCards(data.cities);
    }
  }, [data]);

  useEffect(() => {
    if (showModal) getData();
  }, [showModal]);

  return (
    <>
      <div className=" flex justify-center w-full absolute -bottom-[-12%]">
        <button
          onClick={() => setShowModal(true)}
          className="  relative w-[200px]  md:w-[340px]  bg-[#F15C5A] text-white   z-20  py-4 text-xl flex justify-center rounded-xl  "
          style={{ zIndex: 1000 }}
        >
          <Image
            src="https://res.cloudinary.com/see-sight-tours/image/upload/v1683789283/icons-website/search-icon_kexlxj.png"
            width={25}
            height={10}
            alt="search icon"
            className="absolute left-4 top-[30%] "
          />
          <span className=" text-base md:text-xl">Search city</span>
        </button>
      </div>

      <div
        style={{ zIndex: 1000 }}
        className={` ${
          showModal ? 'flex' : 'hidden'
        } fixed min-h-screen   w-full bg-white top-0 left-0 z-50  pt-24 flex flex-col  overflow-y-scroll overflow-x-hidden  `}
      >
        <div className=" absolute flex  justify-start  flex-col  w-full   scrollbar-hide mt-4  gap-4  ">
          <div className=" w-full px-[5%] md:px-[10%] lg:px-[20%] flex justify-start flex-col items-start">
            <button
              className="border-2 border-[#F15C5A]  w-36 rounded-lg py-2 "
              onClick={() => setShowModal(false)}
            >
              Back
            </button>
            <div className="flex   mt-10 w-full justify-between pr-[2%] items-center ">
              <h2 className=" text-xl md:text-3xl">Find Your City</h2>
              <input
                className="input border-2 px-2 rounded-md  w-36  md:w-[20%] py-1 md:py-2 "
                onChange={e => {
                  setSearchItem(e.target.value);
                }}
                placeholder="Search city"
              />
            </div>
          </div>
          <div className=" grid grid-cols-2 px-[5%] md:grid-cols-3  2xl:grid-cols-4 w-full md:px-[10%]   lg:px-[20%] gap-4  ">
            {!loading &&
              filteredCards?.map(city => (
                <div
                  className="cols-span-1 h-full  rounded-md relative  "
                  key={city.name}
                >
                  <CityCards
                    name={city.name}
                    slug={city.slug}
                    image={city.card_media[0].url}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CitiesModal;
