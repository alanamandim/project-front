import axios, { AxiosInstance } from 'axios';
import { destroyCookie, parseCookies } from 'nookies';

const api = 'http://localhost:8080'

console.log(api)

// const { '@alana:token': token } = parseCookies();

// if (token) {
//   api.defaults.headers.Authorization = `Bearer ${token}`;
// }

// api.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response.status === 401) {
//       destroyCookie(undefined, '@alana:token');

//       if (window.location.pathname !== '/') {
//         window.location.replace('/');
//       }
//     }

//     return Promise.reject(error);
//   },
// );

export default api;
