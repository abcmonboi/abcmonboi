import axiosConfig from "../axiosConfig";

export const apiGetAllSfxCategory = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/sfxCategory",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAllSfxCategories = (page, limit, sort, fields) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/sfxCategory?limit=${limit}&page=${page}&sort=${sort}&fields=${fields}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetSfxCategoryBySlug = (slug) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/sfxCategory/slug/${slug}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiCreateSfxCategory = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/sfxCategory/",
        data: data,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateSfxCategory = (id, data) =>
  new Promise(async (resolve, reject) => {

    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/sfxCategory/${id}`,
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
  export const apiDeleteSfxCategory = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/sfxCategory/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
  export const apiGetSfxCategoryById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/sfxCategory/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAllSfx = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/sfx`,
        params
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetAllSfxByArtistSlug = (slug) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/sfx/artist/${slug}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apigetAllSfxByCateSlug = (slug) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/sfx/categories/${slug}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiCreateSfx = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/sfx/",
        data: data,
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiDeleteSfx = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/sfx/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetSfxById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/sfx/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateSfx = (id, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/sfx/${id}`,
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiSearchSfxByTitle = (title) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/sfx/search/${title}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetDetailSfxBySlug = (slug) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/sfx/slug/${slug}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetSmilarSfx = (slug) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/sfx/sfxCategory/${slug}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateSfxListen = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/sfx/${sid}/listen`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateSfxDownloads = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/sfx/${sid}/downloads`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
