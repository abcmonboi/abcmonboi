import axiosConfig from '../axiosConfig';

export const apiGetAllMusicCollection = (page,limit,sort,fields) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/collection/music?limit=${limit}&page=${page}&sort=${sort}&fields=${fields}`
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAllMusicCollectionAvailable = (page,limit,sort,fields) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/collection/music?status=true&limit=${limit}&page=${page}&sort=${sort}&fields=${fields}`
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAllSfxCollection = (page,limit,sort,fields) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/collection/sfx?limit=${limit}&page=${page}&sort=${sort}&fields=${fields}`
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAllSfxCollectionAvailable = (page,limit,sort,fields) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/collection/sfx?status=true&limit=${limit}&page=${page}&sort=${sort}&fields=${fields}`
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAllCollection = (page,limit,sort,fields) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/collection?limit=${limit}&page=${page}&sort=${sort}&fields=${fields}`
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiFilterAllCollection = (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/collection`,
            params
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAllCollectionAvailable = (page,limit,sort,fields) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/collection?status=true&limit=${limit}&page=${page}&sort=${sort}&fields=${fields}`
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiDeleteCollection = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'DELETE',
            url: `/api/collection/${id}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiCreateCollection = (data) => new Promise(async (resolve, reject) => {
    try {

        const response = await axiosConfig({
            method: 'POST',
            url: '/api/collection/',
            data : data
        })
    
        resolve(response);
      
        
    } catch (error) {
        reject(error);
    }
});
export const apiUpdateCollection = (id,data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'PUT',
            url: `/api/collection/${id}`,
            data : data
        })
        resolve(response);
        
    } catch (error) {
        reject(error);
    }
});
export const apiGetCollectionById = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/collection/${id}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetCollection = (id,params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/collection/${id}`,
            params
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetCollectionBySlug = (slug,params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/collection/slug/${slug}`,
            params
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiSearchCollectionByTitle = (title) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/collection/search/${title}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
}
)
export const apiUpdateCollectionListen = (sid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'PUT',
            url: `/api/collection/${sid}/listen`,

   
        })
        resolve(response);
    } catch (error) {
        reject(error);

    }
});