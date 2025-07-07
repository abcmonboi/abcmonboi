import React, { Fragment, memo, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Slider from "react-slick";
import * as actions from "store/actions";
import fileDownload from "js-file-download";
import Axios from "axios";
import { apiGetDetailSong, getNewRelease } from "apis";
import { Loading } from "components";
import { useNavigate } from "react-router-dom";
const NewSong = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliderRelease = useRef(null);
  const [isActive, setIsActive] = useState();
  const { currentSongID, isPlaying } = useSelector((state) => state.music);
  const [isLoading, setisLoading] = useState(true);
  const [playingSong, setPlayingSong] = useState(null);
  const [NewReleaseSong, setNewReleaseSong] = useState([]);
  const [currentSong, setCurrentSong] = useState({});
  const { modalData, isShowModal } = useSelector((state) => state.app);
  const { fileList } = useSelector((state) => state.music);
  const handlePlayMusic = (songSingle) => {
    if (songSingle?.streaming !== undefined) {
      if (NewReleaseSong.length > 1) {
        dispatch(actions.setPlaylist(NewReleaseSong));
        dispatch(actions.playAlbum(true));
      } else {
        dispatch(actions.playAlbum(false));
        dispatch(actions.setPlaylist(null));
      }
      if (isPlaying && currentSongID === songSingle._id) {
        dispatch(actions.setIsPlaying(false));
      } else {
        dispatch(actions.playAlbum(false));
        dispatch(actions.setCurrentSongId(songSingle._id));
        dispatch(actions.setIsPlaying(true));
      }
    }
  };
  const settings2 = {
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    // autoplay: true,
    // autoplaySpeed: 1600,
    focusOnSelect: true,
    pauseOnHover: true,
    speed: 700,
    responsive: [
      {
        breakpoint: 1424,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  // const handleDownload = (url, filename) => {
  const handleDownload = (data) => {
    if (fileList === null) {
      dispatch(
        actions.setDownload([
          {
            file: data?.streaming,
            filename: data?.title,
            thumbnail: data?.thumbnail,
            type: "song",
          },
        ])
      );
    } else {
      dispatch(
        actions.setDownload([
          ...fileList,
          {
            file: data?.streaming,
            filename: data?.title,
            thumbnail: data?.thumbnail,
            type: "song",

          },
        ])
      );
    }
    // dispatch(actions.setIsShowModal(false));

    // if (fileList === null) {
    //   dispatch(actions.setDownload([{ url, filename }]));
    // } else {
    //   dispatch(actions.setDownload([...fileList, { url, filename }]));
    // }
    // const aTag = document.createElement("a");
    // aTag.href = url;
    // aTag.setAttribute("target", "_blank");
    // aTag.setAttribute("download", filename + ".mp3");
    // document.body.appendChild(aTag);
    // aTag.click();
    // document.body.removeChild(aTag);
    // aTag.remove();
    // Axios.get(url
    //   , {
    //   responseType: "blob",
    // }).then((res) => {
    //   fileDownload(res.data, filename + ".mp3");
    //   // console.log(res.data + " " + filename);
    // });
    // fileDownload(url, filename + ".mp3");
    // fetch(url)
    //   .then((res) => res.blob())
    //   .then((blob) => {
    //     fileDownload(blob, filename + ".mp3");
    //   });
  };

  useEffect(() => {
    setIsActive(currentSong?._id);
  }, [currentSong]);
  useEffect(() => {
    const FetchGetDetailSong = async () => {
      setisLoading(true);
      const response = await apiGetDetailSong(currentSongID);

      if (response.data.err === 0 || response.data.err === undefined) {
        setCurrentSong(response.data.data);
        setisLoading(false);
      }
      // console.log(moment.utc(audio.duration * 1000).format("mm:ss"));
      // setDuration(moment.utc(audio.duration * 1000).format("mm:ss"));
    };
    if (currentSongID) {
      FetchGetDetailSong();
    }
  }, [currentSongID]);
  useEffect(() => {
    const FetchGetNewReleaseSong = async () => {
      try {
        const response = await getNewRelease("-createdAt");
        const data = response.data;
        setNewReleaseSong(data);
        data && setCurrentSong(data[0]);
        setisLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    FetchGetNewReleaseSong();
  }, []);
  return (
    <Fragment>
      <div className="col-lg-12">
        <div className="iq-card iq-realease">
          <div className="iq-card-header d-flex justify-content-between border-0">
            <div className="iq-header-title">
              <h4 className="card-title font-weight-normal">Bài Hát Mới</h4>
            </div>
          </div>

          <div
            style={
              `${isLoading}` === "true"
                ? {
                    height: "477px",
                    backgroundColor: "#ffffff",
                  }
                : {
                    height: "477px",
                    backgroundBlendMode: "multiply",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${
                      !currentSong?.thumbnail_medium && NewReleaseSong
                        ? NewReleaseSong[0]?.thumbnail_medium
                        : currentSong?.thumbnail_medium
                    })`,
                    backgroundSize: "cover",
                  }
            }
            className="iq-card-body iq-song-back2"
          >
            <div className="row">
              <div className="col-lg-5 iq-realese-box ">
                <div className="iq-music-img">
                  <div className="equalizer">
                    <span className="bar bar-1"></span>
                    <span className="bar bar-2"></span>
                    <span className="bar bar-3"></span>
                    <span className="bar bar-4"></span>
                    <span className="bar bar-5"></span>
                  </div>
                </div>
                <div className="player1 row">
                  <div className="details1 music-list col-8 ">
                    <div className="now-playing1"></div>
                    <div
                      style={{
                        backgroundImage: `url(${currentSong?.thumbnail})`,
                      }}
                      className="track-art1"
                    ></div>
                    <div>
                      <div
                        onClick={() => navigate(`/music/${currentSong?.slug}`)}
                        className="track-name1 home_footer_link"
                        data-toggle="tooltip" title={currentSong?.title}
                      >
                        {currentSong?.title}
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/artists/${currentSong?.artists[0]?.slug}`)
                        }
                        className="track-artist1 home_footer_link"
                      >
                        {currentSong?.artists
                          ?.map((artist) => artist.name)
                          .join(", ")}
                      </div>
                    </div>
                  </div>
                  <div className="buttons1 col-6 col-sm-2 col-lg-3"></div>
                </div>
              </div>
              <div
                style={{ width: "500px", maxHeight: "451px" }}
                className="col-lg-7"
              >
                <ul className="list-unstyled iq-song-slide mb-0 realeases-banner">
                  <Slider ref={sliderRelease} {...settings2}>
                    {NewReleaseSong &&
                      NewReleaseSong.map((song, index) => {
                        return (
                          <li
                            id="realeases-banner "
                            key={index}
                            className={
                              isActive === song._id
                                ? "active row slider-item "
                                : "row slider-item music-player"
                            }
                          >
                            <div
                              style={{ width: "100%" }}
                              className="d-flex justify-content-between align-items-center "
                            >
                              <div className="media align-items-center col-8 col-sm-10 col-md-5">
                                <div
                                  onClick={() => {
                                    handlePlayMusic(song);
                                    setCurrentSong(song);
                                    setIsActive(song._id);
                                  }}
                                  className="iq-realese-song "
                                >
                                  <a>
                                    <img
                                      style={{
                                        minHeight: "60px",
                                        minWidth: "60px",
                                        objectFit: "cover",
                                        width: "60px",
                                        height: "60px",
                                      }}
                                      src={song?.thumbnail}
                                      className="img-border-radius avatar-60 img-fluid"
                                      alt=""
                                    />
                                  </a>
                                </div>
                                <div className="media-body text-white ml-3">
                                  <p
                                    onClick={() =>
                                      navigate(`/music/${song?.slug}`)
                                    }
                                    className="mb-0 iq-music-title home_footer_link"
                                    data-toggle="tooltip" title={song?.title}
                                  >
                                    {song.title}
                                    {/* {song?.title.length > 37
                                      ? song?.title.slice(0, 28)
                                      : song?.title} */}
                                  </p>
                                  <small
                                    onClick={() =>
                                      navigate(
                                        `/artists/${song?.artists[0]?.slug}`
                                      )
                                    }
                                    className="home_footer_link mb-0"
                                  >
                                    {song?.artists
                                      .map((artist) => artist.name)
                                      .join(", ")}
                                  </small>
                                </div>
                              </div>
                              <p className="mb-0 col-md-2  iq-m-time">
                                {" "}
                                {song?.duration
                                  ? moment
                                      .utc(song?.duration * 1000)
                                      .format("mm:ss")
                                  : "00:00"}
                              </p>

                              <p
                                onClick={() => {
                                  setCurrentSong(song);
                                  setIsActive(song._id);
                                  handlePlayMusic(song);
                                }}
                                className="mb-0 col-2 col-md-2"
                              >
                                {isPlaying && song?._id === currentSongID ? (
                                  <i
                                    style={{
                                      cursor: "pointer",
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
                              </p>
                              <div className="iq-card-header-toolbar iq-music-drop d-flex align-items-center  col-md-1">
                                <div className="">
                                  <svg
                                    style={{
                                      cursor: "pointer",
                                      color: "white",
                                    }}
                                    onClick={() => {
                                      setPlayingSong(song);
                                    }}
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="currentColor"
                                    className="bi bi-download"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </Slider>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalCenter2"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content ">
            <div className="modal-header">
              <h5
                style={{
                  color: "black",
                }}
                className="modal-title "
                id="exampleModalCenter2Title"
              >
                Say thanks to AudioBay
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Crediting isn't required, but linking back is greatly
                appreciated and allows music authors to gain exposure.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownload(playingSong);
                  // dispatch(actions.setIsShowModal(true));
                  // console.log(playingSong)
                  // dispatch(actions.setModalData(playingSong));
                }}
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(NewSong);
