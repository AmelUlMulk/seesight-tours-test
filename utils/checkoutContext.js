import React, { createContext, useState } from 'react';

export const PaxContext = createContext(null);

export const PaxProivder = ({ children }) => {
  const [pax, setPax] = useState({});
  const [tour, setTour] = useState({});
  const [user, setUser] = useState({});
  console.log('the tour', tour);
  const updatePax = newObject1 => {
    setPax(newObject1);
  };

  const updateTour = newObject2 => {
    setTour(newObject2);
  };

  const updateUser = newObject3 => {
    setUser(newObject3);
  };

  const contextValue = {
    pax,
    tour,
    user,
    updatePax,
    updateTour,
    updateUser
  };

  return (
    <PaxContext.Provider value={contextValue}>{children}</PaxContext.Provider>
  );
};
export default PaxProivder;
