import React, { useState } from 'react';
import PageHero from '../layouts/PageHero';
import client from '../apollo-client';
import { GUIDES_PAGE, GUIDES_PAGE_INTERFACE } from '../api/guidesPage';
import Image from 'next/image';
import styled from 'styled-components';
import { Adventure } from '../layouts/AdventureSection/Adventure';
import AdventureOne from '../public/Adventure.jpg';

interface GuideProps {
  background: boolean;
  reverse: boolean;
}
interface ImageShadow {
  position: string;
}
export async function getStaticProps() {
  const { data } = await client.query<GUIDES_PAGE_INTERFACE>(GUIDES_PAGE);
  return {
    props: {
      guidesPage: data.guidesPage
    }
  };
}

const StyledImage = styled(Image)<ImageShadow>`
  box-shadow: ${props =>
    props.position === 'right'
      ? '8px -8px 0px -1px #2191FA'
      : ' -8px -8px 0px -1px #2191FA'};
  border-radius: 0.5rem;
  max-height: 400px;
  min-width: 300px;
  align-self: center;

  @media (max-width: 1000px) {
    min-width: 380px;
    max-height: 320px;
  }
  @media (max-width: 550px) {
    min-width: 380px;
    max-height: 380px;
  }
  @media (max-width: 380px) {
    min-width: 300px;
  }
`;
const GuideCard = styled.div<GuideProps>`
  display: flex;
  gap: 1rem;
  background-color: ${props => (props.background ? '#d1dfed' : 'white')};
  flex-direction: ${props => (props.reverse ? 'row' : 'row-reverse')};
  margin-bottom: 2rem;
  @media (max-width: 1000px) {
    flex-direction: column-reverse;
    align-items: center;
    .text-body {
      width: 380px;
    }
  }
  @media (max-width: 550px) {
    .text-body {
      width: 380px;
    }
  }
  @media (max-width: 380px) {
    .text-body {
      width: 300px;
    }
  }
`;
const SeeMoreButton = styled.button`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 24px;
`;

const Guides = ({ guidesPage }: GUIDES_PAGE_INTERFACE) => {
  const [guidesCount, setGuidesCount] = useState(4);

  return (
    <>
      <PageHero
        title={'Our Guides'}
        snippet={'Meet Our Energetic Team'}
        media={
          'https://res.cloudinary.com/see-sight-tours/image/upload/w_1920,h_500/t_header/f_auto,q_auto,/fl_progressive:steep/v1581435096/american-falls-luna-island-rainbow-bridge.webP'
        }
        video={false}
      />
      <section>
        <h2 className="px-[2%]  lg:px-[8%] xl:px-[10%] 2xl:px-[15%] 3xl:px-[20%]  text-3xl lg:text-5xl font-extrabold my-8       ">
          MEET OUR GUIDES
        </h2>
        {guidesPage.guides.slice(0, guidesCount).map((guide, i) => (
          <GuideCard
            key={guide.guide.firstName}
            background={i % 2 === 0 ? false : true}
            reverse={i % 2 === 0 ? false : true}
            className="px-[2%]  lg:px-[8%] xl:px-[10%] 2xl:px-[15%] 3xl:px-[20%] py-8 "
          >
            <div className=" text-body  flex flex-col gap-4  overflow-x-hidden flex-1     ">
              <h2 className="text-2xl md:text-2xl lg:text-3xl 2xl:text-4xl font-semibold  ">
                {guide.guide.firstName}
              </h2>
              <p className=" text-sm md:text-base xl:text-lg   text-[#333333] ">
                {guide.guide.biography}
              </p>
            </div>
            <StyledImage
              src={guide.guide.professional[0].url}
              width={300}
              height={350}
              quality={100}
              position={i % 2 === 0 ? 'right' : 'left'}
              alt={guide.guide.firstName}
            />
          </GuideCard>
        ))}
        <div className="flex px-[2%]  lg:px-[8%] xl:px-[10%] 2xl:px-[15%] 3xl:px-[20%] justify-end">
          <SeeMoreButton
            className=" px-10 text-center bg-white  text-[#6D6D6D] cursor-pointer  h-14 "
            onClick={() => {
              guidesCount === 4
                ? setGuidesCount(guidesPage.guides.length)
                : setGuidesCount(4);
            }}
          >
            {guidesCount === 4 ? `SEE MORE ` : 'SEE LESS'}
          </SeeMoreButton>
        </div>
      </section>
      <Adventure
        title={'Ready for an adventure?'}
        snippet={
          'The best small group tours operating across Canada and the United States'
        }
        media={AdventureOne}
      />
    </>
  );
};

export default Guides;
