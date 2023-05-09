import React, { useState } from 'react';

function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className="relative  "
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      {children}
      {isVisible && (
        <div className=" z-20  min-w-[140px] bg-gray-200 text-gray-700 text-sm rounded-lg px-2 py-1 -le  -left-[90%] absolute bottom-0   transform -translate-x-1/2 mb-8 opacity-0 transition-all duration-200">
          {text}
          <div className="w-2 h-2 bg-gray-200 absolute bottom-0 left-1/2 transform rotate-45 -translate-x-1/2"></div>
        </div>
      )}
    </div>
  );
}

export default Tooltip;
