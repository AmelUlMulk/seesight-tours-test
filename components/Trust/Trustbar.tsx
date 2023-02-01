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
    icon: '/Vector.svg'
  },
  {
    id: 'B112',
    snippet: 'Free Cancellation',
    icon: '/Vector-1.svg'
  },
  {
    id: 'B113',
    snippet: '5000+ 5-Star Reviews',
    icon: '/Vector-2.svg'
  }
];
const Trustbar = () => {
  return (
    <section id="trusbar" className=" py-5 lg:px-32 2xl:px-40 mt-20">
      <div id="experience" className="flex justify-center gap-5 text-white ">
        {data.map(dt => {
          return (
            <div
              key={dt.id}
              className="bg-[#2191FA] flex items-center rounded-[15px] px-3 py-5"
            >
              <div>
                <Image src={dt.icon} width={49} height={31} alt="" />
              </div>
              <div className="px-6 py-2 w-[100%]">
                <p className="text-[24px] font-[400]">{dt.snippet}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Trustbar;
