import actionTypes from "../actions/actionTypes";

const initState = {
    listArtist: null,
    counts: 0,
    listSearchArtist: null,
}

const artistReducer = (state = initState, action) => {

    switch (action.type) {
     
        case actionTypes.GET_ALL_ARTISTS:
            
            return {
                ...state,
                listArtist: action.data ,
                counts: action.counts || 0,
            }
        
        case actionTypes.SEARCH_ARTIST_BY_NAME:
            return {
                ...state,
                listSearchArtist: action.data || null,
            }
        default:
            return state;
    }
}

export default artistReducer;