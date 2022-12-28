import styled from 'styled-components';

const PageHero = () => {
  const PageHero_Section = styled.div`
    backgroudimage: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
      url('https://res.cloudinary.com/see-sight-tours/image/upload/q_auto,f_auto,c_fill,g_faces,h_570,w_958,y_0/v1582036498/Happy-group-tour-guides.jpg');
  `;

  return (
    <section className="Hero_Section opacity-70">
      <div
        className="PageHero h-[50vh] bg-no-repeat bg-cover bg-center bg-gradient-to-r from-purple-600 to-blue-600 flex justify-start items-center"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/see-sight-tours/image/upload/q_auto,f_auto,c_fill,g_faces,h_570,w_958,y_0/v1582036498/Happy-group-tour-guides.jpg")`
        }}
      >
        <div className="PageHero_container flex flex-col pl-10 ">
          <div className="text-5xl font-bold text-white">
            <h1>Contact Us</h1>
          </div>
          <div className="text-2xl text-white">
            <p>We&apos;d love to hear from you</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
