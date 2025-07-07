require("babel-register")({
  presets: ["es2015", "react"],
});

const router = require("./router").default;
const Sitemap = require("react-router-sitemap").default;
const axios = require("axios");

async function generateSitemap() {
  const songs = await axios.get("http://localhost:5000/api/song?status=true");
  const albums = await axios.get("http://localhost:5000/api/album?isActive=true");
  const artists = await axios.get("http://localhost:5000/api/artist");
  const themes = await axios.get("http://localhost:5000/api/themes/?status=true");
  const themesub = await axios.get("http://localhost:5000/api/themesub/?status=true");
  const blogpost = await axios.get("http://localhost:5000/api/blog/?status=true");
  const blogcategory = await axios.get("http://localhost:5000/api/blogCategory");
  const collections = await axios.get("http://localhost:5000/api/collection?status=true");
  // process.env.REACT_APP_URL_SERVER + "/api/song");
  let slugSongs = [];
  let slugAlbums = [];
  let slugArtists = [];
  let slugThemes = [];
  let prevSlugThemes = [];
  let slugThemesub = [];
  let slugBlogpost = [];
  let slugBlogcategory = [];
  let slugCollections = []
  for (var i = 0; i < songs.data.data.length; i++) {
    slugSongs.push({ slug: songs.data.data[i].slug });
  }
  for (var i = 0; i < albums.data.data.length; i++) {
    slugAlbums.push({ slug: albums.data.data[i].slug });
  }
  for (var i = 0; i < artists.data.data.length; i++) {
    slugArtists.push({ slug: artists.data.data[i].slug });
  }
  for (var i = 0; i < themes.data.data.length; i++) {
    slugThemes.push({ slug: themes.data.data[i].slug });
  }
  for (var i = 0; i < themesub.data.data.length; i++) {
    // prevSlugThemes.push({ slug: themesub.data.data[i].themes[0].slug });
    if (themesub.data.data[i].themes[0] === undefined) {
      continue;
    } else {
    slugThemesub.push({slug: themesub.data.data[i].themes[0].slug , subslug: themesub.data.data[i].slug });
    }
  }
  for (var i = 0; i < blogpost.data.data.length; i++) {
    slugBlogpost.push({ bslug: blogpost.data.data[i].slug });
  }
  for (var i = 0; i < blogcategory.data.data.length; i++) {
    slugBlogcategory.push({ bcslug: blogcategory.data.data[i].slug });
  }
  for (var i = 0; i < collections.data.data.length; i++) {
    slugCollections.push({ slug: collections.data.data[i].slug });
  }
  const paramsConfig = {
    "/music/:slug": slugSongs,
    "/albums/:slug": slugAlbums,
    "/artists/:slug": slugArtists,
    "/themes/:slug": slugThemes,
    "/themes/:slug/:subslug": slugThemesub,
    "/blog/:bcslug": slugBlogcategory,
    "/blog/post/:bslug": slugBlogpost,
    "/collection/:slug": slugCollections,
  };
  // console.log(paramsConfig);
  return new Sitemap(router)
    .applyParams(paramsConfig)
    .build("https://audiobay.net")
    .save("./public/sitemap.xml");
}

generateSitemap();
