import Image from 'next/image';

interface Iprops {
  name: string;
  address: string;
  data: Record<string, any>;
}

const LocationMap = ({ name, address, data }: Iprops) => {
  const hoursOfOperation = data?.hoursOfOperation
    ?.split('\n')
    .filter((e: any) => e);
  return (
    <div className="py-5 mt-10">
      <div
        id="map-wrapper"
        className="px-5 py-10 border-slate-300 rounded-lg border-[1px]"
      >
        <div id="google-map" className="max-h-[350px] h-[250px]">
          <iframe
            title={name}
            src={`https://www.google.com/maps?q=${address}&output=embed`}
            width="100%"
            height="100%"
            loading="lazy"
            className="border-none"
          />
        </div>
        <div id="address" className="flex py-5">
          {data?.address && (
            <>
              <div
                id="image-wrapper"
                className="flex justify-center items-center px-2"
              >
                <Image
                  src="/location.svg"
                  width={50}
                  height={50}
                  alt=""
                  priority={true}
                />
              </div>
              <div className="py-2 px-2 text-xl">{data.address}</div>
            </>
          )}
        </div>
        <div id="hours of operation" className="text-[#333333]">
          {data?.hoursOfOperation && (
            <h2 className="text-[18px] sm:text-[20px] lg:text-[28px] font-[600]">
              Hours of Operation
            </h2>
          )}
          {hoursOfOperation && (
            <div className="Operation_data">
              <ul className="marker:text-black list-disc px-6 py-2">
                {hoursOfOperation.map((item: any, index: number) => {
                  return (
                    <li
                      key={index}
                      className="text-[12px] sm:text-[14px] lg:text-[18px] font-[400]"
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
