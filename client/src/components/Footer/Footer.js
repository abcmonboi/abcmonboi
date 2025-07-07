import React, { useEffect, useState, useRef, memo } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  apiGetDetailSong,
  apiGetSfxById,
  apiUpdateSongListen,
  apiUpdateSfxListen,
} from "apis";
import * as actions from "store/actions";
import moment from "moment";
import { LoadingPlayer } from "components";
import { BsDownload } from "react-icons/bs";

var intervalId;
const Footer = () => {
  const dispatch = useDispatch();
  const audioSong = useRef(null);
  const navigate = useNavigate();
  // const [audioSong, setAudioSong] = useState(new Audio());
  const { currentSongID, isPlaying, songs  } = useSelector(
    (state) => state.music
  );
  const [song, setSong] = useState(null);
  const [isLoadedSource, setIsLoadedSource] = useState(true);
  const [currentSecond, setCurrentSecond] = useState(0);
  const thumbRef = useRef(null);
  const trackRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentSongIndexOf, setcurrentSongIndexOf] = useState();

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };
  const handleChangeVolume = (e) => {
    setVolume(e.target.value);
    audioSong.current.volume = e.target.value / 100;
  };
  const handleToggleMute = () => {
    if (audioSong.current.volume === 0) {
      audioSong.current.volume = 0.7;
      setVolume(70);
    } else {
      setVolume(0);
      audioSong.current.volume = 0;
    }
  };
  // Lấy thông tin bài hát khi có id mới
  useEffect(() => {
    if (audioSong.current) {
      audioSong.current.pause();
      audioSong.current.remove();
      thumbRef.current.style.right = `${100}%`;
      // audioSong.current = new Audio();

      // setAudioSong(null);
      clearInterval(intervalId);
    }
    // audioSong && audioSong.pause();
    // // audioSong.remove();
    // intervalId && clearInterval(intervalId);
    // audioSong && audioSong.src = "";

    // thumbRef.current.style.right = `${100}%`;
    // setCurrentSecond(0);
    setIsLoadedSource(false);
    const FetchGetDetailSong = async () => {
      const response = await apiGetDetailSong(currentSongID);
      if (response.data.err === 0 || response.data.err === undefined) {
        if (response.data.success) {
          setSong(response.data.data);
          audioSong.current = new Audio(response.data.data?.streaming);
          audioSong.current.preload = "metadata";
        } else {
          const response = await apiGetSfxById(currentSongID);
          setSong(response.data.data);
          audioSong.current = new Audio(response.data.data?.streaming);
          audioSong.current.preload = "metadata";
        }
      }
    };
    currentSongID && FetchGetDetailSong();
    // eslint-disable-next-line
  }, [currentSongID]);

  //Nếu có audio mới thì load lại audio

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    //fetch source audio
    if (audioSong.current) {
      audioSong.current.load();
      audioSong.current.volume = volume / 100;
    }

    // audioSong && audioSong.load();
    setIsLoadedSource(true);
    // if (isPlaying) {
    //   audioSong.play();
    //   song?.sfxCategory !== undefined
    //     ? apiUpdateSfxListen(currentSongID)
    //     : apiUpdateSongListen(currentSongID);
    //   intervalId = setInterval(() => {
    //     let percent =
    //       Math.round((audioSong.currentTime * 10000) / song?.duration) / 100;
    //     thumbRef.current.style.right = `${100 - percent}%`;
    //     setCurrentSecond(Math.round(audioSong.currentTime));
    //     if (+Math.round(audioSong.currentTime) === +song?.duration) {
    //       intervalId && clearInterval(intervalId);
    //       audioSong.pause();
    //       dispatch(actions.setIsPlaying(false));
    //       dispatch(actions.setCurrentSongId(""));
    //       if (songs) {
    //         let currentSongIndex;
    //         songs?.forEach((item, index) => {
    //           if (item._id === currentSongID) {
    //             currentSongIndex = index;
    //           }
    //         });

    //         if (songs[currentSongIndex + 1]?._id) {
    //           dispatch(
    //             actions.setCurrentSongId(songs[currentSongIndex + 1]._id)
    //           );
    //           dispatch(actions.setIsPlaying(true));
    //         } else {
    //           dispatch(actions.setCurrentSongId(""));
    //           dispatch(actions.setIsPlaying(false));
    //         }
    //       }
    //       // if (songs) {

    //       //   const index = songs.findIndex((song) => song.id === currentSongID);
    //       //   if (index + 1 < songs.length) {
    //       //     dispatch(actions.setCurrentSongId(songs[index + 1].id));
    //       //   } else {
    //       //     dispatch(actions.setCurrentSongId(songs[0].id));
    //       //   }
    //       // }
    //     }
    //   }, 200);
    // }
    // Video playback started ;)

    // eslint-disable-next-line
  }, [audioSong.current]);

  const handleTogglePlayMusic = async () => {
    intervalId && clearInterval(intervalId);

    if (isPlaying) {
      dispatch(actions.setIsPlaying(false));
    } else {
      dispatch(actions.setIsPlaying(true));
      // audioSong.play();
      // apiUpdateSongListen(currentSongID);
      // intervalId = setInterval(() => {
      //   let percent =
      //     Math.round((audioSong.currentTime * 10000) / song?.duration) / 100;
      //   thumbRef.current.style.right = `${100 - percent}%`;
      //   setCurrentSecond(Math.round(audioSong.currentTime));
      //   if (+percent >= 99) {
      //     intervalId && clearInterval(intervalId);
      //     audioSong.pause();
      //     thumbRef.current.style.right = `${100}%`;
      //     if (songs) {
      //       let currentSongIndex;
      //       songs?.forEach((item, index) => {
      //         if (item._id === currentSongID) {
      //           currentSongIndex = index;
      //         }
      //       });

      //       if (songs[currentSongIndex + 1]?._id) {
      //         dispatch(
      //           actions.setCurrentSongId(songs[currentSongIndex + 1]._id)
      //         );
      //         dispatch(actions.setIsPlaying(true));
      //       } else {
      //         dispatch(actions.setCurrentSongId(""));
      //         dispatch(actions.setIsPlaying(false));
      //       }
      //     } else {
      //       dispatch(actions.setCurrentSongId(""));
      //       dispatch(actions.setIsPlaying(false));
      //     }
      //   }
      // }, 200);
    }
  };
  const handleClickProgress = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    let percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumbRef.current.style.right = `${100 - percent}%`;
    if (audioSong.current?.duration) {
      audioSong.current.currentTime =
        (percent * audioSong.current?.duration) / 100;
      setCurrentSecond(
        Math.round((percent * audioSong.current?.duration) / 100)
      );
    }
  };
  useEffect(() => {
    if (isPlaying && currentSongID === song?._id) {
      intervalId && clearInterval(intervalId);
      audioSong.current && audioSong.current.play();
      song?.sfxCategory !== undefined
        ? apiUpdateSfxListen(currentSongID)
        : apiUpdateSongListen(currentSongID);
      intervalId = setInterval(() => {
        let percent =
          Math.round(
            (audioSong.current.currentTime * 10000) /
              audioSong?.current.duration
          ) / 100;
        thumbRef.current.style.right = `${100 - percent}%`;
        setCurrentSecond(Math.round(audioSong.current.currentTime));
        if (audioSong.current?.currentTime === audioSong.current?.duration) {
          intervalId && clearInterval(intervalId);
          audioSong.current.pause();
          thumbRef.current.style.right = `${100}%`;
          if (songs) {
            let currentSongIndex;
            songs?.forEach((item, index) => {
              if (item._id === currentSongID) {
                currentSongIndex = index;
              }
            });

            if (songs[currentSongIndex + 1]?._id) {
              dispatch(
                actions.setCurrentSongId(songs[currentSongIndex + 1]._id)
              );
              dispatch(actions.setIsPlaying(true));
            } else {
              dispatch(actions.setCurrentSongId(""));
              dispatch(actions.setIsPlaying(false));
            }
          } else {
            dispatch(actions.setCurrentSongId(""));
            dispatch(actions.setIsPlaying(false));
          }
        }
      }, 200);
    }

    if (
      !isPlaying &&
      currentSongID === song?._id &&
      audioSong.current.currentTime !== 0
    ) {
      audioSong.current.pause();
    }
  }, [isPlaying, audioSong.current]);

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item._id === currentSongID) {
          currentSongIndex = index;
        }
      });

      if (songs[currentSongIndex + 1]?._id) {
        dispatch(actions.setCurrentSongId(songs[currentSongIndex + 1]._id));
        dispatch(actions.setIsPlaying(true));
      }
    }
  };
  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item?._id === currentSongID) {
          currentSongIndex = index;
          setcurrentSongIndexOf(index);
        }
      });
      if (songs[currentSongIndex - 1]?._id) {
        dispatch(actions.setCurrentSongId(songs[currentSongIndex - 1]._id));
        dispatch(actions.setIsPlaying(true));
      }
    }
  };

  //UnMount
  useEffect(() => {
    return () => {
      dispatch(actions.setIsPlaying(false));
      dispatch(actions.setCurrentSongId(""));
      dispatch(actions.setDownload());
      if (audioSong.current) {
        audioSong.current.pause();
        audioSong.current.preload = "none";
        audioSong.current = new Audio();
        audioSong.current.remove();
        intervalId && clearInterval(intervalId);
      }
    };
  }, []);
  return (
    <Fragment>
      <Fragment>
        <footer
          style={{
            display: `${currentSongID === null ? "none" : "block"}`,
          }}
          className="iq-footer"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="player row">
                  <div className="details col-6 col-sm-4 col-md-4 col-lg-4">
                    <div className="now-playing"></div>
                    {song?.thumbnail ? (
                      <div
                        style={{ backgroundImage: `url("${song?.thumbnail}")` }}
                        className="track-art"
                      ></div>
                    ) : (
                      <i className="ri-surround-sound-line font-size-40 mr-5 footer-icon-art-song text-primary"></i>
                    )}

                    <div>
                      <div
                        onClick={() => {
                          song?.sfxCategory
                            ? navigate(`/sfx/${song?.slug}`)
                            : navigate(`/music/${song?.slug}`);
                        }}
                        className="track-name home_footer_link "
                      >
                        {song?.title}
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/artists/${song?.artists[0].slug}`)
                        }
                        className="track-artist home_footer_link"
                      >
                        {song?.artists &&
                          song?.artists.map((artist) => artist.name).join(", ")}
                      </div>
                    </div>
                  </div>
                  <div className="slider_container slider_music col-sm-5 col-md-4 col-lg-3">
                    <div className="current-time">
                      {/* 00:00 */}

                      {moment.utc(currentSecond * 1000).format("mm:ss")}
                    </div>

                    <div
                      ref={trackRef}
                      onClick={handleClickProgress}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        position: "relative",
                        margin: "auto",
                        width: "80%",
                        height: isHover ? "8px" : "5px",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        ref={thumbRef}
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          bottom: "0",
                          backgroundColor: "var(--iq-primary",
                          borderRadius: "5px",
                        }}
                      ></div>
                    </div>

                    <div className="total-duration">
                      {song?.duration
                        ? moment.utc(song?.duration * 1000).format("mm:ss")
                        : "00:00"}
                    </div>
                  </div>
                  <div className="buttons col-6  col-sm-3 col-md-2  col-lg-2">
                    <div
                      onClick={handlePrevSong}
                      className={`${
                        !songs ||
                        songs?.indexOf(
                          songs.find((song) => song?._id === currentSongID)
                        ) === 0
                          ? "text-secondary prev-track"
                          : "prev-track"
                      }`}
                    >
                      <i
                        style={{
                          cursor: `${
                            !songs ||
                            songs?.indexOf(
                              songs.find((song) => song?._id === currentSongID)
                            ) === 0
                              ? "default"
                              : "pointer"
                          }`,
                        }}
                        className="fa fa-step-backward fa-2x"
                      ></i>
                    </div>
                    <div
                      onClick={handleTogglePlayMusic}
                      className="playpause-track"
                    >
                      {!isLoadedSource ? (
                        <LoadingPlayer />
                      ) : isPlaying ? (
                        <i className="fa fa-pause-circle fa-3x"></i>
                      ) : (
                        <i className="fa fa-play-circle fa-3x"></i>
                      )}
                    </div>
                    <div
                      onClick={handleNextSong}
                      className={`${
                        !songs ||
                        songs?.indexOf(
                          songs.find((song) => song?._id === currentSongID)
                        ) ===
                          songs?.length - 1
                          ? "text-secondary next-track "
                          : "next-track"
                      }`}
                    >
                      <i
                        style={{
                          cursor: `${
                            !songs ||
                            songs?.indexOf(
                              songs?.find((song) => song?._id === currentSongID)
                            ) ===
                              songs?.length - 1
                              ? "default"
                              : "pointer"
                          }`,
                        }}
                        className="fa fa-step-forward fa-2x"
                      ></i>
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        dispatch(actions.setIsShowModal(true));
                        dispatch(actions.setModalData(song));
                      }}
                      data-toggle="modal"
                      data-target="#exampleModalCenter10"
                      className="download-track pl-4 footer-download-track"
                    >
                      <BsDownload fontSize={22} />
                    </div>
                  </div>

                  <div className="slider_container sound col-sm-6 col-md-2  col-lg-2">
                    <i
                      onClick={handleToggleMute}
                      className="fa fa-volume-down"
                    ></i>

                    <input
                      type="range"
                      min={0}
                      max="100"
                      value={volume}
                      className="volume_slider"
                      onChange={handleChangeVolume}
                    />
                    <i className="fa fa-volume-up"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </Fragment>
    </Fragment>
  );
};

export default memo(Footer);
