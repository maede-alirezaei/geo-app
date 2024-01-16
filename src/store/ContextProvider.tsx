import { ReactNode, createContext, useState } from "react";

interface ContextProps {
  children: ReactNode;
}
export const Context = createContext({
  stations: [],
  selectedStation: {},
  handleStations: (stations) => {},
  handleSelectedStation: (station) => {},
});
const ContextProvider = ({ children }: ContextProps) => {
  const [selectedStation, setSelectedStation] = useState({});
  const [stations, setStations] = useState([]);
  return (
    <Context.Provider
      value={{
        stations,
        selectedStation,
        handleSelectedStation: (station) => setSelectedStation(station),
        handleStations: (stations) => setStations(stations),
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
