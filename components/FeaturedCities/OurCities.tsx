import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { TextShadow } from '../Landingpage/components/testimonials';
import { useState } from 'react';
interface IProps {
  title: string;
  subTitle: string;
  FeaturedCities?: any;
  citiesTotalCount: number;
  slug?: string;
}
const CardSnippet = (city: any) => {
  const [showSnp, setShowSnp] = useState(false);
  return (
    <>
      {showSnp ? (
        <div
          onClick={() => {
            if (showSnp) {
              setShowSnp(false);
            }
          }}
          onMouseLeave={() => setShowSnp(!showSnp)}
          className="absolute bottom-[8px] left-[12px] right-10 bg-[#000000] opacity-70 text-[#FFFFFF] text-[18px] font-[500] px-12 py-5 rounded-lg"
        >
          {city?.city?.cardSnippet}
        </div>
      ) : (
        <div
          onClick={() => {
            if (!showSnp) {
              setShowSnp(true);
            }
          }}
          onMouseEnter={() => setShowSnp(!showSnp)}
          className="absolute bottom-[8px] left-[12px] bg-[#000000] opacity-70 text-[#FFFFFF] text-[18px] font-[500] px-4 py-2 rounded-lg"
        >
          {city?.city?.name}
        </div>
      )}
    </>
  );
};
const OurCities = ({
  title,
  subTitle,
  FeaturedCities,
  citiesTotalCount
}: IProps) => {
  return (
    <section className="Our_Cities-wrapper mt-10 bg-[#F5F5F5]">
      <div id="header" className=" pt-10 lg:px-32 2xl:px-40">
        <TextShadow className="text-[#333333] text-[60px] font-[600]">
          {title}
        </TextShadow>
        <p className="text-[#4F4F4F] text-[32px] font-[600]">{subTitle}</p>
      </div>
      <div className="flex gap-5 py-5 lg:px-32 2xl:px-40">
        {FeaturedCities?.slice(0, 3).map(
          (city: Record<string, any>, index: number) => {
            return (
              <>
                {index == 0 && (
                  <div className="flex-none w-[30%] ">
                    <div
                      id="image_wrapper"
                      className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                    >
                      <Link href={city?.city?.slug}>
                        <Image
                          src={city?.city?.cardMedia[0]?.url}
                          width={360}
                          height={340}
                          alt={city?.city?.cardMedia[0]?.alt}
                          className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                        />
                      </Link>
                      {CardSnippet(city)}
                    </div>
                  </div>
                )}
                {index == 1 && (
                  <div className="flex-none w-[40%] ">
                    <div
                      id="image_wrapper"
                      className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                    >
                      <Link href={city?.city?.slug}>
                        <Image
                          src={city?.city?.cardMedia[0]?.url}
                          width={360}
                          height={340}
                          alt={city?.city?.cardMedia[0]?.alt}
                          className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                        />
                      </Link>
                      {CardSnippet(city)}
                    </div>
                  </div>
                )}
                {index == 2 && (
                  <div className="flex-none w-[30%] ">
                    <div
                      id="image_wrapper"
                      className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                    >
                      <Link href={city?.city?.slug}>
                        <Image
                          src={city?.city?.cardMedia[0]?.url}
                          width={360}
                          height={340}
                          alt={city?.city?.cardMedia[0]?.alt}
                          className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                        />
                      </Link>
                      {CardSnippet(city)}
                    </div>
                  </div>
                )}
              </>
            );
          }
        )}
      </div>
      <div className="flex gap-5 py-5 lg:px-32 2xl:px-40">
        {FeaturedCities?.slice(3, 6).map(
          (city: Record<string, any>, index: number) => {
            return (
              <>
                {index == 0 && (
                  <div className="flex-none w-[40%] ">
                    <div
                      id="image_wrapper"
                      className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                    >
                      <Link href={city?.city?.slug}>
                        <Image
                          src={city?.city?.cardMedia[0]?.url}
                          width={360}
                          height={340}
                          alt={city?.city?.cardMedia[0]?.alt}
                          className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                        />
                      </Link>
                      {CardSnippet(city)}
                    </div>
                  </div>
                )}
                {index == 1 && (
                  <div className="flex-none w-[30%] ">
                    <div
                      id="image_wrapper"
                      className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                    >
                      <Link href={city?.city?.slug}>
                        <Image
                          src={city?.city?.cardMedia[0]?.url}
                          width={360}
                          height={340}
                          alt={city?.city?.cardMedia[0]?.alt}
                          className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                        />
                      </Link>
                      {CardSnippet(city)}
                    </div>
                  </div>
                )}
                {index == 2 && (
                  <div className="flex-none w-[30%] ">
                    <div
                      id="image_wrapper"
                      className="w-[100%] h-[100%] rounded-lg relative !overflow-hidden"
                    >
                      <Link href={city?.city?.slug}>
                        <Image
                          src={city?.city?.cardMedia[0]?.url}
                          width={360}
                          height={340}
                          alt={city?.city?.cardMedia[0]?.alt}
                          className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200"
                        />
                      </Link>
                      {CardSnippet(city)}
                    </div>
                  </div>
                )}
              </>
            );
          }
        )}
      </div>
    </section>
  );
};

export default OurCities;
