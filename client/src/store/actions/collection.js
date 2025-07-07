import actionTypes from "./actionTypes";
import * as api from "../../apis";
export const getAllMusicCollection = (page,limit,sort,fields) => async (dispatch) => {
    try {
        const response = await api.apiGetAllMusicCollection(page,limit,sort,fields);
        if (response?.data.err === 0 || response?.data.err === undefined) {
            dispatch({
                type: actionTypes.GET_ALL_MUSICCOLLECTIONS_HOME,
                data: response.data.data,
                counts : response.data.counts,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.GET_ALL_MUSICCOLLECTIONS_HOME,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_MUSICCOLLECTIONS_HOME,
            data: null,
        });
    }
};
export const getAllSfxCollection = (page,limit,sort,fields) => async (dispatch) => {
    try {
        const response = await api.apiGetAllSfxCollection(page,limit,sort,fields);
        if (response?.data.err === 0 || response?.data.err === undefined) {
            dispatch({
                type: actionTypes.GET_ALL_SFXCOLLECTIONS_HOME,
                data: response.data.data,
                counts : response.data.counts,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.GET_ALL_SFXCOLLECTIONS_HOME,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_SFXCOLLECTIONS_HOME,
            data: null,
        });
    }
};
export const SearchCollectionByTitle = (title) => async (dispatch) => {
    try {
        const response = await api.apiSearchCollectionByTitle(title);
        if (response?.data.err === 0 || response?.data.err === undefined) {
            //handle success
            dispatch({
                type: actionTypes.SEARCH_COLLECTION_BY_TITLE,
                data: response.data.data,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.SEARCH_COLLECTION_BY_TITLE,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.SEARCH_COLLECTION_BY_TITLE,
            data: null,
        });
    }
};
export const getNewReleaseCollection = (page,limit,sort,fields) => async (dispatch) => {
    try {
        const response = await api.apiGetAllCollection(page,limit,sort,fields);
        if (response?.data.err === 0 || response?.data.err === undefined) {
            dispatch({
                type: actionTypes.GET_NEW_RELEASES_COLLECTIONS,
                data: response.data.data,
                counts : response.data.counts,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.GET_NEW_RELEASES_COLLECTIONS,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_RELEASES_COLLECTIONS,
            data: null,
        });
    }
};
