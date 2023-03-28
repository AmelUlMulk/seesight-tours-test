interface IProps {
  canada_address: string[];
  usa_address: string[];
}

const OurLocation = ({ canada_address, usa_address }: IProps) => {
  return (
    <section id="location" className="sm:w-[85%] mx-auto py-10">
      <div className="location1_content ">
        <div className="w-[85%] sm:w-full mx-auto">
          <h2 className="text-[18px] sm:text-[38px] lg:text-[44px] font-[600]">
            Where are we Canada
          </h2>
          <p className="text-[16px] sm:text-[22px] lg:text-[32px] font-[400]">
            5779 Desson Avenue Niagara Falls Ontario, Canada L2G 3T5
          </p>
        </div>

        <div id="location1_map" className="h-[300px] mt-3">
          <iframe
            title="Where are we Canada"
            src={`https://www.google.com/maps?q=${canada_address[0]}${canada_address[1]}${canada_address[2]}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: '0' }}
            loading="lazy"
          />
        </div>
      </div>
      <div id="location2_content">
        <div className="w-[85%] sm:w-full mx-auto">
          <h2 className="text-[18px] sm:text-[38px] lg:text-[44px] font-[600]">
            Where are we USA
          </h2>
          <p className="text-[16px] sm:text-[22px] lg:text-[32px] font-[400]">
            486 19th street Niagara Falls Buffalo, USA NY 14303
          </p>
        </div>
        <div id="location2_map" className="h-[300px] mt-3">
          <iframe
            title="Where are we USA"
            src={`https://www.google.com/maps?q=${usa_address[0]}${usa_address[1]}${usa_address[2]}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: '0' }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default OurLocation;
