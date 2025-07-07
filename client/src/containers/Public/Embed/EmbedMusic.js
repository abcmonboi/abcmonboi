import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { apiGetDetailSong, apiGetSfxById } from "apis";
import { path } from "ultils/constant";
import { useSelector, useDispatch } from "react-redux";
import { LoadingPlayer, HelmetComponent } from "components";
import * as actions from "store/actions";
import moment from "moment";
import { BsDownload } from "react-icons/bs";
var intervalId;

const EmbedMusic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [song, setSong] = useState({});
  const [isLoadedSource, setIsLoadedSource] = useState(true);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef(null);
  const audioSong = useRef(null);
  const thumbRef = useRef(null);
  const thumbRef2 = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentSecond, setCurrentSecond] = useState(0);
  const [hoverSecond, setHoverSecond] = useState(0);
  const { currentSongID, isPlaying, songs } = useSelector(
    (state) => state.music
  );
  const pathHref = window.location.href.split("/embed/")[1].split("/")[0];
  // Load details song and set audioSong.current
  useEffect(() => {
    if (id) {
      if (pathHref === "music") {
        const getDetailSong = async () => {
          try {
            const res = await apiGetDetailSong(id);
            setSong(res.data.data);
            dispatch(actions.setCurrentSongId(res.data.data?._id));
            audioSong.current = new Audio(res.data.data?.streaming);
            audioSong.current.load();
            audioSong.current.preload = "auto";
            // audioSong.current.load();
            setLoading(false);
          } catch (error) {
            console.log(error);
            navigate("/404");
          }
        };
        getDetailSong();
      } else if (pathHref === "sfx") {
        const getDetailSfx = async () => {
          try {
            const res = await apiGetSfxById(id);
            setSong(res.data.data);
            dispatch(actions.setCurrentSongId(res.data.data?._id));
            audioSong.current = new Audio(res.data.data?.streaming);
            audioSong.current.load();
            audioSong.current.preload = "auto";
            // audioSong.current.load();
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        getDetailSfx();
      }
      //remove background body
      document.body.style.background = "#fff";
      //remove div id="fb-root"
      const fbRoot = document.getElementById("fb-root");
      fbRoot && fbRoot.remove();
    }
  }, [id]);
  const handleMouseEnter = (e) => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
    thumbRef2.current.style.right = `${100}%`;
  };
  // Show real time when hover
  const handleMouseMove = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    let percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumbRef2.current.style.right = `${100 - percent}%`;
    if (audioSong.current?.duration) {
      setHoverSecond(Math.round((percent * audioSong.current?.duration) / 100));
    }
  };
  // Change current time when click
  const handleClickProgress = (e) => {
    // when click progress bar, if not playing, play
    if (!isPlaying) dispatch(actions.setIsPlaying(true));
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
  const handleTogglePlayMusic = async () => {
    intervalId && clearInterval(intervalId);
    if (isPlaying) {
      dispatch(actions.setIsPlaying(false));
    } else {
      dispatch(actions.setIsPlaying(true));
    }
  };
  useEffect(() => {
    // Play when music is not playing and user click play
    if (isPlaying && currentSongID === song?._id) {
      // clear interval when change song
      intervalId && clearInterval(intervalId);
      // if have audioSong.current, play
      audioSong.current && audioSong.current.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round(
            (audioSong.current.currentTime * 10000) /
              audioSong?.current.duration
          ) / 100;
        thumbRef.current.style.right = `${100 - percent}%`;
        setCurrentSecond(Math.round(audioSong.current.currentTime));
        // if song is end, clear interval and pause
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
            // dispatch(actions.setCurrentSongId(""));
            dispatch(actions.setIsPlaying(false));
          }
        }
      }, 200);
    }
    // Pause when music is playing and user click stop
    if (
      !isPlaying &&
      currentSongID === song?._id &&
      audioSong.current.currentTime !== 0
    ) {
      audioSong.current.pause();
    }
  }, [isPlaying, audioSong.current]);

  return (
    <div className="embed-music bg-secondary">
      <HelmetComponent title={"AudioBay Embed"} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="embed-player row">
              <div className="details col-10 col-sm-10 col-md-4 col-lg-5 pr-0">
                {song?.thumbnail ? (
                  <div>
                    <img
                      src={song?.thumbnail}
                      alt="thumbnail"
                      className="embed-music-art"
                    />
                  </div>
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    <i className="ri-surround-sound-line sfx-player-icon text-primary"></i>
                  </div>
                )}
                <div className="pl-2 d-flex flex-column">
                  <Link to={ pathHref === "music" ? `/${path.MUSIC}/${song?.slug}` : `${path.SOUND_EFFECT}/${song?.slug}`} target="_blank">
                    <div
                      data-toggle="tooltip"
                      title={song?.title}
                      className="embed-track-name float-left hover-primary"
                    >
                      {song?.title}
                    </div>
                  </Link>
                  <div className="track-artist">
                    {song?.artists &&
                      song?.artists?.map((item, index, self) => {
                        return (
                          <Link
                            key={index}
                            to={`${path.ARTISTS}/${item?.slug}`}
                            target="_blank"
                            className="text-gray"
                          >
                            <span data-toggle="tooltip" title={item.name}>
                              {" "}
                              {item.name +
                                (index === self.length - 1 ? "" : ", ")}
                            </span>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="buttons col-2  col-sm-2 col-md-1  col-lg-1 pr-0 pl-0 justify-content-center align-items-center">
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
              </div>
              <div className="embed-slider-container col-12 col-sm-12 col-md-6 col-lg-6 pl-0 ">
                <div
                  ref={trackRef}
                  onClick={handleClickProgress}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  data-toggle="tooltip"
                  title={
                    hoverSecond
                      ? moment.utc(hoverSecond * 1000).format("mm:ss")
                      : "00:00"
                  }
                  className="position-relative "
                  style={{
                    width: "90%",
                    margin: "auto",
                    minHeight: "50px",
                    // minWidth: "50px",
                    filter: "brightness(1.3)",
                    backgroundSize: "initial",
                    backgroundRepeat: "no-repeat",
                    cursor: "pointer",
                    backgroundImage: `url(
                    ${song?.waveform}
                    )`,
                    verticalAlign: "middle",
                    borderStyle: "none",
                    backgroundPositionY: "center",
                  }}
                >
                  <div
                    ref={thumbRef}
                    className="position-absolute "
                    style={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      backgroundSize: "initial",
                      backgroundRepeat: "no-repeat",
                      backgroundImage: `url(
                        ${song?.waveform}
                        )`,
                      filter: "brightness(0.75) hue-rotate(13deg)",
                      verticalAlign: "middle",
                      borderStyle: "none",
                      backgroundPositionY: "center",
                    }}
                  ></div>
                  <div
                    ref={thumbRef2}
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      bottom: "0",
                      backgroundSize: "initial",
                      backgroundRepeat: "no-repeat",
                      backgroundImage: `url(
                        ${song?.waveform}
                        )`,
                      borderRadius: "5px",
                      filter:
                        "brightness(0.75) hue-rotate(13deg) contrast(0.7)  ",
                      verticalAlign: "middle",
                      borderStyle: "none",
                      backgroundPositionY: "center",
                    }}
                  ></div>
                </div>
                {/* <img
                      style={{
                        padding: "0px",
                        minHeight: "72px",
                        minWidth: "50px",
                        cursor: "pointer",
                        height: "50px",
                        objectFit: "cover",
                        filter: "brightness(10)",
                      }}
                      className="audio-visualizer"
                      src={song?.waveform}
                      alt="waveform"
                    /> */}
                {/* <input
                  type="range"
                  min={1}
                  max={100}
                  defaultValue={0}
                  className="seek_slider"
                /> */}
                <div className="">
                  <Link to={ pathHref === "music" ? `/${path.MUSIC}/${song?.slug}` : `${path.SOUND_EFFECT}/${song?.slug}`} target="_blank">
                    <div className="embed-download-icon">
                      <BsDownload size={18} />
                    </div>
                  </Link>
                </div>
              </div>
              {/* <div className="col-2 col-md-1 col-lg-1">
                <Link to={`/${path.MUSIC}/${song?.slug}`} target="_blank">
                  <div className="embed-download-icon">
                    <BsDownload size={18} />
                  </div>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedMusic;
