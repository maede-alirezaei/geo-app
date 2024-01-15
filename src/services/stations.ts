import { Api } from "./api";

export const getStations = (params?: object) => {
  return Api<string>("get", "", { ...params }, null);
};
