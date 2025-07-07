import actionTypes from "../actions/actionTypes";

const initState = {
    listSfx: null,
    listSfxCategories: null,
    counts: 0,
    listSearchSfx: null,
}

const sfxReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_SFX:
            
            return {
                ...state,
                listSfx: action.data || null,
                counts: action.counts || 0,
            }
        case actionTypes.GET_LIST_SFX:
            return {
                ...state,
                listSfx: action.data || null,
                counts: action.counts || 0,
            }
        case actionTypes.GET_ALL_SFXCATEGORY:
            return {
                ...state,
                listSfxCategories: action.data || null,
                counts: action.counts || 0,
            }
        case actionTypes.SEARCH_SFX_BY_TITLE:
            return {
                ...state,
                listSearchSfx: action.data || null,
            }

        default:
            return state;
    }
}

export default sfxReducer;