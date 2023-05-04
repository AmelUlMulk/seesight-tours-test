import Image from 'next/image';
import SearchFilterIcon from '../../assets/svg/searchfiltericon.svg';
import { SetStateAction, useState } from 'react';

interface IProps {
  blogs: any;
  blogsCategories: any;
  setFilterBlog: React.Dispatch<SetStateAction<Array<Record<string, unknown>>>>;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}
const BlogSearch = ({
  blogsCategories,
  blogs,
  setFilterBlog,
  setCurrentPage
}: IProps) => {
  const [searchBlog, setSearchBlog] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<string | undefined>();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBlog(e.target.value);
  };

  const handleClick = (ctgSlug: string) => {
    const filteredData =
      ctgSlug !== undefined
        ? blogs.filter((blog: Record<string, any>) => {
            const isPresent = blog?.blogCategories?.filter((item: any) =>
              item?.slug?.includes(ctgSlug)
            );
            if (isPresent.length > 0) return blog;
          })
        : blogs;
    console.log('filterData:', filteredData);
    if (filteredData) setCurrentPage(0);
    setFilterBlog(filteredData);
  };
  console.log('blogs', blogs);

  return (
    <div id="categories">
      <div className="flex items-center bg-[#F9F9F9] border border-solid px-2 py-3">
        <div>
          <Image
            src="/SearchIcon.svg"
            width={15}
            height={15}
            alt="search blogs icon"
          />
        </div>
        <input
          type="text"
          value={searchBlog}
          onChange={onChangeHandler}
          placeholder="Search"
          className="bg-[#F9F9F9] ml-2"
        />
      </div>

      <div className="bg-[#F9F9F9] border border-solid px-2 py-3 mt-5 text-center">
        Categories
      </div>
      <div className="bg-[#F9F9F9] border border-solid max-h-[480px] overflow-auto">
        <div
          className="pl-5 py-1 cursor-pointer"
          onClick={() => handleClick('')}
        >
          Show All
        </div>
        {blogsCategories.map((ctg: Record<string, any>) => (
          <div
            onClick={() => handleClick(ctg.slug)}
            key={ctg.id}
            className="pl-5 py-1 cursor-pointer"
          >
            {ctg.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSearch;
