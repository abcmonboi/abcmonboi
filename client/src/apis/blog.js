import axiosConfig from "../axiosConfig";

export const apiCreateBlog = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/blog/",
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetBlog = (bid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/blog/${bid}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetBlogBySlug = (slug) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/blog/slug/${slug}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAllBlog = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/blog`,
        params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateBlog = (bid, data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/blog/${bid}`,
        data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiDeleteBlog = (bid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/blog/${bid}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
