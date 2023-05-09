import styled from 'styled-components';

const PageHero = () => {
  const PageHero_Section = styled.div`
    height: 50vh;
    background-color: gray;
    background-size: cover;
    background-repeat: no-repeat;
  `;
  return (
    <div className="Hero_Section relative">
      <PageHero_Section className="PageHero relative w-[100%]">
        <video
          className="min-w-[100%] min-h-[100%] w-[100%] h-[50vh] object-cover overflow-hidden bg-cover"
          muted
          loop
          autoPlay
          playsInline
          src="https://res.cloudinary.com/see-sight-tours/video/upload/q_70,w_1000,fl_progressive:steep//v1658237954/landing-page-hero_mu19mc.webm"
        />
        <div className="PageHero_container absolute top-[50%] left-[10%] w-[80%] flex flex-col ">
          <div className="heading text-7xl text-white font-bold">
            <h2>The Best Way to See The World.</h2>
          </div>
          <div className="snippet text-white text-3xl">
            <p>
              Best Small Group Tours. Operating Across Canada and the United
              States
            </p>
          </div>
        </div>
      </PageHero_Section>
    </div>
  );
};

export default PageHero;
