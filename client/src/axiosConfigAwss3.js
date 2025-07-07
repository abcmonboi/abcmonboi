import axios from "axios";
//Config axios with base url api

const instance = axios.create({
  //   baseURL: process.env.REACT_APP_URL_SERVER,
  headers: {
    "Accept-Ranges": "bytes",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; application/octet-stream",
    "Access-Control-Allow-Headers": "Content-Type",
    "Accept": "application/json , text/plain, application/octet-stream , */*",
    "Vary": "Origin , Access-Control-Request-Headers , Access-Control-Request-Method",
  },
  //   timeout: 10000,
});
// trước khi gửi thì thực hiện code này mới gửi đi
// instance.interceptors.request.use(
//     function  (config)  {
//         // const token = localStorage.getItem("token");
//         // console.log(token);
//         // if (token) {
//         //     config.headers.Authorization = `Bearer ${token}`;
//         // }
//         const toklen = localStorage.getItem("persist:auth");
//         return config;
//     },
//    function (error)  {

//         return Promise.reject(error);
//     }
// );
//gửi lên server xong thì thực hiện code này
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // const token =
    //   localStorage.getItem("persist:auth") &&
    //   JSON.parse(localStorage.getItem("persist:auth")).token.split('"')[1];
    // config.headers.Authorization = `Bearer ${token}`;
    // console.log(token);

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
//trả về  respond mới về thì thực hiện code này xong mới trả về cho client
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // refesh token
    return response;
  },
  function (error) {
    // return error;

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // error.response.data = {
    //   msg: error.response.data.mes || error.response.data.message,
    // };
    return Promise.reject(error);
  }
);

export default instance;
