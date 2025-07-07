import axiosConfig from "../axiosConfig";

export const apiCreateThemes = (payload) =>
  new Promise(async (resolve, reject) => {

    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/themes",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateTheme = (tid, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/themes/${tid}`,
        data:payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  }
  );
export const apiGetTheme = (tid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/themes/${tid}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetThemeBySlug = (slug) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/themes/slug/${slug}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAllThemes = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/themes`,
        params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiDeleteThemes = (tid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/themes/${tid}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

