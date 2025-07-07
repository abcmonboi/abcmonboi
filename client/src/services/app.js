import axiosDefault from 'axios';

export const apiGetProvincesAddress = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'GET',
            url: 'https://vapi.vnappmob.com/api/province/',
        
        })
        // console.log(response);
        resolve(response);

    } catch (error) {
        // console.log(error.response.data);  
        reject(error);

    }
});
export const apiGetDistrictsAddress = (province_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'GET',
            url: `https://vapi.vnappmob.com/api/province/district/${province_id}`,
        
        })
        // console.log(response);
        resolve(response);

    } catch (error) {
        // console.log(error.response.data);  
        reject(error);

    }
});

export const apiGetWardsAddress = (district_id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'GET',
            url: `https://vapi.vnappmob.com/api/province/ward/${district_id}`,
        
        })
        // console.log(response);
        resolve(response);

    } catch (error) {
        // console.log(error.response.data);  
        reject(error);

    }
});
export const apiUploadAvatar = (image) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'POST',
            url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/raw/upload`,
            data: image,
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // }
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});