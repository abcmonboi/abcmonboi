import actionTypes from "./actionTypes";
import * as api from "../../apis";
export const getAllAlbum = (page,limit,sort,fields) => async (dispatch) => {
    try {
        const response = await api.apiGetAllAlbum(page,limit,sort,fields);
        if (response?.data.err === 0 || response?.data.err === undefined) {
            dispatch({
                type: actionTypes.GET_ALL_ALBUMS,
                data: response.data.data,
                counts : response.data.counts,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.GET_ALL_ALBUMS,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_ALBUMS,
            data: null,
        });
    }
};
export const getListAlbum = () => async (dispatch) => {
    try {
        const response = await api.apiGetListAlbum();
        if (response?.data.err === 0 || response?.data.err === undefined) {
            dispatch({
                type: actionTypes.GET_LIST_ALBUMS,
                data: response.data.data,
                counts : response.data.counts,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.GET_LIST_ALBUMS,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.GET_LIST_ALBUMS,
            data: null,
        });
    }
};
export const SearchAlbumByTitle = (title) => async (dispatch) => {
    try {
        const response = await api.apiSearchAlbumByTitle(title);
        if (response?.data.err === 0 || response?.data.err === undefined) {
            //handle success
            dispatch({
                type: actionTypes.SEARCH_ALBUM_BY_TITLE,
                data: response.data.data,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.SEARCH_ALBUM_BY_TITLE,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.SEARCH_ALBUM_BY_TITLE,
            data: null,
        });
    }
};