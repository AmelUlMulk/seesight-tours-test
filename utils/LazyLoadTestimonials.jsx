import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
const Testimonial = dynamic(() =>
  import('../components/Landingpage/components/testimonials')
);
function LazyGuides() {
  const [showGuides, setShowGUides] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowGUides(true);
        LazyGuideComponent?.preload();
      }
    });

    observer.observe(ref.current);
  }, []);

  return <div ref={ref}>{showGuides && <Testimonial />}</div>;
}
export default LazyGuides;
