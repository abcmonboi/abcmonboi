import actionTypes from "../actions/actionTypes";

const initState = {
    listAlbum: null,
    counts: 0,
    listSearchAlbum: null,
}

const songReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_ALBUMS:
            
            return {
                ...state,
                listAlbum: action.data || null,
                counts: action.counts || 0,
            }
        case actionTypes.GET_LIST_ALBUMS:
            return {
                ...state,
                listAlbum: action.data || null,
                counts: action.counts || 0,
            }
        case actionTypes.SEARCH_ALBUM_BY_TITLE:
            return {
                ...state,
                listSearchAlbum: action.data || null,
            }
        default:
            return state;
    }
}

export default songReducer;