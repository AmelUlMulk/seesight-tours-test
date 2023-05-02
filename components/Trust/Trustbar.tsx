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
            <div key={dt.id} className="flex-none lg:w-2/6 p-2">
              <Link href={dt.link}>
                <div className="flex flex-wrap justify-center items-center rounded-[8px] lg:rounded-[15px] bg-[#2191FA] ">
                  <div>
                    <Image src={dt.icon} width={49} height={31} alt="" />
                  </div>

                  <p className="xsm:text-[18px] sm:text-[14px] md:text-[16px] 2xl:text-[24px] font-[400] pl-3">
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
