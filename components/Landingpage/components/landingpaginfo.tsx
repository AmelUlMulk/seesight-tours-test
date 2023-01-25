import Image from 'next/image';
const landingpPageInfo = [
  {
    header: 'Small-Group Tours',
    paragraph:
      'Small-groups create connections and allow us to be flexible and go places where large groups don’t. No crowded buses, no microphones.',
    key: 'LPI0'
  },
  {
    header: 'Local Experiences',
    paragraph:
      'We believe in supporting the communities we live and operate in. By hiring locally, we create jobs to support the local economy and ensure guests receive an authentic experience.',
    key: 'LPI1'
  },
  {
    header: 'Friendly Guides',
    paragraph:
      'Our guides aim to create personal connections with each guest we serve. We truly care about delivering the best customer experience possible.',
    key: 'LPI2'
  }
];
const LandingPageInfo = () => {
  return (
    <section id="landing_page_info" className="py-16 lg:px-32 2xl:px-40">
      <h1 className="text-[56px] font-[600]">Why us</h1>
      <div className="flex">
        <div id="image-wrapper" className="relative flex-none w-[50%]">
          <Image
            src={'/Rectangle 6.png'}
            fill
            alt="Hornblower Niagara Cruises"
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex-none w-[50%]">
          <div className="flex justify-center flex-col px-[14%] ">
            {landingpPageInfo.map(
              (infoData: Record<string, string>, index: number) => {
                return (
                  <div key={infoData.key} className="flex">
                    <div className="pt-2">
                      <h1 className="text-[26px] font-[500] text-[#9B9B9B]">
                        0{index + 1}
                      </h1>
                    </div>
                    <div className="px-14">
                      <h1 className="text-[32px] font-[600] text-[#333333]">
                        {infoData.header}
                      </h1>
                      <p className="text-[#828282] text-[16px] font-[500]">
                        {infoData.paragraph.toLocaleUpperCase()}
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPageInfo;
