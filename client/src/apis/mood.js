import axiosConfig from '../axiosConfig';



export const apiCreateMood = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: '/api/mood',
            data: payload,
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAllMood = (page,limit,sort,fields) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/mood?limit=${limit}&page=${page}&sort=${sort}&fields=${fields}`
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAllMoodByTitle = (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/mood`,
            params

   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiDeleteMood = (mid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'DELETE',
            url: `/api/mood/${mid}`
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetMood = (mid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/mood/${mid}`
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiUpdateMood = (mid,payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'PUT',
            url: `/api/mood/${mid}`,
            data: payload,

   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
