import Link from 'next/link';
import Image from 'next/image';
import SmallToursIcon from '../../assets/svg/vector.svg';
import FreeCancellationIcon from '../../assets/svg/Vector-1.svg';
import ReviewsIcon from '../../assets/svg/Vector-2.svg';
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
    icon: '/Vector.svg',
    link: '/tours'
  },
  {
    id: 'B112',
    snippet: 'Free Cancellation',
    icon: '/Vector-1.svg',
    link: '/faq'
  },
  {
    id: 'B113',
    snippet: '5000+ 5-Star Reviews',
    icon: '/Vector-2.svg',
    link: '/reviews'
  }
];
const Trustbar = () => {
  return (
    <section
      id="trusbar"
      className=" py-5 xxsm:px-8 xsm:px-12 sm:px-16 md:px-28 lg:px-32 2xl:px-40 pt-20"
    >
      <div
        id="experience"
        className="flex xxsm:flex-col lg:flex-row text-white sm:w-[80%] lg:w-[95%] xl:w-[92%] mx-auto "
      >
        {data.map(dt => {
          return (
            <div
              key={dt.id}
              className="flex-none lg:w-[33.33%] py-2 lg:py-0 lg:px-2"
            >
              <Link href={dt.link}>
                <div className="bg-[#2191FA] flex items-center rounded-[8px] lg:rounded-[15px] xxsm:pl-5 xsm:pl-6 sm:pl-10 md:pl-16 lg:pl-3 xl:pl-6 xxsm:py-2 xsm:py-3 md:py-3 lg:py-5">
                  <div>
                    <Image src={dt.icon} width={49} height={31} alt="" />
                  </div>
                  <div className="xxsm:pr-5 xsm:pr-6 md:pr-20 lg:pr-0 lg:pl-3 py-2 w-[100%] text-center lg:text-start">
                    <p className="xsm:text-[18px] sm:text-[14px] md:text-[16px] 2xl:text-[24px] font-[400]">
                      {dt.snippet}
                    </p>
                  </div>
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
