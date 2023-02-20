import { useLazyQuery } from '@apollo/client';
import { CITIES_PRODUCT_FILTER } from '../../api/reviews';

const CityTours = () => {
  const [fetchCityTours, { data: { cities } = [] }] = useLazyQuery(
    CITIES_PRODUCT_FILTER
  );
  return <div></div>;
};

export default CityTours;
