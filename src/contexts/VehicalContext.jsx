import React, { createContext, useState, useContext } from "react";

const VehicleContext = createContext();

// Custom hook to use the Vehicle Context
export const useVehicleContext = () => useContext(VehicleContext);

export const VehicleProvider = ({ children }) => {
  const [ownVehicle, setOwnVehicle] = useState(null); // Default value is null

  return (
    <VehicleContext.Provider value={{ ownVehicle, setOwnVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};