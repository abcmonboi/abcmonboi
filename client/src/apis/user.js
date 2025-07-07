import axiosConfig from '../axiosConfig';


export const apiUpdateUser  = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'PUT',
            url: '/api/user/current',
            data: data
        
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetUsers  = (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: '/api/user/',
            params: params
        
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiUpdateUserbyAdmin  = (data,uid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'PUT',
            url: '/api/user/'+uid,
            data: data
        
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiDeleteUserbyAdmin  = (uid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'DELETE',
            url: '/api/user/'+uid,
        
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});