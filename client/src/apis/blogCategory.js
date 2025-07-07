import axiosConfig from "../axiosConfig";

export const apiCreateBlogCategory = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/blogCategory/",
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetBlogCategory = (bcid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/blogCategory/${bcid}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetBlogCategoryBySlug = (slug) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/blogCategory/slug/${slug}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAllBlogCategory = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/blogCategory`,
        params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateBlogCategory = (bcid, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/blogCategory/${bcid}`,
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiDeleteBlogCategory = (bcid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/blogCategory/${bcid}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
