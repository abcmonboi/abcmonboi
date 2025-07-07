import axiosConfig from "../axiosConfig";

export const apiCreateArtist = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/artist",
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllArtist = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/artist",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiDeleteArtist = (aid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/artist/${aid}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetArtist = (aid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/artist/${aid}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetArtistBySlug = (slug) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/artist/slug/${slug}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdateArtist = (aid, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/artist/${aid}`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
  export const apiSearchArtistByName = (name) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/artist/search/${name}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
}
)