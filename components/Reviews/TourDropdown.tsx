interface IProps {
  data: Record<string, any>;
  title: string;
}
const TourDropDown = ({ data: tourData, title }: IProps) => {
  return (
    <div id="tour-type">
      <div className="text-[24px] font-[600]">{title}</div>
      {tourData &&
        tourData.map((tour: any) => (
          <div
            key={tour?.product?.strapiID}
            className="border border-slate-300"
          >
            {tour?.product?.name}
          </div>
        ))}
    </div>
  );
};

export default TourDropDown;
