import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components";
import { apiGetAllMusicCollectionAvailable,apiGetAllSfxCollectionAvailable } from "../../apis";
const HomeCollection = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [isLoading, setisLoading] = useState(true);

useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await apiGetAllMusicCollectionAvailable("", "6", "", "");
        const data = response.data.data;
        const response2 = await apiGetAllSfxCollectionAvailable("", "6", "", "");
        const data2 = response2.data.data;
        setList([...data, ...data2]);
        setisLoading(false);
      } catch (error) {}
    };
    fetchList();
  }, []);
  return (
    <Fragment>
      <div className="col-lg-12">
        <div className="iq-card">
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              <h4 className="card-title font-weight-normal">Bộ Sưu Tập</h4>
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
                  View More <i className="las la-angle-right"></i>
                </span>
              </b>
            </div>
          </div>
          
            <div
              style={
                `${isLoading}` === "true"
                  ? { height: "617px" }
                  : { height: "auto" }
              }
               className="iq-card-body">
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
              <ul className="list-unstyled row iq-box-hover mb-0">
                {list.map((item, index) => (
                  <li
                    key={index}
                    className="col-xl-2 col-lg-3 col-md-4 iq-music-box"
                  >
                    <div className="iq-card">
                      <div className="iq-card-body p-0">
                        <div
                          onClick={() => {
                            navigate(`/collection/${item?.slug}`);
                          }}
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
                                minHeight:"131px",
                                minWidth:"153px",
                                objectFit: "cover",
                              }}
                              src={item?.thumbnail_collection}
                              className="img-border-radius img-fluid w-100"
                              alt="collection"
                            />
                          </a>
                          <div className="overlay-music-icon">
                            <a>
                              <i className="las la-play-circle"></i>
                            </a>
                          </div>
                        </div>
                        <div style={{
                          minHeight:"112px",
                        }} className="feature-list text-center">
                          <h6
                            onClick={() => {
                              navigate(`/collection/${item?.slug}`);
                            }}
                            className="font-weight-600 mb-0 home_footer_link mb-0"
                            data-toggle="tooltip" title={item?.title}
                          >
                            {item?.title}
                          </h6>
                          <p className="mb-0">
                            {item?.collection_type === 1
                              ? "Music Collection"
                              : "SFX Collection"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              )}
            </div>
     
        </div>
      </div>
    </Fragment>
  );
};

export default HomeCollection;
