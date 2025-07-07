import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";
import { useNavigate } from "react-router-dom";
import { Loading } from "components";
import { getNewRelease } from "apis";

const TrendingSong = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentSongID, isPlaying } = useSelector((state) => state.music);

  const settings = {
    className: "center",
    // variableWidth: true,
    dots: false,
    focusOnSelect: true,
    pauseOnHover: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1600,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1424,
        settings: {
          slidesToShow: 3,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  const slider = useRef(null);
  const [NewReleaseSong, setNewReleaseSong] = useState([]);
  const [isLoading, setisLoading] = useState(true);

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
    // navigate("/artists");
  };
  useEffect(() => {
    const FetchGetNewReleaseSong = async () => {
      try {
        const response = await getNewRelease("-listen");
        const data = response.data;
        setNewReleaseSong(data);
        setisLoading(false);
      } catch (error) {}
    };
    FetchGetNewReleaseSong();
  }, []);
  return (
    <div className="col-lg-12">
      <div className="iq-card">
        <div className="iq-card-header d-flex justify-content-between align-items-center">
          <div className="iq-header-title">
            <h4 className="card-title font-weight-normal">Lượt Nghe Nhiều</h4>
          </div>
          <div id="feature-album-slick-arrow" className="slick-aerrow-block">
            <button
              className="slick-prev slick-arrow"
              aria-label="Previous"
              type="button"
              style={{ display: "block" }}
              onClick={() => {
                slider.current.slickPrev();
              }}
            >
              Previous
            </button>
            <button
              className="slick-next slick-arrow"
              aria-label="Next"
              type="button"
              style={{ display: "block" }}
              onClick={() => {
                slider.current.slickNext();
              }}
            >
              Next
            </button>
          </div>
        </div>

        <div
          style={
            `${isLoading}` === "true" ? { height: "360px" } : { height: "auto" }
          }
          className="iq-card-body "
        >
          {isLoading ? (
            <div
              style={{
                position: "absolute",
                top: "42%",
                left: "46%",
              }}
            >
              {" "}
              <Loading />
            </div>
          ) : (
            <Slider ref={slider} {...settings}>
              {NewReleaseSong &&
                NewReleaseSong.map((song, index) => {
                  return (
                    <div
                      key={song._id}
                      style={
                        {
                          // paddingRight: "0px",
                          // width: "264px",
                        }
                      }
                      className="list-unstyled "
                    >
                      <li className="col-lg-12 iq-music-box ">
                        <div className="iq-card mb-0 ">
                          <div className="iq-card-body p-0">
                            <div
                              onClick={() => handlePlayMusic(song)}
                              className="iq-thumb"
                            >
                              <div
                                style={{
                                  cursor: "pointer",
                                }}
                                className="iq-music-overlay"
                              ></div>
                              <a>
                                <img
                                  style={{
                                    // height: "237px",
                                    // width: "234px",
                                    // minHeight: "281px",
                                    // minHeight:"159px",
                                    // minWidth: "186px",
                                    // objectFit: "cover",
                                  }}
                                  src={song.thumbnail}
                                  className="img-border-radius img-fluid w-100 song_art_thumnail"
                                  alt=""
                                />
                              </a>
                              <div className="overlay-music-icon">
                                <a>
                                  <i className="las la-play-circle"></i>
                                </a>
                              </div>
                            </div>
                            <div className="feature-list text-center">
                              <h6
                                onClick={() => navigate(`/music/${song?.slug}`)}
                                className="font-weight-600 mb-0 home_footer_link"
                                data-toggle="tooltip"
                                title={song?.title}
                              >
                                {/* {song?.title.length > 28
                                  ? `${song?.title.slice(0, 27)}...`
                                  : song?.title} */}
                                {song?.title}
                              </h6>
                              <p
                                onClick={() =>
                                  navigate(`/artists/${song?.artists[0].slug}`)
                                }
                                className="home_footer_link mb-0"
                              >
                                {song?.artists
                                  .map((artist) => artist.name)
                                  .join(", ").length > 28
                                  ? `${song?.artists
                                      .map((artist) => artist.name)
                                      .join(", ")
                                      .slice(0, 27)}...`
                                  : song?.artists
                                      .map((artist) => artist.name)
                                      .join(", ")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </div>
                  );
                })}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingSong;
