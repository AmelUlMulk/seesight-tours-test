import Image from 'next/image';
import SearchFilterIcon from '../../assets/svg/searchfiltericon.svg';
import { RefObject, SetStateAction, useEffect, useRef, useState } from 'react';

interface IProps {
  blogs: any;
  blogsCategories: any;
  setFilterBlog: React.Dispatch<SetStateAction<Array<Record<string, unknown>>>>;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
  blogsRef: RefObject<HTMLDivElement>;
}
const BlogSearch = ({
  blogsCategories,
  blogs,
  setFilterBlog,
  setCurrentPage,
  blogsRef
}: IProps) => {
  const [searchBlog, setSearchBlog] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<string | undefined>();

  const [focusIndex, setFocusIndex] = useState(-1);
  const resultContainer = useRef<HTMLDivElement>(null);

  const searchFilter = blogsCategories?.filter(
    (blog: Record<string, any>) =>
      searchBlog !== '' &&
      blog.slug.toLowerCase().includes(searchBlog.toLowerCase())
  );

  useEffect(() => {
    if (!resultContainer.current) return;
    resultContainer.current.scrollIntoView({
      block: 'center'
    });
  }, [focusIndex]);

  const Keyshandler: React.KeyboardEventHandler<HTMLDivElement> = e => {
    const { key } = e;
    let nextCount = 0;
    if (key == 'ArrowDown')
      nextCount = (focusIndex + 1) % blogsCategories.length;
    if (key == 'ArrowUp')
      nextCount =
        (focusIndex + blogsCategories.length - 1) % blogsCategories.length;
    if (key == 'Enter') {
      handleSelection(focusIndex);
    }
    setFocusIndex(nextCount);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBlog(e.target.value);
  };

  const handleSelection = (focusIndx: number) => {
    const categorySlug = searchFilter[focusIndex].slug;
    handleClick(categorySlug);
    setSearchBlog('');
    blogsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    if (filteredData) setCurrentPage(0);
    setFilterBlog(filteredData);
  };

  return (
    <div id="categories">
      <div
        onKeyDown={Keyshandler}
        className="relative z-50 flex items-center bg-[#F9F9F9] border border-solid px-2 py-3"
      >
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
          className="bg-[#F9F9F9] ml-2 outline-none"
        />
        <div className="absolute top-full left-0 w-full bg-[#F9F9F9] border border-solid">
          {searchFilter.length > 0 &&
            searchFilter.map((blogCtg: any, index: number) => (
              <ul key={blogCtg.id}>
                <div
                  className={`hover:cursor-pointer px-3 py-2 ${
                    index === focusIndex ? 'bg-slate-400' : 'none'
                  }`}
                  ref={index === focusIndex ? resultContainer : null}
                >
                  {blogCtg.title}
                </div>
              </ul>
            ))}
        </div>
      </div>

      <div className="bg-[#F9F9F9] border border-solid px-2 py-3 mt-5 text-center">
        Categories
      </div>
      <div className="bg-[#F9F9F9] border border-solid max-h-[480px] overflow-auto">
        <div
          className="pl-5 py-1 cursor-pointer"
          onClick={() => {
            blogsRef.current?.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            handleClick('');
          }}
        >
          Show All
        </div>
        {blogsCategories.map((ctg: Record<string, any>) => (
          <div
            onClick={() => {
              blogsRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
              handleClick(ctg.slug);
            }}
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
