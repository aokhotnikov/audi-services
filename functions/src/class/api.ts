/**
 * Created by Andrey Okhotnikov on 19.03.20.
 * Email: hunterov1984@gmail.com
 */
import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

export class Api {

  protected request: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.request = Axios.create(config);
  }

  /**
   * GET request
   * @param {string} url
   * @param {AxiosRequestConfig} options
   * @return {Promise<AxiosPromise<T>>}
   */
  public get<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosPromise<T>> {
    return this.request.get(url, options);
  }

  /**
   * POST request
   * @param {string} url
   * @param {Object} params body of the request
   * @param {AxiosRequestConfig} options
   * @return {Promise<AxiosPromise<T>>}
   */
  public post<T>(url: string, params: Object, options?: AxiosRequestConfig): Promise<AxiosPromise<T>> {
    return this.request.post(url, params, options);
  }

  /**
   * PUT request
   * @param {string} url
   * @param {Object} params body of the request
   * @param {AxiosRequestConfig} options
   * @return {Promise<AxiosPromise<T>>}
   */
  public put<T>(url: string, params: Object, options?: AxiosRequestConfig): Promise<AxiosPromise<T>> {
    return this.request.put(url, params, options);
  }

  /**
   * DELETE request
   * @param {string} url
   * @param {AxiosRequestConfig} options
   * @returns {Promise<AxiosPromise<T>>}
   */
  public delete<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosPromise<T>> {
    return this.request.delete(url, options);
  }

}

export class ApiAudi extends Api {

  static readonly BASE_URL = 'https://msg.audi.de/fs-car/';
  static readonly BASE_HEADERS = {
    'Accept': 'application/json',
    'X-App-ID': 'de.audi.mmiapp',
    'X-App-Name': 'MMIconnect',
    'X-App-Version': '2.8.3',
    'X-Brand': 'audi',
    'X-Country-Id': 'DE',
    'X-Language-Id': 'de',
    'X-Platform': 'google',
    'User-Agent': 'okhttp/2.7.4',
    'ADRUM_1': 'isModule:true',
    'ADRUM': 'isAray:true'
  };

  constructor(access_token?: string) {
    const headers: {[key: string]: string} = ApiAudi.BASE_HEADERS;
    if (access_token) {
      headers['Authorization'] = 'AudiAuth 1 ' + access_token;
    }
    super({
      baseURL: ApiAudi.BASE_URL,
      timeout: 10000,
      headers
    });
  }

  setAuthorizationToken(access_token: string) {
    this.request.defaults.headers.common['Authorization'] = 'AudiAuth 1 ' + access_token;
  }
}
