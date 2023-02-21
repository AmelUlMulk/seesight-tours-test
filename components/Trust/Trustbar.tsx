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
    link: '/faqs'
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
        className="flex xxsm:flex-col lg:flex-row justify-center gap-5 text-white "
      >
        {data.map(dt => {
          return (
            <Link href={dt.link} key={dt.id}>
              <div className="bg-[#2191FA] flex items-center rounded-[15px] xxsm:px-5 xsm:px-6 sm:px-10 md:px-10 lg:px-3 xxsm:py-2 md:py-5">
                <div>
                  <Image src={dt.icon} width={49} height={31} alt="" />
                </div>
                <div className="xxsm:pl-5 xsm:pl-6 md:px-10 lg:px-3 py-2 w-[100%]">
                  <p className="xsm:text-[18px] sm:text-[20px] md:text-[24px] lg:text-[18px] 2xl:text-[24px] font-[400]">
                    {dt.snippet}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Trustbar;
