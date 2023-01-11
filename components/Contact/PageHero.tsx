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
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      z-index: 1;
      h1 {
        font-size: 60px;
      }
      p {
        font-size: 30px;
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
        {video && (
          <StyledVideo src={media} muted loop autoPlay playsInline />
        )}{' '}


        <div className="PageHero_container flex flex-col pl-10 ">
          <div className="font-bold text-white">
            <h1>{title}</h1>
          </div>
          <div className="text-2xl text-white ">
            <p>{snippet}</p>
          </div>
        </div>
      </PageHero>
    </section>
  );
};

export default PageHero;
