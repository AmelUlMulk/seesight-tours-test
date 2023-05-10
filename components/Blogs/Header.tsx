import Image from 'next/image';
import { BLOG_PAGE_INTERFACE } from '../../api/blogsPage';
import { useState } from 'react';
import Link from 'next/link';
import { useMediaQuery } from '../../hooks/mediaQuery';

interface IProps {
  blogs: any;
}

interface SliderObj {
  slid1: number;
  slide2: number;
  slider3: number;
}

const sliderObj: SliderObj = {
  slid1: 0,
  slide2: 3,
  slider3: 6
};

const BlogsHeader = ({ blogs }: IProps) => {
  const [sliderCount, setSliderCount] = useState(0);
  const mediaQuery1 = useMediaQuery(1024);
  const mediaQuery2 = useMediaQuery(768);
  const sliderLimit = mediaQuery1 ? (mediaQuery2 ? 1 : 2) : 3;
  console.log(sliderCount);
  return (
    <div
      id="blog-header"
      className="w-5/6 mx-auto flex justify-center  relative -mt-20 z-[500]"
    >
      <div id="latest" className="align-top w-[20%] md:w-[15%] ">
        <h3 className="text-white text-sm md:text-base ">Latest</h3>
      </div>
      <div className="w-[45%] md:w-4/5 lg:w-3/4 items-start  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {blogs
          .slice(sliderCount, sliderCount + sliderLimit)
          .map((blog: Record<string, any>, index: number) => (
            <div key={index} className="w-full h-full">
              <Link href={`/blog/${blog.slug}`}>
                <div className="h-1/2">
                  <Image
                    src={blog.heroMedia[0].url}
                    width={550}
                    height={300}
                    quality={100}
                    alt={blog.heroMedia[0].url}
                    className=" max-h-[250px] min-h-[135px] h-full rounded-md "
                  />
                </div>
                <p className="text-[#495057] text-xs font-light mt-3">
                  {blog.publicationDate}
                </p>
                <h3 className="text-sm md:text-base font-medium mt-3">
                  {blog.header}
                </h3>
                <p className="text-[#495057] text-xs font-light mt-3">{`By ${blog.author}`}</p>
              </Link>
            </div>
          ))}
      </div>
      <div
        id="slider-btn"
        className="flex items-center w-[30%]  md:w-[20%] pl-3 lg:pl-5"
      >
        <div className="text-black mr-2 lg:mr-5 pb-2">
          <Image
            src="/Divider Line.svg"
            width={40}
            height={40}
            alt="divider line"
          />
        </div>
        <div id="slider" className="items-end grid grid-cols-3 gap-3">
          {Object.keys(sliderObj).map((key: string, index: number) => (
            <button
              key={key}
              className={` text-xs ${
                sliderCount === sliderObj[key as keyof SliderObj]
                  ? 'font-bold scale-[1.2] md:scale-[2] text-[#495057] '
                  : 'font-light  text-[#C4C4C4]'
              } transition-transform duration-500 ease-in`}
              onClick={() => setSliderCount(sliderObj[key as keyof SliderObj])}
            >
              {`0${index + 1}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsHeader;
