import actionTypes from "./actionTypes";
import * as api from "../../apis";
export const getAllSfx = (page,limit,sort,fields) => async (dispatch) => {
    try {
        const response = await api.apiGetAllSfx(page,limit,sort,fields);
        if (response?.data.err === 0 || response?.data.err === undefined) {
            dispatch({
                type: actionTypes.GET_ALL_SFX,
                data: response.data.data,
                counts : response.data.counts,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.GET_ALL_SFX,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_SFX,
            data: null,
        });
    }
};
export const getAllSfxCategories = (page,limit,sort,fields) => async (dispatch) => {
    try {
        const response = await api.apiGetAllSfxCategories(page,limit,sort,fields);
        if (response?.data.err === 0 || response?.data.err === undefined) {
            dispatch({
                type: actionTypes.GET_ALL_SFXCATEGORY,
                data: response.data.data,
                counts : response.data.counts,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.GET_ALL_SFXCATEGORY,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_SFX,
            data: null,
        });
    }
};
export const SearchSfxByTitle = (title) => async (dispatch) => {
    try {
        const response = await api.apiSearchSfxByTitle(title);
        if (response?.data.err === 0 || response?.data.err === undefined) {
            //handle success
            dispatch({
                type: actionTypes.SEARCH_SFX_BY_TITLE,
                data: response.data.data,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.SEARCH_SFX_BY_TITLE,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.SEARCH_SFX_BY_TITLE,
            data: null,
        });
    }
};
