import { useState, useEffect } from 'react';
import FeaturedNavSection from './FeaturedNavSec';
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
const filteredCity = [
  {
    __typename: 'Cities',
    id: '8',
    name: 'Saint John',
    slug: 'saint-john-tours'
  },
  {
    __typename: 'Cities',
    id: '3',
    name: 'Philadelphia',
    slug: 'philadelphia-tours'
  },
  { __typename: 'Cities', id: '20', name: 'Austin', slug: 'austin-tours' },
  { __typename: 'Cities', id: '5', name: 'Victoria', slug: 'victoria-tours' },
  {
    __typename: 'Cities',
    id: '14',
    name: 'Prince Edward Island',
    slug: 'prince-edward-island-tours'
  },
  {
    __typename: 'Cities',
    id: '17',
    name: 'Niagara Falls, Canada',
    slug: 'niagara-falls-tours-canada'
  },
  {
    __typename: 'Cities',
    id: '21',
    name: 'Fort Lauderdale',
    slug: 'Fort-Lauderdale-Tours'
  },
  {
    __typename: 'Cities',
    id: '15',
    name: 'Vancouver',
    slug: 'vancouver-tours'
  },
  { __typename: 'Cities', id: '12', name: 'Newport', slug: 'newport-tours' },
  { __typename: 'Cities', id: '4', name: 'Ottawa', slug: 'ottawa-tours' },
  {
    __typename: 'Cities',
    id: '11',
    name: 'Sydney, Nova Scotia',
    slug: 'sydney-tours'
  },
  { __typename: 'Cities', id: '19', name: 'Miami', slug: 'miami-tours' },
  {
    __typename: 'Cities',
    id: '7',
    name: 'Niagara Falls, USA',
    slug: 'niagara-falls-usa-tours'
  },
  { __typename: 'Cities', id: '10', name: 'Montreal', slug: 'montreal-tours' },
  {
    __typename: 'Cities',
    id: '18',
    name: 'San Antonio',
    slug: 'san-antonio-tours'
  },
  {
    __typename: 'Cities',
    id: '9',
    name: 'Providence',
    slug: 'providence-tours'
  },
  { __typename: 'Cities', id: '2', name: 'Toronto', slug: 'toronto-tours' },
  { __typename: 'Cities', id: '13', name: 'Halifax', slug: 'halifax-tours' },
  { __typename: 'Cities', id: '16', name: 'Boston', slug: 'boston-tours' },
  { __typename: 'Cities', id: '6', name: 'Chicago', slug: 'chicago-tours' },
  {
    __typename: 'Cities',
    id: '22',
    name: 'Savannah Tours',
    slug: 'savannah-tours'
  }
];
const FeaturedExperiences = () => {
  const [activeNav, setActiveNav] = useState('allThings');
  const [city, setCity] = useState<any>('All Cities');
  const [navArray, setNavArray] = useState<any>(arr);
  // console.log('activeNav:', activeNav);

  //Navbar button data
  // useEffect(() => {
  //   let finalNavArray: Array<Record<string, any>> = [];
  //   let flag = true;
  //   arr.forEach(item => {
  //     finalNavArray.push(item);
  //   });
  //   if (city === 'All Cities') {
  //     setNavArray(arr);
  //   } else {
  //     setNavArray(finalNavArray);
  //     finalNavArray?.forEach(item => {
  //       if (item.filterClass == activeNav) {
  //         flag = false;
  //       }
  //     });
  //     if (flag) {
  //       setActiveNav('allThings');
  //     }
  //   }
  // }, []);

  // update cityname based of selected city
  // useEffect(() => {
  //   setCity(selectedcityname);
  // }, [selectedcityname]);

  //   return active nav
  // const showActiveNav = () => {
  //   if (activeNav === 'allThings') return 'All Things To Do';
  //   else if (activeNav === 'dayTours') return 'Day Tours';
  //   else if (activeNav === 'multiday') return 'Multi Day Tours';
  //   else if (activeNav === 'airportTransfers') return 'Airport Transfer';
  // };
  // return filtered city data with sorting base on aplphabet

  return (
    <div>
      <FeaturedNavSection
        currNav={activeNav}
        setActiveNav={setActiveNav}
        navData={navArray}
      />
      <h1 className="text-3xl">Featured Products</h1>
    </div>
  );
};

export default FeaturedExperiences;
