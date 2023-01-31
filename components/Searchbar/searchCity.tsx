import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import SearchfilterIcon from '../../assets/svg/searchfiltericon.svg';
import DropdownIcon from '../../assets/svg/dropdownicon.svg';
const Cities = [
  {
    name: 'Austin',
    slug: 'austin-tours',
    type: 'usa'
  },
  {
    name: 'Niagara Falls, USA',
    slug: 'niagara-falls-usa-tours',
    type: 'usa'
  },
  {
    name: 'Saint John',
    slug: 'saint-john-tours',
    type: 'canada'
  },
  {
    name: 'Philadelphia',
    slug: 'philadelphia-tours',
    type: 'usa'
  },
  {
    name: 'Victoria',
    slug: 'victoria-tours',
    type: 'canada'
  },
  {
    name: 'Prince Edward Island',
    slug: 'prince-edward-island-tours',
    type: 'canada'
  },
  {
    name: 'Niagara Falls, Canada',
    slug: 'niagara-falls-tours-canada',
    type: 'canada'
  },
  {
    name: 'Providence',
    slug: 'providence-tours',
    type: 'usa'
  },
  {
    name: 'Fort Lauderdale',
    slug: 'Fort-Lauderdale-Tours',
    type: 'usa'
  },
  {
    name: 'Newport',
    slug: 'newport-tours,',
    type: 'usa'
  },
  {
    name: 'Ottawa',
    slug: 'ottawa-tours',
    type: 'canada'
  },
  {
    name: 'Vancouver',
    slug: 'vancouver-tours',
    type: 'canada'
  },
  {
    name: "St. John's",
    slug: 'st-johns-tours',
    type: 'canada'
  },
  {
    name: 'Sydney, Nova Scotia',
    slug: 'sydney-tours',
    type: 'canada'
  },
  {
    name: 'Seattle',
    slug: 'seattle-tours',
    type: 'usa'
  },
  {
    name: 'Key West',
    slug: 'keywest-tours',
    type: 'usa'
  },
  {
    name: 'Montreal',
    slug: 'montreal-tours'
  },
  {
    name: 'San Antonio',
    slug: 'san-antonio-tours',
    type: 'canada'
  },
  {
    name: 'Toronto',
    slug: 'toronto-tours,',
    type: 'canada'
  },
  {
    name: 'Miami',
    slug: 'miami-tours',
    type: 'usa'
  },
  {
    name: 'Boston',
    slug: 'boston-tours',
    type: 'usa'
  },
  {
    name: 'Halifax',
    slug: 'halifax-tours,',
    type: 'canada'
  },
  {
    name: 'Chicago',
    slug: 'chicago-tours',
    type: 'usa'
  },
  {
    name: 'Savannah Tours',
    slug: 'savannah-tours',
    type: 'usa'
  }
];
const SearchInputStyle = styled.div`
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const SearchButtonStyle = styled.button`
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const SearchCity = () => {
  const [city, setCity] = useState<string>('');
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const router = useRouter();
  const searchFilter = Cities.filter(cty =>
    cty.name.toLowerCase().includes(city.toLowerCase())
  );

  console.log('dropdowntoggle:', dropdownToggle);
  console.log('searchfilter:', searchFilter);
  const SubmitHandler = (e: any) => {
    e.preventDefault();
    console.log('submit call');
    // console.log('city:', city);
    const FilterdCity = Cities.find(cty => cty.name === city);
    if (FilterdCity) {
      return router.push(FilterdCity.slug);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setDropdownToggle(false);
  };
  return (
    <section
      id="search-filter"
      className="bg-[#FFFFFF] absolute top-[95%] bg-transparent w-[100%]"
    >
      <div className="w-[40%] mx-auto relative z-50 ">
        <form onSubmit={SubmitHandler}>
          <SearchInputStyle className="flex items-center bg-[#E1E1E1]">
            <div
              className="flex items-center w-[76%] hover:cursor-pointer"
              onClick={() => setDropdownToggle(!dropdownToggle)}
            >
              <div className="px-2 py-2 flex-none w-[8%]">
                <SearchfilterIcon />
              </div>
              <div className="bg-[#E1E1E1] flex-none w-[84%]">
                <input
                  name="search"
                  id="search"
                  value={city}
                  onChange={onChange}
                  placeholder="Search by City"
                  required
                  className="py-5 bg-[#E1E1E1] w-[100%] focus:outline-none placeholder:text-[16px] placeholder:font-[400] placeholder:text-[#7C7C7C]"
                />
              </div>
              <div className="flex-none w-[8%] ">
                <DropdownIcon />
              </div>
            </div>

            <div className="flex-none w-[24%]">
              <SearchButtonStyle className="text-[18px] w-[100%] text-white font-[400] bg-[#F15C5A] py-5 px-8">
                Search
              </SearchButtonStyle>
            </div>
          </SearchInputStyle>
        </form>

        {/*////////////// suggested menu//////////////////// */}
        {dropdownToggle && (
          <div
            id="suggested-menu"
            className="flex w-[76%] gap-6 py-2 bg-[#FFFFFF] rounded-b-[15px]"
          >
            <div className="px-5">
              <h1 className="text-[#0B0A0A] text[18px] font-[700]">Canada</h1>
              {Cities.filter(cty => cty.type === 'canada').map((cty: any) => (
                <div id="browsers" key={cty.name}>
                  <div
                    onClick={() => setCity(cty.name)}
                    className="text-[16px] font-[400] cursor-pointer hover:bg-slate-300"
                  >
                    {cty.name}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5">
              <h1 className="text-[#0B0A0A] text[18px] font-[700]">USA</h1>
              {Cities.filter(cty => cty.type === 'usa').map((cty: any) => (
                <div id="browsers" key={cty.name}>
                  <div
                    onClick={() => setCity(cty.name)}
                    className="text-[ #0B0A0A] text-[16px] font-[400] cursor-pointer hover:bg-slate-300"
                  >
                    {cty.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* filtered menu */}
        {!dropdownToggle && city.length > 0 && (
          <div
            id="filtered-menu"
            className="flex flex-col w-[76%] bg-[#FFFFFF] rounded-b-[15px]"
          >
            {searchFilter.map((cty: any) => (
              <div key={cty.name}>
                <div
                  onClick={() => setCity(cty.name)}
                  className="hover:cursor-pointer px- py-2"
                >
                  {cty.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchCity;
