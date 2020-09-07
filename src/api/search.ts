import { httpService, } from "@src/services";
import { ApiUrl, params, } from "@src/constants";

export const getSearchResult = (title: string) => {
  return httpService.get(`${ApiUrl.search}${title}`, params);
};

export const fetchMoreMovie = (title: string, page: number) => {
  return httpService.get(`${ApiUrl.fetchMore}${title}&page=${page}`, params);
};
