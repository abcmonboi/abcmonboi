import axiosConfig from '../axiosConfig';

export const apiCreateAlbum = (data) => new Promise(async (resolve, reject) => {
    try {

        const response = await axiosConfig({
            method: 'POST',
            url: '/api/album/',
            data : data
        })
    
        resolve(response);
      
        
    } catch (error) {
        reject(error);
    }
});
export const apiUpdateAlbum = (id,data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'PUT',
            url: `/api/album/${id}`,
            data : data
        })
        resolve(response);
        
    } catch (error) {
        reject(error);
    }
});
export const apiDeleteAlbum = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'DELETE',
            url: `/api/album/${id}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAllAlbum = (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/album`,
            params: params

   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetTopAlbum = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: '/api/album/?limit=12&sort=-createdAt&isActive=true'
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetListAlbum = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/album/?isActive=true`
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAlbumById = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/album/${id}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAlbumBySlug = (slug) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/album/slug/${slug}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAlbumByArtistId = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/album/artist/${id}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
}
);
export const apigetAllAlbumByArtistSlug = (slug) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/album/artist/slug/${slug}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiSearchAlbumByTitle = (title) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/album/search/${title}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
}
)