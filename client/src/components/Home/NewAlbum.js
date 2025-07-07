import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components";
import { apiGetTopAlbum } from "../../apis";

export const NewAlbum = () => {
  const navigate = useNavigate();
  const [topAlbum, setTopAlbum] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const getTomAlbum = async () => {
      try {
        const response = await apiGetTopAlbum();
        const data = response.data.data;
        setTopAlbum(data);
        setisLoading(false);
      } catch (error) {}
    };
    getTomAlbum();
  }, []);
  return (
    <Fragment>
      <div className="col-lg-12">
        <div className="iq-card">
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              <h4 className="card-title font-weight-normal"> Album Mới</h4>
            </div>
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/albums");
              }}
              className="d-flex align-items-center iq-view"
            >
              <b className="mb-0 text-primary">
                <span>
                  Xem thêm <i className="las la-angle-right"></i>
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
              <ul className="list-unstyled row iq-box-hover mb-0">
                {topAlbum &&
                  topAlbum.map((album, index) => (
                    <li
                      key={index}
                      className="col-xl-2 col-lg-3 col-md-4 iq-music-box"
                    >
                      <div className="iq-card">
                        <div className="iq-card-body p-0">
                          <div
                            onClick={() => {
                              navigate(`/albums/${album?.slug}`);
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
                                src={album?.album_art}
                                className="img-border-radius img-fluid w-100"
                                alt=""
                              />
                            </a>
                            <div className="overlay-music-icon">
                              {/*eslint-disable-next-line*/}
                              <a>
                                <i className="las la-play-circle"></i>
                              </a>
                            </div>
                          </div>
                          <div
                            style={{
                              minHeight: "112px",
                            }}
                            className="feature-list text-center"
                          >
                            <h6
                              data-toggle="tooltip"
                              title={album?.title}
                              onClick={() => {
                                navigate(`/albums/${album?.slug}`);
                              }}
                              className="font-weight-600 mb-0 home_footer_link mb-0 description-infor-1-line"
                            >
                              {album?.title}
                            </h6>
                            <p
                              onClick={() =>
                                navigate(`/artists/${album?.artists[0].slug}`)
                              }
                              className="home_footer_link mb-0 description-infor-2-line"
                            >
                              {album?.artists
                                .map((artist) => artist.name)
                                .join(", ")}
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
