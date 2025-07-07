import actionTypes from "../actions/actionTypes";

const initState = {
  currentSongID: null,
  isPlaying: false,
  atAlbum: false,
  songs:null,
  update: false,
  listSearchSong: null,
  fileList : null,
};

const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_SONG_ID:
      return {
        ...state,
        currentSongID: action.sid || null,
      };
    case actionTypes.SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.flag,
        update : !state.update
      };
    case actionTypes.SET_ALBUM:
      return {
        ...state,
        atAlbum: action.flag,
      };
    case actionTypes.PLAYLIST:
        
        return {
            ...state,
            songs: action.songs || null,
        };
    case actionTypes.SEARCH_CURRENT_LIST_SONGS:
      return {
        ...state,
        listSearchSong: action.listSearchSong || null,
      };
    case actionTypes.DOWNLOAD_MANAGER:
      return {
        ...state,
        fileList: action.fileList || null,
      };
    default:
      return state;
  }
};

export default musicReducer;
