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

const sortObject: Record<string, string> = {
  Newest: 'date:desc',
  Oldest: 'date:asc',
  Highest: 'rating:desc,date:desc',
  Lowest: 'rating:asc,date:desc'
};
const Reviews = () => {
  const [sortOrder, setSortOrder] = useState<string>('Newest');
  const [cityFilter, setCityFilter] = useState<any>(null);
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
        start: 0,
        limit: 10,
        sort: sortObject[sortOrder],
        object: cityFilter
      }
    });
  }, [cityFilter, fetchReviews, sortOrder]);
  //display data
  console.log('reviewsPage:', reviewsPage);
  console.log('totalReviews:', totalReviews);
  console.log('sortOrder:', sortOrder);
  console.log('city:', cityFilter);
  return (
    <div>
      <ReviewsHeader totalReviews={totalReviews ? totalReviews : {}} />
      <ReviewsFilterNav
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        citiesDropdown={citiesPageDropDown?.citiesPage?.cities || []}
      />
      <DisplayReviews totalReviews={totalReviews ? totalReviews : {}} />
    </div>
  );
};

export default Reviews;
<div>
  <div></div>
</div>;
