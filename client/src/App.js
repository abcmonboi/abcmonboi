import { Routes, Route, Navigate } from "react-router";
import {
  Signin,
  Signup,
  Artist,
  Albums,
  ForgotPassword,
  PageError,
  DetailsAlbum,
  Music,
  Home,
  SearchAll,
  SearchSong,
  FinalRegister,
  ResetPassword,
  Privacy,
  DetailsSong,
  DetailsSfx,
  Themes,
  DetailsThemes,
  DetailsSubThemes,
  SearchSubTheme,
  SfxCollection,
  MusicCollection,
  License,
  BlogHome,
  Blog,
  BlogByCate,
  // SearchBlog,
  BlogDetails,
  EmbedMusic,
  EmbedPlaylist,
} from "./containers/Public";
import Public from "./containers/Public/Public";
import { path } from "ultils/constant";
import {
  System,
  EditProfile,
  Profile,
  // AccountSettings,
  Admin,
  ManageDetailsAlbum,
  ManageSubTheme,
  ManageAllSubTheme,
  AddSubTheme,
  ManageUser,
  ManageLicense,
  AddLicense,
  AddBlog,
  ManageBlog,
  AddBlogCategory,
  ManageBlogCategory,
} from "./containers/System/";
import Dashboard from "./containers/System/Admin/Dashboard";
import { Song } from "./containers/System/Admin/Song";
import AddSong from "./containers/System/Admin/AddSong";
import Genre from "./containers/System/Admin/Genre";
import AddGenre from "./containers/System/Admin/AddGenre";
import SFXCategory from "./containers/Public/SFXCategory";
import ManageArtist from "./containers/System/Admin/ManageArtist";
import AddArtist from "./containers/System/Admin/AddArtist";
import ManageAlbum from "./containers/System/Admin/ManageAlbum";
import AddAlbum from "./containers/System/Admin/AddAlbum";
import ManageSfx from "./containers/System/Admin/ManageSfx";
import AddSfx from "./containers/System/Admin/AddSfx";
import ManageSfxCategory from "./containers/System/Admin/ManageSfxCategory";
import AddSfxCategory from "./containers/System/Admin/AddSfxCategory";
import ManageCollection from "./containers/System/Admin/ManageCollection";
import AddCollection from "./containers/System/Admin/AddCollection";
import { DetailsArtist } from "./containers/Public/DetailsArtist";
import SearchArtist from "./containers/Public/SearchArtist";
import SearchAlbum from "./containers/Public/SearchAlbum";
import SearchCollections from "./containers/Public/SearchCollections";
import SearchSfx from "./containers/Public/SearchSfx";
import Collections from "./containers/Public/Collections";
import DetailsCollection from "./containers/Public/DetailsCollection";
import DetailsSfxCategory from "./containers/Public/DetailsSfxCategory";
import ManageMood from "./containers/System/Admin/ManageMood";
import AddMood from "./containers/System/Admin/AddMood";
import ManageInstrument from "./containers/System/Admin/ManageInstrument";
import AddInstrument from "./containers/System/Admin/AddInstrument";
import ManageVideoTheme from "./containers/System/Admin/ManageVideoTheme";
import AddVideoTheme from "./containers/System/Admin/AddVideoTheme";
import MoodMusic from "./containers/Public/Music/Mood";
import GenreMusic from "./containers/Public/Music/Genre";
import VideoTheme from "./containers/Public/Music/VideoTheme";
import Instrument from "./containers/Public/Music/Instrument";
function App() {
  return (
    <Routes>
      <Route path={path.PUBLIC} element={<Public />}>
        <Route index element={<Home />} />
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.MUSIC} element={<Music />} />
        <Route path={path.MOOD_MUSIC} element={<MoodMusic />} />
        <Route path={path.GENRE_MUSIC} element={<GenreMusic />} />
        <Route path={path.VIDEO_THEME_MUSIC} element={<VideoTheme />} />
        <Route path={path.INSTRUMENT_MUSIC} element={<Instrument />} />

        <Route path={path.DETAIL_MUSIC} element={<DetailsSong />} />
        <Route path={path.SOUND_EFFECT} element={<SFXCategory />} />
        <Route path={path.DETAIL_SFX} element={<DetailsSfx />} />
        <Route
          path={path.DETAIL_SFXCATEGORY}
          element={<DetailsSfxCategory />}
        />
        <Route path={path.ALBUMS} element={<Albums />} />
        <Route path={path.DETAIL_ALBUM} element={<DetailsAlbum />} />
        <Route path={path.COLLECTIONS} element={<Collections />} />
        <Route path={path.MUSIC_COLLECTIONS} element={<MusicCollection />} />
        <Route path={path.SFX_COLLECTIONS} element={<SfxCollection />} />

        <Route path={path.DETAIL_COLLECTION} element={<DetailsCollection />} />
        <Route path={path.ARTISTS} element={<Artist />} />
        <Route path={path.DETAIL_ARTIST} element={<DetailsArtist />} />
        <Route path={path.THEMES} element={<Themes />} />
        <Route path={path.DETAIL_THEME} element={<DetailsThemes />} />
        <Route path={path.SUBTHEMES} element={<DetailsSubThemes />} />
        <Route path={path.LICENSE} element={<License />} />

        <Route path={path.SEARCH} element={<SearchAll />}>
          <Route path={path.SEARCH_SONG} element={<SearchSong />} />
          <Route path={path.SEARCH_ARTIST} element={<SearchArtist />} />
          <Route path={path.SEARCH_ALBUM} element={<SearchAlbum />} />
          <Route
            path={path.SEARCH_COLLECTION}
            element={<SearchCollections />}
          />
          <Route path={path.SEARCH_SFX} element={<SearchSfx />} />
          <Route path={path.SEARCH_SUBTHEME} element={<SearchSubTheme />} />
        </Route>
      </Route>

      {/* User */}
      <Route path={path.USER.HOME} element={<System />}>
        <Route path={path.USER.PROFILE} element={<Profile />} />
        <Route path={path.USER.EDIT_PROFILE} element={<EditProfile />} />
        <Route path={path.USER.PRIVACY_SETTINGS} element={<Privacy />} />
        {/* <Route
          path={path.USER.ACCOUNT_SETTINGS}
          element={<AccountSettings />}
        /> */}
      </Route>

      <Route path={path.ADMIN.HOME} element={<Admin></Admin>}>
        <Route index element={<Navigate to="/admin/dashboard" />} />
        <Route path={path.ADMIN.DASHBOARD} element={<Dashboard />} />
        <Route path={path.ADMIN.SONG} element={<Song />} />
        <Route path={path.ADMIN.SONG_PAGE} element={<Song />} />
        <Route
          path={path.ADMIN.ADD_SONG}
          element={<AddSong modeEdit={false} />}
        />
        <Route
          path={path.ADMIN.EDIT_SONG}
          element={<AddSong modeEdit={true} />}
        />
        <Route path={path.ADMIN.SFX} element={<ManageSfx />} />
        <Route path={path.ADMIN.SFX_PAGE} element={<ManageSfx />} />
        <Route
          path={path.ADMIN.ADD_SFX}
          element={<AddSfx modeEdit={false} />}
        />
        <Route
          path={path.ADMIN.EDIT_SFX}
          element={<AddSfx modeEdit={true} />}
        />
        <Route path={path.ADMIN.SFXCATEGORY} element={<ManageSfxCategory />} />
        <Route
          path={path.ADMIN.SFXCATEGORY_PAGE}
          element={<ManageSfxCategory />}
        />
        <Route
          path={path.ADMIN.ADD_SFXCATEGORY}
          element={<AddSfxCategory modeEdit={false} />}
        />
        <Route
          path={path.ADMIN.EDIT_SFXCATEGORY}
          element={<AddSfxCategory modeEdit={true} />}
        />
        <Route
          path={path.ADMIN.MUSICCOLLECTION}
          element={<ManageCollection collection={"music"} />}
        />
        <Route
          path={path.ADMIN.MUSICCOLLECTION_PAGE}
          element={<ManageCollection collection={"music"} />}
        />
        <Route
          path={path.ADMIN.ADD_MUSICCOLLECTION}
          element={<AddCollection modeEdit={false} collection={"music"} />}
        />
        <Route
          path={path.ADMIN.EDIT_MUSICCOLLECTION}
          element={<AddCollection modeEdit={true} collection={"music"} />}
        />
        <Route
          path={path.ADMIN.SFXCOLLECTION}
          element={<ManageCollection collection={"sfx"} />}
        />
        <Route
          path={path.ADMIN.SFXCOLLECTION_PAGE}
          element={<ManageCollection collection={"sfx"} />}
        />
        <Route
          path={path.ADMIN.ADD_SFXCOLLECTION}
          element={<AddCollection modeEdit={false} collection={"sfx"} />}
        />
        <Route
          path={path.ADMIN.EDIT_SFXCOLLECTION}
          element={<AddCollection modeEdit={true} collection={"sfx"} />}
        />
        <Route path={path.ADMIN.ARTIST} element={<ManageArtist />} />
        <Route
          path={path.ADMIN.ADD_ARTIST}
          element={<AddArtist modeEdit={false} />}
        />
        <Route
          path={path.ADMIN.EDIT_ARTIST}
          element={<AddArtist modeEdit={true} />}
        />
        <Route path={path.ADMIN.ALBUM} element={<ManageAlbum />} />
        <Route path={path.ADMIN.ALBUM_PAGE} element={<ManageAlbum />} />
        <Route
          path={path.ADMIN.ADD_ALBUM}
          element={<AddAlbum modeEdit={false} />}
        />
        <Route
          path={path.ADMIN.EDIT_ALBUM}
          element={<AddAlbum modeEdit={true} />}
        />
        <Route
          path={path.ADMIN.MANAGE_DETAIL_ALBUM}
          element={<ManageDetailsAlbum />}
        />
        <Route path={path.ADMIN.GENRE} element={<Genre />} />
        <Route
          path={path.ADMIN.ADD_GENRE}
          element={<AddGenre modeEdit={false} />}
        />
        <Route
          path={path.ADMIN.EDIT_GENRE}
          element={<AddGenre modeEdit={true} />}
        />
        {/* Mood */}
        <Route path={path.ADMIN.MOOD} element={<ManageMood />} />
        <Route path={path.ADMIN.MOOD_PAGE} element={<ManageMood />} />
        <Route
          path={path.ADMIN.ADD_MOOD}
          element={<AddMood modeEdit={false} />}
        />
        <Route
          path={path.ADMIN.EDIT_MOOD}
          element={<AddMood modeEdit={true} />}
        />
        {/* Instrument */}
        <Route path={path.ADMIN.INSTRUMENT} element={<ManageInstrument />} />
        <Route
          path={path.ADMIN.INSTRUMENT_PAGE}
          element={<ManageInstrument />}
        />
        <Route
          path={path.ADMIN.ADD_INSTRUMENT}
          element={<AddInstrument modeEdit={false} />}
        />
        <Route
          path={path.ADMIN.EDIT_INSTRUMENT}
          element={<AddInstrument modeEdit={true} />}
        />
        {/* Instrument */}
        {/* Theme */}
        <Route path={path.ADMIN.THEME} element={<ManageVideoTheme />} />
        <Route path={path.ADMIN.THEME_PAGE} element={<ManageVideoTheme />} />
        <Route
          path={path.ADMIN.ADD_THEME}
          element={<AddVideoTheme modeEdit={false} />}
        />
        <Route
          path={path.ADMIN.EDIT_THEME}
          element={<AddVideoTheme modeEdit={true} />}
        />
        <Route path={path.ADMIN.MANAGE_THEMESUB} element={<ManageSubTheme />} />
        {/* Theme */}
        {/* SubTheme */}
        <Route path={path.ADMIN.SUBTHEME} element={<ManageAllSubTheme />} />

        <Route
          path={path.ADMIN.ADD_SUBTHEME}
          element={<AddSubTheme modeEdit={false} />}
        />
        <Route
          path={path.ADMIN.EDIT_SUBTHEME}
          element={<AddSubTheme modeEdit={true} />}
        />

        {/* SubTheme */}
        <Route path={path.ADMIN.COMPOSER} element={<p>COMPOSER</p>} />
        <Route path={path.ADMIN.ADD_COMPOSER} element={<p>Add COMPOSER</p>} />

        {/* Manage User */}
        <Route path={path.ADMIN.MANAGERUSER} element={<ManageUser />} />
        {/* Manage License */}
        <Route path={path.ADMIN.MANAGELICENSE} element={<ManageLicense />} />
        <Route
          path={path.ADMIN.ADD_LICENSE}
          element={<AddLicense modeEdit={false} />}
        />
        <Route
          path={path.ADMIN.EDIT_LICENSE}
          element={<AddLicense modeEdit={true} />}
        />
        {/* Manage Blog */}
        <Route path={path.ADMIN.MANAGEBLOG} element={<ManageBlog />} />
        <Route
          path={path.ADMIN.ADD_BlOG}
          element={<AddBlog modeEdit={false} />}
        />
        <Route
          path={path.ADMIN.EDIT_BlOG}
          element={<AddBlog modeEdit={true} />}
        />
        {/* Manage BlogCategory */}
        <Route
          path={path.ADMIN.MANAGEBLOGCATEGORY}
          element={<ManageBlogCategory />}
        />
        <Route
          path={path.ADMIN.ADD_BlOGCATEGORY}
          element={<AddBlogCategory modeEdit={false} />}
        />
        <Route
          path={path.ADMIN.EDIT_BlOGCATEGORY}
          element={<AddBlogCategory modeEdit={true} />}
        />
      </Route>
      <Route path="*" element={<PageError />} />
      <Route path={path.SIGNIN} element={<Signin />} />
      <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
      <Route path={path.SIGNNUP} element={<Signup />} />
      <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={path.BLOG} element={<Blog />}>
        <Route index element={<BlogHome />} />
        <Route path={path.BLOG_HOME} element={<BlogHome />} />
        <Route path={path.BLOG_BY_CATEGORY} element={<BlogByCate />} />
        <Route path={path.BLOG_DETAIL} element={<BlogDetails />} />
      </Route>
      <Route path={path.EMBED_MUSIC} element={<EmbedMusic />} />
      <Route path={path.EMBED_ALBUM} element={<EmbedPlaylist />} />
      <Route path={path.EMBED_SUBTHEMES} element={<EmbedPlaylist />} />
      <Route path={path.EMBED_COLLECTION} element={<EmbedPlaylist />} />
      <Route path={path.EMBED_SFX} element={<EmbedMusic />} />

      
    </Routes>
  );
}

export default App;
