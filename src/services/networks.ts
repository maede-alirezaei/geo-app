import { Api } from "./api";
export interface Network {
  network: string;
  description: string;
  startTim: string;
  endTime: string;
  totalStations: string;
}
export const getNetworks = (params?: object) => {
  return Api<string>("get", "", { level: "network", ...params }, null);
};
