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
    <section id="landing_page_info">
      <div className="flex">
        <div id="image-wrapper" className="relative flex-none w-[50%]">
          <Image
            src={
              'https://res.cloudinary.com/see-sight-tours/image/upload/t_desktop/v1581435116/hornblower-niagara-falls.jpg'
            }
            fill
            alt="Hornblower Niagara Cruises"
            className="object-cover"
          />
        </div>
        <div className="flex-none w-[50%] bg-[#57b8e8]">
          <div className="flex justify-center flex-col px-[14%] py-[60px]">
            {landingpPageInfo.map((infoData: Record<string, string>) => {
              return (
                <div key={infoData.key} className="text-white">
                  <h1 className="text-4xl font-[500]">{infoData.header}</h1>
                  <p className="text-2xl">{infoData.paragraph}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPageInfo;
