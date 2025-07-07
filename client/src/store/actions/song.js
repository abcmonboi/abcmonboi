import actionTypes from "./actionTypes";
import * as api from "../../apis";
export const getAllSong = (page,limit,sort,fields) => async (dispatch) => {
    try {
        const response = await api.apiGetAllSong(page,limit,sort,fields);
        if (response?.data.err === 0 || response?.data.err === undefined) {
            dispatch({
                type: actionTypes.GET_ALL_SONGS,
                data: response.data.data,
                counts : response.data.counts,
            });
        }
        else {
            //handle error
            dispatch({
                type: actionTypes.GET_ALL_SONGS,
                data: null,
            });
        }
    }
    catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_SONGS,
            data: null,
        });
    }
};
