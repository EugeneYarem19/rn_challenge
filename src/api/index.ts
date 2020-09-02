import axios from "axios";

import { MovieResponse, SearchResponse, } from "./types";

const apiInstance = axios.create({
  baseURL: "http://www.omdbapi.com/",
  params: { apikey: "fc591144", },
});

export * from "./types";

export const api = {
  search: (title: string): Promise<SearchResponse> => apiInstance.get(`?s=${title}`),
  fetchMore: (title: string, page: number): Promise<SearchResponse> => apiInstance.get(`?s=${title}&page=${page}`),
  fetchMovie: (id: string): Promise<MovieResponse> => apiInstance.get(`?i=${id}`),
};
