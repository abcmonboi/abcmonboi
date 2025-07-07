import React, { useCallback, useEffect, useState, useRef, memo } from "react";
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
import { path } from "ultils/constant";
import useFileDownloader from "hooks/useFileDownloader";
import { apiGetAllBlogCategory } from "apis";
var intervalId;
const BlogPrevHeader = () => {
  const dispatch = useDispatch();
  const [donwloadFile, DownloaderComponentUI] = useFileDownloader();
  const download = (file) => donwloadFile(file);
  // const audioRef = useRef(null);
  const [audioSong, setAudioSong] = useState(new Audio());
  const { currentSongID, isPlaying, songs, update } = useSelector(
    (state) => state.music
  );
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [song, setSong] = useState(null);
  const [isLoadedSource, setIsLoadedSource] = useState(true);
  const [currentSecond, setCurrentSecond] = useState(0);
  const thumbRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [volume, setVolume] = useState(70);
  const { fileList } = useSelector((state) => state.music);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    apiGetAllBlogCategory({ limit: 6, fields: "title slug" })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        if (err) navigate("/home");
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Lấy thông tin bài hát khi có id mới
  useEffect(() => {
    audioSong.pause();
    // audioSong.remove();
    intervalId && clearInterval(intervalId);
    audioSong.src = "";

    // thumbRef.current.style.right = `${100}%`;
    // setCurrentSecond(0);
    setIsLoadedSource(false);
    const FetchGetDetailSong = async () => {
      const response = await apiGetDetailSong(currentSongID);
      if (response.data.err === 0 || response.data.err === undefined) {
        if (response.data.success) {
          setSong(response.data.data);
          setAudioSong(new Audio(response.data.data?.streaming));
        } else {
          const response = await apiGetSfxById(currentSongID);
          setSong(response.data.data);
          setAudioSong(new Audio(response.data.data?.streaming));
        }
      }
    };
    currentSongID && FetchGetDetailSong();
    // eslint-disable-next-line
  }, [currentSongID]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);

    audioSong.load();
    setIsLoadedSource(true);
    audioSong.volume = volume / 100;
  }, [audioSong]);

  useEffect(() => {
    if (isPlaying && currentSongID === song?._id) {
      // audioSong.load();
      intervalId && clearInterval(intervalId);
      audioSong.play();
      song?.sfxCategory !== undefined
        ? apiUpdateSfxListen(currentSongID)
        : apiUpdateSongListen(currentSongID);
      intervalId = setInterval(() => {
        let percent =
          Math.round((audioSong.currentTime * 10000) / audioSong?.duration) /
          100;
        thumbRef.current.style.right = `${100 - percent}%`;
        setCurrentSecond(Math.round(audioSong.currentTime));
        if (audioSong?.currentTime === audioSong?.duration) {
          intervalId && clearInterval(intervalId);
          audioSong.pause();
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
      audioSong.currentTime !== 0
    ) {
      audioSong.pause();
    }
  }, [isPlaying, audioSong]);

  const { token, role } = useSelector((state) => state.auth);
  const { dataUser } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.user);
  const [isActive, setIsActive] = useState(window.location.pathname);

  const goLogin = useCallback(() => {
    navigate(path.SIGNIN);
  }, []);
  useEffect(() => {
    if (window.location.pathname) {
      setIsActive(window.location.pathname);
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (fileList?.length > 0) {
      download(fileList[fileList?.length - 1]);
    }
  }, [fileList]);

  return (
    <Fragment>
      <div className="iq-top-navbar ">
        <div className="iq-navbar-custom">
          <nav className="navbar navbar-expand-lg navbar-light p-0">
            <div className="iq-menu-bt d-flex align-items-center">
              <div className="wrapper-menu">
                <div className="main-circle">
                  <i className="las la-bars"></i>
                </div>
              </div>
              <div className="iq-navbar-logo d-flex justify-content-between">
                <a onClick={() => navigate(path.HOME)} className="header-logo">
                  <img
                    src="/assets/images/logo.png"
                    className="img-fluid rounded-normal"
                    alt=""
                  />

                  <div className="pt-2 pl-2 logo-title">
                    <span className="text-primary text-uppercase">
                      AudioBay
                    </span>
                  </div>
                </a>
              </div>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-label="Toggle navigation"
            >
              <i className="ri-menu-3-line"></i>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* <ul className="list-unstyled iq-menu-top d-flex justify-content-between mb-0 p-0">
                {data?.length > 0 &&
                  data.map((el, index) => (
                    <li
                      className={
                        isActive === "/" || isActive === "/home" ? "active" : ""
                      }
                      onClick={() => navigate("/blog/" + el?.slug)}
                    >
                      <a>{el?.title}</a>
                    </li>
                  ))}
              </ul> */}

              <ul className="navbar-nav ml-auto navbar-list">
                <li className="nav-item nav-icon"></li>
                <li className="nav-item nav-icon search-content">
                  <a className="search-toggle iq-waves-effect text-gray rounded">
                    <span className="ripple rippleEffect "></span>
                    <i className="ri-search-line text-black"></i>
                  </a>
                  <form action="#" className="search-box p-0">
                    <input
                      type="text"
                      className="text search-input"
                      placeholder="Type here to search..."
                    />
                    <a className="search-link">
                      <i className="ri-search-line text-black"></i>
                    </a>
                    <a className="search-audio">
                      <i className="las la-microphone text-black"></i>
                    </a>
                  </form>
                </li>

                <li className="line-height pt-3">
                  <a
                    onClick={() => {
                      if (!isLoggedIn) {
                        audioSong.pause();
                        setAudioSong(null);
                        dispatch(actions.setIsPlaying(false));
                        clearInterval(intervalId);
                        goLogin();
                        dispatch(actions.setDownload());
                      }
                    }}
                    className="search-toggle iq-waves-effect d-flex align-items-center"
                  >
                    {!isLoggedIn ||
                    (currentUser?.avatar === undefined &&
                      dataUser?.avatar === undefined) ||
                    currentUser?.avatar === "" ||
                    dataUser?.avatar === "" ? (
                      <div
                        className="rounded-circle  d-flex align-items-center justify-content-center "
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "var(--iq-dark-primary)",
                        }}
                      >
                        <i
                          style={{
                            fontSize: "30px",
                          }}
                          className="fa fa-user  "
                        ></i>
                      </div>
                    ) : (
                      <img
                        src={
                          currentUser !== null
                            ? currentUser?.avatar
                            : dataUser?.avatar
                        }
                        className="img-fluid rounded-circle"
                        alt="user"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </a>

                  {isLoggedIn && (
                    <div className="iq-sub-dropdown iq-user-dropdown">
                      <div className="iq-card shadow-none m-0">
                        <div className="iq-card-body p-0 ">
                          <div className="bg-primary p-3">
                            <h5 className="mb-0 text-white line-height">
                              Hello{" "}
                              {currentUser !== null
                                ? currentUser?.firstname +
                                  " " +
                                  currentUser?.lastname
                                : dataUser?.firstname +
                                  " " +
                                  dataUser?.lastname}
                            </h5>
                            <span className="text-white font-size-12">
                              {currentUser !== null
                                ? currentUser?.email
                                : dataUser?.email}
                            </span>
                          </div>
                          <a
                            onClick={() => {
                              dispatch(actions.setIsPlaying(false));
                              dispatch(actions.setDownload());
                              audioSong.pause();
                              clearInterval(intervalId);
                              navigate("/user/" + path.USER.PROFILE);
                            }}
                            className="iq-sub-card iq-bg-primary-hover"
                          >
                            <div className="media align-items-center">
                              <div className="rounded iq-card-icon iq-bg-primary">
                                <i className="ri-file-user-line"></i>
                              </div>
                              <div className="media-body ml-3">
                                <h6 className="mb-0 ">My Profile</h6>
                                <p className="mb-0 font-size-12">
                                  View personal profile details.
                                </p>
                              </div>
                            </div>
                          </a>
                          <a
                            onClick={() => {
                              navigate("/user/" + path.USER.EDIT_PROFILE);
                            }}
                            className="iq-sub-card iq-bg-primary-hover"
                          >
                            <div className="media align-items-center">
                              <div className="rounded iq-card-icon iq-bg-primary">
                                <i className="ri-profile-line"></i>
                              </div>
                              <div className="media-body ml-3">
                                <h6 className="mb-0 ">Edit Profile</h6>
                                <p className="mb-0 font-size-12">
                                  Modify your personal details.
                                </p>
                              </div>
                            </div>
                          </a>

                          <a
                            onClick={() => {
                              navigate("/user/" + path.USER.PRIVACY_SETTINGS);
                            }}
                            className="iq-sub-card iq-bg-primary-hover"
                          >
                            <div className="media align-items-center">
                              <div className="rounded iq-card-icon iq-bg-primary">
                                <i className="ri-lock-line"></i>
                              </div>
                              <div className="media-body ml-3">
                                <h6 className="mb-0 ">Privacy</h6>
                                <p className="mb-0 font-size-12">
                                  Control your privacy parameters.
                                </p>
                              </div>
                            </div>
                          </a>
                          <div className="d-inline-block w-100 text-center p-3">
                            <a
                              className="bg-primary iq-sign-btn"
                              onClick={() => {
                                dispatch(actions.clearState());
                                dispatch(actions.logout());
                              }}
                              role="button"
                            >
                              Sign out<i className="ri-login-box-line ml-2"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(BlogPrevHeader);
