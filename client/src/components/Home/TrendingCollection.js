import React, { useEffect, useRef, useState, memo } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { Loading } from "components";
import { apiFilterAllCollection } from "apis";
const TrendingCollection = () => {
  const navigate = useNavigate();
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
        const response = await apiFilterAllCollection({
          limit: 10,
          page: 1,
          sort: "-listen",
          fields:
            "title, thumbnail_collection,collection_type, slug,views,listen, status",
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
            <h4 className="card-title font-weight-normal">
              Bộ sưu tập nổi bật
            </h4>
          </div>
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/collections");
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
                NewReleaseData.map((item, index) => {
                  return (
                    <div
                      key={item._id}
                      onClick={() => {
                        navigate(`/collection/${item?.slug}`);
                      }}
                      className="list-unstyled "
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
                                  style={{
                                    // height: "237px",
                                    // width: "234px",
                                    // minHeight: "159px",
                                    // minWidth: "186px",
                                    // minHeight: "281px",
                                    // minWidth: "186px",
                                    // objectFit: "cover",
                                  }}
                                  src={item.thumbnail_collection}
                                  className="img-border-radius img-fluid w-100 collection_art_thumnail"
                                  alt=""
                                />
                              </a>
                              <div className="overlay-music-icon"></div>
                            </div>
                            <div className="feature-list text-center">
                              <h6
                                title={item?.title}
                                className="font-weight-600 mb-0 home_footer_link mb-0 description-infor-1-line"
                              >
                                {item?.title}
                              </h6>
                              <p className="mb-0">
                                Bộ sưu tập
                                {item?.collection_type === 1
                                  ? " bài hát"
                                  : " âm thanh"}
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

export default memo(TrendingCollection);
