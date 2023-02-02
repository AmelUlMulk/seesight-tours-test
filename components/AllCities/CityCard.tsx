import Link from 'next/link';
import React, { useState } from 'react';
import { CityInterface } from '../../api/citiesPage';
import CardSnippet from '../CardSnippet/CardSnippet';
import Image from 'next/image';
interface CityCard extends CityInterface {
  index: number;
}
const largerCardIndexes = [1, 3, 7, 11, 13, 15, 19, 21];
const CityCard = ({ city, index }: CityCard) => {
  const [largeCard] = useState<boolean>(() =>
    largerCardIndexes.includes(index) ? true : false
  );
  return (
    <div
      className={
        largeCard
          ? `relative max-h-[340px]  flex-none 3xl:w-[40rem] 2xl:w-[25rem]  xl:w-[20rem] lg:w-[15rem] md:w-[16rem] sm:w-[14rem] xsm:w-[20rem] xxsm:w-[20rem]`
          : `flex-none w-[25rem] relative max-h-[340px]  3xl:w-[25rem]  2xl:w-[25rem] xl:w-[20rem]  lg:w-[15rem] md:w-[16rem] sm:w-[14rem] xsm:w-[20rem] xxsm:w-[20rem]`
      }
    >
      <div
        id="image_wrapper"
        className="w-[100%] h-[100%] rounded relative !overflow-hidden"
      >
        <Link href={city?.slug}>
          <Image
            src={city?.cardMedia[0]?.url}
            width={360}
            height={340}
            alt={city?.cardMedia[0]?.alt}
            className="w-[100%] h-[100%] rounded hover:scale-105 ease-in-out duration-200"
          />
        </Link>
        <CardSnippet text={city.cardSnippet} name={city.name} />
      </div>
    </div>
  );
};

export default CityCard;
