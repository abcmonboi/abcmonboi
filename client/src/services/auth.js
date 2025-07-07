import axiosConfig from '../axiosConfig';
export const apiRegister = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: '/api/user/register',
            data: payload,
            withCredentials: true,
        })
        // console.log(response);
        resolve(response);

    } catch (error) {
        // response = error.response.data;
        // console.log(error.response.data);  

        reject(error);

    }
});
export const apiLogin = (payload) => new Promise(async (resolve, reject) => {

    try {

        const response = await axiosConfig({
            method: 'POST',
            url: '/api/user/login',
            data: payload
        })
        resolve(response);

    } catch (error) {
        // return error;
        //  console.log(error);
        reject(error);
        // return error.response.data;
    }
});

export const apiLogout = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: '/api/user/logout'
        })
        resolve(response);
        console.log(response);
    } catch (error) {
        reject(error);

    }
});
export const apiForgotPassword = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: '/api/user/forgotpassword',
            data: data
        })
        resolve(response);
        
    } catch (error) {
        reject(error);
    }
}
);
export const apiResetPassword = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'PUT',
            url: '/api/user/resetpassword',
            data: payload
        })
        resolve(response);

        
    } catch (error) {
        reject(error);
    }
}
);