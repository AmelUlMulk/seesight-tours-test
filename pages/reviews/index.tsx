import { useLazyQuery, useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  CITIES_DROPDOWN,
  CITIES_DROPDOWN_INTERFACE,
  FETCH_REVIEWS,
  FETCH_REVIEWS_INTERFACE
} from '../../api/reviews';
import { REVIEWS_PAGE, REVIEWS_PAGE_INTERFACE } from '../../api/reviewsPage';
import ReviewsHeader from '../../components/Reviews/Header';
import ReviewsFilterNav from '../../components/Reviews/ReviewsFilternav';

const Reviews = () => {
  const [sortOrder, setSortOrder] = useState('Newest');
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
  //display data
  console.log('reviewsPage:', reviewsPage);
  console.log('sortOrder:', sortOrder);
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
    </div>
  );
};

export default Reviews;
<div>
  <div></div>
</div>;
