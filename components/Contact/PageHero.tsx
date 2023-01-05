import styled from 'styled-components';
<<<<<<< Updated upstream

const PageHero = () => {
  const PageHero = styled.div`
    height: 50vh;
    background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.35),
        rgba(0, 0, 0, 0.35)
      ),
      url('https://res.cloudinary.com/see-sight-tours/image/upload/q_auto,f_auto,c_fill,g_faces,h_570,w_958,y_0/v1582036498/Happy-group-tour-guides.jpg');
    z-index: -2;
=======
import Image from 'next/image';

interface IProps {
  title: string;
  snippet: string;
  media: any;
}

const PageHero = ({ title, snippet, media }: IProps): JSX.Element => {
  const PageHero = styled.div`
    height: 50vh;
    position: relative;
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
>>>>>>> Stashed changes
  `;

  return (
    <section className="Hero_Section opacity-80 ">
<<<<<<< Updated upstream
      <PageHero
        className="PageHero bg-no-repeat bg-cover bg-center flex justify-start items-center"
      >
=======
      <PageHero className="PageHero bg-no-repeat bg-cover bg-center flex justify-start items-center">
        <StyledImage alt="guidesImage" src={media} layout="fill" />
>>>>>>> Stashed changes
        <div className="PageHero_container flex flex-col pl-10 ">
          <div className="font-bold text-white">
            <h1>{title}</h1>
          </div>
          <div className="text-2xl text-white">
            <p>{snippet}</p>
          </div>
        </div>
      </PageHero>
    </section>
  );
};

export default PageHero;
