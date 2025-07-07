import actionTypes from "./actionTypes";
import * as apis from "../../apis";


export const setCurrentSongId = (sid) => ({
   type: actionTypes.SET_CURRENT_SONG_ID,
   sid
});
export const setIsPlaying = (flag) => ({
   type: actionTypes.SET_IS_PLAYING,
   flag
 
});
export const playAlbum = (flag) => ({
   type: actionTypes.SET_ALBUM,
   flag
 
});
export const setPlaylist = (songs) => ({
   type: actionTypes.PLAYLIST,
   songs
 
});
export const setSearchListSong = (listSearchSong) => ({
   type: actionTypes.SEARCH_CURRENT_LIST_SONGS,
   listSearchSong
 
});
export const setDownload = (fileList,downloadInfo) => ({
   type: actionTypes.DOWNLOAD_MANAGER,
   fileList,
 
});