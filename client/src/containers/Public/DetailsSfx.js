import { useEffect, React, useState, Fragment, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HelmetComponent, Loading, MusicPlayer } from "components";
import { apiGetDetailSfxBySlug, apiGetSmilarSfx } from "apis";
import * as actions from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { AudioVisualizer } from "components";
import fileDownload from "js-file-download";
import Axios from "axios";

const DetailsSfx = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(true);
  const [sfx, setSfx] = useState([]);
  const [smilarSfx, setSmilarSfx] = useState([]);
  const { currentSongID, isPlaying } = useSelector((state) => state.music);
  const detailsSfxPage = useRef(null);

  const FetchGetSfxBySlug = async () => {
    try {
      const response = await apiGetDetailSfxBySlug(slug);
      const data = response.data.data;
      setSfx(data);
      setisLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    setisLoading(true);
    setIsLoadingSimilar(true);
    slug && FetchGetSfxBySlug();
    //eslint-disable-next-line
  }, [slug]);

  const handlePlayMusic = (songSingle) => {
    if (songSingle?.streaming !== undefined) {
      dispatch(actions.setPlaylist(null));
      dispatch(actions.playAlbum(false));

      if (isPlaying && currentSongID === songSingle._id) {
        dispatch(actions.setIsPlaying(false));
      } else {
        dispatch(actions.setCurrentSongId(songSingle._id));
        dispatch(actions.setIsPlaying(true));
      }
    }
    // navigate("/artists");
  };
  useEffect(() => {
    const getSimilarSfxByCateSlug = async () => {
      if (sfx?.sfxCategory !== undefined) {
        for (let i = 0; i < sfx.sfxCategory.length; i++) {
          const res = await apiGetSmilarSfx(sfx.sfxCategory[i].slug);

          if (res?.data?.data?.length > 0) {
            setSmilarSfx(res.data.data.filter((item) => item._id !== sfx._id));
            setIsLoadingSimilar(false);
            break;
          }
        }
      }
    };
    getSimilarSfxByCateSlug();
  }, [sfx]);
  return (
    <Fragment>
      <HelmetComponent
        title={sfx?.title}
        description={sfx?.artists?.map((artist) => artist.name).join(", ")}
        imageUrl={
          sfx?.artists && (sfx?.artists[0]?.cover || sfx?.artists[1]?.cover)
        }
        imageAlt={sfx?.title}
        href={window.location.href}
      />
      <div id="content-page" ref={detailsSfxPage} className="content-page">
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
              <div className="row ">
                <div className="col-lg-12 ">
                  {/* <div className="iq-card position-relative">
                  <svg
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                    }}
                    className="iq-card "
                    viewBox="0 0 640 427"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <filter id="blur">
                      <feGaussianBlur stdDeviation={3} />
                    </filter>
                    <image
                      xlinkHref={sfx?.artists[0]?.cover}
                      width={640}
                      height={427}
                      filter="url(#blur)"
                    />
                  </svg>
                  <div
                    className="iq-card"
                    style={{
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "rgba(0,0,0,.5)",
                    }}
                  />
                  <div className="iq-card-body ">
                    <div className="row d-flex justify-content-spacebetween  ">
                      <div
                        style={{
                          zIndex: 1,
                        }}
                        className="col-lg-12  "
                      >
                        <div className="row  d-flex justify-content-center pr-3 pl-3">
                          <img
                            onClick={() => {
                              navigate(`/artists/${sfx?.artists[0]?.slug}`);
                            }}
                            src={sfx?.artists[0] && sfx?.artists[0]?.thumbnail}
                            style={{
                              minHeight: "139px",
                              minWidth: "139px",
                              maxHeight: "139px",
                              maxWidth: "139px",
                              objectFit: "cover",
                            }}
                            className="img-fluid w-25 rounded-circle border border-5 home_footer_link "
                            alt="album image"
                          />
                        </div>
                        <div className="row d-flex justify-content-center  ">
                          <div className="col-lg-4 ">
                            <div className="row d-flex justify-content-center home_footer_link ">
                              <h3
                                className="text-white"
                                onClick={() => {
                                  navigate(`/artists/${sfx?.artists[0]?.slug}`);
                                }}
                              >
                                {sfx?.artists[0] &&
                                  sfx?.artists
                                    ?.map((artist) => artist.name)
                                    .join(", ")}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 position-absolute  ">
                        <div className="row  d-flex justify-content-between pr-3 pl-3">
                          <div className="music-detail">
                            <h3 className="mb-2 text-white">{sfx?.title}</h3>
                            <div className="mb-1 text-gray ">
                              <span>
                                <i
                                  className="fa fa-upload mr-2 ml-1"
                                  aria-hidden="true"
                                ></i>
                                Published on{" "}
                                {moment(sfx?.createdAt).format("DD/MM/YY")}
                              </span>
                            </div>

                            <div className="mb-1 text-gray ">
                              <span>
                                <i className="fa fa-download mr-2 ml-1 "></i>
                                {sfx?.downloads}
                              </span>
                            </div>
                            <div className="mb-1 text-gray">
                              <span>
                                <i
                                  className="fa fa-university mr-2 ml-1 "
                                  aria-hidden="true"
                                ></i>
                                Content ID registered
                              </span>
                            </div>
                            <div className="d-flex align-items-center">
                              <a
                                style={{
                                  zIndex: 2,
                                }}
                                data-toggle="modal"
                                data-target="#exampleModalCenter10"
                                onClick={() => {
                                  dispatch(actions.setIsShowModal(true));
                                  dispatch(actions.setModalData(sfx));
                                }}
                                className="btn btn-primary iq-play mr-2 mt-2"
                              >
                                Free Download
                              </a>
                            </div>
                          </div>

                          <div
                            style={{
                              zIndex: 2,
                            }}
                            className="music-right"
                          >
                            <div className="d-flex align-items-center mb-4 justify-content-end">
                              <div className="iq-circle mr-2 share">
                                <a
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      window.location.href
                                    );
                                    document.getElementById(
                                      "shareLink"
                                    ).style.opacity = 1;
                                    setTimeout(() => {
                                      document.getElementById(
                                        "shareLink"
                                      ).style.opacity = 0;
                                    }, 2000);
                                  }}
                                >
                                  <i className="las la-share-alt-square text-primary"></i>
                                </a>
                              </div>

                              <div
                                id="shareLink"
                                style={{
                                  border: "1px solid rgba(0,0,0,.2)",
                                  borderRadius: "0.3rem",
                                  position: "absolute",
                                  zIndex: "999",
                                  top: "0",
                                  right: "10%",
                                  padding: "0.5rem 0.75rem",
                                  display: "flex",
                                  justifyContent: "center",
                                  backgroundColor: "#fff",
                                  color: "#212529",
                                  fontSize: "16x",
                                  opacity: "0",
                                  transition: "all 0.3s ease-in-out",
                                }}
                              >
                                <span>
                                  {"Link copied to clipboard "}
                                  <i className="las la-check-circle"></i>
                                </span>
                              </div>

                              <div className="iq-circle">
                                <a
                                  style={{
                                    cursor: "default",
                                  }}
                                >
                                  <i className="las la-medal"></i>
                                </a>
                              </div>
                            </div>

                            <div className="d-flex flex-column">
                              <div className="mb-1 ml-auto text-gray">
                                <span>
                                  <i className="fa fa-play mr-2 ml-1 "></i>
                                  {sfx?.listen}
                                </span>
                              </div>
                              <div className="mb-1 ml-auto text-gray">
                                <span>
                                  <i className="fa fa-eye mr-2 ml-1"></i>
                                  {sfx?.numberView}
                                </span>
                              </div>
                              <div className="mb-1 ml-auto ">
                                <a className="home-footer-link text-gray">
                                  <span>
                                    <i className="fa fa-dollar mr-2 ml-1"></i>
                                    Free for personal use <br />
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
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
                        src={sfx?.artists[0]?.cover || sfx?.artists[1]?.cover}
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
                        background: "rgba(0,0,0,.5)",
                      }}
                    />
                    <div
                      style={{
                        zIndex: 1,
                      }}
                      className="d-flex justify-content-center align-items-center  position-absolute w-100 h-100 flex-column detais-song-artist-mobile"
                    >
                      <img
                        onClick={() => {
                          sfx?.artists[0] &&
                            navigate(`/artists/${sfx?.artists[0]?.slug}`);
                        }}
                        src={sfx && sfx?.artists[0].thumbnail}
                        style={{
                          minHeight: "139px",
                          minWidth: "139px",
                          maxHeight: "139px",
                          maxWidth: "139px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        className="img-fluid w-25 rounded-circle border border-5 "
                        alt="album image"
                      />
                      <h3
                        className="text-white home_footer_link detais-song-artist-name-mobile"
                        onClick={() => {
                          sfx?.artists[0] &&
                            navigate(`/artists/${sfx?.artists[0]?.slug}`);
                        }}
                      >
                        {sfx?.artists[0]
                          ? sfx?.artists
                              ?.map((artist) => artist.name)
                              .join(", ")
                          : "Unknown Artist"}
                      </h3>
                    </div>
                    <div className="iq-card-body ">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="d-flex align-items-top justify-content-between iq-music-play-detail">
                            <div className="music-detail">
                              <h3 className="text-white mb-2">{sfx?.title}</h3>
                              <span
                                onClick={() =>
                                  navigate(`/artists/${sfx?.artists[0]?.slug}`)
                                }
                                className="home_footer_link mb-0 text-white font-size-20px d-none detais-song-artist-name-pc"
                              >
                                {sfx?.artists &&
                                  sfx?.artists
                                    .map((artist) => artist.name)
                                    .join(", ")}
                              </span>
                              <p className="mb-0 text-gray ">
                                <i
                                  className="fa fa-upload mr-2 ml-1"
                                  aria-hidden="true"
                                ></i>
                                Published on{" "}
                                {moment(sfx?.createdAt).format("DD/MM/YY")}
                              </p>
                              <p className="text-gray mb-0 ">
                                <i className="fa fa-download mr-2 ml-1 "></i>
                                {sfx?.downloads}
                              </p>
                              <p className="mb-0 text-gray">
                                <span>
                                  <i
                                    className="fa fa-university mr-2 ml-1 "
                                    aria-hidden="true"
                                  ></i>
                                  Content ID registered
                                </span>
                              </p>
                              <div className="d-flex align-items-center">
                                <a
                                  style={{
                                    zIndex: 2,
                                  }}
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter10"
                                  onClick={() => {
                                    dispatch(actions.setIsShowModal(true));
                                    dispatch(actions.setModalData(sfx));
                                  }}
                                  className="btn btn-primary iq-play mr-2 mt-2"
                                >
                                  Free Download
                                </a>
                              </div>
                            </div>
                            <div
                              style={{
                                zIndex: 3,
                              }}
                              className="music-right detais-music-right-mobile"
                            >
                              <div className="d-flex  align-items-center content-space-around mb-4">
                                <div
                                  style={{
                                    zIndex: 3,
                                  }}
                                  className="iq-circle mr-2 share ml-auto"
                                >
                                  <Link
                                    data-toggle="modal"
                                    data-target="#exampleModalCenteredScrollableShare"
                                    onClick={() => {
                                      dispatch(
                                        actions.setModalData({
                                          id: sfx?._id,
                                          title: sfx?.title,
                                          slug: sfx?.slug,
                                          path: "sfx",
                                          url: window.location.href,
                                        })
                                      );
                                    }}
                                    //             onClick={() => {
                                    //               navigator.clipboard.writeText(
                                    //                 window.location.href
                                    //               );
                                    //               document.getElementById(
                                    //                 "shareLink"
                                    //               ).style.opacity = 1;
                                    // document.getElementById("shareLink").style.display = "flex"

                                    //               setTimeout(() => {
                                    //                 document.getElementById(
                                    //                   "shareLink"
                                    //                 ).style.opacity = 0;
                                    // document.getElementById("shareLink").style.display = "none"

                                    //               }, 2000);
                                    //             }}
                                  >
                                    <i className="las la-share-alt-square text-primary"></i>
                                  </Link>
                                </div>
                                <div className="iq-circle ">
                                  <a
                                    style={{
                                      cursor: "default",
                                    }}
                                  >
                                    <i className="las la-medal text-primary"></i>
                                  </a>
                                </div>
                              </div>
                              <div className="d-flex flex-column">
                                <div className="mb-1 ml-auto text-gray detais-music-desc-mobile">
                                  <span>
                                    <i className="fa fa-play mr-2 ml-1 "></i>
                                    {sfx?.listen}
                                  </span>
                                </div>
                                <div className="mb-1 ml-auto text-gray detais-music-desc-mobile">
                                  <span>
                                    <i className="fa fa-eye mr-2 ml-1"></i>
                                    {sfx?.views}
                                  </span>
                                </div>
                                <div className="mb-1 ml-auto ">
                                  <a className="home-footer-link text-gray detais-music-desc-mobile">
                                    <span>
                                      <i className="fa fa-dollar mr-2 ml-1"></i>
                                      Free for personal use <br />
                                    </span>
                                  </a>
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
                    <ul className="list-unstyled iq-music-slide mb-0">
                      <MusicPlayer reference={detailsSfxPage} sfx={sfx} />
                      {/* <li className="mb-3">
                        <div className="d-flex justify-content-between align-items-center row position-relative ">
                          <div className="media align-items-center col-sm-3 pr-0 col-7">
                            <i
                              style={{
                                fontSize: "80px",
                                padding: "0px",
                              }}
                              className="ri-surround-sound-line text-primary font-size-80  sfx-player-icon "
                            ></i>

                            <div className="media-body ml-3">
                              <p className="mb-0 home_footer_link musicplayer-song-title">
                                {sfx?.title}
                              </p>
                              <small
                                onClick={() =>
                                  navigate(`/artists/${sfx?.artists[0].slug}`)
                                }
                                className="home_footer_link"
                              >
                                {" "}
                                {sfx?.artists &&
                                  sfx.artists
                                    .map((artist) => artist.name)
                                    .join(", ")}
                              </small>
                            </div>
                          </div>
                          <div
                            style={{
                              padding: "0px",
                            }}
                            className="media align-items-center col-sm-2  genre-list"
                          >
                            <div className="media-body">
                              <small>
                                {" "}
                                {sfx?.sfxCategory &&
                                  sfx.sfxCategory
                                    .map((cate) => cate.title)
                                    .join(", ")}
                              </small>
                            </div>
                          </div>
                          <p
                            onClick={() => {
                              handlePlayMusic(sfx);
                            }}
                            className="mb-0 iq-music-play col-2 col-sm-1 musicplayer-play-button"
                          >
                            {isPlaying && sfx?._id === currentSongID ? (
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
                          </p>
                          <p className="mb-0 iq-music-time  col-sm-1">
                            {sfx?.duration
                              ? moment(sfx?.duration * 1000).format("mm:ss")
                              : "00:00"}
                          </p>
                          {sfx?.waveform && (
                            <img
                              style={{
                                padding: "0px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                              className="mb-0 col-sm-5 audio-visualizer "
                              src={sfx?.waveform}
                            ></img>
                          )}
                        </div>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between align-items-center">
                    <div className="iq-header-title">
                      <h4 className="card-title">Similar Sound</h4>
                    </div>
                    <div
                      id="feature-album-artist-slick-arrow"
                      className="slick-aerrow-block"
                    ></div>
                  </div>
                  <div className="iq-card-body">
                    <ul className="list-unstyled iq-music-slide mb-0">
                      {smilarSfx &&
                        smilarSfx.map((sfx, index) => {
                          return (
                            <Fragment key={index}>
                              <MusicPlayer
                                reference={detailsSfxPage}
                                sfx={sfx}
                              />
                            </Fragment>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default DetailsSfx;
