import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
interface IProps {
  FeaturedCities: [];
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
          className="absolute bottom-[0px] left-[0px] right-10 bg-[#000000] opacity-70 text-[#FFFFFF] md:text-[12px] lg:text-[18px] font-[500] md:px-2 lg:px-12 md:py-2 lg:py-5 rounded-lg"
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
          className="absolute w-[78%] bottom-[0px] left-[0px] bg-[#000000] opacity-70 text-[#ffffff] md:text-[13px] lg:text-[18px] xl:text-[28px] font-[500] px-4 py-2 rounded-[5px]"
        >
          {city?.city?.name}
        </div>
      )}
    </>
  );
};
const CitiesDesk = ({ FeaturedCities }: IProps) => {
  return (
    <>
      <div className="flex gap-5 py-5 ">
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
                          className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200 object-cover"
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
                          className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200 object-cover"
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
                          className="w-[100%] h-[100%] rounded-xl hover:scale-105 ease-in-out duration-200 object-cover"
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
      <div className="flex gap-5 py-5 ">
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
    </>
  );
};

export default CitiesDesk;
