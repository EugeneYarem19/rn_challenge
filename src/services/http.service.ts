import { create, } from "apisauce";
import { serialize, } from "object-to-formdata";

import { rootUrl, } from "@src/constants";

class HTTPService {
  private _instance: any;

  constructor() {
    this._instance = create({
      baseURL: rootUrl,
      timeout: 6000,
      headers: { "Content-Type": "application/json; charset=utf-8", },
    });
  }

  /**
   * @param {string} url
   * @param {Object} [params]
   * */
  get(url: string, params = {}) {
    return this._instance.get(url, params);
  }

  /**
   * @param {string} url
   * @param {Object} data - raw data without JSON.stringify
   * */
  post(url: any, data: any) {
    return this._instance.post(url, serialize(data));
  }

  /**
   * @param {string} url
   * @param {Object} data - raw data without JSON.stringify
   * @param {Object} [headers]
   * */
  patch(url: string, data: any, headers: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return this._instance.patch(url, JSON.stringify(data), { headers, });
  }

  /**
   * @param {string} url
   * @param {Object} data - raw data without JSON.stringify
   * */
  put(url: string, data: any) {
    return this._instance.put(url, JSON.stringify(data));
  }

  /**
   * @param {string} url
   * @param {Object} params
   * */
  delete(url: any, params: any) {
    return this._instance.delete(url, params);
  }

  /**
   * @param {Object} params
   * @param {string} params.method
   * @param {string} params.url
   * @param {string} params.fileApiKey
   * @param {ImageForApi} params.file
   * @param {Object} params.otherFields
   */
}

export const httpService = new HTTPService();

/**
 * @typedef {Object} ApisauceResponse
 * @property {Object} response
 * @property {T} data - the object originally from the server
 * @template T
 * @property {number} duration - the number of milliseconds
 * @property {Object} problem - the problem code (see ApisauceProblemCodes)
 * @property {boolean} ok - true or false
 * @property {number} status - the HTTP status code
 * @property {Object} headers - the HTTP response headers
 * @property {Object} config - the underlying axios config for the request
 */
