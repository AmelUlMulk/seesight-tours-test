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
    total: '15',
    heading: 'Years of Experience',
    snippet:
      'This Award-winning Tour Lets You Experience Niagara Falls From Above, Behind And Right Up-Close'
  },
  {
    total: '1K',
    heading: 'Successful trips',
    snippet:
      'This Award-winning Tour Lets You Experience Niagara Falls From Above, Behind And Right Up-Close'
  },
  {
    total: '10K',
    heading: 'Happy customer',
    snippet:
      'This Award-winning Tour Lets You Experience Niagara Falls From Above, Behind And Right Up-Close'
  },
  {
    total: '4.9',
    heading: 'Overall rating',
    snippet:
      'This Award-winning Tour Lets You Experience Niagara Falls From Above, Behind And Right Up-Close'
  }
];
const Trustbar = () => {
  return (
    <section id="trusbar" className=" flex py-5 lg:px-32 2xl:px-40">
      <div
        id="image-wrapper"
        className="flex-none w-[50%] border-b-[1px] border-[#C5C5C5]"
      >
        <Image
          src="/Mask group.jpg"
          width={1068.9}
          height={599.08}
          alt="turst-image"
          className="min-h-[100%]"
        />
      </div>
      <div className="flex-none w-[50%] border-b-[1px] border-[#C5C5C5] py-20">
        <div id="experience" className="flex flex-col gap-5 text-white">
          {data.map(dt => {
            return (
              <div
                key={dt.heading}
                className="bg-[#2191FA] flex items-center rounded-[15px] px-8"
              >
                <h1 className="text-[64px] font-[700]">{dt.total}</h1>
                <div className="flex flex-col px-6 py-4">
                  <h3 id="heading" className="text-[24px] font-[400]">
                    {dt.heading}
                  </h3>
                  <p className="text-[16px] font-[400]">{dt.snippet}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trustbar;
