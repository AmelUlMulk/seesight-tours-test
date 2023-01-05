import styled from 'styled-components';

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
  `;

  return (
    <section className="Hero_Section opacity-80 ">
      <PageHero className="PageHero bg-no-repeat bg-cover bg-center flex justify-start items-center">
        <div className="PageHero_container flex flex-col pl-10 ">
          <div className="text-5xl font-bold text-white">
            <h1>Contact Us</h1>
          </div>
          <div className="text-2xl text-white">
            <p>We&apos;d love to hear from you</p>
          </div>
        </div>
      </PageHero>
    </section>
  );
};

export default PageHero;
