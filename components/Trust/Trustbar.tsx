import Link from 'next/link';
import Image from 'next/image';
import SmallToursIcon from '../../assets/svg/vector.svg';
import FreeCancellationIcon from '../../assets/svg/Vector-1.svg';
import ReviewsIcon from '../../assets/svg/Vector-2.svg';
import { useMediaQuery } from '../../hooks/mediaQuery';
export enum PAGE_OPTIONS {
  DAY_TOUR_PAGED = 'dayTours',
  MULTIDAY_TOUR_PAGE = 'multiday'
}

interface PAGE {
  page?: PAGE_OPTIONS;
}
const data = [
  {
    id: 'B111',
    snippet: 'Small-Group Tours',
    icon: '/SmallGroups.svg',
    link: '/tours'
  },
  {
    id: 'B112',
    snippet: 'Free_Cancellation',
    icon: '/Free_Cancellation.svg',
    link: '/faq'
  },
  {
    id: 'B113',
    snippet: '5000+ 5-Star Reviews',
    icon: '/5Star.svg',
    link: '/reviews'
  }
];
const Trustbar = () => {
  const mediaQuery = useMediaQuery(640);
  return (
    <section
      id="trusbar"
      className=" py-5 mx-5 sm:mx-20 md:mx-20 lg:mx-32 2xl:mx-40 pt-20"
    >
      <div id="experience" className="flex justify-center text-white ">
        {data.map(dt => {
          return (
            <div key={dt.id}>
              <Link href={dt.link}>
                <div className="flex flex-col gap-5 justify-between items-center h-full px-2 sm:px-10 ">
                  <div className="flex-none h-[40%]">
                    <Image
                      src={dt.icon}
                      width={mediaQuery ? 25 : 40}
                      height={mediaQuery ? 25 : 40}
                      alt="trust us"
                    />
                  </div>

                  <p className="flex-none h-[40%] text-[12px] md:text-[14px] lg:text-[16px] text-[#2F2E2E] text-center font-[400]">
                    {dt.snippet}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Trustbar;
