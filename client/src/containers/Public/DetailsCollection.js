import { useEffect, React, useState, Fragment, useRef } from "react";
import { useParams } from "react-router-dom";
import { HelmetComponent, Loading } from "components";
import { apiGetCollectionBySlug, apiUpdateCollectionListen } from "apis";
import { MusicPlayer } from "components";
import * as actions from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const DetailsCollection = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [song, setSong] = useState([]);
  const { fileList } = useSelector((state) => state.music);
  const [sfx, setSfx] = useState([]);
  const [collection, setCollection] = useState([]);
  const { currentSongID, isPlaying } = useSelector((state) => state.music);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const detailsCollectionPage = useRef(null);

  const FetchData = async (slug, queries) => {
    try {
      const response = await apiGetCollectionBySlug(slug, queries);
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
          setCollection([]);
          setSfx([]);
          setSong([]);
        }
        if (queries?.pageSong === 1) {
          if (dataRes?.collection_type === 1) {
            dispatch(actions.setPlaylist(dataRes?.song));
            setSong(dataRes?.song);
          } else {
            dispatch(actions.setPlaylist(dataRes?.sfx));
            setSfx(dataRes?.sfx);
          }
          setCollection(dataRes);
        } else {
          if (dataRes?.collection_type === 1) {
            dispatch(actions.setPlaylist([...song, ...dataRes?.song]));
            setSong([...song, ...dataRes?.song]);
          } else {
            dispatch(actions.setPlaylist([...sfx, ...dataRes?.sfx]));
            setSfx([...sfx, ...dataRes?.sfx]);
          }
        }
      } else {
        setCollection([]);
        setSfx([]);
        setSong([]);
        setHasMore(false);
      }

      setisLoading(false);
    } catch (error) {
      console.log(error);
      // navigate("/404");
      setisLoading(false);
    }
    // try {
    //   const response = await apiGetCollectionBySlug(queries);
    //   const data = response.data.data;
    //   if (data?.collection_type === 1) {
    //     dispatch(actions.setPlaylist(data?.song));
    //     setSong(data?.song);
    //   } else {
    //     dispatch(actions.setPlaylist(data?.sfx));
    //     setSfx(data?.sfx);
    //   }
    //   setCollection(data);
    //   setisLoading(false);
    // } catch (error) {
    //   navigate("/404");
    // }
  };
  const updateListenCount = async () => {
    try {
      await apiUpdateCollectionListen(collection?._id);
    } catch (error) {}
  };
  const fetchMoreData = () => {
    setPage(page + 1);
  };

  const handleDownloadAlbum = async () => {
    if (collection?.collection_type === 1) {
      if (fileList === null) {
        dispatch(
          actions.setDownload([
            {
              file: collection?.song?.map((item) => {
                return {
                  streaming: item.streaming,
                  song: item?.title,
                };
              }),
              filename: collection?.title + ".zip",
              thumbnail: collection?.thumbnail_collection,
              type: "zip",
            },
          ])
        );
      } else {
        dispatch(
          actions.setDownload([
            ...fileList,
            {
              file: collection?.song?.map((item) => {
                return {
                  streaming: item.streaming,
                  song: item?.title,
                };
              }),
              filename: collection?.title + ".zip",
              thumbnail: collection?.thumbnail_collection,
              type: "zip",
            },
          ])
        );
      }
      //download multiple songs in a zip file
      // create url for zip file
      // let songToblob = async () => {
      //   dispatch(actions.setDownload(collection?.title));
      // for (let i = 0; i < collection?.song.length; i++) {
      //   if (collection?.song[i].streaming !== "") {
      //     await fetch(collection?.song[i].streaming)
      //     .then((res) => res.blob())
      //     .then((blob) => {
      //       zip.file(`${collection?.song[i].slug}.mp3`, blob);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
      // }
      // }
      // }
      // await songToblob();
      // zip.generateAsync({ type: "blob" }).then(function (content) {
      //   saveAs(content, `${collection?.slug}.zip`);
      // }
      // );
    }
    if (collection?.collection_type === 2) {
      if (fileList === null) {
        dispatch(
          actions.setDownload([
            {
              file: collection?.song?.map((item) => {
                return {
                  streaming: item.streaming,
                  song: item?.title,
                };
              }),
              filename: collection?.title + ".zip",
              thumbnail: collection?.thumbnail_collection,
              type: "zip",
            },
          ])
        );
      } else {
        dispatch(
          actions.setDownload([
            ...fileList,
            {
              file: collection?.sfx?.map((item) => {
                return {
                  streaming: item.streaming,
                  song: item?.title,
                };
              }),
              filename: collection?.title + ".zip",
              thumbnail: collection?.thumbnail_collection,
              type: "zip",
            },
          ])
        );
      }
      // for (let i = 0; i < collection?.sfx.length; i++) {
      //   if (collection?.sfx[i].streaming !== "") {
      //     await fetch(collection?.sfx[i].streaming)
      //       .then((res) => res.blob())
      //       .then((blob) => {
      //         zip.file(`${collection?.sfx[i].slug}.mp3`, blob);
      //       })
      //       .catch((err) => {
      //         console.log(err);
      //       });
      //     // const response = await Axios.get(collection?.song[i].streaming, {
      //     //   responseType: "blob",
      //     // });
      //     // const response =     await  apiGetAmsS3Song(collection?.song[i].streaming)
      //     // await Axios.get(collection?.song[i].streaming, {
      //     //   responseType: "blob",
      //     // })
      //     // .then((res) => {
      //     //   zip.file(`${collection?.song[i].slug}.mp3`, res.data);
      //     // })
      //     // .catch((err) => {
      //     //   console.log(err);
      //     // });
      //     // zip.file(`${song[i].slug}.mp3`, response.data);
      //     // await Axios.get(collection?.sfx[i].streaming, {
      //     //   responseType: "blob",
      //     // })
      //     //   .then((res) => {
      //     //     zip.file(`${sfx[i].slug}.mp3`, res.data);
      //     //   })
      //     //   .catch((err) => {
      //     //     console.log(err);
      //     //   });
      //   } else {
      //     continue;
      //   }
      // }

      // const zipFile = await zip.generateAsync({ type: "blob" });
      // saveAs(zipFile, `${collection?.slug}.zip`);
    }
  };
  const handlePlayMusic = (songSingle) => {
    if (songSingle?.streaming !== undefined) {
      if (song.length > 1) {
        dispatch(actions.playAlbum(true));
      } else {
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
  useEffect(() => {
    if (isPlaying === true && collection?._id !== undefined) {
      updateListenCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentSongID]);
  useEffect(() => {
    const q = {
      pageSong: page,
      limitSong: limit,
    };
    FetchData(slug, q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, slug]);
  return (
    <div ref={detailsCollectionPage} id="content-page" className="content-page">
      <HelmetComponent
        title={collection?.title}
        description={collection?.description}
        imageUrl={collection?.thumbnail_collection}
        imageAlt={collection?.title + " - " + collection?.description}
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
                    <img
                      filter="url(#blur)"
                      style={{
                        objectFit: "cover",
                        width: "inherit",
                        height: "inherit",
                      }}
                      className="iq-card"
                      src={collection?.thumbnail_collection}
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
                      background:
                        "linear-gradient(to right, #000, rgba(168, 224, 99, 0.6))",
                    }}
                  ></div>

                  <div className="iq-card-body ">
                    <div className="row d-flex justify-content-spacebetween  ">
                      <div className="col-lg-12  ">
                        <div className="d-flex align-items-top justify-content-between iq-music-play-detail">
                          <div className="music-detail ">
                            <div className="row d-flex justify-content-between pr-3 pl-3">
                              <h6 className="text-white">
                                {collection.collection_type === 1
                                  ? "Music "
                                  : "SFX "}
                                Collection
                              </h6>
                            </div>
                            <h3 className="mb-2 text-white">
                              {collection?.title}
                            </h3>
                            <span className="text-white details-collection-mobile">
                              {collection?.description || ""}
                            </span>
                            <div className="d-flex align-items-center">
                              <small
                                onClick={() => {
                                  if (song.length > 0) {
                                    handlePlayMusic(song[0]);
                                  }
                                  if (sfx.length > 0) {
                                    handlePlayMusic(sfx[0]);
                                  }
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
                                        id: collection?._id,
                                        title: collection?.title,
                                        slug: collection?.slug,
                                        path: "collection",
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
                                  Free Download Collection
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
            </div>

            <div className="col-lg-12">
              <div className="iq-card">
                <div className="iq-card-body">
                  {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center min-vh-100">
                      <Loading />
                    </div>
                  ) : (song?.length || sfx?.length) > 0 ? (
                    <InfiniteScroll
                      dataLength={song?.length || sfx?.length}
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
                              <Fragment key={index}>
                                <MusicPlayer
                                  reference={detailsCollectionPage}
                                  song={song}
                                />
                              </Fragment>
                            );
                          })}
                        {sfx &&
                          sfx.map((sfx, index) => {
                            return (
                              <Fragment key={index}>
                                <MusicPlayer
                                  reference={detailsCollectionPage}
                                  sfx={sfx}
                                />
                              </Fragment>
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
          </Fragment>
        )}
      </div>

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

export default DetailsCollection;
