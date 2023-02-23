import { SetStateAction, useEffect } from 'react';

interface IProps {
  selectedCity: string | null;
  setSelectedCity: React.Dispatch<SetStateAction<string | null>>;
  selectedCityProduct: string | null;
  setSelectedCityProduct: React.Dispatch<SetStateAction<string | null>>;
  data: Record<string, any>;
  title: string;
  submitReview: Record<string, any>;
  setSubmitReview: React.Dispatch<SetStateAction<Record<string, any>>>;
  errorStates: Record<string, boolean>;
  setErrorStates: React.Dispatch<SetStateAction<Record<string, boolean>>>;
}
const TourDropDown = ({
  selectedCity,
  setSelectedCity,
  selectedCityProduct,
  setSelectedCityProduct,
  data: tourData,
  title,
  submitReview,
  setSubmitReview,
  errorStates,
  setErrorStates
}: IProps) => {
  const handleTourClick = (product: Record<string, any>) => {
    console.log('product:', product);
    setSelectedCityProduct(product.name);
    setSubmitReview(prevState => {
      return {
        ...prevState,
        product: product?.strapiID
      };
    });
  };

  return (
    <div id="tour-type">
      <div className="text-[24px] font-[600]">{title}</div>
      {tourData &&
        tourData.map((tour: any) => (
          <div
            key={tour?.product?.strapiID}
            className="border border-slate-300"
            onClick={() => handleTourClick(tour?.product)}
          >
            {tour?.product?.name}
          </div>
        ))}
    </div>
  );
};

export default TourDropDown;
