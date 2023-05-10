import styled from 'styled-components';
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';
import { useMediaQuery } from './NavBar';

interface IProps {
  title: string;
  snippet: string;
  media: string;
  video: boolean;
  landing?: boolean;
  totalReviews?: Record<string, any>;
  rating?: number;
  trustworthy?: boolean;
}
interface StyleProps {
  isVideo: boolean;
}
const PageHeroStyle = styled.div`
  height: 55vh;
  position: relative;
  overflow: hidden !important;
  /* &:before {
      background: black;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
      opacity: 0.6;
    } */
  display: flex;
  @media (max-width: 540px) {
    height: 60vh;
  }
  .PageHero_container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    z-index: 30;
    @media (max-width: 540px) {
      gap: 1rem;
    }
  }
`;
const StyledImage = styled(Image)`
  z-index: 0;
`;
const StyledVideo = styled.video`
  height: 60vh;
  object-fit: cover;
  position: absolute;
  z-index: 0;
  @media (max-width: 2200px) {
    height: 69vh;
  }
  width: 100vw !important;
  z-index: 1;
`;
const PageHero = ({
  title,
  snippet,
  media,
  video,
  landing,
  totalReviews,
  trustworthy
}: IProps): JSX.Element => {
  const reviewsConnection = totalReviews?.reviewsConnection;
  const rating = parseFloat(reviewsConnection?.aggregate?.avg?.rating).toFixed(
    1
  );
  const totalReviewCount = reviewsConnection?.aggregate.count;
  const mediaQuery = useMediaQuery(540);
  return (
    <section className="Hero_Section  overflow-hidden">
      <PageHeroStyle
        id="PageHero"
        className="relative bg-no-repeat bg-cover bg-center flex justify-start items-center "
      >
        <div className="absolute w-full h-full z-10 bg-opacity-40 bg-black " />

        <div
          className={`${
            !video &&
            'absolute top-0 left-0 w-[100%] h-[inherit] bg-gradient-to-tr  z-20'
          }`}
        ></div>
        {!video && <StyledImage alt="guidesImage" src={media} layout="fill" />}
        {video && (
          <>
            <StyledVideo
              src={media}
              muted
              loop
              autoPlay
              playsInline
              className="hidden xl:flex "
            />

            <StyledImage
              alt="guidesImage"
              src="https://res.cloudinary.com/see-sight-tours/image/upload/w_500/v1682684366/strapi/image1_f0cf2fc9c5.webp"
              layout="fill"
              className="flex xl:hidden "
              priority={true}
              quality={70}
            />
          </>
        )}
        <div className="PageHero_container flex flex-col ">
          <div className="font-bold flex-col  text-white text-center w-full ">
            <h1 className="text-2xl sm:text-4xl lg:text-6xl text-white  ">
              {' '}
              {landing && (
                <span className="text-[#2191FA] text-4xl sm:text-5xl lg:text-7xl ">
                  ULTRA
                </span>
              )}{' '}
              {title.indexOf('ULTRA') !== -1 ? title.split('ULTRA')[1] : title}
            </h1>
            {landing && (
              <h3 className="text-3xl sm:text-4xl lg:text-5xl mt-2 font-semibold">
                Size Matters!
              </h3>
            )}
          </div>
          {snippet !== 'Size Matters' && (
            <p className="w-full text-xl sm:text-3xl  text-center text-white  ">
              {snippet}
            </p>
          )}
          {trustworthy && (
            <div className="text-white text-center">
              <h3 className="text-2xl sm:text-3xl font-[600]">
                Personal | Authentic | Local
              </h3>
            </div>
          )}
          {totalReviews && (
            <div id="ratings" className="text-center text-white">
              <h3 className="text-2xl sm:text-3xl font-[600]">
                Our Overall rating
              </h3>

              <div className="flex flex-wrap text-white justify-center items-center">
                <div>
                  <Rating
                    fillColor="white"
                    emptyColor="white"
                    SVGstyle={{
                      display: 'inline-block'
                    }}
                    size={mediaQuery ? 25 : 40}
                  />
                </div>
                <p className="text-xl sm:text-3xl font-[600] px-3">{`${rating} out of 5`}</p>
                <p className="text-xl sm:text-3xl">{`(${totalReviewCount} Reviews)`}</p>
              </div>
            </div>
          )}
        </div>
      </PageHeroStyle>
    </section>
  );
};
export default PageHero;
