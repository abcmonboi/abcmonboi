import actionTypes from "../actions/actionTypes";

const initState = {
    listMusicCollectionsHome: null,
    listSfxCollectionsHome: null,
    counts: 0,
    listSearchMusicCollection: null,
    listSearchSfxCollection: null,
    NewReleaseCollections: null,
}

const collectionReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_MUSICCOLLECTIONS_HOME:
            
            return {
                ...state,
                listMusicCollectionsHome: action.data || null,
                counts: action.counts || 0,
            }
        case actionTypes.GET_ALL_SFXCOLLECTIONS_HOME:
            
            return {
                ...state,
                listSfxCollectionsHome: action.data || null,
                counts: action.counts || 0,
            }
        case actionTypes.SEARCH_COLLECTION_BY_TITLE:
           return {
                ...state,
                listSearchMusicCollection: action.data.musicCollections || null,
                listSearchSfxCollection: action.data.sfxCollections || null,
            }
        case actionTypes.GET_NEW_RELEASES_COLLECTIONS:
            return {
                ...state,
                NewReleaseCollect: action.data || null,
            }
        default:
            return state;
    }
}

export default collectionReducer;