interface IProps {
  citiesPageDropdown: Record<string, any>[] | undefined;
}
const CitySelect = ({ citiesPageDropdown }: IProps) => {
  console.log('citySelectData:', citiesPageDropdown);
  return (
    <div className="absolute top-[100%] left-0 bg-white z-50 px-5 py-3 w-[100%] max-h-[200px] overflow-y-auto rounded-[15px]">
      <div className="text-[#33333] text[24px] font-[600]">Featured Cities</div>
      {citiesPageDropdown &&
        citiesPageDropdown?.map((city: any) => (
          <div key={city?.city.id} className="border border-slate-300">
            {city?.city.name}
          </div>
        ))}
    </div>
  );
};

export default CitySelect;
