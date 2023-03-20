import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
interface IProps {
  FeaturedCities: [];
}
const CardSnippet = (city: any) => {
  const [showSnp, setShowSnp] = useState(false);
  const router = useRouter();
  console.log('showSnp:', showSnp);
  return (
    <>
      <div
        onMouseEnter={() => setShowSnp(!showSnp)}
        onMouseLeave={() => setShowSnp(!showSnp)}
        className={`absolute left-0 ${
          showSnp && 'right-0'
        } bottom-0 bg-[#000000] opacity-70 ${
          !showSnp && 'rounded-[5px]'
        } py-1 xl:py-2 px-2 lg:px-4 hover:cursor-pointer`}
        onClick={() => {
          if (!showSnp) {
            setShowSnp(!setShowSnp);
          } else {
            router.push(`/${city?.city?.slug}`);
          }
        }}
      >
        <div
          className={` bottom-0 left-0 text-[#ffffff] text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[24px] 2xl:text-[28px] font-[500] ${
            showSnp && 'width-[100%]'
          }`}
        >
          {city?.city?.name}
        </div>

        {showSnp && (
          <div
            className={` w-[100%] text-[#FFFFFF] text-[12px] md:text-[14px] lg:text-[16px] xl:text-[20px] 2xl:text-[22px] font-[400] ${
              showSnp && 'pb-2'
            } `}
          >
            {city?.city?.cardSnippet}
          </div>
        )}
      </div>
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
                  <div className="flex-none w-[29%] ">
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
                  <div className="flex-none w-[38%] ">
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
                  <div className="flex-none w-[29%] ">
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
                  <div className="flex-none w-[38%] ">
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
                  <div className="flex-none w-[29%] ">
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
                  <div className="flex-none w-[29%] ">
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
