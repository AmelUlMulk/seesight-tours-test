import { SetStateAction } from 'react';

interface IProps {
  data: Record<string, any>;
  title: string;
  submitReview: Record<string, any>;
  setSubmitReview: React.Dispatch<SetStateAction<Record<string, any>>>;
}
const TourDropDown = ({
  data: tourData,
  title,
  submitReview,
  setSubmitReview
}: IProps) => {
  const handleTourClick = (product: Record<string, any>) => {
    console.log('product:', product);
  };
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
