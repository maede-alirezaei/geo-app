import { Api } from "./api";

export const getNetworks = (params?: object) => {
    return Api<string>("get", "", { ...params }, null);
  };