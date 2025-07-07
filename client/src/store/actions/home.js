import actionTypes from "./actionTypes";
import * as api from "../../apis";
export const getSong = () => async (dispatch) => {
    try {
        const response = await api.getSong();
        if (response?.data.err === 0 || response?.data.err === undefined) {
            //handle success
            dispatch({
                type: actionTypes.GET_SONG,
                data: response.data,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.GET_SONG,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.GET_SONG,
            data: null,
        });
    }
};

export const getCurrentUser = () => async (dispatch) => {
    try {
        const response = await api.getCurrentUser();
    
      
        if (response?.data?.err === 0 || response?.data.err === undefined) {
            // console.log(response.data.rs);
            dispatch({
                type: actionTypes.GET_CURRENT_USER,
                data: response.data.rs,
                success : response?.data?.success
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.GET_CURRENT_USER_FAIL,
                data: null,
                success : response?.data?.success
            });
        }
    }
    catch (error) {
    
        dispatch({
            type: actionTypes.GET_CURRENT_USER_FAIL,
            data: null,
            success : error.response?.data?.success
        });
    }
}

export const getNewRelease = (sort) => async (dispatch) => {
    try {
        const response = await api.getNewRelease(sort);
        if (response?.data.err === 0 || response?.data.err === undefined) {
            //handle success
            dispatch({
                type: actionTypes.GET_NEW_RELEASES,
                data: response.data,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.GET_NEW_RELEASES,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_RELEASES,
            data: null,
        });
    }
};
export const getSfxCategories = () => async (dispatch) => {
    try {
        const response = await api.apiGetAllSfxCategory("","","","");
        if (response?.data.err === 0 || response?.data.err === undefined) {
            //handle success
            dispatch({
                type: actionTypes.GET_SFXCATEGORIES,
                data: response.data.data,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.GET_SFXCATEGORIES,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_RELEASES,
            data: null,
        });
    }
};
export const SearchMusicByTitle = (title) => async (dispatch) => {
    try {
        const response = await api.apiSearchSongByTitle(title);
        if (response?.data.err === 0 || response?.data.err === undefined) {
            //handle success
            dispatch({
                type: actionTypes.SEARCH_MUSIC_BY_TITLE,
                data: response.data.data,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.SEARCH_MUSIC_BY_TITLE,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.SEARCH_MUSIC_BY_TITLE,
            data: null,
        });
    }
};

export const getNewAlbum = () => async (dispatch) => {
    try {
        const response = await api.apiGetTopAlbum();
        if (response?.data.err === 0 || response?.data.err === undefined) {
            //handle success
            dispatch({
                type: actionTypes.GET_NEW_ALBUMS,
                data: response.data.data,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.GET_NEW_ALBUMS,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_ALBUMS,
            data: null,
        });
    }
};
export const setIsShowModal = (flag) => ({
    type: actionTypes.SET_IS_SHOWMODAL,
    flag
  
 });
 export const setModalData = (data) => ({
    type: actionTypes.SET_MODAL_DATA,
    data
 });