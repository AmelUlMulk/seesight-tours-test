import { SetStateAction } from 'react';
import { MyErrorObject } from './Header';

interface IProps {
  citiesDropDown: Record<string, any>;

  setSelectedCity: React.Dispatch<SetStateAction<string | null>>;
  setCityDropdownToggle: React.Dispatch<SetStateAction<boolean>>;
  cityDropdownToggle: boolean;
  submitReview: Record<string, any>;
  setSubmitReview: React.Dispatch<SetStateAction<Record<string, any>>>;
  errorStates: Record<string, boolean>;
  setErrorStates: React.Dispatch<SetStateAction<Record<string, boolean>>>;
  errorObject: MyErrorObject;
  setErrorObject: React.Dispatch<SetStateAction<MyErrorObject>>;
}
const CityDropdown = ({
  citiesDropDown,
  setSelectedCity,
  cityDropdownToggle,
  setCityDropdownToggle,
  submitReview,
  setSubmitReview,
  errorStates,
  setErrorStates,
  errorObject,
  setErrorObject
}: IProps) => {
  const handleCityClick = (city: any) => {
    const { id, name } = city;
    setSelectedCity(city.name);
    if (errorObject.cities) {
      const obj = { ...errorObject };
      delete obj.cities;
      delete obj.product;
      setErrorObject(obj);
    }

    setCityDropdownToggle(!cityDropdownToggle);
    setSubmitReview(prevState => {
      return {
        ...prevState,
        cities: [id]
      };
    });
  };
  return (
    <div className="absolute top-[100%] left-0 bg-white z-50 px-5 py-3 w-[100%] max-h-[200px] overflow-y-auto rounded-[15px]">
      <div className="text-[#33333] text[24px] font-[600]">Featured Cities</div>
      {citiesDropDown &&
        citiesDropDown.featured?.map((city: any) => (
          <div
            key={city?.city.id}
            className="border border-slate-300 text-[10px] xsm:text-[12px] sm:text-[14px] xl:text-[16px]"
            onClick={() => handleCityClick(city?.city)}
          >
            {city?.city.name}
          </div>
        ))}
      <div className="text-[#33333] text[24px] font-[600]">All Cities</div>
      {citiesDropDown &&
        citiesDropDown.cities?.map((city: any) => (
          <div
            key={city?.city.id}
            className="border border-slate-300 text-[10px] xsm:text-[12px] sm:text-[14px] xl:text-[16px]"
            onClick={() => {
              setSelectedCity(city?.city.name);
              setCityDropdownToggle(!cityDropdownToggle);
            }}
          >
            {city?.city.name}
          </div>
        ))}
    </div>
  );
};

export default CityDropdown;
