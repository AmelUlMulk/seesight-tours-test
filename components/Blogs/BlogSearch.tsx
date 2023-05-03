import Image from 'next/image';
import SearchFilterIcon from '../../assets/svg/searchfiltericon.svg';
import { SetStateAction, useState } from 'react';

interface IProps {
  blogs: any;
  blogsCategories: any;
  filterBlogs: Array<Record<string, unknown>> | undefined;
  setFilterBlog: React.Dispatch<
    SetStateAction<Array<Record<string, unknown>> | undefined>
  >;
}
const BlogSearch = ({ blogsCategories, blogs }: IProps) => {
  const [searchBlog, setSearchBlog] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<string | undefined>();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBlog(e.target.value);
  };

  const handleClick = (ctgSlug: string) => {
    console.log(ctgSlug);
    // if (ctgSlug) {
    //   const filterCtg = blogs.filter(
    //     (blog: Record<string, any>) => blog?.blogCategories[0]?.slug === ctgSlug
    //   );
    //   console.log('filterCtg', filterCtg);
    // }
  };
  console.log('blogs', blogs);

  return (
    <div id="categories">
      <div className="flex bg-[#F9F9F9] border border-solid px-2 py-3">
        <div>SICON</div>
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
