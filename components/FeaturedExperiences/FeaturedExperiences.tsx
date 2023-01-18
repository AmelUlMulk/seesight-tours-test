import { useState, useEffect } from 'react';
import FeaturedNavSection from './FeaturedNavSec';
import { useLazyQuery, useQuery } from '@apollo/client';
import { optimizeImage } from 'next/dist/server/image-optimizer';
import {
  CITIES_FILTER,
  CITY_FILTER_INTERFACE
} from '../../graphql_api/cityfilter';
import { FEATURED_EXPERIENCES_INTERFACE } from '../../graphql_api/featuredexperiences';
import { HOMEPAGEINTERFACE } from '../../graphql_api/homePage';
import TourCard from '../Tour/tourCard';
import { PAGE_OPTIONS } from '../Trust/Trustbar';
import ChevronRightIcon from './components/ChevronRightIcon';

let arr = [
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
  },
  {
    filterClass: 'airportTransfers',
    filterName: 'Airport Transfer'
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
  console.log('showAll:', showAll);
  // console.log('featuredExperienceData:', featuredExperienceData);
  /////////////////////////////FETCHING QUERIES//////////////////////////
  const [
    cityFilteredTours,
    {
      data: { cities: [filteredCity] = [] } = {} as CITY_FILTER_INTERFACE,
      loading: cityFilterLoading,
      error: cityFitlerError
    }
  ] = useLazyQuery<CITY_FILTER_INTERFACE>(CITIES_FILTER);
  //////////////////////////////////////
  // console.log('featuredExp', featuredExp);
  /////////////////USEFFECTS()/////////////////////////////////////////////

  useEffect(() => {
    filteredCity && setFeaturedExperienceData(filteredCity);
  }, [filteredCity]);

  useEffect(() => {
    let finalNavArray: Array<Record<string, any>> = [];
    let flag = true;
    arr.forEach(item => {
      finalNavArray.push(item);
    });

    if (city === 'All Cities') {
      setNavArray(arr);
      setFeaturedExperienceData(featuredExp);
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
  }, [featuredExperienceData, city, featuredExp, activeNav]);

  useEffect(() => {
    cityFilteredTours({
      variables: {
        filter: {
          name: city
        }
      }
    });
  }, [city, cityFilteredTours]);
  console.log('filtered city:', filteredCity);
  ///////////////////////////////////FUNCTIONS/////////////////////////////
  const Drop_Down_options = () => {
    let options: Array<Record<string, unknown>> = [];
    let filteredCities = citydropdown ? citydropdown : [];
    filteredCities?.forEach((obj: Record<string, unknown>) => {
      options.push({ value: [obj.name], label: [obj.name] });
    });

    return options.sort((a: any, b: any) => {
      let x = a.label[0].toUpperCase();
      let y = b.label[0].toUpperCase();
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
  /////////////////////////////Final Array////////////////////////
  let finalArray =
    filteredCity && featuredExperienceData
      ? featuredExperienceData[activeNav]
      : city === 'All Cities'
      ? featuredExp[activeNav]
      : [];
  console.log('final array:', finalArray);
  //////////////////////////////Final display functions////////////
  const displayProduct = () => {
    let filteredProduct =
      filteredCity && featuredExperienceData
        ? featuredExperienceData[activeNav]
        : city === 'All Cities'
        ? featuredExp[activeNav]
        : [];
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

    if (filteredProduct && filteredProduct.length === 0) {
      return <h3 className="No__Tour">{`Tours coming to ${city} soon`}</h3>;
    }
    return uniquefilteredProduct
      ?.slice(0, showAll ? filteredProduct.length : 6)
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
    let selectNum = filteredCity
      ? //@ts-ignore
        filteredCity[activeNav].length
      : featuredExp[activeNav].length;
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
        <div className="lg:px-36 2xl:px-60 flex justify-end mt-10">
          {selectNum > 6 && (
            <div
              onClick={() => setShowAll(true)}
              className="cursor-pointer flex items-center"
            >
              <h1 className="text-sky-500 text-3xl font-[600]">{`See ${selectedNav} (${selectNum})`}</h1>
              <ChevronRightIcon className="text-5xl text-sky-500 pt-2" />
            </div>
          )}
        </div>
      );
    }
    if (showAll) {
      return (
        <div className="lg:px-36 2xl:px-60 flex justify-end mt-10 ">
          <div onClick={() => setShowAll(false)} className="cursor-pointer">
            <h1 className="text-sky-500 text-3xl font-[600]">Show Less</h1>
          </div>
        </div>
      );
    }
  };
  return (
    <section id="feature_experiences">
      <header id="feature_experience_header">
        <FeaturedNavSection
          currNav={activeNav}
          setActiveNav={setActiveNav}
          navData={navArray}
        />
        <div className="featured_dropdown flex justify-between mt-10 lg:px-48 2xl:px-60">
          <div>
            <h1 className="text-3xl font-[600]">Featured Experiences</h1>
          </div>
          <div className="city_dropDown flex gap-3 pr-10">
            <p>{`Show ${showActiveNav()} in:`}</p>
            <div
              onMouseLeave={() => {
                if (cityToggle) return setCityToggle(!cityToggle);
              }}
              className="dropdown relative max-w-[210px] w-[210px] "
            >
              <button
                onClick={() => setCityToggle(!cityToggle)}
                className="border-[1px] border-slate-300 rounded-md w-[100%] py-2"
              >
                All Cities
              </button>
              {cityToggle && (
                <div className="dropdown_list border-1 border-slate-500 absolute right-0 z-50 w-[100%] h-[400px] overflow-scroll">
                  <div
                    className="px-5 py-1 border-[1px] border-slate-3
                00"
                    onClick={() => setCity('All Cities')}
                  >
                    All Cities
                  </div>
                  {sortedCities.map((opt: Record<string, any>, index) => {
                    return (
                      <div
                        className="border-[1px] border-slate-3
                00 px-3 py-1 bg-white cursor-pointer hover:bg-slate-300"
                        key={opt.label}
                        onClick={() => setCity(opt.label[0])}
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

      <div id="feature_experiences_cards" className="mt-10 lg:px-48 2xl:px-60">
        <div className="grid lg:grid-cols-3 lg:gap-[30px]">
          {displayProduct()}
        </div>
      </div>
      {showProduct()}
    </section>
  );
};

export default FeaturedExperiences;
