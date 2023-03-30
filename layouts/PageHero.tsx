import styled from 'styled-components';
import Image from 'next/image';

interface IProps {
  title: string;
  snippet: string;
  media: string;
  video: boolean;
  landing?: boolean;
}

const PageHero = ({
  title,
  snippet,
  media,
  video,
  landing
}: IProps): JSX.Element => {
  const PageHero = styled.div`
    height: 55vh;
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
      opacity: 0.6;
    }
    display: flex;
    .PageHero_container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
      z-index: 1;
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
  `;
  console.log('the snippet', snippet);
  return (
    <section className="Hero_Section opacity-80 overflow-hidden">
      <PageHero className="PageHero bg-no-repeat bg-cover bg-center flex justify-start items-center ">
        {!video && <StyledImage alt="guidesImage" src={media} layout="fill" />}
        {video && <StyledVideo src={media} muted loop autoPlay playsInline />}
        <div className="PageHero_container flex flex-col">
          <div className="font-bold flex-col  text-white text-center w-full ">
            <h1 className=" text-4xl lg:text-6xl text-white  ">
              {' '}
              {landing && (
                <span className="text-[#2191FA] text-5xl lg:text-7xl ">
                  ULTRA
                </span>
              )}{' '}
              {title.indexOf('ULTRA') !== -1 ? title.split('ULTRA')[1] : title}
            </h1>
            {landing && (
              <h3 className="text-4xl lg:text-5xl mt-2 font-semibold">
                Size Matters!
              </h3>
            )}
          </div>
          {snippet !== 'Size Matters' && (
            <p className="w-full text-3xl  text-center text-white  ">
              {snippet}
            </p>
          )}
        </div>
      </PageHero>
    </section>
  );
};

export default PageHero;
