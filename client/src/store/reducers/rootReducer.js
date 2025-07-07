import authReducer from "./authReducer";
import userReducer from "./userReducer";
import appReducer from "./appReducer";
import musicReducer from "./musicReducer";
import songReducer from "./songReducer";
import albumReducer from "./albumReducer";
import artistReducer from "./artistReducer";
import sfxReducer from "./sfxReducer";
import collectionReducer from "./collectionReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2,
};

const authConfig = {
    ...commonConfig,
    key: "auth",
    whitelist: ["isLoggedIn", "token"],
};
const musicConfig = {
    ...commonConfig,
    key: ["music"],
    whitelist: ["currentSongID"],
};


const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
    app: appReducer,
    music: persistReducer(musicConfig, musicReducer),
    song: songReducer,
    album: albumReducer,
    artist: artistReducer,
    sfx: sfxReducer,
    collection : collectionReducer,
});


export default rootReducer;