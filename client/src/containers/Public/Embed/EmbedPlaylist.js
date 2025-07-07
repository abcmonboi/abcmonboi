import React, { useEffect, useState, useRef, Fragment } from "react";
import { apiGetAlbumById, apiFilterSearchSong,apiGetCollection ,apiGetSubTheme} from "apis";
import { Link, useParams } from "react-router-dom";
import { HelmetComponent, LoadingPlayer,Loading } from "components";
import { path } from "ultils/constant";
import { BsDownload } from "react-icons/bs";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "store/actions";
import InfiniteScroll from "react-infinite-scroll-component";

var intervalId;

const EmbedPlaylist = () => {
  //AudioBay Embed
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isLoadedSource, setIsLoadedSource] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState({});
  const trackRef = useRef(null);
  const audioSong = useRef(null);
  const thumbRef = useRef(null);
  const thumbRef2 = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [currentSecond, setCurrentSecond] = useState(0);
  const [hoverSecond, setHoverSecond] = useState(0);
  const pathHref = window.location.href.split("/embed/")[1].split("/")[0];
  const { isPlaying, currentSongID } = useSelector((state) => state.music);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [url, setUrl] = useState();
  const [subUrl, setSubUrl] = useState();
  const fetchMoreData = () => {
    setPage(page + 1);
  };
  const handleMouseEnter = (e) => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
    thumbRef2.current.style.right = `${100}%`;
  };  
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

  const FetchDataCollection = async (id, queries) => {
    try {
      const response = await apiGetCollection(id, queries);
      const dataRes = response?.data?.data;
      if (dataRes) {
        if (
          +response.data?.songSkip + +response.data?.songLimit >=
          +response.data?.songCount
        ) {
          setHasMore(false);
        }
        if (dataRes?.length === 0) {
          setHasMore(false);
          setData([]);
          setSongs([]);
        }
        if (queries?.pageSong === 1) {

          if (dataRes?.collection_type === 1) {
            dispatch(actions.setCurrentSongId(dataRes.song[0]?._id));
            setCurrentSong(dataRes.song[0]);
            audioSong.current = new Audio(dataRes.song[0]?.streaming);
            audioSong.current.preload = "metadata";
            dispatch(actions.setPlaylist(dataRes?.song));
            setSongs(dataRes?.song);
          } else {
            dispatch(actions.setCurrentSongId(dataRes.sfx[0]?._id));
            setCurrentSong(dataRes.sfx[0]);
            audioSong.current = new Audio(dataRes.sfx[0]?.streaming);
            audioSong.current.preload = "metadata";
            dispatch(actions.setPlaylist(dataRes?.sfx));
            setSongs(dataRes?.sfx);
          }
          setData(dataRes);
        } else {
          if (dataRes?.collection_type === 1) {
            dispatch(actions.setPlaylist([...songs, ...dataRes?.song]));
            setSongs([...songs, ...dataRes?.song]);
          } else {
            dispatch(actions.setPlaylist([...songs, ...dataRes?.songs]));
            setSongs([...songs, ...dataRes?.sfx]);
          }
        }
      } else {
        setData([]);
        setSongs([]);
        setHasMore(false);
      }
  
      setisLoading(false);
    } catch (error) {
      console.log(error)
      setisLoading(false);
    }
  };
  const FetchDataTheme = async (id, queries) => {
    try {
      const response = await apiGetSubTheme(id, queries);
      const dataRes = response?.data?.data;
      if (dataRes) {
        if (
          +response.data?.songSkip + +response.data?.songLimit >=
          +response.data?.songCount
        ) {
          setHasMore(false);
        }
        if (dataRes?.length === 0) {
          setHasMore(false);
          setData([]);
          setSongs([]);
        }
        if (queries?.pageSong === 1) {
          dispatch(actions.setCurrentSongId(dataRes.song[0]?._id));
          setCurrentSong(dataRes.song[0]);
          audioSong.current = new Audio(dataRes.song[0]?.streaming);
          audioSong.current.preload = "metadata";
            dispatch(actions.setPlaylist(dataRes?.song));
            setSongs(dataRes?.song);

          setData(dataRes);
        } else {
            dispatch(actions.setPlaylist([...songs, ...dataRes?.song]));
            setSongs([...songs, ...dataRes?.song]);

        }
      } else {
        setData([]);
        setSongs([]);
        setHasMore(false);
      }
  
      setisLoading(false);
    } catch (error) {
      console.log(error)
      setisLoading(false);
    }
  };
  ///get element path from url after /embed/
  //split path to remove id
  useEffect(() => {
    if (id) {
      const q = {
        pageSong: page,
        limitSong: limit,
      };
      switch (pathHref) {
        case "album":
          apiGetAlbumById(id)
            .then((res) => {
              setData(res.data.data);
            })
            .catch((err) => console.log(err));
          apiFilterSearchSong({ album: id, status: true })
            .then((res) => {
              setSongs(res.data.data);
              setisLoading(false);
              setHasMore(false);
              dispatch(actions.setCurrentSongId(res.data.data[0]?._id));
              setCurrentSong(res.data.data[0]);
              audioSong.current = new Audio(res.data.data[0]?.streaming);
              audioSong.current.preload = "metadata";
            })
            .catch((err) => console.log(err));
          break;
        case "collection":
          FetchDataCollection(id, q);
          break;
        case "theme":
          FetchDataTheme(id, q);
          break;
        default:
          break;
      }
      document.body.style.background = "#fff";
      const fbRoot = document.getElementById("fb-root");
      fbRoot && fbRoot.remove();
    }
  }, [page,id]);
  useEffect(() => {
    if(data){
    switch (pathHref) {
      case "album":
        setUrl(`/${pathHref}s/${data?.slug}`);
        break;
      case "collection":
        setUrl(`/${pathHref}/${data?.slug}`);
        break;
      case "theme":
        if(data?.themes){
        setUrl(`/themes/${data?.themes[0]?.slug}/${data?.slug}`);
        }
        break;
      case "music":
        setUrl(`/${pathHref}/${data?.slug}`);
        break;
      default:
        break;
    }
  }
  }, [data]);
  //Click progress bar
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
  const handlePlayMusic = (songSingle) => {
    audioSong.current.pause();
    if (songSingle?.streaming !== undefined) {
      dispatch(actions.setCurrentSongId(songSingle?._id));
      setCurrentSong(songSingle);
      audioSong.current = new Audio(songSingle?.streaming);
      audioSong.current.preload = "metadata";
      dispatch(actions.setIsPlaying(true));
    }
  };

  useEffect(() => {
    // Play when music is not playing and user click play
    if (isPlaying && currentSongID === currentSong?._id) {
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
              if (item._id === currentSong?._id) {
                currentSongIndex = index;
              }
            });

            if (songs[currentSongIndex + 1]?._id) {
              setCurrentSong(songs[currentSongIndex + 1]);
              dispatch(
                actions.setCurrentSongId(songs[currentSongIndex + 1]._id)
              );
              audioSong.current = new Audio( songs[currentSongIndex + 1]?.streaming);
              audioSong.current.preload = "metadata";
              // audioSong.current.play();
              thumbRef.current.style.right = `${100}%`;
              thumbRef2.current.style.right = `${100}%`;
              dispatch(actions.setIsPlaying(true));
            } else {
              setCurrentSong(songs[0]);
              dispatch(actions.setCurrentSongId(songs[0]?._id));
              audioSong.current = new Audio(songs[0]?.streaming);
              audioSong.current.preload = "metadata";
              dispatch(actions.setIsPlaying(false));
              thumbRef.current.style.right = `${100}%`;
              thumbRef2.current.style.right = `${100}%`;

            }
          } else {
            // dispatch(actions.setCurrentSongId(""));
            dispatch(actions.setIsPlaying(false));
          }
        }
      }, 100);
    // }, 200);

    }
    // Pause when music is playing and user click stop
    if (
      !isPlaying &&
      currentSongID === currentSong?._id &&
      audioSong.current.currentTime !== 0
    ) {
      audioSong.current.pause();
    }
    if (
      !isPlaying &&
      currentSongID === currentSong?._id &&
      audioSong.current.currentTime === 0
    ) {
      intervalId && clearInterval(intervalId);
      setCurrentSecond(0);
    }
  }, [isPlaying, currentSong,audioSong.current]);
  const handleNextSong = () => {
    audioSong.current.pause();
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item._id === currentSong?._id) {
          currentSongIndex = index;
        }
      });

      if (songs[currentSongIndex + 1]?._id) {
        dispatch(actions.setCurrentSongId(songs[currentSongIndex + 1]._id));
        setCurrentSong(songs[currentSongIndex + 1]);
        audioSong.current = new Audio(songs[currentSongIndex + 1]?.streaming);
        audioSong.current.preload = "metadata";
        dispatch(actions.setIsPlaying(true));
      }
    }
  };
  const handlePrevSong = () => {
    audioSong.current.pause();
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item?._id === currentSong?._id) {
          currentSongIndex = index;
          // setcurrentSongIndexOf(index);
        }
      });
      if (songs[currentSongIndex - 1]?._id) {
        dispatch(actions.setCurrentSongId(songs[currentSongIndex - 1]._id));
        setCurrentSong(songs[currentSongIndex - 1]);
        audioSong.current = new Audio(songs[currentSongIndex - 1]?.streaming);
        audioSong.current.preload = "metadata";
        dispatch(actions.setIsPlaying(true));
      }
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#676767",
        minHeight: "100vh",
        display:"block",
        position: "relative",
      }}
      className="embed-music rounded"
    >
      <HelmetComponent title={"AudioBay Embed"} />
      <div className="container-fluid">
        <div className="row">
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 999,
              backgroundColor: "#676767",
            }}
            className="col-sm-12"
          >
            <div className="embed-player row">
              {/* Col 1 */}
              <div className="details col-9 col-sm-10 col-md-10 col-lg-10 pr-0">
                {/* Col 1 */}
                <div className="pt-2 pb-2">
                  <img
                    src={
                      pathHref === "album" ? data?.album_art : pathHref === "collection" ? data?.thumbnail_collection :
                      pathHref === "theme" ? data?.themesubArtwork : "" }
                    alt="thumbnail"
                    className="embed-playlist-art"
                  />
                </div>
                {/* Col 2 */}
                <div className="p-2 d-flex flex-column justify-content-between w-100">
                  {/* Row 1 */}
                  <Link
                    to={url}
                    target="_blank"
                    style={{
                      width: "fit-content",
                    }}
                  >
                    <div
                      data-toggle="tooltip"
                      title={data?.title}
                      className="embed-playlist-name float-left hover-primary description-infor-2-line"
                    >
                      {data?.title}
                    </div>
                  </Link>
                  {/* Row 2 */}
                  <div
                    style={{
                      width: "fit-content",
                    }}
                    className="embed-track-artist"
                  >
                    {data?.artists &&
                      data?.artists?.map((item, index, self) => {
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
                       {data?.collection_type === 1 && (
                        <span className="text-gray">
                          Bộ sưu tập âm nhạc
                        </span>
                       )}
                        {data?.collection_type === 2 && (
                          <span className="text-gray">
                            Bộ sưu tập hiệu ứng âm thanh
                          </span>
                        )}
                        {
                          data?.themes ? (
                            <span className="text-gray">
                              {data?.themes[0]?.title}
                            </span>
                          )
                          : null
                        }
                              

                  </div>
                  {/* Row 3 */}
                  <div className="row ml-0 align-items-center">
                    <div className="embed-slider-container pl-0 pr-0 col-10 col-sm-11">
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
                        className="position-relative"
                        style={{
                          width: "100%",
                          margin: "auto",
                          minHeight: "50px",
                          filter: "brightness(1.3)",
                          backgroundSize: "initial",
                          backgroundRepeat: "no-repeat",
                          cursor: "pointer",
                          backgroundImage: `url(
                    ${currentSong?.waveform}
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
                          ${currentSong?.waveform}
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
                          ${currentSong?.waveform}
                          )`,
                            filter:
                              "brightness(0.75) hue-rotate(13deg) contrast(0.7)  ",
                              verticalAlign: "middle",
                              borderStyle: "none",
                              backgroundPositionY: "center",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-2 col-sm-1 embed-total-duration d-flex ml-auto">
                      {moment.utc((currentSong?.duration - currentSecond) * 1000).format("mm:ss")}
                    </div>
                  </div>
                </div>
              </div>
              {/* Col 2 */}
              <div className="col-3 col-sm-2 col-md-2 col-lg-2 d-flex flex-column">
                <div className="buttons m-auto">
                  <div
                     onClick={!songs || songs?.indexOf(songs.find((song) => song?._id === currentSong?._id)) === 0 ? null : handlePrevSong}
                    className={`${
                      !songs ||
                      songs?.indexOf(
                        songs.find((song) => song?._id === currentSong?._id)
                      ) === 0
                        ? "text-secondary embed-prev-track"
                        : "embed-prev-track"
                    }`}
                  >
                    <i
                      style={{
                        cursor: `${
                          !songs ||
                          songs?.indexOf(
                            songs.find((song) => song?._id === currentSong?._id)
                          ) === 0
                            ? "default"
                            : "pointer"
                        }`,
                      }}
                      className="fa fa-step-backward fa-2x"
                    />
                  </div>

                  <div
                    onClick={handleTogglePlayMusic}
                    className="embed-playpause-track"
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
                     onClick={!songs || songs?.indexOf(songs.find((song) => song?._id === currentSong?._id)) === songs?.length - 1 ? null : handleNextSong}
                    className={`${
                      !songs ||
                      songs?.indexOf(
                        songs.find((song) => song?._id === currentSong?._id)
                      ) ===
                        songs?.length - 1
                        ? "text-secondary embed-next-track "
                        : "embed-next-track"
                    }`}
                  >
                    <i
                      style={{
                        cursor: `${
                          !songs ||
                          songs?.indexOf(
                            songs?.find(
                              (song) => song?._id === currentSong?._id
                            )
                          ) ===
                            songs?.length - 1
                            ? "default"
                            : "pointer"
                        }`,
                      }}
                      className="fa fa-step-forward fa-2x"
                    />
                  </div>
                </div>
                <div className="embed-playlist-download">
                  <Link
                    to={url}
                    target="_blank"
                  >
                    <div className="embed-download-icon">
                      <BsDownload />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12">
            <div
              style={{
                backgroundColor: "#595959",
              }}
              className="iq-card "
            >
              <div className="iq-card-body">
              {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center min-vh-100">
                      <Loading />
                    </div>
                  ) : (songs?.length) > 0 ? (
                    <InfiniteScroll
                      dataLength={songs?.length}
                      next={fetchMoreData}
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
                  {songs &&
                    songs.map((song, index) => {
                      return (
                        <Fragment key={index}>
                          <li 
                          
                          className={`${
                            song?._id === currentSong?._id
                              ? "music-player-playing mb-3 pt-1 pb-1"
                              : "music-player mb-3 pt-1 pb-1"
                          }`}
                          >
                            <div className="d-flex justify-content-between align-items-center row position-relative">
                              <div className="media align-items-center  col-sm-11 pr-0 col-10">
                                <div className="iq-thumb-hotsong ">
                                  <div
                                    className="iq-music-overlay"
                                  ></div>
                                  <div className="embed-index-song-playlist">
                                    <span>{index + 1}</span>
                                  </div>
                                  <div
                                   
                                    className="overlay-music-icon"
                                  >
                                    <span
                                      className="d-flex align-items-center justify-content-center"
                                      style={{
                                        fontSize: "35px",
                                        width: "30px",
                                        height: "30px",
                                        cursor: "pointer",                                          
                                      }}
                                    >
                                      {(currentSong?._id === song?._id && isPlaying) ? (
                                      <i 
                                      onClick={
                                        handleTogglePlayMusic
                                      }
                                      className="las la-pause-circle bg-primary rounded-circle"></i>
                                      ) : (
                                        <i  onClick={() => {
                                          currentSong?._id === song?._id ? handleTogglePlayMusic() :
                                          handlePlayMusic(song);
                                        }} className="las la-play-circle bg-primary rounded-circle"></i>
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <div className="media-body ml-3">
                                  <Link
                                    to={`/${path.MUSIC}/${song?.slug}`}
                                    target="_blank"
                                    style={{
                                      width: "fit-content",
                                    }}
                                  >
                                    <p
                                       style={{
                                        width: "fit-content",
                                      }}
                                      className="embed-musicplayer-song-title description-infor-1-line"
                                      data-toggle="tooltip"
                                      title={song?.title}
                                    >
                                      {song?.title}
                                    </p>
                                  </Link>
                                  <div className="track-artist">
                                    {song?.artists &&
                                      song?.artists?.map(
                                        (item, index, self) => {
                                          return (
                                            <Link
                                              key={index}
                                              to={`${path.ARTISTS}/${item?.slug}`}
                                              target="_blank"
                                              className="text-gray"
                                            >
                                              <span
                                                data-toggle="tooltip"
                                                title={item.name}
                                              >
                                                {" "}
                                                {item.name +
                                                  (index === self.length - 1
                                                    ? ""
                                                    : ", ")}
                                              </span>
                                            </Link>
                                          );
                                        }
                                      )}
                                  </div>
                                </div>
                              </div>

                              <p className="mb-0 embed-total-duration  col-sm-1 col-2">
                                {moment(song?.duration * 1000).format("mm:ss")}
                              </p>
                            </div>
                          </li>
                        </Fragment>
                      );
                    })}
                  
                </ul>
                </InfiniteScroll>
                  ) : (
                    <div className="text-center mb-5 text-muted">
                      <h5 className="text-muted">
                        Không có dữ liệu
                      </h5>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedPlaylist;
