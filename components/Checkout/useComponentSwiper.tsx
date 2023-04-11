import React, { ReactElement, useState } from 'react';

const useComponentSwipper = (components: ReactElement[]) => {
  const [currentComponentIndex, setCurrentComponentIndex] = useState<number>(2);

  const next = () => {
    setCurrentComponentIndex(i => {
      if (i >= components.length - 1) return i;
      return i + 1;
    });
  };
  const back = () => {
    setCurrentComponentIndex(i => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  return {
    currentComponentIndex,
    component: components[currentComponentIndex],
    next,
    back
  };
};

export default useComponentSwipper;
