import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  apiGetArtistBySlug,
  apigetAllAlbumByArtistSlug,
  apigetAllSfxByArtistSlug,
  apiFilterSearchSong,
} from "apis";
import { useDispatch } from "react-redux";
import { MusicPlayer } from "components";
import { HelmetComponent, Loading } from "components";
import * as actions from "store/actions";
import InfiniteScroll from "react-infinite-scroll-component";

export const DetailsArtist = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [tab, setTab] = useState(1);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 8;
  const sort = "createdAt";
  // const [fields, setFields] = useState("title thumbnail slug");
  const [isLoading, setisLoading] = useState(true);
  const [isLoadingArtist, setisLoadingArtist] = useState(true);
  const detailArtistPage = useRef(null);
  const [artist, setArtist] = useState([]);

  const fetchMoreSong = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    const FetchArtistData = async () => {
      try {
        const response = await apiGetArtistBySlug(slug);
        const data = response.data.data;
        setArtist(data);
        setisLoadingArtist(false);
      } catch (error) {
        setisLoadingArtist(false);
      }
    };
    FetchArtistData();
    detailArtistPage.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    //eslint-disable-next-line
  }, [slug]);
  const FetchSongData = async (queries) => {
    try {
      const response = await apiFilterSearchSong(queries);
      const dataRes = response?.data?.data;
      if (dataRes) {
        if (dataRes?.length === 0) {
          setHasMore(false);
          setData([]);
        }
        if (queries?.page === 1) {
          setData(dataRes);
        } else {
          setData([...data, ...dataRes]);
        }

        if (
          +response.data?.skip + +response.data?.limit >=
          +response.data?.counts
        ) {
          setHasMore(false);
        }
      } else {
        setData([]);
        setHasMore(false);
      }
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  };
  useEffect(() => {
    setisLoading(true);
    setPage(1);
    setHasMore(true);
    if(artist?._id) {
      const q = {
        page: 1,
        limit: limit,
        sort: sort,
        status: true,
        artist: artist?._id
      };
      const FetchAlbumData = async () => {
        try {
          const response = await apigetAllAlbumByArtistSlug(slug);
          const data = response.data.data;
          setData(data);
        } catch (error) {}
        setisLoading(false);
      };
      const FetchSfxData = async () => {
        try {
          const response = await apigetAllSfxByArtistSlug(slug);
          const data = response.data.data;
          setData(data);
        } catch (error) {}
        setisLoading(false);
      };
      if (tab === 1 && slug) {
       
        FetchSongData(q);
      }
      if (tab === 2 && slug) {
        FetchAlbumData();
      }
      if (tab === 3 && slug) {
        FetchSfxData();
      }
      }



    //eslint-disable-next-line
  }, [tab,artist]);
  useEffect(() => {
    if (tab === 1 && slug && page !== 1) {
      if(artist?._id) {
        const q = {
          page: page,
          limit: limit,
          sort: sort,
          artist: artist?._id,
          status: true,
        };
        FetchSongData(q);
      }
    
    }
    //eslint-disable-next-line
  }, [page]);
useEffect(() => {
  if(data){
  dispatch(actions.setPlaylist(data));
  dispatch(actions.playAlbum(true));
  }
},[data])
  return (
    <div ref={detailArtistPage} id="content-page" className="content-page">
      <HelmetComponent
        title={artist?.name}
        description={"Nền tảng âm nhạc và âm thanh đa dạng, từ miễn phí đến bản quyền. Khám phá và tận hưởng những bản nhạc chất lượng cao, phù hợp với mọi nhu cầu sáng tạo nội dung của bạn."}
        imageUrl={artist?.thumbnail}
        imageAlt={artist?.name}
      />
      {/* <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={artist?.name} />
        <meta property="og:image" content={artist?.thumbnail} />
        <link rel="canonical" href={window.location.href} />
        <meta property="fb:app_id" content="2426931344156472" />
      </Helmet> */}
      <div className="container-fluid">
        <div className="row  ">
          <div className="col-lg-12 ">
            <div className="iq-card position-relative">
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                className="iq-card"
                viewBox="0 0 640 427"
                preserveAspectRatio="xMidYMid slice"
              >
                <img
                  filter="url(#blur)"
                  style={{
                    objectFit: "cover",
                    width: "inherit",
                    height: "inherit",
                  }}
                  className="iq-card"
                  src={artist?.cover}
                  alt="SFX"
                />
              </div>
              <div
                className="iq-card position-absolute"
                style={{
                  height: "100%",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0,0,0,.5)",
                }}
              />

              <div className="iq-card-body ">
                <div className="row d-flex justify-content-center   ">
                  <div className="col-lg-4 ">
                    <div className="row d-flex justify-content-center ">
                      {isLoadingArtist ? (
                        <Loading />
                      ) : (
                        <img
                          src={artist?.thumbnail}
                          style={{
                            minHeight: "139px",
                            minWidth: "139px",
                            maxHeight: "139px",
                            maxWidth: "139px",
                            objectFit: "cover",
                          }}
                          className="img-fluid w-25 rounded-circle border border-5 "
                          alt="artist-img"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="row d-flex justify-content-center ">
                  <h3
                    style={{
                      zIndex: "1",
                    }}
                    className="text-white artist-name-mobile text-nowrap"
                  >
                    {artist?.name}
                  </h3>
                  {/* <div className="col-lg-2 w-100">
                    <div className="row d-flex justify-content-center  w-100">
                      <h3 className="text-white artist-name-mobile">{artist && artist.name}</h3>
                    </div>
                  </div> */}
                </div>
              </div>
              <div
                id="shareLink"
                style={{
                  border: "1px solid rgba(0,0,0,.2)",
                  borderRadius: "0.3rem",
                  position: "absolute",
                  zIndex: "999",
                  top: "0",
                  right: "10%",
                  padding: "0.5rem 0.75rem",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  color: "#212529",
                  fontSize: "16x",
                  opacity: "0",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <span>
                  {"Link copied to clipboard "}
                  <i className="las la-check-circle"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 ">
          <div className="iq-card">
            <Fragment>
              <div className="row d-flex justify-content-center align-items-center tab-details-artist">
                <div className="col-lg-4 mt-4">
                  <ul
                    className="nav nav-pills mb-3 nav-fill"
                    id="pills-tab-1"
                    role="tablist"
                  >
                    <li
                      onClick={() => {
                        setTab(1);
                        setisLoading(true);
                        dispatch(actions.setPlaylist(data));
                      }}
                      className="nav-item"
                    >
                      <a
                        className={"nav-link active"}
                        id="pills-profile-tab-fill"
                        data-toggle="pill"
                        href="#pills-profile-fill"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected={data.length > 0 ? "false" : "true"}
                      >
                        Song
                      </a>
                    </li>
                    <li
                      onClick={() => {
                        setisLoading(true);
                        setTab(2);
                      }}
                      className="nav-item"
                    >
                      <a
                        className={"nav-link"}
                        id="pills-home-tab-fill"
                        data-toggle="pill"
                        href="#pills-home-fill"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        Album
                      </a>
                    </li>
                    <li
                      onClick={() => {
                        dispatch(actions.setPlaylist(data));
                        setisLoading(true);
                        setTab(3);
                      }}
                      className="nav-item"
                    >
                      <a
                        className="nav-link"
                        id="pills-contact-tab-fill"
                        data-toggle="pill"
                        href="#pills-contact-fill"
                        role="tab"
                        aria-controls="pills-contact"
                        aria-selected="false"
                      >
                        Sound Effect
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <hr className="mb-5" />
              {tab === 1 && (
                <div
                  style={
                    `${isLoading}` === "true"
                      ? { height: "20vh" }
                      : { height: "auto" }
                  }
                  className="iq-card-body"
                >
                  {isLoading ? (
                    <div
                      style={{
                        position: "absolute",
                        top: "46%",
                        left: "46%",
                      }}
                    >
                      {" "}
                      <Loading />
                    </div>
                  ) : data?.length > 0 ? (
                    <InfiniteScroll
                      endMessage={
                        <p style={{ textAlign: "center" }}>
                          <b>Yay! That's all</b>
                        </p>
                      }
                      dataLength={data.length}
                      next={fetchMoreSong}
                      hasMore={hasMore}
                      loader={
                        hasMore && (
                          <p style={{ textAlign: "center" }}>
                            <Loading />
                          </p>
                        )
                      }
                    >
                      <ul className="list-unstyled iq-music-slide mb-0">
                        {data?.length > 0 &&
                          data.map((song, index) => {
                            return (
                              <Fragment key={index}>
                                <MusicPlayer
                                  reference={detailArtistPage}
                                  song={song}
                                />
                              </Fragment>
                            );
                          })}
                      </ul>
                    </InfiniteScroll>
                  ) : (
                    <div className="text-center mb-5 text-muted">
                      <h5 className="text-muted">
                        No Song Has Been Uploaded Yet
                      </h5>
                    </div>
                  )}
                </div>
              )}
              {tab === 2 && (
                <div
                  style={
                    `${isLoading}` === "true"
                      ? { height: "20vh" }
                      : { height: "auto" }
                  }
                  className="iq-card-body"
                >
                  {isLoading ? (
                    <div
                      style={{
                        position: "absolute",
                        top: "46%",
                        left: "46%",
                      }}
                    >
                      {" "}
                      <Loading />
                    </div>
                  ) : data?.length > 0 ? (
                    <ul className="list-unstyled row  iq-box-hover mb-0">
                      {data?.length > 0 &&
                        data.map((album, index) => {
                          return (
                            <li key={index} className=" col-sm-2  iq-music-box">
                              <div className="iq-card ">
                                <div className="iq-card-body p-0">
                                  <div className="iq-thumb">
                                    <Link to={`/albums/${album?.slug}`}>
                                      <div className="iq-music-overlay"></div>
                                      <img
                                        src={
                                          album?.album_art &&
                                          album?.album_art !== ""
                                            ? album?.album_art
                                            : "assets/images/dashboard/album-song/01.png"
                                        }
                                        className="img-border-radius img-fluid w-100"
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="feature-list text-center">
                                    <Link to={`/albums/${album?.slug}`}>
                                      <h6
                                        className="font-weight-600  mb-0 home_footer_link "
                                        data-toggle="tooltip"
                                        title={album?.title}
                                      >
                                        {album?.title &&
                                        album?.title.length > 30
                                          ? album?.title.slice(0, 30) + "..."
                                          : album?.title}
                                      </h6>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  ) : (
                    <div className="text-center mb-5 text-muted">
                      <h5 className="text-muted">
                        No Album Has Been Uploaded Yet
                      </h5>
                    </div>
                  )}
                </div>
              )}

              {tab === 3 && (
                <div
                  style={
                    `${isLoading}` === "true"
                      ? { height: "20vh" }
                      : { height: "auto" }
                  }
                  className="iq-card-body"
                >
                  {isLoading ? (
                    <div
                      style={{
                        position: "absolute",
                        top: "46%",
                        left: "46%",
                      }}
                    >
                      {" "}
                      <Loading />
                    </div>
                  ) : data?.length > 0 ? (
                    <ul className="list-unstyled iq-music-slide mb-0">
                      {data?.length > 0 &&
                        data.map((sfx, index) => {
                          return (
                            <Fragment key={index}>
                              <MusicPlayer sfx={sfx} />
                            </Fragment>
                          );
                        })}
                    </ul>
                  ) : (
                    <div className="text-center mb-5 text-muted">
                      <h5 className="text-muted">
                        No Sound Effect Has Been Uploaded Yet
                      </h5>
                    </div>
                  )}
                </div>
              )}
            </Fragment>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
