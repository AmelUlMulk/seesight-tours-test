import { SetStateAction } from 'react';

interface IProps {
  citiesPageDropdown: Record<string, any>[] | undefined;
  citiesDropDown: Record<string, any>;
  selectedCity: string | null;
  setSelectedCity: React.Dispatch<SetStateAction<string | null>>;
  setCityDropdownToggle: React.Dispatch<SetStateAction<boolean>>;
  cityDropdownToggle: boolean;
  submitReview: Record<string, any>;
  setSubmitReview: React.Dispatch<SetStateAction<Record<string, any>>>;
}
interface DropdownCityComponentProps {
  data: any;
  title: string;
  handleClick: (city: string) => void;
}

const CitySelect = ({
  citiesPageDropdown,
  citiesDropDown,
  setSelectedCity,
  setCityDropdownToggle,
  cityDropdownToggle,
  submitReview,
  setSubmitReview
}: IProps) => {
  const handleCityClick = (city: any) => {
    const { id, name } = city;
    setSelectedCity(city.name);
    setCityDropdownToggle(!cityDropdownToggle);
    // console.log('handleClick:', name, id);
    setSubmitReview(prevState => {
      return {
        ...submitReview,
        cities: [id]
      };
    });
  };
  console.log('citySelectData:', citiesDropDown);
  return (
    <>
      <div className="absolute top-[100%] left-0 bg-white z-50 px-5 py-3 w-[100%] max-h-[200px] overflow-y-auto rounded-[15px]">
        <div className="text-[#33333] text[24px] font-[600]">
          Featured Cities
        </div>
        {citiesDropDown &&
          citiesDropDown.featured?.map((city: any) => (
            <div
              key={city?.city.id}
              className="border border-slate-300"
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
              className="border border-slate-300"
              onClick={() => {
                setSelectedCity(city?.city.name);
                setCityDropdownToggle(!cityDropdownToggle);
              }}
            >
              {city?.city.name}
            </div>
          ))}
      </div>
    </>
  );
};

export default CitySelect;
