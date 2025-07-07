import actionTypes from "./actionTypes";
import * as api from "../../apis";

export const getAllArtist = () => async (dispatch) => {
    try {
        const response = await api.apiGetAllArtist();
        if (response?.data.err === 0 || response?.data.err === undefined) {

            //handle success
            dispatch({
                type: actionTypes.GET_ALL_ARTISTS,
                data: response.data.data,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.GET_ALL_ARTISTS,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_ARTISTS,
            data: null,
        });
    }
};
export const SearchArtistByName = (name) => async (dispatch) => {
    try {
        const response = await api.apiSearchArtistByName(name);
        if (response?.data.err === 0 || response?.data.err === undefined) {
            //handle success
            dispatch({
                type: actionTypes.SEARCH_ARTIST_BY_NAME,
                data: response.data.data,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.SEARCH_ARTIST_BY_NAME,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.SEARCH_ARTIST_BY_NAME,
            data: null,
        });
    }
};