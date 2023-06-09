import { useState, useEffect } from 'react';
import FeaturedNavSection from './FeaturedNavSec';
import { useLazyQuery, useQuery } from '@apollo/client';
import DropdownIcon from '../../assets/svg/Vector 21.svg';
import { CITIES_FILTER, CITY_FILTER_INTERFACE } from '../../api/cityfilter';
import FEATUREDEXPERIENCES, {
  FEATURED_EXPERIENCES_INTERFACE
} from '../../api/featuredexperiences';
import { HOMEPAGEINTERFACE } from '../../api/homePage';
import TourCard from '../Tour/tourCard';
import { PAGE_OPTIONS } from '../Trust/Trustbar';
import ChevronRightIcon from './components/ChevronRightIcon';

const arr = [
  {
    filterClass: 'allThings',
    filterName: 'All Things To Do'
  },
  {
    filterClass: 'dayTours',
    filterName: 'Day Tours'
  },
  {
    filterClass: 'multiday',
    filterName: 'Multi Day Tours'
  }
];

interface IProps {
  featuredExp: any;
  citydropdown: any;
}
const FeaturedExperiences = ({ featuredExp, citydropdown }: IProps) => {
  const [activeNav, setActiveNav] = useState('allThings');
  const [showAll, setShowAll] = useState(false);
  const [showlimit, setShowlimit] = useState(6);
  const [city, setCity] = useState<any>('All Cities');
  const [cityToggle, setCityToggle] = useState<boolean>(false);
  const [navArray, setNavArray] = useState<any>(arr);
  const [featuredExperienceData, setFeaturedExperienceData] = useState<
    FEATURED_EXPERIENCES_INTERFACE | HOMEPAGEINTERFACE | any
  >([]);

  //FETCHING QUERIES

  //fetch day & multiday
  const [fetchTourType, { data: tourData, loading: tourFilterLoading, error }] =
    useLazyQuery<FEATURED_EXPERIENCES_INTERFACE>(FEATUREDEXPERIENCES);

  //fetch by city
  const [
    cityFilteredTours,
    {
      data: { cities: [filteredCity] = [] } = {} as CITY_FILTER_INTERFACE,
      loading: cityFilterLoading,
      error: cityFitlerError
    }
  ] = useLazyQuery<CITY_FILTER_INTERFACE>(CITIES_FILTER);

  //USEFFECTS()

  //useffect-1
  useEffect(() => {
    filteredCity && setFeaturedExperienceData(filteredCity);
  }, [filteredCity]);

  //useffect-2
  useEffect(() => {
    if (activeNav !== 'allThings') {
      try {
        fetchTourType({
          variables: {
            dayTours: true,

            multiday: true,
            airportTransfers: false
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [activeNav]);

  //useffect-3
  useEffect(() => {
    setFeaturedExperienceData(tourData?.homePage);
  }, [tourData]);

  //useffect-4
  useEffect(() => {
    const finalNavArray: Array<Record<string, any>> = [];
    let flag = true;
    arr.forEach(item => {
      finalNavArray.push(item);
    });

    if (city === 'All Cities') {
      setNavArray(arr);
      setFeaturedExperienceData(tourData?.homePage);
    } else {
      setNavArray(finalNavArray);
      finalNavArray?.forEach(item => {
        if (item.filterClass == activeNav) {
          flag = false;
        }
      });
      if (flag) {
        setActiveNav('allThings');
      }
    }
  }, [city, activeNav]);

  //usefffect-5
  useEffect(() => {
    cityFilteredTours({
      variables: {
        filter: {
          name: city
        }
      }
    });
  }, [city, cityFilteredTours]);

  //FUNCTIONS
  const Drop_Down_options = () => {
    const options: Array<Record<string, unknown>> = [];
    const filteredCities = citydropdown ? citydropdown : [];
    filteredCities?.forEach((obj: Record<string, unknown>) => {
      options.push({ value: [obj.name], label: [obj.name] });
    });

    return options.sort((a: any, b: any) => {
      const x = a.label[0].toUpperCase();
      const y = b.label[0].toUpperCase();
      return x === y ? 0 : x > y ? 1 : -1;
    });
  };
  const sortedCities = Drop_Down_options();
  const showActiveNav = () => {
    if (activeNav === 'allThings') return 'All Things To Do';
    else if (activeNav === 'dayTours') return 'Day Tours';
    else if (activeNav === 'multiday') return 'Multi Day Tours';
    else if (activeNav === 'airportTransfers') return 'Airport Transfer';
  };

  const displayProduct = () => {
    const filteredProduct = featuredExperienceData
      ? featuredExperienceData[activeNav]
      : city === 'All Cities'
      ? featuredExp[activeNav]
      : [];
    console.log('filterProduct:', filteredProduct);
    console.log('filterCity:', filteredCity);

    if (city !== 'All Cities' && cityFilterLoading) {
      return <h3>Loading...</h3>;
    }
    if (tourFilterLoading) {
      return <h3>Loading...</h3>;
    }
    if (filteredProduct && filteredProduct?.length === 0) {
      return <h3>{`Tours coming to ${city} soon`}</h3>;
    }
    // prevent null & duplicate items
    const uniquefilteredProduct = filteredProduct
      ?.filter((item: Record<string, any>) => item.product !== null)
      .reduce((acc: Record<string, any>, curr: Record<string, any>) => {
        const isdup = acc.find((item: any) => {
          if (item.product.id) return item.product.id === curr.product.id;
        });
        if (!isdup) {
          return acc.concat([curr]);
        } else {
          return acc;
        }
      }, []);
    return uniquefilteredProduct
      ?.slice(0, showAll ? filteredProduct?.length : 6)
      .map((product: Record<string, any>, index: number) => {
        return (
          <TourCard
            key={index}
            product={product?.product}
            productType={
              Number(product?.duration) > 24
                ? PAGE_OPTIONS.MULTIDAY_TOUR_PAGE
                : PAGE_OPTIONS.DAY_TOUR_PAGED
            }
          />
        );
      });
  };
  const showProduct = () => {
    let selectedNav = '';
    const selectNum = filteredCity
      ? //@ts-ignore
        filteredCity[activeNav]?.length
      : featuredExp[activeNav]?.length;
    if (activeNav === 'allThings') {
      selectedNav = 'All Things To Do';
    }
    if (activeNav === 'dayTours') {
      selectedNav = 'All Day Tours ';
    }
    if (activeNav === 'multiday') {
      selectedNav = 'All Multi Day Tours';
    }
    if (activeNav === 'airportTransfers') {
      selectedNav = 'All Airport Transfer';
    }
    if (!showAll) {
      return (
        <div className="mx-10 sm:mx-20 md:mx-20 lg:mx-32 2xl:mx-40 flex justify-end pt-3 pb-10 border-b border-[#C5C5C5]">
          {selectNum > 6 && (
            <div
              onClick={() => setShowAll(true)}
              className="cursor-pointer flex items-center"
            >
              {/* <h2 className="text-sky-500 text-3xl font-[600]">{`See ${selectedNav} (${selectNum})`}</h2> */}
              <h2 className="text-[20px] text-[#6D6D6D] font-[400] cursor-pointer">
                See More
              </h2>
              {/* <ChevronRightIcon className="text-5xl text-sky-500 pt-2" /> */}
            </div>
          )}
        </div>
      );
    }
    if (showAll) {
      return (
        <div className=" lg:px-36 2xl:px-60 flex justify-end mt-10 ">
          <div onClick={() => setShowAll(false)} className="cursor-pointer">
            <h2 className="text-[20px] text-[#6D6D6D] font-[400] cursor-pointer">
              Show Less
            </h2>
          </div>
        </div>
      );
    }
  };

  return (
    <section id="feature_experiences">
      <header
        id="feature_experience_header"
        className="lg:flex items-center mt-3 lg:mt-10 mx-3 xsm:mx-5 sm:mx-8 md:mx-10 lg:mx-32 2xl:mx-40"
      >
        <FeaturedNavSection
          currNav={activeNav}
          setActiveNav={setActiveNav}
          navData={navArray}
        />
        <div
          id="featured_dropdown"
          className=" w-[60%] xsm:w-[70%] sm:w-[55%] lg:w-[35%]  ml-auto mr-[8%] xsm:mr-[5%] sm:mr-[8%] md:mr-[5%] lg:mr-0  lg:flex-none  "
        >
          <div
            id="city_dropDown"
            className="xxsm:flex xxsm:justify-end lg:flex items-center "
          >
            <p className="flex-none pr-2 xl:pr-3 text-justify text-[10px]  sm:text-[14px]  lg:text-[16px] 2xl:text-[20px] font-[400] text-[#6D6D6D]">{`Show ${showActiveNav()} in:`}</p>
            <div
              id="dropdown"
              onMouseLeave={() => {
                if (cityToggle) return setCityToggle(!cityToggle);
              }}
              className="flex-none w-[48%] xsm:w-[40%] sm:w-[44%] lg:w-[46%] 2xl:w-[35%] 3xl:w-[30%] relative "
            >
              <button
                onClick={() => setCityToggle(!cityToggle)}
                className={
                  cityToggle
                    ? ' flex justify-between items-center border-[1px] border-[#F15C5A] rounded-[8px] sm:rounded-[10px] w-[100%] xxsm:px-1 xsm:px-2  sm:px-5 lg:px-2 2xl:px-6 xxsm:py-1 lg:py-1  xxsm:text-[10px] sm:text-[14px]  md:text-[16.92px] text-[#333333] font-[400]'
                    : ' flex justify-between items-center border-[1px] border-[#4F4F4F] rounded-[8px] sm:rounded-[10px] w-[100%] xxsm:px-1 xsm:px-2  sm:px-5 lg:px-2 2xl:px-6 xxsm:py-1 lg:py-1 xxsm:text-[10px] sm:text-[14px]  md:text-[16.92px] text-[#333333] font-[400]'
                }
              >
                {city}
                <span className="pl-3">
                  <DropdownIcon />
                </span>
              </button>
              {cityToggle && (
                <div
                  id="dropdown_list"
                  className={` border-1 border-slate-500 absolute right-0 z-50 w-[100%] h-[400px] overflow-y-scroll `}
                >
                  <div
                    className="px-3 py-1 border-[1px] border-slate-3
                00 hover:bg-slate-300 cursor-pointer bg-white"
                    onClick={() => setCity('All Cities')}
                  >
                    All Cities
                  </div>
                  {sortedCities.map((opt: Record<string, any>, index) => {
                    return (
                      <div
                        className="border-[1px] border-slate-3
                00 px-3 py-1 bg-white cursor-pointer hover:bg-slate-300 z-[5000] "
                        key={opt.label}
                        onClick={() => {
                          setCity(opt.label[0]);
                          setCityToggle(false);
                        }}
                      >
                        {opt.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div
        id="feature_experiences_cards"
        className=" mt-2 lg:mt-3 mx-10 sm:mx-20 md:mx-20 lg:mx-32 2xl:mx-40 bg-[#F5F5F5]"
      >
        <div className="grid xxsm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
          {displayProduct()}
        </div>
      </div>
      {showProduct()}
      {/* <div className="w-[83%] mx-auto border border-t-[#C5C5C5]" /> */}
    </section>
  );
};

export default FeaturedExperiences;
