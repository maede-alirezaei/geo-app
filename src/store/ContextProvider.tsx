import { ReactNode, createContext, useState } from "react";
import { Station } from "../services/stations";

interface ContextProps {
  children: ReactNode;
}
export const Context = createContext({
  stations: [{} as Station],
  selectedStation: "",
  handleStations: (stations: Station[]) => {
    stations;
  },
  handleSelectedStation: (station: string) => {
    station;
  },
});
const ContextProvider = ({ children }: ContextProps) => {
  const [selectedStation, setSelectedStation] = useState<string>("");
  const [stations, setStations] = useState<Station[]>([]);
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
