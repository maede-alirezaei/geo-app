import { Api } from "./api";
export interface Station {
  network: string;
  station: string;
  elevation: string;
  siteName: string;
  startTime: string;
  endTime: string;
  latitude: string;
  longitude: string;
}

export const getStations = (params?: object) => {
  return Api<string>("get", "", { level: "station", ...params }, null);
};
