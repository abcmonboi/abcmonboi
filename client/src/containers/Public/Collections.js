import React, { Fragment, useEffect, useState, useRef } from "react";
import {NewRealeaseCollections, Loading, Search} from "components";
import { useNavigate } from "react-router-dom";
import {
  apiGetAllMusicCollectionAvailable,
  apiGetAllSfxCollectionAvailable,
} from "../../apis";
import { path } from "ultils/constant";
const Collections = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const [listMusicCollections, setlistMusicCollections] = useState([]);
  const [listSfxCollections, setlistSfxCollections] = useState([]);
  const collectionPage = useRef(null);

  useEffect(() => {
    collectionPage.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    const fetchList = async () => {
      try {
        const response = await apiGetAllMusicCollectionAvailable(
          "",
          12,
          "",
          ""
        );
        const data = response.data.data;
        const response2 = await apiGetAllSfxCollectionAvailable("", 12, "", "");
        const data2 = response2.data.data;
        setlistMusicCollections(data);
        setlistSfxCollections(data2);
        setisLoading(false);
      } catch (error) {}
    };
    fetchList();
  }, []);
  return (
    <Fragment>
      <div ref={collectionPage} id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <Fragment>
              <Search />
              <NewRealeaseCollections />

              <div className="col-lg-12">
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between align-items-center">
                    <div className="iq-header-title">
                      <h4 className="card-title font-weight-normal">
                        Bộ Sưu Tập Bài Hát
                      </h4>
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(path.MUSIC_COLLECTIONS);
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
                      `${isLoading}` === "true"
                        ? { height: "300px" }
                        : { height: "auto" }
                    }
                    className="iq-card-body"
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
                      <ul className="list-unstyled row  iq-box-hover mb-0">
                        {listMusicCollections &&
                          listMusicCollections.map((collection, index) => {
                            return (
                              <li
                                key={index}
                                className="col-xl-2 col-lg-3 col-md-4 iq-music-box"
                              >
                                <div className="iq-card ">
                                  <div className="iq-card-body p-0 ">
                                    <div
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        navigate(
                                          `/collection/${collection?.slug}`
                                        );
                                      }}
                                      className="iq-thumb"
                                    >
                                      <div className="iq-music-overlay"></div>
                                      <a>
                                        <img
                                          style={{
                                            minHeight: "131px",
                                            minWidth: "153px",
                                            objectFit: "cover",
                                          }}
                                          src={
                                            collection?.thumbnail_collection
                                              ? collection?.thumbnail_collection
                                              : "assets/images/dashboard/album-song/01.png"
                                          }
                                          className="img-border-radius img-fluid w-100 "
                                          alt=""
                                        />
                                      </a>
                                      <div className="overlay-music-icon"></div>
                                    </div>
                                    <div className="feature-list text-center">
                                      <h6
                                        onClick={() => {
                                          navigate(
                                            `/collection/${collection?.slug}`
                                          );
                                        }}
                                        title={collection?.title}
                                        className="font-weight-600  mb-0 home_footer_link mb-0 description-infor-1-line "
                                      >
                                        {collection?.title}
                                      </h6>
                                      <p
                                        title={collection?.description}
                                        // onMouseEnter={(e) => {
                                        //   e.target.style.overflow = "visible";
                                        //   e.target.style.whiteSpace = "normal";
                                        // }}
                                        // onMouseLeave={(e) => {
                                        //   e.target.style.overflow = "hidden";
                                        //   e.target.style.whiteSpace = "nowrap";
                                        // }}
                                        className="mb-0 description-infor-2-line"
                                      >
                                        {" "}
                                        {collection?.description}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                      <h4 className="card-title font-weight-normal">
                        Bộ Sưu Tập Âm Thanh
                      </h4>
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(path.SFX_COLLECTIONS);
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
                      `${isLoading}` === "true"
                        ? { height: "300px" }
                        : { height: "auto" }
                    }
                    className="iq-card-body"
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
                      <ul className="list-unstyled row  iq-box-hover mb-0">
                        {listSfxCollections &&
                          listSfxCollections.map((collection, index) => {
                            return (
                              <li
                                key={index}
                                className="col-xl-2 col-lg-3 col-md-4 iq-music-box"
                              >
                                <div className="iq-card ">
                                  <div className="iq-card-body p-0">
                                    <div
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        navigate(
                                          `/collection/${collection?.slug}`
                                        );
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
                                            minHeight: "131px",
                                            minWidth: "153px",
                                            objectFit: "cover",
                                          }}
                                          src={
                                            collection?.thumbnail_collection
                                              ? collection?.thumbnail_collection
                                              : "assets/images/dashboard/album-song/01.png"
                                          }
                                          className="img-border-radius img-fluid w-100 center"
                                          alt=""
                                        />
                                      </a>
                                    </div>
                                    <div className="feature-list text-center">
                                      <h6
                                        onClick={() => {
                                          navigate(
                                            `/collection/${collection?.slug}`
                                          );
                                        }}
                                        title={collection?.title}
                                        className="font-weight-600  mb-0  home_footer_link mb-0"
                                      >
                                        {collection?.title.length > 28
                                          ? `${collection?.title.slice(
                                              0,
                                              27
                                            )}...`
                                          : collection?.title}
                                      </h6>
                                      <p
                                        className="mb-0 description-infor-1-line"
                                        title={collection?.description}
                                      >
                                        {" "}
                                        {collection?.description}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Collections;
