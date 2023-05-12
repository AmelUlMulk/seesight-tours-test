import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
const OurCities = dynamic(() =>
  import('../components/FeaturedCities/OurCities')
);
function LazyCities({ data, citiesTotal }) {
  const [showGuides, setShowGUides] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowGUides(true);
        LazyGuideComponent.preload();
      }
    });

    observer.observe(ref.current);

    // Cleanup function
  }, []);

  return (
    <div ref={ref}>
      {showGuides && (
        <OurCities
          title="OUR CITIES"
          subTitle="Let us show you the places we call home"
          FeaturedCities={data}
          citiesTotalCount={citiesTotal ? citiesTotal.aggregate.totalCount : 0}
        />
      )}
    </div>
  );
}
export default LazyCities;
