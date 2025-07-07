import axiosConfig from '../axiosConfig';



export const apiCreateGenre = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: '/api/genre',
            data: payload,
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAllGenre = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: '/api/genre',
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAllGenreByTitle = (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/genre`,
            params

   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiDeleteGenre = (gid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'DELETE',
            url: `/api/genre/${gid}`
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetGenre = (gid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/genre/${gid}`
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiUpdateGenre = (gid,payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'PUT',
            url: `/api/genre/${gid}`,
            data: payload,

   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
