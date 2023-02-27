import { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  CITIES_DROPDOWN,
  CITIES_DROPDOWN_INTERFACE,
  FETCH_REVIEWS,
  FETCH_REVIEWS_INTERFACE
} from '../../api/reviews';
import { REVIEWS_PAGE, REVIEWS_PAGE_INTERFACE } from '../../api/reviewsPage';
import ReviewsHeader from '../../components/Reviews/Header';
import ReviewsFilterNav from '../../components/Reviews/ReviewsFilternav';
import DisplayReviews from '../../components/Reviews/DisplayReviews';
import FooterAbout from '../../components/Reviews/FooterAbout';

const sortObject: Record<string, string> = {
  Newest: 'date:desc',
  Oldest: 'date:asc',
  Highest: 'rating:desc,date:desc',
  Lowest: 'rating:asc,date:desc'
};
const Reviews = () => {
  const [sortOrder, setSortOrder] = useState<string>('Newest');
  const [currentPage, setCurrrentPage] = useState<number>(0);
  const [cityFilter, setCityFilter] = useState<any>(null);
  const [citiesToggle, setCitiesToggle] = useState<boolean>(false);
  const [sortToggle, setSortToggle] = useState<boolean>(false);
  //fetching queries
  const {
    data: { reviewsPage } = {},
    loading,
    error
  } = useQuery<REVIEWS_PAGE_INTERFACE>(REVIEWS_PAGE);
  const { data: citiesPageDropDown, error: citiesDropdownError } =
    useQuery<CITIES_DROPDOWN_INTERFACE>(CITIES_DROPDOWN);
  const [fetchReviews, { data: totalReviews, error: fetchReviewsError }] =
    useLazyQuery<FETCH_REVIEWS_INTERFACE>(FETCH_REVIEWS);

  useEffect(() => {
    fetchReviews({
      variables: {
        start: currentPage * 10,
        limit: 10,
        sort: sortObject[sortOrder],
        object: cityFilter
      }
    });
  }, [cityFilter, fetchReviews, sortOrder, currentPage]);
  //display data
  // console.log('reviewsPage:', reviewsPage);
  // console.log('citiesToggle:', citiesToggle);
  // console.log('sortToggle:', sortToggle);
  // console.log('currentPage:', currentPage);
  // console.log('totalReviews:', totalReviews);
  // console.log('sortOrder:', sortOrder);
  // console.log('city:', cityFilter);
  // console.log('citiesPageDropDown:', citiesPageDropDown);
  return (
    <div
      onClick={() => {
        if (citiesToggle) {
          setCitiesToggle(false);
        }
        if (sortToggle) {
          setSortToggle(false);
        }
      }}
    >
      <ReviewsHeader
        totalReviews={totalReviews ? totalReviews : {}}
        citiesPageDropDown={citiesPageDropDown?.citiesPage?.cities || []}
        citiesDropDown={citiesPageDropDown?.citiesPage || {}}
      />
      <ReviewsFilterNav
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        citiesDropdown={citiesPageDropDown?.citiesPage?.cities || []}
        citiesToggle={citiesToggle}
        setCitiesToggle={setCitiesToggle}
        sortToggle={sortToggle}
        setSortToggle={setSortToggle}
      />
      <DisplayReviews
        currentPage={currentPage}
        setCurrentPage={setCurrrentPage}
        totalReviews={totalReviews ? totalReviews : {}}
      />
      <FooterAbout reviewPage={reviewsPage} />
    </div>
  );
};

export default Reviews;
