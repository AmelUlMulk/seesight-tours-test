import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

type Props<T> = {
  componentProps?: Record<string, any>;
  link: string;
};

function useLazyLoad<T>({ componentProps, link }: Props<T>) {
  const [showComponent, setShowComponent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShowComponent(true);
      }
    });
    //@ts-ignore
    observer.observe(ref.current);

    // Cleanup function
    //@ts-ignore
    return () => observer.unobserve(ref.current);
  }, []);
  //@ts-ignore
  const LazyComponent = dynamic(() => `${link}`, {
    ssr: false
  });

  return (
    <div ref={ref}>
      {showComponent && <LazyComponent {...componentProps} />}
    </div>
  );
}

export default useLazyLoad;
