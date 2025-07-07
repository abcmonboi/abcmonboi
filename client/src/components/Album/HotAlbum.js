import React, { Fragment, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as actions from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "components";
import { apiFilterSearchSong } from "apis";
const HotAlbum = ({ album }) => {
  const { currentSongID, isPlaying } = useSelector((state) => state.music);
  const dispatch = useDispatch();
  const [listSong, setListSong] = useState([]);
  const [isLoadSong, setisLoadSong] = useState(true);
  const [isLoading, setisLoading] = useState(true);

  const handlePlayMusic = (songSingle) => {
    if (songSingle?.streaming !== undefined) {
      if (listSong?.length > 1) {
        dispatch(actions.playAlbum(true));
        dispatch(actions.setPlaylist(listSong));
      }
      if (isPlaying && currentSongID === songSingle._id) {
        dispatch(actions.setIsPlaying(false));
      } else {
        dispatch(actions.playAlbum(false));
        dispatch(actions.setCurrentSongId(songSingle._id));
        dispatch(actions.setIsPlaying(true));
      }
    }
    // navigate("/artists");
  };
  const FetchGetAllSongByAlbum = async (id) => {
    try {
      const response = await apiFilterSearchSong({ album: id, status: true });
      const data = response.data.data;
      setListSong(data);
      setisLoadSong(false);
    } catch (error) {}
  };
  useEffect(() => {
    if (album) {
      setisLoading(false);
      album?._id && FetchGetAllSongByAlbum(album?._id);
    }
  }, [album]);
  return (
    <Fragment>
      <div className="col-lg-7 ">
        <div
          style={
            `${isLoading}` === "true"
              ? {
                  backgroundColor: "#ffffff",
                }
              : {
                  backgroundImage: `${
                    album
                      ? `url(
                     ${album?.album_cover}

                     )`
                      : `src="/assets//images/dashboard/realease-song/realease-back.jpg"`
                  }`,
                }
          }
          className={
            isLoading
              ? "iq-card iq-card-transparent position-relative iq-song-back2 "
              : "iq-card iq-card-transparent position-relative iq-song-back3"
          }
        >
          <div
            style={{
              height: "426px",
            }}
            className="iq-card-body "
          >
            {isLoading ? (
              <div
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "46%",
                }}
              >
                {" "}
                <Loading />
              </div>
            ) : (
              <Fragment>
                <div className="iq-music-img1">
                  <div className="equalizer1">
                    <span className="bar1 bar-1"></span>
                    <span className="bar1 bar-2"></span>
                    <span className="bar1 bar-3"></span>
                    <span className="bar1 bar-4"></span>
                    <span className="bar1 bar-5"></span>
                  </div>
                </div>
                <div
                  style={{
                    zIndex: "9",
                    bottom: "20px",
                    left: "10px",
                  }}
                  className="slider_container1 col-12 d-flex justify-content-center position-absolute"
                >
                  <div className="">
                    <span
                      onClick={() => {
                        handlePlayMusic(listSong[0]);
                      }}
                      className="btn btn-dark iq-play mr-2 text-white font-size-20 font-weight-500 "
                    >
                      Play Now
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    zIndex: "9",
                    top: "20px",
                    left: "50px",
                  }}
                  className="row position-absolute "
                >
                  <div
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <Link to={`/albums/${album?.slug}`}>
                      <img
                        src={`${album && album?.album_art}`}
                        className="img-border-radius shadow-lg avatar-80 img-fluid"
                        alt="album-img"
                      />
                    </Link>
                    <div>
                      <Link to={`/albums/${album?.slug}`}>
                        <div className="track-name1 mt-2 ">
                          <h6 className="mb-0 home_footer_link text-white">
                            {album && album?.title}
                          </h6>
                        </div>
                      </Link>
                      <Link
                        to={
                          album?.artists?.length > 1
                            ? `/artists/${album?.artists[0]?.slug}`
                            : `/artists/${album?.artists?.slug}`
                        }
                      >
                        <div className="track-artist1  home_footer_link ">
                          {album?.artists &&
                            album.artists
                              .map((artist) => artist.name)
                              .join(", ")}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>

      <div className="col-lg-5">
        <div className="iq-card iq-card-transparent">
          <div
            style={
              `${isLoadSong}` === "true"
                ? { height: "428px" }
                : { height: "auto" }
            }
            className="iq-card-body p-0"
          >
            {isLoadSong ? (
              <div
                style={{
                  position: "absolute",
                  top: "38%",
                  left: "40%",
                }}
              >
                {" "}
                <Loading />
              </div>
            ) : (
              <ul className="list-unstyled row mb-0 list-new-song-by-new-album">
                {listSong &&
                  listSong.map((song, index) => {
                    return (
                      <li key={index} className="col-lg-6 col-md-6 ">
                        <div className="iq-card iq-card-transparent">
                          <div className="iq-card-body music-player p-0">
                            <div className="media align-items-center">
                              <div className="iq-thumb-hotsong">
                                <div className="iq-music-overlay"></div>
                                <img
                                  src={song?.thumbnail}
                                  className="img-fluid avatar-60"
                                  alt=""
                                />
                                <div
                                  onClick={() => {
                                    handlePlayMusic(song);
                                  }}
                                  className="overlay-music-icon"
                                >
                                  <Link>
                                    <i className="las la-play-circle font-size-24"></i>
                                  </Link>
                                </div>
                              </div>
                              <div className="media-body ml-3">
                                <Link to={`/music/${song?.slug}`}>
                                  <h6
                                    title={song?.title}
                                    className="mb-0 home_footer_link description-infor-1-line "
                                  >
                                    {song?.title}
                                  </h6>
                                </Link>
                                <small className="home_footer_link description-infor-1-line ">
                                  {song?.artists &&
                                    song?.artists?.map((item, index, self) => {
                                      return (
                                        <Link
                                          to={`/artists/${item.slug}`}
                                          className="text-black"
                                          key={index}
                                        >
                                          <span
                                            className="home_footer_link "
                                            data-toggle="tooltip"
                                            title={item.name}
                                          >
                                            {item.name +
                                              (index === self.length - 1
                                                ? ""
                                                : ", ")}
                                          </span>
                                        </Link>
                                      );
                                    })}
                                </small>
                                {/* <small
                                  className="home_footer_link description-infor-1-line "
                                  onClick={() => {
                                    navigate(
                                      `/artists/${song?.artists?.[0]?.slug}`
                                    );
                                  }}
                                >
                                  {song?.artists &&
                                    song?.artists?.map((item, index, self) => 
                                    item.name +
                                        (index === self.length - 1 ? "" : ", ")}
                                </small> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(HotAlbum);
