import { useLazyQuery } from '@apollo/client';
import { SetStateAction, useEffect } from 'react';
import { CITIES_PRODUCT_FILTER } from '../../api/reviews';
import TourDropDown from './TourDropdown';

interface IProps {
  citiesPageDropdown: Record<string, any>[] | undefined;
  selectedCity: string | null;
  setSelectedCity: React.Dispatch<SetStateAction<string | null>>;
  setTourDropdown: React.Dispatch<SetStateAction<boolean>>;
  tourDropdown: boolean;
  submitReview: Record<string, any>;
  setSubmitReview: React.Dispatch<SetStateAction<Record<string, any>>>;
}
const CityTours = ({
  citiesPageDropdown,
  selectedCity,
  setTourDropdown,
  tourDropdown,
  submitReview,
  setSubmitReview
}: IProps) => {
  const [fetchCityTours, { data: { cities } = [] }] = useLazyQuery(
    CITIES_PRODUCT_FILTER
  );
  useEffect(() => {
    fetchCityTours({
      variables: {
        filter: {
          name: selectedCity
        }
      }
    });
  }, [selectedCity]);

  console.log('Related City Tours:', cities);
  return (
    <div
      id="tours-dropdown"
      className="absolute top-[100%] left-0 bg-white z-50 max-h-[400px] overflow-y-auto rounded-[15px]"
    >
      {cities && (
        <TourDropDown
          data={cities[0].allThings}
          title="All Things "
          submitReview={submitReview}
          setSubmitReview={setSubmitReview}
        />
      )}
      {cities && (
        <TourDropDown
          data={cities[0].allThings}
          title="Day Tours "
          submitReview={submitReview}
          setSubmitReview={setSubmitReview}
        />
      )}
      {cities && (
        <TourDropDown
          data={cities[0].allThings}
          title="Mutli Day Tours "
          submitReview={submitReview}
          setSubmitReview={setSubmitReview}
        />
      )}
    </div>
  );
};

export default CityTours;
