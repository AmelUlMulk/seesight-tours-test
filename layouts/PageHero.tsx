import styled from 'styled-components';
import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';

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

  display: flex;
  @media (max-width: 540px) {
    height: 65vh;
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
  top: 0;
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
            <div className="hidden xl:flex ">
              <StyledVideo src={media} muted loop autoPlay playsInline />
            </div>

            <StyledImage
              alt="guidesImage"
              src="https://res.cloudinary.com/see-sight-tours/image/upload/w_400,q_300/v1682684366/strapi/image1_f0cf2fc9c5.webp"
              layout="fill"
              className="flex xl:hidden "
              priority={true}
              quality={70}
            />
          </>
        )}
        <div className="PageHero_container flex flex-col ">
          <div className="font-bold flex-col  text-white text-center w-full px-[2%]  ">
            <h1 className="text-3xl lg:text-6xl text-white  ">
              {' '}
              {landing && (
                <span className="text-[#2191FA] text-4xl  lg:text-7xl ">
                  ULTRA
                </span>
              )}{' '}
              {title.indexOf('ULTRA') !== -1 ? title.split('ULTRA')[1] : title}
            </h1>
            {landing && (
              <h3 className="text-3xl  lg:text-5xl mt-2 font-semibold">
                Size Matters!
              </h3>
            )}
          </div>
          {snippet !== 'Size Matters' && (
            <p className="w-full text-xl   text-center text-white px-[2%]  ">
              {snippet}
            </p>
          )}
          {trustworthy && (
            <div className="text-white text-center">
              <h3 className="text-2xl  font-[600]">
                Personal | Authentic | Local
              </h3>
            </div>
          )}
          {totalReviews && (
            <div id="ratings" className="text-center text-white">
              <h3 className="text-2xl  font-[600]">Our Overall rating</h3>

              <div className="flex flex-wrap text-white justify-center items-center">
                <div>
                  <Rating
                    fillColor="white"
                    emptyColor="white"
                    SVGstyle={{
                      display: 'inline-block'
                    }}
                    size={25}
                  />
                </div>
                <p className="text-xl  font-[600] px-3">{`${rating} out of 5`}</p>
                <p className="text-xl ">{`(${totalReviewCount} Reviews)`}</p>
              </div>
            </div>
          )}
        </div>
      </PageHeroStyle>
    </section>
  );
};
export default PageHero;
