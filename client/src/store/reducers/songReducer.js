import actionTypes from "../actions/actionTypes";

const initState = {
    listSong: null,
    counts: 0,
    listSearchSong: null,
    listFilter : null,
}

const songReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_SONGS:
            
            return {
                ...state,
                listSong: action.data || null,
                counts: action.counts || 0,
            }
        case actionTypes.SEARCH_MUSIC_BY_TITLE:
            return {
                ...state,
                listSearchSong: action.data || null,
            }
  
        default:
            return state;
    }
}

export default songReducer;