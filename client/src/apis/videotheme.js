import axiosConfig from "../axiosConfig";

export const apiCreateVideoTheme = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/videotheme",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAllVideoTheme = (page, limit, sort, fields) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/videotheme?limit=${limit}&page=${page}&sort=${sort}&fields=${fields}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiDeleteVideoTheme = (mid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/videotheme/${mid}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetVideoTheme = (mid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/videotheme/${mid}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateVideoTheme = (mid, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/videotheme/${mid}`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
