import axios, { AxiosRequestConfig } from 'axios';

export const makeRequest = <T>({
  url = '/',
  method = 'get',
  headers = {},
  params = {},
  data = {},
  signal,
  auth,
  withCabinAuth,
  withCredentials,
}: AxiosRequestConfig & { withCabinAuth?: boolean }) => {
  const props = {
    url,
    method,
    headers,
    params,
    data,
    signal,
    auth,
    withCabinAuth,
    withCredentials,
  };
  return makeAxiosRequest<T>(props);
};

const makeAxiosRequest = <T>({
  url = '/',
  method = 'get',
  headers = {},
  params = {},
  data = {},
  signal,
  auth,
  withCabinAuth,
  withCredentials,
}: AxiosRequestConfig & { withCabinAuth?: boolean }) => {
  return axios
    .request<T>({
    url,
    method,
    headers,
    params,
    data,
    signal,
    withCredentials,
    auth: withCabinAuth && process.env.NEXT_PUBLIC_API_CABINSERVICE_USERNAME && process.env.NEXT_PUBLIC_API_CABINSERVICE_PASSWORD
      ? {
        username: process.env.NEXT_PUBLIC_API_CABINSERVICE_USERNAME || '',
        password: process.env.NEXT_PUBLIC_API_CABINSERVICE_PASSWORD || '',
      }
      : auth,
  })
    .then((response) => response.data)
    .catch((e) => {
      throw new Error(e);
    });
};
