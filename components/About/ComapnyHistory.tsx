import Image from 'next/image';

const CompanyyHistory = () => {
  return (
    <>
      <section id="tour-experience" className="px-20 py-5 bg-[#E4F6F1]">
        <div className="flex  items-center w-[100%]">
          <div className="flex-none w-[60%] px-20 py-10">
            <h2 className="text-[36px] font-[600]">
              Immersive tour experiences
            </h2>
            <p className="text-[18px] font-[400] text-justify">
              Founded in Niagara Falls, Canada in 2006, We have developed a
              wealth of experience delivering uniquely intimate and immersive
              tour experiences. Our tour guides take pride in their personal
              expertise in showcasing the hidden beauty of the local areas where
              we operate and are determined to create lasting impressions on our
              guests from around the world.
            </p>
          </div>
          <div className="flex-none w-[40%]">
            <Image
              src="/tour_experiences.png"
              width={400}
              height={400}
              quality={100}
              alt="tour experience"
              className="rounded-lg shadow-tourExpImgBox"
            />
          </div>
        </div>
      </section>
      <section id="how-it-started" className="px-20 py-5>">
        <div className="flex  items-center w-[100%]">
          <div className="flex-none w-[40%]">
            <Image
              src="/tour_experiences.png"
              width={400}
              height={400}
              quality={100}
              alt="tour experience"
              className="rounded-lg shadow-tourExpImgBox"
            />
          </div>
          <div className="flex-none w-[60%] px-5 py-10">
            <h2 className="text-[36px] font-[600]">How it all started</h2>
            <p className="text-[18px] font-[400] text-justify">
              Daud Grewal, the company’s Founder was born and raised in Niagara
              Falls. He started See Sight Tours with the help of his beloved
              mother while still in high school. He came up with the idea while
              working as a parking lot attendant at a local tourist attraction.
              While working, he would often see big sightseeing buses crammed
              with tourists and he was sure there was a much more comfortable
              and personal way to provide sightseeing tours. His idea was simple
              - he would give personable, private tour experiences using his
              mother’s minivan.
            </p>
          </div>
        </div>
      </section>
      <section id="tour-experience" className="px-20 py-5 bg-[#E4F6F1]">
        <div className="flex  items-center w-[100%]">
          <div className="flex-none w-[60%] px-20 py-10">
            <h2 className="text-[36px] font-[600]">Our culture</h2>
            <p className="text-[18px] font-[400] text-justify">
              Founded in Niagara Falls, Canada in 2006, We have developed a
              wealth of experience delivering uniquely intimate and immersive
              tour experiences. Our tour guides take pride in their personal
              expertise in showcasing the hidden beauty of the local areas where
              we operate and are determined to create lasting impressions on our
              guests from around the world.
            </p>
          </div>
          <div className="flex-none w-[40%]">
            <Image
              src="/tour_experiences.png"
              width={400}
              height={400}
              quality={100}
              alt="tour experience"
              className="rounded-lg shadow-tourExpImgBox"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyyHistory;
