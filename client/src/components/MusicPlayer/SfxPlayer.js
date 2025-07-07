import React, { Fragment, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Loading } from "components";
const SfxPlayer = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const { currentSongID, isPlaying } = useSelector((state) => state.music);
  const [song, setSong] = useState([]);
  const handlePlayMusic = (song) => {
    if (song?.streaming !== undefined) {
      dispatch(actions.setCurrentSongId(song._id));
      dispatch(actions.setIsPlaying(true));
    }
  };



  useEffect(() => {
    if (props.sfx) {
      setSong(props.sfx);
    }
    if (props.song) {
      setSong(props.song);
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
              <li className="mb-3">
                <div className="d-flex justify-content-between align-items-center row">
                  <div
                    style={{
                      paddingRight: "0px",
                    }}
                    className="media align-items-center col-sm-3 pr-0 col-7"
                  >
                   <div  className="iq-thumb-hotsong ">
                   <div
                        style={{
                          cursor: "pointer",
                        }}
                        className="iq-music-overlay"
                      ></div>
                      <a>
                        <i className="ri-surround-sound-line font-size-80 sfx-player-icon"></i>
                      </a>
                      <div
                        onClick={() => {
                          handlePlayMusic(song);
                        }}
                        className="overlay-music-icon"
                      >
                        <a>
                          <i className="las la-play-circle font-size-24"></i>
                        </a>
                      </div>
                    </div>
                    <div className="media-body ml-3">
                      <p className="mb-0">{song?.title}</p>
                      <small
                        onClick={() =>
                          navigate(`/artists/${song?.artists[0].slug}`)
                        }
                        className="home_footer_link"
                      >
                        {" "}
                        {song?.artists &&
                          song.artists.map((artist) => artist.name).join(", ")}
                      </small>
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "0px",
                    }}
                    className="media align-items-center col-sm-2  genre-list"
                  >
                    <div style={{}} className="media-body iq-music-time">
                      {/* <p className="mb-0">{song?.title}</p> */}
                      <small>
                        {" "}
                        {song?.sfxCategory &&
                          song.sfxCategory.map((item) => item.title).join(", ")}
                      </small>
                    </div>
                  </div>

                  {/* <p
                    onClick={() => {
                      currentSongID !== song._id && handlePlayMusic(song);
                    }}
                    className="mb-0 col-0 col-md-0 iq-music-play"
                  >
                    {currentSongID === song._id && isPlaying ? (
                      <i
                        style={{
                          cursor: "default",
                        }}
                        className="las la-pause-circle font-size-32"
                      ></i>
                    ) : (
                      <i
                        style={{
                          cursor: "pointer",
                        }}
                        className="las la-play-circle font-size-32"
                      ></i>
                    )}
                  </p> */}
             
                  {/*Visualize*/}
                  {song?.waveform && (
                    <img
                      style={{
                        padding: "0px",
                        // cursor: "pointer",
                        minHeight: "50px",
                        minWidth: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      className="mb-0 col-md-4 col-md-4 audio-visualizer "
                      src={song?.waveform}
                    ></img>
                  )}
                       {/*Duration*/}
                       <p className="mb-0 col-md-0 col-md-0 iq-music-time">
                    {song?.duration
                      ? moment(song?.duration * 1000).format("mm:ss")
                      : "00:00"}
                  </p>
                  {/*Toggle Modal*/}
                  <p
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      dispatch(actions.setIsShowModal(true));
                      dispatch(actions.setModalData(song));
                    }}
                    data-toggle="modal"
                    data-target="#exampleModalCenter10"
                    className="mb-0 col-md-0 col-md-0 iq-music-time"
                  >
                    <i className="las la-download font-size-20"></i>
                  </p>
                  {/*Star*/}
                  <p
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
                      document.getElementById("shareLink").style.display = "flex"

                      setTimeout(() => {
                        document.getElementById("shareLink").style.opacity = 0;
                      document.getElementById("shareLink").style.display = "none"

                      }, 2000);
                    }}
                    className="mb-0 col-md-0 col-md-0 iq-musc-icone"
                  >
                    <i className="las la-share-alt-square  font-size-20"></i>
                  </p>

                  <div className="iq-card-header-toolbar iq-music-drop d-flex align-items-center pr-4">
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
                  </div>
                </div>
              </li>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
export default memo(SfxPlayer);