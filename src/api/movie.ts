import { httpService, } from "@src/services";
import { ApiUrl, params, } from "@src/constants";

export const fetchMovie = (id: string) => {
  return httpService.get(`${ApiUrl.fetchMovie}${id}`, params);
};
