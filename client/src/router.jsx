import React from "react";
import { Route, Routes } from "react-router";
import { path } from "./ultils/constant";

export default (
  //   <Route>
  //     <Route path="/" />
  //     <Route path="/blog/:id" />
  //   </Route>
  <Route>
    <Route path={path.PUBLIC}>
      <Route path={path.HOME} />
      <Route path={path.MUSIC} />
      <Route path={path.MOOD_MUSIC} />
      <Route path={path.GENRE_MUSIC} />
      <Route path={path.VIDEO_THEME_MUSIC} />
      <Route path={path.INSTRUMENT_MUSIC} />

      <Route path={path.DETAIL_MUSIC} />
      <Route path={path.SOUND_EFFECT} />
      <Route path={path.DETAIL_SFX} />
      <Route path={path.DETAIL_SFXCATEGORY} />
      <Route path={path.ALBUMS} />
      <Route path={path.DETAIL_ALBUM} />
      <Route path={path.COLLECTIONS} />
      <Route path={path.DETAIL_COLLECTION} />
      <Route path={path.ARTISTS} />
      <Route path={path.DETAIL_ARTIST} />
      <Route path={path.THEMES} />
      <Route path={path.DETAIL_THEME} />
      <Route path={path.SUBTHEMES} />
      <Route path={path.LICENSE} />
    </Route>

    <Route path={path.SIGNIN} />
    <Route path={path.SIGNNUP} />
    <Route path={path.BLOG} />

    <Route path={path.BLOG_BY_CATEGORY} />
    <Route path={path.BLOG_DETAIL} />
  </Route>
);
