import { useState } from 'react';
import DropdownIcon from '../../assets/svg/review-filtercitydropdown.svg';
interface IProps {
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
}
const sortObjectKeys: string[] = ['Newest', 'Oldest', 'Highest', 'Lowest'];
const ReviewsSorting = ({ sortOrder, setSortOrder }: IProps) => {
  const [sortToggle, setSortToggle] = useState<boolean>(false);
  return (
    <div id="sorting by time">
      <div>
        <span>Sort by:</span>
        <button className="pl-2" onClick={() => setSortToggle(!sortToggle)}>
          <span className="text-[18px] font-[400]">{sortOrder}</span>
          <span className="inline-block pl-2">
            <DropdownIcon />
          </span>
        </button>
      </div>
      {sortToggle &&
        sortObjectKeys.map((item: string, index: number) => (
          <div
            key={item}
            onClick={() => {
              setSortOrder(item);
              setSortToggle(!sortToggle);
            }}
            className="border border-slate-300 bg-[#FFFFFF] hover:cursor-pointer z-50"
          >
            {item}
          </div>
        ))}
    </div>
  );
};

export default ReviewsSorting;
