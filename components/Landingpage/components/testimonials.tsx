import Image from 'next/image';
import styled from 'styled-components';
const TestimonialStyle = styled.section`
  background-image: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.532),
      rgba(43, 43, 43, 0.041)
    ),
    url('/testimonial.png');
  border-radius: 10px;
`;
export const TextShadow = styled.h1`
  text-shadow: 1px -42px 1px rgba(51, 51, 51, 0.1);
`;

const data = [
  {
    id: 'A111',
    para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem. consectetur adipiscing elit. nibh lectus feugiat nunc ',
    author: 'Jane'
  },
  {
    id: 'A112',
    para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem. consectetur adipiscing elit. nibh lectus feugiat nunc ',
    author: 'Jackson'
  },
  {
    id: 'A113',
    para: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem. consectetur adipiscing elit. nibh lectus feugiat nunc ',
    author: 'Cooper'
  }
];
const Testimonials = () => {
  return (
    <TestimonialStyle
      id="testimonials"
      className="py-10 px-10 bg-no-repeat bg-cover my-10"
    >
      <div className="px-10">
        <TextShadow className="text-[60px] font-[600] shadow-textShadow">
          Testimonials
        </TextShadow>
      </div>
      <div className="flex gap-6 lg:px-52">
        {data.map(dt => {
          return (
            <div key={dt.id}>
              <div className="flex flex-col relative bg-[#000000] opacity-80  text-white pb-12 px-8 pt-10 rounded-lg">
                <Image src="/quote.png" width={30} height={30} alt="" />
                <p>{dt.para}</p>
                <div
                  className="bg-[#000000] opacity-[80%] w-[30px] h-[30px] absolute top-[100%] left-8"
                  style={{
                    clipPath: 'polygon(0 0, 46% 65%, 100% 0)'
                  }}
                ></div>
              </div>
              <div className="text-[#FFFFFF] pt-5 pl-5 text-[18px] font-[700]">
                {dt.author}
              </div>
            </div>
          );
        })}
      </div>
    </TestimonialStyle>
  );
};

export default Testimonials;
