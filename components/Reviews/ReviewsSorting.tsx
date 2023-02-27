import { SetStateAction, useState } from 'react';
import DropdownIcon from '../../assets/svg/review-filtercitydropdown.svg';
interface IProps {
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  sortToggle: boolean;
  setSortToggle: React.Dispatch<SetStateAction<boolean>>;
}
const sortObjectKeys: string[] = ['Newest', 'Oldest', 'Highest', 'Lowest'];
const ReviewsSorting = ({
  sortOrder,
  setSortOrder,
  sortToggle,
  setSortToggle
}: IProps) => {
  return (
    <div id="sorting by time" className="relative">
      <div>
        <span className="text-[14px] sm:text-[18px] text-[#333333] font-[400]">
          Sort by:
        </span>
        <button className="pl-2" onClick={() => setSortToggle(!sortToggle)}>
          <span className="text-[14px] sm:text-[18px] font-[400]">
            {sortOrder}
          </span>
          <span className="inline-block pl-2">
            <DropdownIcon />
          </span>
        </button>
      </div>
      {sortToggle && (
        <div className="absolute top-[100%] w-[100%] z-50">
          {sortObjectKeys.map((item: string, index: number) => (
            <div
              key={item}
              onClick={() => {
                setSortOrder(item);
                setSortToggle(!sortToggle);
              }}
              className="border border-slate-300 bg-[#FFFFFF] hover:cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsSorting;
