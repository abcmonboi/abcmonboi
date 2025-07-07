import { useEffect, React, useState, Fragment, useRef } from "react";
import { useParams } from "react-router-dom";
import { HelmetComponent, Loading, MusicPlayer } from "components";
import { apiGetSubThemeBySlug } from "apis";
import * as actions from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const DetailsSubThemes = () => {
  const dispatch = useDispatch();
  const { subslug } = useParams();
  const share = useRef();
  const [isLoading, setisLoading] = useState(true);
  const [song, setSong] = useState([]);
  const { fileList } = useSelector((state) => state.music);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [subTheme, setSubTheme] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { currentSongID, isPlaying } = useSelector((state) => state.music);
  const FetchData = async (slug, queries) => {
    try {
      const response = await apiGetSubThemeBySlug(slug, queries);
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
          setSubTheme([]);
          // setThemes([]);
          setSong([]);
        }
        if (queries?.pageSong === 1) {
          dispatch(actions.setPlaylist(dataRes?.song));
          setSong(dataRes?.song);
          setSubTheme(dataRes);
          // setThemes(dataRes?.themes[0]);
        } else {
          dispatch(actions.setPlaylist([...song, ...dataRes?.song]));
          setSong([...song, ...dataRes?.song]);
        }
      } else {
        setSubTheme([]);
        // setThemes([]);
        setSong([]);
        setHasMore(false);
      }

      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };
  const fetchMoreData = () => {
    setPage(page + 1);
  };
  // const FetchGetSubThemeBySlug = async () => {
  //   try {
  //     const response = await apiGetSubThemeBySlug(subslug);
  //     const data = response.data.data;

  //     dispatch(actions.setPlaylist(data?.song));
  //     setSong(data?.song);
  //     setSubTheme(data);
  //     setThemes(data?.themes[0]);
  //     setisLoading(false);
  //   } catch (error) {}
  // };
  useEffect(() => {
    if (subslug) {
      const q = {
        pageSong: page,
        limitSong: limit,
      };
      FetchData(subslug, q);
    }
    //eslint-disable-next-line
  }, [page, subslug]);

  const handleDownloadAlbum = async () => {
    if (fileList === null) {
      dispatch(
        actions.setDownload([
          {
            file: song?.map((item) => {
              return {
                streaming: item.streaming,
                song: item?.title,
              };
            }),
            filename: subTheme?.title + ".zip",
            thumbnail: subTheme?.themesubArtwork,
            type: "zip",
          },
        ])
      );
    } else {
      dispatch(
        actions.setDownload([
          ...fileList,
          {
            file: song?.map((item) => {
              return {
                streaming: item.streaming,
                song: item?.title,
              };
            }),
            filename: subTheme?.title + ".zip",
            thumbnail: subTheme?.themesubArtwork,
            type: "zip",
          },
        ])
      );
    }
  };
  const handlePlayMusic = (songSingle) => {
    if (songSingle?.streaming !== undefined) {
      if (song.length > 1) {
        dispatch(actions.setPlaylist(song));
        dispatch(actions.playAlbum(true));
      } else {
        dispatch(actions.setPlaylist(null));
        dispatch(actions.playAlbum(false));
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
  return (
    <div ref={share} id="content-page" className="content-page">
      <HelmetComponent
        title={subTheme?.title}
        description={subTheme?.description}
        imageUrl={subTheme?.themesubArtwork}
        imageAlt={subTheme?.title + " - " + subTheme?.description}
        href={window.location.href}
      />
      <div className="container-fluid">
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
                    {!isLoading && (
                      <img
                        filter="url(#blur)"
                        style={{
                          objectFit: "cover",
                          width: "inherit",
                          height: "inherit",
                        }}
                        className="iq-card"
                        src={subTheme?.themesubArtwork}
                        alt="SFX"
                      />
                    )}
                  </div>
                  <div
                    className="iq-card position-absolute"
                    style={{
                      height: "100%",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "rgba(0,0,0,.7)",
                    }}
                  />

                  <div className="iq-card-body ">
                    <div className="row d-flex justify-content-spacebetween  ">
                      <div className="col-lg-12  ">
                        <div className="d-flex align-items-top justify-content-between iq-music-play-detail">
                          <div className="music-detail ">
                            <div className="row d-flex justify-content-between pr-3 pl-3">
                              <h6 className="text-white">Nhạc Nền Video</h6>
                            </div>
                            <h3 className="mb-2 text-white">
                              {subTheme?.title}
                            </h3>
                            <span className="text-white details-collection-mobile">
                              {subTheme?.description || ""}
                            </span>
                            <div className="d-flex align-items-center">
                              <small
                                onClick={() => {
                                  handlePlayMusic(song[0]);
                                }}
                                className="btn btn-primary iq-play mr-2 mt-3"
                              >
                                Play Music
                              </small>
                              <div className=" d-flex align-items-center mr-2 mt-3">
                                <small
                                  data-toggle="modal"
                                  data-target="#exampleModalCenteredScrollableShare"
                                  className="btn btn-primary mr-2 d-flex align-items-center"
                                  onClick={() => {
                                    dispatch(
                                      actions.setModalData({
                                        id: subTheme?._id,
                                        title: subTheme?.title,
                                        slug: subTheme?.slug,
                                        path: "theme",
                                        url: window.location.href,
                                      })
                                    );
                                    // if (
                                    //   navigator.clipboard &&
                                    //   window.isSecureContext
                                    // ) {
                                    //   navigator.clipboard?.writeText(
                                    //     window.location.href
                                    //   );
                                    // } else {
                                    //   alert(
                                    //     "Your browser doesn't support copy to clipboard"
                                    //   );
                                    // }

                                    // document.getElementById(
                                    //   "shareLink"
                                    // ).style.opacity = 1;
                                    // document.getElementById(
                                    //   "shareLink"
                                    // ).style.display = "flex";

                                    // setTimeout(() => {
                                    //   document.getElementById(
                                    //     "shareLink"
                                    //   ).style.opacity = 0;
                                    //   document.getElementById(
                                    //     "shareLink"
                                    //   ).style.display = "none";
                                    // }, 3000);
                                  }}
                                >
                                  Share{" "}
                                  <i
                                    style={{
                                      fontSize: "20px",
                                    }}
                                    className="ml-1 las la-share-alt-square text-white"
                                  ></i>
                                </small>
                              </div>
                            </div>
                          </div>
                          <div
                            style={{
                              zIndex: 2,
                            }}
                            className="music-right"
                          >
                            <div className="d-flex align-items-center">
                              <div
                                data-toggle="modal"
                                data-target="#exampleModalCenter4"
                                className="d-flex align-items-center"
                              >
                                <small
                                  style={{
                                    minWidth: "230px",
                                  }}
                                  className="btn btn-primary iq-play mr-2"
                                >
                                  <i className="las la-download text-white"></i>
                                  Free Download Theme
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="iq-card">
                  <div className="iq-card-body">
                    {isLoading ? (
                      <div className="d-flex justify-content-center align-items-center min-vh-100">
                        <Loading />
                      </div>
                    ) : song?.length > 0 ? (
                      <InfiniteScroll
                        dataLength={song?.length}
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
                          {song &&
                            song.map((song, index) => {
                              return (
                                <MusicPlayer song={song} key={index} />
                                // <Fragment key={index}>
                                //   <li className="mb-3 music-player">
                                //     <div className="d-flex justify-content-between align-items-center row position-relative">
                                //       <div className="media align-items-center  col-sm-3 pr-0 col-7">
                                //         <div className="iq-thumb-hotsong ">
                                //           <div
                                //             style={{
                                //               cursor: "pointer",
                                //             }}
                                //             className="iq-music-overlay"
                                //           ></div>
                                //           <a>
                                //             <img
                                //               style={{
                                //                 objectFit: "cover",
                                //                 minHeight: "60px",
                                //                 minWidth: "60px",
                                //               }}
                                //               src={
                                //                 song?.thumbnail
                                //                   ? song?.thumbnail
                                //                   : song?.album?.album_art
                                //               }
                                //               className="img-border-radius avatar-60 img-fluid"
                                //               alt=""
                                //             />
                                //           </a>
                                //           <div
                                //             onClick={() => {
                                //               handlePlayMusic(song);
                                //             }}
                                //             className="overlay-music-icon"
                                //           >
                                //             <a
                                //               className="d-flex align-items-center justify-content-center"
                                //               style={{
                                //                 fontSize: "35px",
                                //                 width: "30px",
                                //                 height: "30px",
                                //               }}
                                //             >
                                //               <i className="las la-play-circle bg-primary rounded-circle"></i>
                                //             </a>
                                //           </div>
                                //         </div>
                                //         <div className="media-body ml-3">
                                //           <p
                                //             className="home_footer_link mb-0 musicplayer-song-title"
                                //             onClick={() =>
                                //               navigate(`/music/${song?.slug}`)
                                //             }
                                //             data-toggle="tooltip"
                                //             title={song?.title}
                                //           >
                                //             {song?.title}
                                //           </p>
                                //           {song?.artists &&
                                //             song?.artists?.map(
                                //               (item, index, self) => {
                                //                 return (
                                //                   <small
                                //                     key={index}
                                //                     onClick={() =>
                                //                       navigate(
                                //                         `/artists/${item.slug}`
                                //                       )
                                //                     }
                                //                     className="home_footer_link"
                                //                     data-toggle="tooltip"
                                //                     title={item.name}
                                //                   >
                                //                     {" "}
                                //                     {item.name +
                                //                       (index === self.length - 1
                                //                         ? ""
                                //                         : ", ")}
                                //                   </small>
                                //                 );
                                //               }
                                //             )}
                                //           {/* <small
                                //           className="home_footer_link mb-0"
                                //           onClick={() =>
                                //             navigate(
                                //               `/artists/${song?.artists[0]?.slug}`
                                //             )
                                //           }
                                //         >
                                //           {" "}
                                //           {song?.artists &&
                                //             song.artists
                                //               .map((artist) => artist.name)
                                //               .join(", ")}
                                //         </small> */}
                                //         </div>
                                //       </div>
                                //       <div
                                //         style={{
                                //           padding: "0px",
                                //         }}
                                //         className="media align-items-center col-sm-2  genre-list"
                                //       >
                                //         <div className="media-body ">
                                //           {/* <p className="mb-0">{song?.title}</p> */}
                                //           {song?.moods &&
                                //             song?.moods?.map(
                                //               (item, index, self) => {
                                //                 return (
                                //                   <small
                                //                     key={index}
                                //                     onClick={() =>
                                //                       navigate({
                                //                         pathname: `/music`,
                                //                         search: createSearchParams({
                                //                           moods: item._id,
                                //                         }).toString(),
                                //                       })
                                //                     }
                                //                     className="home_footer_link"
                                //                     data-toggle="tooltip"
                                //                     title={item.name}
                                //                   >
                                //                     {" "}
                                //                     {item.name +
                                //                       (index === self.length - 1
                                //                         ? ""
                                //                         : ", ")}
                                //                   </small>
                                //                 );
                                //               }
                                //             )}
                                //         </div>
                                //       </div>

                                //       {/* <p
                                //       onClick={() => {
                                //         handlePlayMusic(song);
                                //       }}
                                //       className="mb-0 iq-music-play col-2 col-sm-1 musicplayer-play-button "
                                //     >
                                //       {currentSongID === song._id && isPlaying ? (
                                //         <i
                                //           style={{
                                //             cursor: "pointer",
                                //           }}
                                //           className="las la-pause-circle font-size-32 musicplayer-icon-play"
                                //         ></i>
                                //       ) : (
                                //         <i
                                //           style={{
                                //             cursor: "pointer",
                                //           }}
                                //           className="las la-play-circle font-size-32 musicplayer-icon-play"
                                //         ></i>
                                //       )}
                                //     </p> */}

                                //       {song?.waveform && (
                                //         <img
                                //           style={{
                                //             padding: "0px",
                                //             // cursor: "pointer",
                                //             height: "50px",
                                //             objectFit: "cover",
                                //           }}
                                //           className="mb-0 col-sm-3 audio-visualizer"
                                //           src={song?.waveform}
                                //         ></img>
                                //       )}
                                //       <p className="mb-0 iq-music-time  col-sm-1">
                                //         {moment(song?.duration * 1000).format(
                                //           "mm:ss"
                                //         )}
                                //       </p>
                                //       <p
                                //         style={{
                                //           cursor: "pointer",
                                //         }}
                                //         onClick={() => {
                                //           setPlayingSong(song);
                                //         }}
                                //         data-toggle="modal"
                                //         data-target="#exampleModalCenter3"
                                //         className="mb-0  col-sm-1 col-1 musicplayer-download"
                                //       >
                                //         <i className="las la-download font-size-20 pl-4 musicplayer-icon-download"></i>
                                //       </p>

                                //       <p
                                //         style={{
                                //           cursor: "pointer",
                                //         }}
                                //         onClick={() => {
                                //           share.current.scrollIntoView({
                                //             behavior: "smooth",
                                //             block: "start",
                                //           });
                                //           navigator.clipboard.writeText(
                                //             window.location.origin +
                                //               `/music/${song?.slug}`
                                //           );
                                //           document.getElementById(
                                //             "shareLink"
                                //           ).style.opacity = 1;
                                //           document.getElementById(
                                //             "shareLink"
                                //           ).style.display = "flex";

                                //           setTimeout(() => {
                                //             document.getElementById(
                                //               "shareLink"
                                //             ).style.opacity = 0;
                                //             document.getElementById(
                                //               "shareLink"
                                //             ).style.display = "none";
                                //           }, 2000);
                                //         }}
                                //         className="mb-0 col-1 col-sm-1 iq-musc-icone "
                                //       >
                                //         <i className="las la-share-alt-square  font-size-20"></i>
                                //       </p>

                                //       {/* <div className="iq-card-header-toolbar iq-music-drop d-flex align-items-center pr-4">
                                //       <div className="dropdown">
                                //         <span
                                //           className="dropdown-toggle text-primary"
                                //           id="dropdownMenuButton2"
                                //           data-toggle="dropdown"
                                //           aria-expanded="false"
                                //           role="button"
                                //         >
                                //           <i className="ri-more-2-fill text-primary"></i>
                                //         </span>
                                //         <div
                                //           className="dropdown-menu dropdown-menu-right"
                                //           aria-labelledby="dropdownMenuButton2"
                                //         >
                                //           <a
                                //           className="dropdown-item"
                                //           onClick={() => {
                                //             handleDownload(
                                //               song?.streaming,
                                //               song?.title
                                //             );
                                //           }}
                                //         >
                                //           <i className="ri-file-download-fill mr-2"></i>
                                //           Download
                                //         </a>
                                //         </div>
                                //       </div>
                                //     </div> */}
                                //     </div>
                                //   </li>
                                // </Fragment>
                              );
                            })}
                        </ul>
                      </InfiniteScroll>
                    ) : (
                      <div className="text-center mb-5 text-muted">
                        <h5 className="text-muted">
                          Không có album nào trong kho dữ liệu
                        </h5>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
      {/* <div
        className="modal fade"
        id="exampleModalCenter3"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenter3Title"
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
                id="exampleModalCenter3Title"
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
                  // handleDownload(playingSong?.streaming, playingSong?.slug);
                  handleDownload(playingSong);
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
      </div> */}
      <div
        className="modal fade"
        id="exampleModalCenter4"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenter4Title"
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
                id="exampleModalCenter4Title"
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
                  handleDownloadAlbum();
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
    </div>
  );
};

export default DetailsSubThemes;
