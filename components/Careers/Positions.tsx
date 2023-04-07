import Image from 'next/image';
import { useMediaQuery } from '../../hooks/mediaQuery';

interface IProps {
  pk_openings: Record<string, any>;
  non_pk_openings: Record<string, any>;
}
const AvailablePositions = ({ pk_openings, non_pk_openings }: IProps) => {
  const mediaQuery = useMediaQuery(768);
  return (
    <div id="available-positions" className="w-[75%] mx-auto py-10">
      <h1 className="text-start text-[#333333] text-[18px] sm:text-[26px] lg:text-[36px] font-[600]">
        Open Positions
      </h1>
      <h1 className="text-start text-[#333333] text-[16px] sm:text-[22px] lg:text-[28px] font-[600] mt-5">
        Open positions at SeeSight
      </h1>
      <div
        id="openings"
        className="flex flex-col gap-10 md:gap-0 md:flex-row mt-10 md:mt-5"
      >
        <div id="pk-openings" className="flex-none md:w-[50%]">
          <p className="text-[16px] sm:text-[18px] lg:text-[24px] font-[400]">
            At SeeSight Islamabad,pk
          </p>
          <div className="flex flex-col gap-5 mt-5">
            {pk_openings.map((opn: Record<string, any>) => (
              <div key={opn?.friendly_id} className="flex items-start">
                <Image
                  src="/pepicons-pop_hand-point-open.svg"
                  width={mediaQuery ? 22 : 28}
                  height={mediaQuery ? 25 : 31}
                  alt="see sight jobs"
                  className="inline-block"
                />
                <div className="pl-3">
                  <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-[400] text-[#333333]">
                    {opn?.name}
                  </p>
                  <p className="text-[12px] sm:text-[14px] lg:text-[18px] font-[400] text-[#4F4F4F] mt-2">
                    <span>
                      <Image
                        src="/locationIcon.svg"
                        width={mediaQuery ? 12 : 16}
                        height={mediaQuery ? 15 : 19}
                        alt="seasight jobs"
                        className="inline-block mr-3"
                      />
                    </span>
                    {opn?.location.name}
                  </p>
                  <p className="text-[12px] sm:text-[14px] lg:text-[18px] font-[400] text-[#4F4F4F] mt-2">
                    <span>
                      <Image
                        src="/Time.svg"
                        width={mediaQuery ? 14 : 18}
                        height={mediaQuery ? 15 : 19}
                        alt="seasight jobs"
                        className="inline-block mr-3"
                      />
                    </span>
                    {opn?.type.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div id="CAN/USA-openings" className="flex-none md:w-[50%]">
          <p className="text-[16px] sm:text-[18px] lg:text-[24px] font-[400]">
            At SeeSight Canada & USA
          </p>
          <div className="flex flex-col gap-5 mt-5">
            {non_pk_openings.map((opn: Record<string, any>) => (
              <div key={opn?.friendly_id} className="flex items-start">
                <Image
                  src="/pepicons-pop_hand-point-open.svg"
                  width={mediaQuery ? 22 : 28}
                  height={mediaQuery ? 25 : 31}
                  alt="see sight jobs"
                  className="inline-block"
                />
                <div className="pl-3">
                  <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-[400] text-[#333333]">
                    {opn?.name}
                  </p>
                  <p className="text-[12px] sm:text-[14px] lg:text-[18px] font-[400] text-[#4F4F4F] mt-2">
                    <span>
                      <Image
                        src="/locationIcon.svg"
                        width={mediaQuery ? 12 : 16}
                        height={mediaQuery ? 15 : 19}
                        alt="seasight jobs"
                        className="inline-block mr-3"
                      />
                    </span>
                    {opn?.location.name}
                  </p>
                  <p className="text-[12px] sm:text-[14px] lg:text-[18px] font-[400] text-[#4F4F4F] mt-2">
                    <span>
                      <Image
                        src="/Time.svg"
                        width={mediaQuery ? 14 : 18}
                        height={mediaQuery ? 15 : 19}
                        alt="seasight jobs"
                        className="inline-block mr-3"
                      />
                    </span>
                    {opn?.type.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailablePositions;
