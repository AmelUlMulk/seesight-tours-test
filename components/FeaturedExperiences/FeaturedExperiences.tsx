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
  const [city, setCity] = useState<any>('All Cities');
  const [cityToggle, setCityToggle] = useState<boolean>(false);
  const [navArray, setNavArray] = useState<any>(arr);
  const [featuredExperienceData, setFeaturedExperienceData] = useState<
    FEATURED_EXPERIENCES_INTERFACE | HOMEPAGEINTERFACE | any
  >([]);
  console.log('featuredExperienceData:', featuredExperienceData);
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
  console.log('featuredExp', featuredExp);
  /////////////////USEFFECTS()/////////////////////////////////////////////

  useEffect(() => {
    if (city === 'All Cities') {
      setFeaturedExperienceData(featuredExp);
    }
  }, [featuredExperienceData, city, featuredExp]);

  useEffect(() => {
    filteredCity && setFeaturedExperienceData(filteredCity);
  }, [filteredCity]);

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
  let filteredProduct =
    filteredCity && featuredExperienceData
      ? featuredExperienceData[activeNav]
      : city === 'All Cities'
      ? featuredExp[activeNav]
      : [];
  console.log('final array:', filteredProduct);
  return (
    <div>
      <FeaturedNavSection
        currNav={activeNav}
        setActiveNav={setActiveNav}
        navData={navArray}
      />
      <div className="featured_dropdown flex justify-between mt-10 px-20">
        <div>
          <h1 className="text-3xl">Featured Experiences</h1>
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
                00 px-3 py-1 bg-white"
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
    </div>
  );
};

export default FeaturedExperiences;
