/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import SearchfilterIcon from '../../assets/svg/searchfiltericon.svg';
import DropdownIcon from '../../assets/svg/dropdownicon.svg';

interface SearchProps {
  isOpen: boolean;
}
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
    slug: 'newport-tours',
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
    slug: 'toronto-tours',
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
    slug: 'halifax-tours',
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
const SearchInputStyle = styled.div<SearchProps>`
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: ${props => (props.isOpen ? 'none' : '15px')};
`;
const SearchButtonStyle = styled.button`
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const SearchFilterItem = styled.li<StyledProps>`
  background-color: ${props => (props.isHover ? 'gray' : 'none')};
`;
interface KeyProps {
  key: any;
}
interface StyledProps {
  isHover: boolean;
}

const SearchCity = () => {
  const [city, setCity] = useState<string>('');
  const [suggestedToggle, setSuggestedToggle] = useState(false);
  const [filterToggle, setFilterToggle] = useState(false);
  const [focusIndex, setFocusIndex] = useState(-1);
  const [cityNameErr, setCityNameErr] = useState<string>('');
  const resultContainer = useRef<HTMLLIElement>(null);
  const router = useRouter();

  const searchFilter = Cities.filter(cty =>
    cty.name.toLowerCase().includes(city.toLowerCase())
  );

  useEffect(() => {
    if (!resultContainer.current) return;
    resultContainer.current.scrollIntoView({
      block: 'center'
    });
  }, [focusIndex]);

  const SubmitHandler = (e: any) => {
    e.preventDefault();

    const validCity = Cities.find(cty => cty.name === city);
    if (validCity) {
      return router.push(validCity.slug);
    } else {
      setCityNameErr('Please search valid city');
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setSuggestedToggle(false);
    setCityNameErr('');
    if (e.target.value.length > 0) {
      setSuggestedToggle(false);
      setFilterToggle(true);
    }
    if (e.target.value.length === 0) {
      // setSuggestedToggle(false);
      setFilterToggle(false);
      setCityNameErr('');
    }
  };

  const handleSelection = (selectedIndex: number) => {
    const selectedItem = searchFilter[selectedIndex];
    if (!selectedItem) return resetSearchComplete();
    setCity(selectedItem.name);
    setFilterToggle(false);
    resetSearchComplete();
  };

  const HandleSuggestionClick = (city: string) => {
    setCity(city);
    setSuggestedToggle(false);
  };

  const resetSearchComplete = useCallback(() => {
    setFocusIndex(-1);
  }, []);
  //handle keys

  const Keyshandler: React.KeyboardEventHandler<HTMLDivElement> = e => {
    const { key } = e;
    let nextCount = 0;
    if (key == 'ArrowDown') nextCount = (focusIndex + 1) % searchFilter.length;
    if (key == 'ArrowUp')
      nextCount = (focusIndex + searchFilter.length - 1) % searchFilter.length;
    if (key == 'Enter') {
      handleSelection(focusIndex);
    }
    setFocusIndex(nextCount);
  };
  return (
    <section
      id="search-filter"
      className="bg-[#FFFFFF] absolute xxsm:top-[95%] md:top-[93%] lg:top-[92%] bg-transparent w-[100%]"
    >
      <div
        tabIndex={0}
        onKeyDown={Keyshandler}
        className=" w-3/4 lg:w-2/5   mx-auto relative z-50 "
        onMouseLeave={() => {
          setSuggestedToggle(false);
          setFilterToggle(false);
        }}
      >
        <form onSubmit={SubmitHandler}>
          <SearchInputStyle
            isOpen={suggestedToggle || filterToggle}
            className="flex items-center bg-[#E1E1E1]"
          >
            <div className="flex justify-between items-center w-[70%] md:w-[75%] hover:cursor-pointer">
              <div className="ml-3 flex-none w-[10%] xsm:w-[10%] sm:w-[5%] lg:w-[4%]">
                <SearchfilterIcon />
              </div>
              <div className="bg-[#E1E1E1] flex-none w-[56%] xsm:w-[75%] sm:w-[75%] md:w-[80%] lg:w-[80%] pl-2 xxsm:rounded-[54px] md:rounded-none">
                <input
                  name="search"
                  id="search"
                  value={city}
                  onChange={onChange}
                  placeholder=" City"
                  autoComplete="off"
                  className="py-2  md:py-5 bg-[#E1E1E1] text-[10px] md:text-[16px] lg:text-[18px] w-[100%] focus:outline-none placeholder:text-[12px] md:placeholder:text-[16px] placeholder:font-[400] placeholder:text-[#7C7C7C]"
                />
              </div>
              <div
                className={`flex-none py-2 justify-center items-center w-[10%] lg:w-[8%] ${
                  suggestedToggle && 'rotate-180'
                } `}
                onClick={() => {
                  setSuggestedToggle(!suggestedToggle);
                  setFilterToggle(false);
                  setCityNameErr('');
                }}
              >
                <DropdownIcon />
              </div>
            </div>

            <div className="flex-none w-[30%] md:w-[25%]">
              <SearchButtonStyle className="text-[12px] md:text-lg   w-[100%] text-white font-[400] bg-[#F15C5A] xxsm:py-3 md:py-5 lg:px-6">
                Search
              </SearchButtonStyle>
            </div>
          </SearchInputStyle>
        </form>

        {/*////////////// suggested menu//////////////////// */}
        {cityNameErr.length > 0 && (
          <p className="text-red-400">{cityNameErr}</p>
        )}
        {suggestedToggle && (
          <div
            id="suggested-menu"
            className="flex  w-[97%] md:w-[76%] shadow-2xl  xxsm:px-3 md:px-1  md:gap-5 lg:gap-6 py-2 bg-[#FFFFFF] rounded-b-[15px] max-h-[250px] xsm:max-h-[300px] absolute top-[100%] overflow-auto z-50"
          >
            <div className=" w-[50%]    px-1 xsm:px-3 sm:px-5">
              <h2 className="text-[#0B0A0A] text[18px] font-[700]">Canada</h2>
              {Cities.filter(cty => cty.type === 'canada').map((cty: any) => (
                <div id="browsers" key={cty.name}>
                  <div
                    onClick={() => HandleSuggestionClick(cty.name)}
                    className="text-[12px] xsm:text-[14px] md:text-[15px] lg:text-[16px] md:py-1 lg:py-2 font-[400] cursor-pointer hover:bg-slate-300"
                  >
                    {cty.name}
                  </div>
                </div>
              ))}
            </div>
            <div className=" flex-none w-[50%]  px-1 xsm:px-3 sm:px-5">
              <h2 className="text-[#0B0A0A] text[18px] font-[700]">USA</h2>
              {Cities.filter(cty => cty.type === 'usa').map((cty: any) => (
                <div id="browsers" key={cty.name}>
                  <div
                    onClick={() => HandleSuggestionClick(cty.name)}
                    className="text-[ #0B0A0A] text-[12px] xsm:text-[14px] md:text-[15px] lg:text-[16px]  md:py-1 lg:py-2  font-[400] cursor-pointer hover:bg-slate-300"
                  >
                    {cty.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* filtered menu */}
        {!suggestedToggle && filterToggle && (
          <div
            id="filtered-menu"
            className="flex flex-col  shadow-2xl w-[65%] xsm:w-[65%] sm:w-[65%] md:w-[76%] bg-[#FFFFFF] rounded-b-[15px] max-h-[300px] overflow-y-auto absolute top-[100%] overflow-x-hidden"
          >
            {searchFilter.map((cty: any, index: number) => (
              <ul key={cty.name}>
                <SearchFilterItem
                  isHover={index === focusIndex}
                  ref={index === focusIndex ? resultContainer : null}
                  onMouseDown={() => handleSelection(index)}
                  onClick={() => setCity(cty.name)}
                  className="hover:cursor-pointer px-3 py-2"
                >
                  {cty.name}
                </SearchFilterItem>
              </ul>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchCity;
