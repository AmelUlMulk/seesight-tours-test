import Link from 'next/link';
import Image from 'next/image';

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
    icon: 'https://res.cloudinary.com/see-sight-tours/image/upload/v1683788470/icons-website/SmallGroups_x9tntu.svg',
    link: '/tours'
  },
  {
    id: 'B112',
    snippet: 'Free Cancellation',
    icon: 'https://res.cloudinary.com/see-sight-tours/image/upload/v1683788572/icons-website/Free_Cancellation_ijucbp.svg',
    link: '/faq'
  },
  {
    id: 'B113',
    snippet: '5000+ 5-Star Reviews',
    icon: 'https://res.cloudinary.com/see-sight-tours/image/upload/v1683788634/icons-website/5Star_vvajxg.svg',
    link: '/reviews'
  }
];
const Trustbar = () => {
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
                      width={25}
                      height={25}
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
