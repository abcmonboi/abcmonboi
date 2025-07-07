import axiosConfig from "../axiosConfig";

export const apiCreateLicense = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/license/",
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetLicense = (lid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/license/${lid}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetLicenseBySlug = (slug) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/license/slug/${slug}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAllLicense = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/license`,
        params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateLicense = (lid, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/license/${lid}`,
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiDeleteLicense = (lid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/license/${lid}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
