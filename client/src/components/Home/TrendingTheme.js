import React, { useEffect, useRef, useState, memo } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";
import { useNavigate } from "react-router-dom";
import { Loading } from "components";
import { apiGetAllThemes } from "apis";

const TrendingTheme = ({ handleClickRelease }) => {
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
  const [NewReleaseData, setNewReleaseData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const FetchGetNewReleaseData = async () => {
      try {
        const response = await apiGetAllThemes({
          limit: 10,
          page: 1,
          sort: "-views",
          fields: "title, themesArtwork,countThemesub, slug,views",
          status: true,
        });

        const data = response.data?.data;
        setNewReleaseData(data);
        setisLoading(false);
      } catch (error) {}
    };
    FetchGetNewReleaseData();
  }, []);
  return (
    <div className="col-lg-12">
      <div className="iq-card">
        <div className="iq-card-header d-flex justify-content-between align-items-center">
          <div className="iq-header-title">
            <h4 className="card-title font-weight-normal">Chủ đề nổi bật</h4>
          </div>
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/themes");
            }}
            className="d-flex align-items-center iq-view"
          >
            <b className="mb-0 text-primary">
              <span>
                Xem Thêm <i className="las la-angle-right"></i>
              </span>
            </b>
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
              {NewReleaseData &&
                NewReleaseData.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="list-unstyled "
                      onClick={() => {
                        navigate(`/themes/${el?.slug}`);
                      }}
                    >
                      <li className="col-lg-12 iq-music-box ">
                        <div className="iq-card mb-0 ">
                          <div className="iq-card-body p-0">
                            <div className="iq-thumb">
                              <div
                                style={{
                                  cursor: "pointer",
                                }}
                                className="iq-music-overlay"
                              ></div>
                              <a>
                                <img
                                  style={
                                    {
                                      // height: "237px",
                                      // width: "234px",
                                      // minHeight: "281px",
                                      // minHeight:"159px",
                                      // minWidth: "186px",
                                      // objectFit: "cover",
                                    }
                                  }
                                  src={el?.themesArtwork}
                                  className="img-border-radius img-fluid w-100 song_art_thumnail"
                                  alt=""
                                />
                              </a>
                              <div className="overlay-music-icon"></div>
                            </div>
                            <div className="feature-list text-center">
                              <h6
                                // onClick={() => navigate(`/themes/${el?.themes[0]?.slug}/${el?.slug}`)}
                                className="font-weight-600 mb-0 home_footer_link"
                                data-toggle="tooltip"
                                title={el?.title}
                              >
                                {el?.title}
                              </h6>
                              <p
                                // onClick={() =>
                                //   navigate(`/artists/${song?.artists[0].slug}`)
                                // }
                                className="home_footer_link mb-0"
                              >
                                {el?.countThemesub > 0
                                  ? el?.countThemesub + " Danh sách phát"
                                  : "Chưa có danh sách phát"}
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

export default memo(TrendingTheme);
