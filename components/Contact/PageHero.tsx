import styled from 'styled-components';
import Image from 'next/image';

interface IProps {
  title: string;
  snippet: string;
  media: string;
  video: boolean;
}

const PageHero = ({ title, snippet, media, video }: IProps): JSX.Element => {
  const PageHero = styled.div`
    height: 50vh;
    position: relative;
    overflow: hidden !important;
    &:before {
      background: black;
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
      opacity: 0.5;
    }
    display: flex;
    .PageHero_container {
      position: absolute;
      left: 14%;
      @media (max-width: 1100px) {
        left: 0;
      }
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      z-index: 1;

      p {
        font-size: 30px;
        width: 70%;
        @media (max-width: 400px) {
          font-size: 15px;
          width: 95%;
        }
        @media (max-width: 700px) {
          font-size: 24px;
          width: 90%;
        }
        @media (max-width: 1200px) {
          font-size: 30px;
          width: 80%;
          left: 0;
        }
      }
    }
  `;
  const StyledImage = styled(Image)`
    z-index: 0;
  `;
  const StyledVideo = styled.video`
    height: 60vh;
    object-fit: cover;
    @media (max-width: 2200px) {
      height: 69vh;
    }
    width: 100vw !important;
  `;

  return (
    <section className="Hero_Section opacity-80 overflow-hidden">
      <PageHero className="PageHero bg-no-repeat bg-cover bg-center flex justify-start items-center ">
        {!video && <StyledImage alt="guidesImage" src={media} layout="fill" />}
        {video && <StyledVideo src={media} muted loop autoPlay playsInline />}
        <div className="PageHero_container flex flex-col pl-10 ">
          <div className="font-bold text-white text-left ">
            <h1 className=" 3xl:text-5xl 2xl:text-5xl xl:text-5xl lg:text-5xl md:text-5xl sm:text-4xl xsm:text-4xl xxsm:text-3xl ">
              {title}
            </h1>
          </div>
          <div className="text-2xl text-white">
            <p className=" 3xl:text-5xl 2xl:text-5xl xl:text-5xl lg:text-5xl md:text-2xl  sm:text-2xl sm:leading-10 xsm:text-xs xsm:leading-8 xxsm:text-xs xxsm:leading-7">
              {snippet}
            </p>
          </div>
        </div>
      </PageHero>
    </section>
  );
};

export default PageHero;
