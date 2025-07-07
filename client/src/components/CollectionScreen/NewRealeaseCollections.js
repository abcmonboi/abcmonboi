import React, { useRef, useEffect,useState,memo } from "react";
import Slider from "react-slick";
import {Loading} from "components";
import { useNavigate } from "react-router-dom";
import {apiGetAllCollectionAvailable} from "apis/collection";
const NewRealeaseCollections = () => {
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
  const [NewReleaseCollect, setNewReleaseCollect] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const handleDetails = (item) => {
   
    navigate("/collection/" + item.slug);
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await apiGetAllCollectionAvailable(
          "",
          10,
          "-createdAt",
          "title,collection_type,thumbnail_collection,slug"
        );
        const data = response.data.data;
        setNewReleaseCollect(data);
        setisLoading(false);
      } catch (error) {}
    };
    fetchList();
  }, []);
  return (
    <div className="col-lg-12">
      <div className="iq-card">
        <div className="iq-card-header d-flex justify-content-between align-items-center">
          <div className="iq-header-title">
            <h4 className="card-title font-weight-normal">Bộ Sưu Tập Mới</h4>
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
     
          <div  style={
            `${isLoading}` === "true"
              ? { height: "360px" }
              : { height: "auto" }
          } className="iq-card-body ">
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
              {NewReleaseCollect &&
                NewReleaseCollect.map((item, index) => {
                  return (
                    <div
                      key={item._id}
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
                            <div onClick={() => {handleDetails(item)}} className="iq-thumb">
                              <div  style={{
                                            cursor: "pointer",
                                          }} className="iq-music-overlay"></div>
                              <a>
                                <img
                                  style={{
                                    // height: "237px",
                                    // width: "234px",
                                    minHeight:"159px",
                                    minWidth:"186px",
                                    objectFit: "cover",
                                  }}
                                  src={item.thumbnail_collection}
                                  className="img-border-radius img-fluid w-100"
                                  alt=""
                                />
                              </a>
                              <div className="overlay-music-icon"></div>
                            </div>
                            <div className="feature-list text-center">
                              <h6 
                              title={item?.title}
                               onClick={() => {
                                          navigate(
                                            `/collection/${item?.slug}`
                                          );
                                        }} className="font-weight-600 mb-0 home_footer_link mb-0 description-infor-1-line">
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

export default memo(NewRealeaseCollections);
