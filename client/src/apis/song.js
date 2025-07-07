import axiosConfig from '../axiosConfig';
import axiosConfigAwsS3 from '../axiosConfigAwss3';


export const apiGetTopSong = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: '/api/song/?limit=30&sort=-updatedAt',
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetDetailSong = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/${id}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAllSong = (page,limit,sort,fields) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/?limit=${limit}&page=${page}&sort=${sort}&fields=${fields}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAllSongAvailable = (page,limit,sort,fields) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/?status=true&limit=${limit}&page=${page}&sort=${sort}&fields=${fields}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAllSongAvailablebyGenre = (page,limit,sort,fields,genre) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/?status=true&limit=${limit}&page=${page}&sort=${sort}&fields=${fields} ${genre === "" ? "" : `&genres=${genre}`}`
           
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});

export const apiGetAllSongAvailablebyVideoTheme = (page,limit,sort,fields,videoTheme) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/?status=true&limit=${limit}&page=${page}&sort=${sort}&fields=${fields} ${videoTheme === "" ? "" : `&videothemes=${videoTheme}`}`
           
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAllSongAvailablebyInstrument = (page,limit,sort,fields,instrument) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/?status=true&limit=${limit}&page=${page}&sort=${sort}&fields=${fields} ${instrument === "" ? "" : `&instruments=${instrument}`}`
           
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apigetAllSongByAlbumSlug = (slug) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/album/${slug}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apigetAllSongByArtistlug = (slug) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/artist/${slug}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiCreateSong = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'POST',
            url: '/api/song/',
            data: data 

      
   
        })
        resolve(response);
  

    } catch (error) {

        reject(error);

    }
});
export const apiDeleteSong = (sid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'DELETE',
            url: `/api/song/${sid}`
   
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiUpdateSong = (sid,payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'PUT',
            url: `/api/song/${sid}`,
            data: payload,

   
        })
        resolve(response);
    } catch (error) {
        reject(error);

    }
});
export const apiSearchSongByTitle = (title) => new Promise(async (resolve, reject) => {
    
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/search/${title}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
}
)
export const apiFilterSearchSong= (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/filter/`,
            params
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
}
)
export const apiGetAllSongAvailablebyMood = (page,limit,sort,fields,mood) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/?status=true&limit=${limit}&page=${page}&sort=${sort}&fields=${fields} ${mood === "" ? "" : `&moods=${mood}`}`
           
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAllSongByArtistFilter= (params) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/artists/`,
            params
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
}
)
export const apiGetHighestSongDuration= () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/?fields=duration,-_id,-artists,-genres,-moods,-videothemes,-album,-instruments&status=true&sort=-duration&limit=1`
            
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
}
)
export const apiGetLowestSongDuration= () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/?fields=duration,-_id,-artists,-genres,-moods,-videothemes,-album,-instruments&status=true&sort=duration&limit=1`
            
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
}
)
export const apiGetDetailSongBySlug = (slug) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/slug/${slug}`
        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiUpdateSongListen = (sid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'PUT',
            url: `/api/song/${sid}/listen`,

   
        })
        resolve(response);
    } catch (error) {
        reject(error);

    }
});
export const apiUpdateSongDownloads = (sid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'PUT',
            url: `/api/song/${sid}/downloads`,

   
        })
        resolve(response);
    } catch (error) {
        reject(error);

    }
});
export const apiGetSmilarSong = (slug) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'GET',
            url: `/api/song/genre/${slug}`

        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});
export const apiGetAmsS3Song= (urls3) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfigAwsS3({
            method: 'GET',
            url: `${urls3}`,
            responseType: 'blob',

        })
        resolve(response);

    } catch (error) {
        reject(error);

    }
});