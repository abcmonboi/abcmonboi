import React, { Fragment, useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";
import moment from "moment";
import { useNavigate, createSearchParams, Link } from "react-router-dom";
import { Loading } from "components";
import { TbShieldHalf } from "react-icons/tb";
import { BsFillInfoCircleFill, BsShare, BsDownload } from "react-icons/bs";
const MusicPlayer = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const { currentSongID, isPlaying } = useSelector((state) => state.music);
  const [song, setSong] = useState([]);
  // const [isShowPopOver, setIsShowPopOver] = useState(false);

  const handlePlayMusic = (song) => {
    if (song?.streaming !== undefined) {
      if (isPlaying && currentSongID === song._id) {
        dispatch(actions.setIsPlaying(false));
      } else {
        dispatch(actions.playAlbum(false));
        dispatch(actions.setCurrentSongId(song._id));
        dispatch(actions.setIsPlaying(true));
      }
    }
  };

  // const FetchGetSong = async () => {
  //   try {
  //     const response = await apiGetDetailSong(props.song?._id);
  //     const data = response.data.data;
  //     setSong(data);
  //   } catch (error) {}
  // };
  // const FetchGetSfx = async () => {
  //   try {
  //     const response = await apiGetSfxById(props.sfx?._id);
  //     const data = response.data.data;
  //     setSong(data);
  //   } catch (error) {}
  // };
  useEffect(() => {
    if (props.sfx) {
      setisLoading(false);
      setSong(props.sfx);
      // if (
      //   props.sfx?.artists?.slug === undefined &&
      //   props.sfx?.slug !== undefined
      // ) {
      //   setisLoading(true);
      //   FetchGetSfx();
      //   setisLoading(false);
      // }
    }
    if (props.song) {
      setisLoading(false);
      setSong(props.song);
      // if (
      //   props.song?.artists?.slug === undefined &&
      //   props.song?.slug !== undefined
      // ) {
      //   setisLoading(true);
      //   FetchGetSong();
      //   setisLoading(false);
      // }
    }
  }, [props]);

  return (
    <Fragment>
      {isLoading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          {" "}
          <Loading />
        </div>
      ) : (
        <Fragment>
          {song && (
            <Fragment>
              <li className="mb-3 music-player ">
                <div className="d-flex justify-content-between align-items-center row position-relative">
                  {/*Thumnail Title 4 */}
                  <div className="col-10 media align-items-center col-md-4  pr-0 ">
                    <div
                      style={props?.song && { maxHeight: "60px" }}
                      className="iq-thumb-hotsong"
                    >
                      <div
                        style={{ cursor: "pointer" }}
                        className="iq-music-overlay"
                      ></div>
                      <Link>
                        {props?.song ? (
                          <img
                            style={{
                              objectFit: "cover",
                              minHeight: "60px",
                              minWidth: "60px",
                            }}
                            src={
                              song?.thumbnail
                                ? song.thumbnail
                                : song.album?.album_art
                            }
                            className="img-border-radius avatar-60 img-fluid"
                            alt="albumart"
                          />
                        ) : (
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: "60px",
                              height: "60px",
                            }}
                          >
                            <i className="ri-surround-sound-line sfx-player-icon"></i>
                          </div>
                        )}
                      </Link>
                      <div
                        onClick={() => {
                          handlePlayMusic(song);
                        }}
                        className="overlay-music-icon"
                      >
                        <Link
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            fontSize: "35px",
                          }}
                        >
                          <i
                            className="las la-play-circle bg-primary rounded-circle 
                           "
                          ></i>
                        </Link>
                      </div>
                    </div>
                    <div className="media-body ml-3 ">
                      <p
                        onClick={() => {
                          props.song
                            ? navigate(`/music/${song?.slug}`)
                            : navigate(`/sfx/${song?.slug}`);
                        }}
                        className="mb-0 home_footer_link musicplayer-song-title description-infor-1-line"
                        data-toggle="tooltip"
                        title={song?.title}
                      >
                        {song?.title}
                      </p>
                      {song?.artists &&
                        song?.artists?.map((item, index, self) => {
                          return (
                            <small
                              key={index}
                              onClick={() => navigate(`/artists/${item.slug}`)}
                              className="home_footer_link "
                              data-toggle="tooltip"
                              title={item.name}
                            >
                              {" "}
                              {item.name +
                                (index === self.length - 1 ? "" : ", ")}
                            </small>
                          );
                        })}
                      {/* <small
                        onClick={() =>
                          navigate(`/artists/${song?.artists[0].slug}`)
                        }
                        className="home_footer_link"
                        data-toggle="tooltip" title={song?.artists && song?.artists?.map((artist) => artist.name).join(", ")}
                      >
                        {" "}
                        {song?.artists &&
                          song?.artists?.map((artist) => artist.name).join(", ")}
                      </small> */}
                    </div>
                  </div>
                  {/*Mood  2*/}
                  <div
                    style={{
                      padding: "0px",
                    }}
                    className="media align-items-center col-2 genre-list"
                  >
                    <div className="media-body">
                      {/* <small   data-toggle="tooltip" title={song?.moods && song?.moods?.map((mood) => mood.name).join(", ")}>
                        {" "}
                        {props.song
                          ? song.moods &&
                            song?.moods.map((mood) => mood.name).join(", ")
                          : song?.sfxCategory &&
                            song?.sfxCategory
                              .map((cate) => cate.title)
                              .join(", ")}
                      </small> */}
                      {song?.moods &&
                        song?.moods?.map((item, index, self) => {
                          return (
                            <small
                              key={index}
                              onClick={() =>
                                navigate({
                                  pathname: `/music`,
                                  search: createSearchParams({
                                    moods: item._id,
                                  }).toString(),
                                })
                              }
                              className="home_footer_link"
                              data-toggle="tooltip"
                              title={item.name}
                            >
                              {" "}
                              {item.name +
                                (index === self.length - 1 ? "" : ", ")}
                            </small>
                          );
                        })}
                    </div>
                  </div>
                  {/* Genre 
                  <p
                    onClick={() => {
                      handlePlayMusic(song);
                    }}
                    className="mb-0 iq-music-play col-2 col-sm-1 musicplayer-play-button  "
                  >
                    {currentSongID === song._id && isPlaying ? (
                      <i
                        style={{
                          cursor: "pointer",
                        }}
                        className="las la-pause-circle font-size-32 musicplayer-icon-play"
                      ></i>
                    ) : (
                      <i
                        style={{
                          cursor: "pointer",
                        }}
                        className="las la-play-circle font-size-32 musicplayer-icon-play"
                      ></i>
                    )}
                  </p> */}

                  {/*Visualize 3*/}
                  {song?.waveform && (
                    <img
                      style={{
                        padding: "0px",
                        minHeight: "50px",
                        minWidth: "50px",
                        // cursor: "pointer",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      className="mb-0 col-3 audio-visualizer "
                      src={song?.waveform}
                      alt="waveform"
                    />
                  )}
                  {/*Duration 1*/}
                  <p className="mb-0 iq-music-time">
                    {song?.duration
                      ? moment(song?.duration * 1000).format("mm:ss")
                      : "00:00"}
                  </p>
                  <div className="col-2 p-0 d-flex justify-content-between align-items-center font-size-22">
                    {/* <div
                      className={
                        song?.copyrightStatus === 2
                          ? `icon-music-player`
                          : "icon-music-player-none"
                      }
                      onMouseEnter={() => setIsShowPopOver(true)}
                      onMouseLeave={() => setIsShowPopOver(false)}
                    >
                      {song?.copyrightStatus === 2 && (
                        <Fragment>
                          <TbShieldHalf />
                        </Fragment>
                      )}
                    </div> */}

                    <div
                      className={
                        song?.copyrightStatus === 2
                          ? `popover__wrapper`
                          : "popover__wrapper__hidden"
                      }
                    >
                      <div
                        className={
                          song?.copyrightStatus === 2
                            ? `icon-music-player`
                            : "icon-music-player-none"
                        }
                        // onMouseEnter={() => setIsShowPopOver(true)}
                        // onMouseLeave={() => setIsShowPopOver(false)}
                      >
                        {song?.copyrightStatus === 2 && (
                          <Fragment>
                            <TbShieldHalf />
                          </Fragment>
                        )}
                      </div>

                      <div className="popover__content p-2 d-flex d-column align-items-center justify-content-center">
                        <p className="popover__message">
                          Bài hát này đã được đăng ký Content ID
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        // dispatch(actions.setIsShowModal(true));
                        dispatch(actions.setModalData(song));
                      }}
                      data-toggle={song?.license ? "modal" : ""}
                      data-target="#exampleModalCenteredScrollableLicence"
                      className={
                        song?.license
                          ? `icon-music-player`
                          : "icon-music-player-none"
                      }
                    >
                      {song?.license && <BsFillInfoCircleFill />}
                    </div>
                    <div
                      data-toggle="modal"
                      data-target="#exampleModalCenteredScrollableShare"
                      onClick={() => {
                        props.reference?.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                   
                        dispatch(
                          actions.setModalData({
                            id: song?._id,
                            title: song?.title,
                            slug: song?.slug,
                            path: song?.sfxCategory !== undefined ? "sfx" : "music",
                            url: song?.sfxCategory !== undefined
                              ? window.location.origin + `/sfx/${song?.slug}`
                              : window.location.origin + `/music/${song?.slug}`,
                          })
                        );
                      }}
                      // onClick={() => {
                      //   props.reference?.current?.scrollIntoView({
                      //     behavior: "smooth",
                      //     block: "start",
                      //   });
                      //   navigator.clipboard.writeText(
                      //     song?.sfxCategory !== undefined
                      //       ? window.location.origin + `/sfx/${song?.slug}`
                      //       : window.location.origin + `/music/${song?.slug}`
                      //   );
                      //   document.getElementById("shareLink").style.opacity = 1;
                      //   document.getElementById("shareLink").style.display =
                      //     "flex";

                      //   setTimeout(() => {
                      //     document.getElementById(
                      //       "shareLink"
                      //     ).style.opacity = 0;
                      //     document.getElementById("shareLink").style.display =
                      //       "none";
                      //   }, 2000);
                      // }}
                      className="icon-music-player"
                    >
                      <BsShare />
                    </div>

                    <div
                      onClick={() => {
                        // dispatch(actions.setIsShowModal(true));
                        dispatch(actions.setModalData(song));
                      }}
                      data-toggle="modal"
                      data-target="#exampleModalCenter10"
                      className="pr-4 pl-1"
                    >
                      <div className="download-icon">
                        <BsDownload />
                      </div>
                    </div>
                    {/*Toggle Modal*/}
                    {/* <p
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      dispatch(actions.setIsShowModal(true));
                      dispatch(actions.setModalData(song));
                    }}
                    data-toggle="modal"
                    data-target="#exampleModalCenter10"
                    className="mb-0  col-sm-1 col-1 musicplayer-download"
                  >
                    <i className="las la-download font-size-20 pl-4 musicplayer-icon-download"></i>
                  </p> */}

                    {/*Star*/}
                    {/* <p
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      props.reference?.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                      navigator.clipboard.writeText(
                        song?.sfxCategory !== undefined
                          ? window.location.origin + `/sfx/${song?.slug}`
                          : window.location.origin + `/music/${song?.slug}`
                      );
                      document.getElementById("shareLink").style.opacity = 1;
                      document.getElementById("shareLink").style.display =
                        "flex";

                      setTimeout(() => {
                        document.getElementById("shareLink").style.opacity = 0;
                        document.getElementById("shareLink").style.display =
                          "none";
                      }, 2000);
                    }}
                    className="mb-0 col-2 col-sm-1 iq-musc-icone "
                  >
                    <i className="las la-share-alt-square  font-size-20 "></i>
                  </p> */}
                  </div>
                  {/* <div className="iq-card-header-toolbar iq-music-drop d-flex align-items-center pr-4">
                    <div className="dropdown">
                      <span
                        className="dropdown-toggle text-primary"
                        id="dropdownMenuButton2"
                        data-toggle="dropdown"
                        aria-expanded="false"
                        role="button"
                      >
                        <i className="ri-more-2-fill text-primary"></i>
                      </span>
                      <div
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuButton2"
                      >
                        <a
                          className="dropdown-item"
                          onClick={() => {
                            dispatch(actions.setIsShowModal(true));
                            dispatch(actions.setModalData(song));
                          }}
                        >
                          <i className="ri-file-download-fill mr-2"></i>
                          Download
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>
              </li>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
export default memo(MusicPlayer);
