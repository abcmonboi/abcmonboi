import axiosConfig from "../axiosConfig";

export const apiCreateInstrument = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/instrument",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAllInstrument = (page, limit, sort, fields) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/instrument?limit=${limit}&page=${page}&sort=${sort}&fields=${fields}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetAllInstrumentByTitle = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/instrument`,
        params,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiDeleteInstrument = (mid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/instrument/${mid}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiGetInstrument = (mid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/instrument/${mid}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateInstrument = (mid, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/instrument/${mid}`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
