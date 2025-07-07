import { useEffect, React, useState, Fragment, useRef } from "react";
import {
  Link,
  useNavigate,
  useParams,
  // createSearchParams,
  // Link,
} from "react-router-dom";
import { HelmetComponent, Loading } from "components";
import { apiGetDetailSongBySlug, apiFilterSearchSong } from "apis";
import * as actions from "store/actions";
import {
  useDispatch,
  //  useSelector,
} from "react-redux";
import moment from "moment";
import { MusicPlayer } from "components";
import { FaCreativeCommons } from "react-icons/fa";
import { FaCheck, FaRegCopy } from "react-icons/fa";
const DetailsSong = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [song, setSong] = useState([]);
  const [smilarSong, setSmilarSong] = useState([]);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);
  // const { currentSongID, isPlaying } = useSelector((state) => state.music);
  const detailsSongPage = useRef(null);
  const [isCopyAtt, setIsCopyAtt] = useState(false);
  const [similargenre, setSimilarGenre] = useState([]);
  const FetchGetSongBySlug = async () => {
    try {
      const response = await apiGetDetailSongBySlug(slug);
      const data = response.data.data;
      setSong(data);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      navigate("/music");
    }
  };
  const getSimilarSongByGenreSlug = async (genres) => {
    if (similargenre !== undefined) {
      const res = await apiFilterSearchSong({ genres: genres, limit: 4 });

      if (res?.data?.data?.length > 0) {
        setSmilarSong(res.data.data.filter((item) => item._id !== song?._id));
        setIsLoadingSimilar(false);
      }
    }
  };
  useEffect(() => {
    setisLoading(true);
    setIsLoadingSimilar(true);
    slug && FetchGetSongBySlug();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  // const handlePlayMusic = (songSingle) => {
  //   if (songSingle?.streaming !== undefined) {
  //     if (isPlaying && currentSongID === songSingle._id) {
  //       dispatch(actions.setIsPlaying(false));
  //     } else {
  //       dispatch(actions.playAlbum(false));
  //       dispatch(actions.setCurrentSongId(songSingle._id));
  //       dispatch(actions.setIsPlaying(true));
  //     }
  //   }
  // };
  useEffect(() => {
    if (song?.genres !== undefined && song?.genres?.length > 0) {
      setSimilarGenre(song?.genres?.map((genre) => genre._id));
    }
  }, [song]);
  useEffect(() => {
    if (similargenre !== undefined && similargenre?.length > 0) {
      const genre = similargenre.join(",");
      getSimilarSongByGenreSlug(genre);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [similargenre]);
  return (
    <Fragment>
      <HelmetComponent
        title={song?.title}
        description={song?.artists?.map((artist) => artist.name).join(", ")}
        imageUrl={song?.thumbnail}
        imageAlt={song?.title}
        href={window.location.href}
      />

      <div ref={detailsSongPage} id="content-page" className="content-page">
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
                        src={song?.thumbnail_medium}
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
                        paddingTop: "40px",
                      }}
                      className="d-flex justify-content-center align-items-center  position-absolute w-100 h-100 flex-column detais-song-artist-mobile"
                    >
                      <img
                        onClick={() => {
                          song?.artists[0] &&
                            navigate(`/artists/${song?.artists[0]?.slug}`);
                        }}
                        src={song && song?.artists[0]?.thumbnail}
                        style={{
                          minHeight: "129px",
                          minWidth: "129px",
                          maxHeight: "129px",
                          maxWidth: "129px",
                          objectFit: "cover",
                          cursor: "pointer",
                        }}
                        className="img-fluid w-25 rounded-circle border border-5 "
                        alt="album"
                      />
                      <h4
                        className="text-white home_footer_link detais-song-artist-name-mobile"
                        onClick={() => {
                          song?.artists[0] &&
                            navigate(`/artists/${song?.artists[0]?.slug}`);
                        }}
                      >
                        {song?.artists[0]
                          ? song?.artists
                              ?.map((artist) => artist?.name)
                              .join(", ")
                          : "Unknown Artist"}
                      </h4>
                    </div>
                    <div className="iq-card-body ">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="d-flex align-items-top justify-content-between iq-music-play-detail">
                            <div className="music-detail">
                              <h5 className="text-white mb-2">{song?.title}</h5>
                              <span
                                onClick={() =>
                                  navigate(`/artists/${song?.artists[0]?.slug}`)
                                }
                                className="home_footer_link mb-0 text-white font-size-20px d-none detais-song-artist-name-pc"
                              >
                                {song?.artists &&
                                  song?.artists
                                    .map((artist) => artist.name)
                                    .join(", ")}
                              </span>
                              <p className="mb-0 text-gray ">
                                <i
                                  className="fa fa-upload mr-2 ml-1"
                                  aria-hidden="true"
                                ></i>
                                Ngày phát hành{" "}
                                {moment(song?.createdAt).format("DD/MM/YY")}
                              </p>
                              <p className="text-gray mb-0 ">
                                <i className="fa fa-download mr-2 ml-1 "></i>
                                {song?.downloads}
                              </p>
                              <div className="mr-2 mb-0 text-gray font-size-22">
                                <FaCreativeCommons />
                                <span className="font-size-14 ml-2">
                                  {song?.license?.title}
                                  {/* {license?.vn_text} */}
                                </span>
                              </div>
                              <div className="d-flex align-items-center">
                                <small
                                  style={{
                                    zIndex: 2,
                                  }}
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter10"
                                  onClick={() => {
                                    // dispatch(actions.setIsShowModal(true));
                                    dispatch(actions.setModalData(song));
                                  }}
                                  className="btn btn-primary iq-play mr-2 mt-2"
                                >
                                  Tải xuống miễn phí
                                </small>
                                <small
                                  style={{
                                    zIndex: 2,
                                  }}
                                  onClick={() => {
                                    dispatch(actions.setModalData(song));
                                  }}
                                  data-toggle="modal"
                                  // data-target="#exampleModalCenteredScrollable"
                                  data-target="#exampleModalCenteredScrollableLicence"
                                  className="btn btn-primary iq-play mr-2 mt-2"
                                >
                                  Chi tiết bản quyền
                                </small>
                                <small
                                  style={{
                                    zIndex: 2,
                                  }}
                                  onClick={() => {
                                    isCopyAtt && setIsCopyAtt(false);
                                  }}
                                  data-toggle="modal"
                                  data-target="#exampleModalCenteredScrollableAtt"
                                  className="btn btn-primary iq-play mr-2 mt-2"
                                >
                                  Ghi công tác giả
                                </small>
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
                                  className="iq-circle share ml-auto"
                                >
                                  <Link
                                    data-toggle="modal"
                                    data-target="#exampleModalCenteredScrollableShare"
                                    onClick={() => {
                                      dispatch(
                                        actions.setModalData({
                                          id: song?._id,
                                          title: song?.title,
                                          slug: song?.slug,
                                          path: "music",
                                          url: window.location.href,
                                        })
                                      );
                                    }}
                                  >
                                    <i className="las la-share-alt-square text-primary"></i>
                                  </Link>
                                </div>
                                <div className="iq-circle ml-2 ">
                                  <p
                                    style={{
                                      cursor: "default",
                                    }}
                                  >
                                    <i className="las la-medal text-primary"></i>
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex flex-column">
                                <div className="mb-1 ml-auto text-gray detais-music-desc-mobile">
                                  <span>
                                    <i className="fa fa-play mr-2 ml-1 "></i>
                                    {song?.listen}
                                  </span>
                                </div>
                                <div className="mb-1 ml-auto text-gray detais-music-desc-mobile">
                                  <span>
                                    <i className="fa fa-eye mr-2 ml-1"></i>
                                    {song?.views}
                                  </span>
                                </div>
                                <div className="mb-1 ml-auto ">
                                  <p className="home-footer-link text-gray detais-music-desc-mobile">
                                    <span>
                                      <i className="fa fa-dollar mr-2 ml-1"></i>
                                      Free for personal use <br />
                                    </span>
                                  </p>
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
                      <MusicPlayer song={song} />
                      {/* <li className="mb-3">
                        <div className="d-flex justify-content-between align-items-center row position-relative">
                          <div className="media align-items-center col-sm-3 pr-0 col-7">
                            <div className="iq-realese-song ">
                              <a>
                                {song ? (
                                  <img
                                    style={{
                                      objectFit: "cover",
                                      minHeight: "60px",
                                      minWidth: "60px",
                                    }}
                                    src={
                                      song?.thumbnail
                                        ? song?.thumbnail
                                        : song?.album?.album_art
                                    }
                                    className="img-border-radius avatar-60 img-fluid"
                                    alt=""
                                  />
                                ) : (
                                  <i className="ri-surround-sound-line font-size-80  sfx-player-icon"></i>
                                )}
                              </a>
                            </div>
                            <div className="media-body ml-3">
                              <p className="mb-0 home_footer_link musicplayer-song-title">
                                {song?.title}
                              </p>
                              <small
                                onClick={() =>
                                  navigate(`/artists/${song?.artists[0].slug}`)
                                }
                                className="home_footer_link"
                              >
                                {" "}
                                {song?.artists &&
                                  song?.artists
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
                              {song?.moods &&
                                song?.moods?.map((item, index, self) => {
                                  return (
                                    <Link
                                      to={`/music?moods=${item._id}`}
                                      key={index}
                                    >
                                      <small
                                        key={index}
                                        // onClick={() =>
                                        //   navigate({
                                        //     pathname: `/music`,
                                        //     search: createSearchParams({
                                        //       moods: item._id,
                                        //     }).toString(),
                                        //   })
                                        // }
                                        className="home_footer_link text-black"
                                        data-toggle="tooltip"
                                        title={item.name}
                                      >
                                        {" "}
                                        {item.name +
                                          (index === self.length - 1
                                            ? ""
                                            : ", ")}
                                      </small>
                                    </Link>
                                  );
                                })}
                              {/* <small>
                                {song?.genres &&
                                  song?.genres
                                    .map((genre) => genre.name)
                                    .join(", ")}
                              </small> 
                            </div>
                          </div>

                          <p
                            onClick={() => {
                              handlePlayMusic(song);
                            }}
                            className="mb-0 iq-music-play col-2 col-sm-1 musicplayer-play-button "
                          >
                            {isPlaying && song?._id === currentSongID ? (
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
                          <p className="mb-0 iq-music-time  col-sm-1 ">
                            {song?.duration
                              ? moment(song?.duration * 1000).format("mm:ss")
                              : "00:00"}
                          </p>
                          {song?.waveform && (
                            <img
                              style={{
                                padding: "0px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                              className="mb-0 col-sm-5 audio-visualizer "
                              src={song?.waveform}
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
                      <h4 className="card-title">Similar Song</h4>
                    </div>
                    <div
                      id="feature-album-artist-slick-arrow"
                      className="slick-aerrow-block"
                    ></div>
                  </div>
                  <div
                    style={
                      `${isLoadingSimilar}` === "true"
                        ? { height: "20vh" }
                        : { height: "auto" }
                    }
                    className="iq-card-body"
                  >
                    {isLoadingSimilar ? (
                      <div
                        style={{
                          position: "absolute",
                          top: "46%",
                          left: "46%",
                        }}
                      >
                        {" "}
                        <Loading />
                      </div>
                    ) : (
                      <ul className="list-unstyled iq-music-slide mb-0">
                        {smilarSong &&
                          smilarSong.map((song, index) => {
                            return (
                              <Fragment key={index}>
                                <MusicPlayer
                                  reference={detailsSongPage}
                                  song={song}
                                />
                              </Fragment>
                            );
                          })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>

      <div
        id="exampleModalCenteredScrollableAtt"
        className="modal fade "
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenteredScrollableTitle"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <div
                style={{
                  cursor: "pointer",
                }}
                className="d-flex align-items-center"
                onClick={() => {
                  setIsCopyAtt(true);
                  var copyText = document.getElementById("copy-span-rect");
                  navigator.clipboard.writeText(copyText.innerText);
                }}
              >
                <h5
                  className="modal-title font-weight-bolder text-white"
                  id="exampleModalCenteredScrollableTitle"
                >
                  {isCopyAtt ? "Đã sao chép" : "Sao chép"}
                </h5>
                {isCopyAtt ? (
                  <FaCheck className="ml-2" />
                ) : (
                  <FaRegCopy className="ml-2" />
                )}
              </div>
              <button
                type="button"
                className="close "
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body font-size-14 ">
              <span id="copy-span-rect">
                {" "}
                <b>
                  {` Tác phẩm: ${song?.title}  ||
                  ${window.location}`}
                  {/* <br /> */}
                  {/* Attribution 4.0 International (CC BY 4.0) */}
                  <br />
                  {`Tác giả: ${
                    song?.artists?.length > 0 &&
                    song?.artists.map((artist) => artist.name).join(", ")
                  }`}
                  <br />
                  Bản quyền và quản lí thuộc: https://audiobay.net
                </b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailsSong;
