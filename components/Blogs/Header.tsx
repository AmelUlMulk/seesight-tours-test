import Image from 'next/image';
import { BLOG_PAGE_INTERFACE } from '../../api/blogsPage';
import { useState } from 'react';
import Link from 'next/link';

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
  slide2: 1,
  slider3: 2
};

const BlogsHeader = ({ blogs }: IProps) => {
  const [sliderCount, setSliderCount] = useState(0);

  return (
    <div
      id="blog-header"
      className="w-5/6 mx-auto flex relative -mt-20 z-[500]"
    >
      <div id="latest" className="align-top">
        <h2 className="text-white text-2xl">Latest</h2>
      </div>
      <div className="w-3/5 mx-auto grid grid-cols-3 gap-5 ">
        {blogs
          .slice(sliderCount, sliderCount + 3)
          .map((blog: Record<string, any>, index: number) => (
            <div key={index}>
              <Link href={`/blog/${blog.slug}`}>
                <div>
                  <Image
                    src={blog.heroMedia[0].url}
                    width={550}
                    height={300}
                    alt={blog.heroMedia[0].url}
                    className="h-[200px] rounded-sm  object-cover"
                  />
                </div>
                <p className="text-[#495057] text-xs font-light">
                  {blog.publicationDate}
                </p>
                <h3 className="text-base font-medium">{blog.header}</h3>
                <p className="text-[#495057] text-xs font-light">{`By ${blog.author}`}</p>
              </Link>
            </div>
          ))}
      </div>
      <div className="flex pb-16">
        <div className="text-black">
          <Image
            src="/Divider Line.svg"
            width={40}
            height={40}
            alt="divider line"
          />
        </div>
        <div id="slider" className="items-end grid grid-cols-3 gap-5">
          {Object.keys(sliderObj).map((key: string, index: number) => (
            <button
              key={key}
              className={`text-[#34373a] ${
                sliderCount === sliderObj[key as keyof SliderObj]
                  ? 'text-2xl'
                  : 'text-xs'
              } ${
                sliderCount === sliderObj[key as keyof SliderObj]
                  ? 'font-bold'
                  : 'font-light'
              } text-[#C4C4C4]`}
              onClick={() => setSliderCount(sliderObj[key as keyof SliderObj])}
            >
              {`0${sliderObj[key as keyof SliderObj] + 1}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsHeader;
