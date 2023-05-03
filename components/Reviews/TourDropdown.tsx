import { SetStateAction, useEffect } from 'react';
import { MyErrorObject } from './Header';

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
  errorObject: MyErrorObject;
  setErrorObject: React.Dispatch<SetStateAction<MyErrorObject>>;
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
  setErrorStates,
  errorObject,
  setErrorObject
}: IProps) => {
  const handleTourClick = (product: Record<string, any>) => {
    setSelectedCityProduct(product.name);
    if (errorObject.product) {
      const obj = { ...errorObject };
      delete obj.product;
      setErrorObject(obj);
    }
    setSubmitReview(prevState => {
      return {
        ...prevState,
        product: product?.strapiID
      };
    });
  };

  return (
    <div id="tour-type">
      <div className=" text-[14px] sm:text-[18px] lg:text-[20px] font-[500]">
        {title}
      </div>
      {tourData &&
        tourData.map((tour: any) => (
          <div
            key={tour?.product?.strapiID}
            className="border border-slate-300 text-[10px] sm:text-[13px] lg:text-[15px]"
            onClick={() => handleTourClick(tour?.product)}
          >
            {tour?.product?.name}
          </div>
        ))}
    </div>
  );
};

export default TourDropDown;
