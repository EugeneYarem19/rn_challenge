import { create, } from "apisauce";

import { MovieResponse, SearchResponse, } from "./types";

export * from "./types";

const apiInstance = create({ baseURL: "http://www.omdbapi.com/", });

const params = { apikey: "fc591144", };

export const api = {
  search: (title: string): Promise<SearchResponse> => apiInstance.get(`?s=${title}`, params),
  fetchMore: (title: string, page: number): Promise<SearchResponse> => apiInstance.get(`?s=${title}&page=${page}`, params),
  fetchMovie: (id: string): Promise<MovieResponse> => apiInstance.get(`?i=${id}&plot=full`, params),
};
