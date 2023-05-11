import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
const LazyGuideComponent = dynamic(() => import('../components/Guides/guides'));
function LazyGuides({ guidesData }) {
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
    return () => observer.unobserve(ref.current);
  }, []);

  return (
    <div ref={ref}>
      {showGuides && <LazyGuideComponent guidesData={guidesData} />}
    </div>
  );
}
export default LazyGuides;
