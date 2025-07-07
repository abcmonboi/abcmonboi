import actionTypes from "../actions/actionTypes";

const initState = {
    song : [],
    NewReleaseSong : [],
    sfxCategories : [],
    isShowModal : false,
    modalData : {},
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_SONG:
            return {
                ...state,
                song: action.data,
            };
            case actionTypes.GET_NEW_RELEASES:
            return {
                ...state,
                NewReleaseSong: action.data,
            };
            case actionTypes.GET_SFXCATEGORIES:
            return {
                ...state,
                sfxCategories: action.data,
            };
            case actionTypes.GET_NEW_ALBUMS:
            return {
                ...state,
                topAlbum: action.data,
            };
            case actionTypes.SET_IS_SHOWMODAL:
                return {
                    ...state,
                    isShowModal: action.flag 
                }
            case actionTypes.SET_MODAL_DATA:
                return {
                    ...state,
                    modalData: action.data
                }
    
        default:
            return state;
    }
}

export default appReducer;