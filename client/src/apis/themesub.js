import axiosConfig from "../axiosConfig";

export const apiCreateSubTheme = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/themesub",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateSubTheme = (tid, payload) =>
  new Promise(async (resolve, reject) => {

    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/themesub/${tid}`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetSubTheme = (tid,params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/themesub/${tid}`,
        params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetSubThemeBySlug = (slug,params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/themesub/slug/${slug}`,
        params
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAllSubTheme = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/themesub`,
        params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiDeleteSubTheme = (tid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/themesub/${tid}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

