import React, { useState } from 'react';
import PageHero from '../components/Contact/PageHero';
import client from '../apollo-client';
import { GUIDES_PAGE, GUIDES_PAGE_INTERFACE } from '../api/guidesPage';
import Image from 'next/image';
import styled from 'styled-components';
import { Adventure } from '../layouts/AdventureSection/Adventure';
import AdventureOne from '../public/Adventure.jpg';

export async function getStaticProps() {
  const { data } = await client.query<GUIDES_PAGE_INTERFACE>(GUIDES_PAGE);
  return {
    props: {
      guidesPage: data.guidesPage
    }
  };
}
const StyledImage = styled(Image)`
  box-shadow: 10px -10px 0px -1px rgba(33, 145, 250, 1);
`;

const StyledImageTwo = styled(Image)`
  box-shadow: -10px -10px 0px -1px rgba(33, 145, 250, 1);
`;

const GuidesContainer = styled.h2`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  line-height: 50px;
`;

const Card = styled.div``;

const GuideName = styled.h1`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  line-height: 40px;
  @media (max-width: 900px) {
    margin-top: 20px;
  }
  @media (max-width: 400px) {
    display: none;
  }
`;

const GuideDescription = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  line-height: 37px;
  text-align: justify;
  max-height: 350px !important;
  @media (max-width: 400px) {
    margin-top: 10px;
  }
`;

const SeeMoreButton = styled.button`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 24px;
`;

const WholeContainer = styled.div`
  @media (max-width: 900px) {
    display: block;
  }
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
        <GuidesContainer className="3xl:text-[56px] 2xl:text-[56px] xl:text-[50px]  lg:text-[50px] md:text-[40px] sm:text-[35px] xsm:text-[30px] xxsm:text-[30px]  3xl:my-[40px] 3xl:mx-[300px]  2xl:my-[20px] 2xl:mx-[200px]  xl:my-[20px] xxl:mx-[200px]   lg:my-[20px] lg:mx-[200px] md:my-[20px] md:mx-[100px] sm:my-[20px] sm:mx-[100px] xsm:my-[20px] xsm:mx-[50px] xxsm:my-[20px] xxsm:mx-[30px] ">
          <h2>MEET OUR GUIDES</h2>
        </GuidesContainer>
        <Card className=" 3xl:my-[40px] 3xl:mx-[300px]  2xl:my-[40px] 2xl:mx-[200px]  xl:my-[40px] xxl:mx-[200px]   lg:my-[40px] lg:mx-[200px] md:my-[40px] md:mx-[100px] sm:my-[40px] sm:mx-[100px] xsm:my-[40px] xsm:mx-[60px] xxsm:my-[40px] xxsm:mx-[30px] ">
          <ul>
            {guidesPage.guides
              .slice(0, guidesCount)
              .map((guide, index: number) =>
                index % 2 === 0 ? (
                  <WholeContainer
                    id="card-wrapper"
                    className="flex flex-row-reverse gap-10 mb-10   "
                    key={guide.guide.id}
                  >
                    <StyledImage
                      src={guide.guide.professional[0].url}
                      alt={guide.guide.professional[0].url}
                      width={200}
                      height={500}
                      className="flex-none 3xl:w-[552px] 2xl:w-[552px] xl:w-[500px] lg:w-[350px] md:w-[350px] sm:w-[552px] xsm:w-[552px]   3xl:h-[450px] 2xl:h-[450px] xl:h-[400px] lg:h-[400px] md:h-[400px] sm:h-[350px] xsm:h-[300px] rounded-3xl   "
                    />

                    <div className=" overflow-hidden hover:overflow-auto  pr-2   ">
                      <GuideName className="3xl:text-[32px] 2xl:text-[32px] xl:text-[28px]  lg:text-[28px] md:text-[28px] sm:text-[28px] xsm:text-[24px]">
                        {guide.guide.firstName}
                      </GuideName>
                      <GuideDescription className="3xl:text-[24px] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[20px] sm:text-[18px] xsm:text-[18px]  ">
                        {guide.guide.biography}
                      </GuideDescription>
                    </div>
                  </WholeContainer>
                ) : (
                  <WholeContainer
                    id="card-wrapper"
                    className=" flex flex-row  gap-10 mb-10  "
                    key={guide.guide.id}
                  >
                    <StyledImageTwo
                      src={guide.guide.professional[0].url}
                      alt={guide.guide.professional[0].url}
                      width={200}
                      height={200}
                      className="flex-none 3xl:w-[552px] 2xl:w-[552px] xl:w-[500px] lg:w-[350px] md:w-[350px] sm:w-[552px] xsm:w-[552px]  3xl:h-[450px] 2xl:h-[450px] xl:h-[400px] lg:h-[400px] md:h-[400px] sm:h-[350px] xsm:h-[300px] rounded-3xl   "
                    />
                    <div className=" overflow-hidden hover:overflow-auto   pr-2   ">
                      <GuideName className="3xl:text-[32px] 2xl:text-[32px] xl:text-[28px]  lg:text-[28px] md:text-[28px] sm:text-[28px] xsm:text-[24px]">
                        {guide.guide.firstName}
                      </GuideName>

                      <GuideDescription className="3xl:text-[24px] 2xl:text-[24px] xl:text-[22px] lg:text-[20px] md:text-[20px] sm:text-[18px] xsm:text-[18px]  ">
                        {guide.guide.biography}
                      </GuideDescription>
                    </div>
                  </WholeContainer>
                )
              )}
          </ul>
          <div className="flex justify-end">
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
        </Card>
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
