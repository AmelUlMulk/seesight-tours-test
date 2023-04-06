import styled from 'styled-components';
import Image from 'next/image';
import { CARDMEDIAINTERFACE } from '../../../api/commonInterfaces';
import BlogCard from '../BlogCard';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from 'react';
interface IProps {
  mainBlogs: [
    {
      header: string;
      slug: string;
      snippet: string;
      publicationDate: string;
      author: string;
      heroMedia: [CARDMEDIAINTERFACE];
      blogCategories: {
        id: string;
        title: string;
        slug: string;
      };
    }
  ];
}
const SwipperParams = {
  navigation: true,
  className: 'w-full  max-h-[450px] ',
  spaceBetween: 10,
  slidesPerView: 3,
  pagination: { clickable: true },
  effect: 'slide',
  grabCursor: true,
  a11y: { enabled: true },
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  breakpoints: {
    300: {
      slidesPerView: 1
    },
    400: {
      slidesPerView: 1
    },
    600: {
      slidesPerView: 2
    },
    800: {
      slidesPerView: 2
    },
    1200: {
      slidesPerView: 3
    }
  }
};
enum LATESTINDEX {
  ONE = 0,
  TWO = 3,
  THREE = 6
}
const PageHero = ({ mainBlogs }: IProps): JSX.Element => {
  const [latestIndex, setLatestIndex] = useState(LATESTINDEX.ONE);
  const PageHero = styled.div`
    height: 60vh;
    position: relative;
    width: 100vw !important;
    &:before {
      background-color: rgba(0, 0, 0, 0.6);
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 1;
    }
    display: flex;
    .PageHero_container {
      display: flex;
      justify-content: start;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
      z-index: 1;
    }
  `;
  const StyledImage = styled(Image)`
    z-index: 0;
  `;

  return (
    <PageHero className="PageHero bg-no-repeat bg-cover bg-center flex justify-start mb-[20vh]    ">
      <StyledImage
        alt="guidesImage"
        src="https://res.cloudinary.com/see-sight-tours/image/upload/v1581435116/hornblower-niagara-falls.jpg"
        layout="fill"
      />

      <div className="PageHero_container flex flex-col  items-center justify-center  ">
        <div className="font-bold flex flex-wrap  text-white mt-[18vh] items-center gap-0  justify-center text-center w-full ">
          <h1 className=" text-3xl lg:text-5xl text-white w-full mb-8  ">
            Blogs
          </h1>
          <h3 className="text-xl lg:text-3xl mt-2 font-normal ">
            See what people have to say about us!
          </h3>
        </div>
        <div className="flex md:px-[10%] px-[2%] w-full  mt-[5vh] max-h-[40vh] ">
          <h3 className="text-white text-xl  w-1/6  ">Latest</h3>
          {/* @ts-ignore */}
          <Swiper {...SwipperParams} className="flex-1">
            {mainBlogs.slice(latestIndex, 9).map((blog, index) => {
              return (
                <SwiperSlide key={blog.slug}>
                  <BlogCard blog={blog} key={blog.slug} />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="flex items-center  black mt-[12vh] w-1/6 ">
            <div className="flex items-center ">
              <div className=" hidden lg:w-16 lg:block  border border-b-[1px]  border-gray-500 " />
              <h1
                className={`${
                  latestIndex === LATESTINDEX.ONE
                    ? 'text-3xl text-black '
                    : 'text-gray-500'
                } font-bold  lg:ml-4 ml-1 `}
                onClick={() => setLatestIndex(LATESTINDEX.ONE)}
              >
                01
              </h1>
              <h1
                className={`${
                  latestIndex === LATESTINDEX.TWO
                    ? ' text-2xl  md:text-3xl text-black '
                    : 'text-gray-500'
                } font-bold  lg:ml-4 ml-1  `}
                onClick={() => setLatestIndex(LATESTINDEX.TWO)}
              >
                02
              </h1>
              <h1
                className={`${
                  latestIndex === LATESTINDEX.THREE
                    ? ' text-2xl md:text-3xl text-black '
                    : 'text-gray-500'
                } font-bold  lg:ml-4 ml-1  `}
                onClick={() => setLatestIndex(LATESTINDEX.THREE)}
              >
                03
              </h1>
            </div>
          </div>
        </div>
      </div>
    </PageHero>
  );
};

export default PageHero;
