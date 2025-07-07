import React, { useEffect, useState } from "react";
import { Loading } from "../../components";
import { Link } from "react-router-dom";
import { apiSearchAlbumByTitle } from "../../apis";
import { useSearchParams } from "react-router-dom";

const SearchAlbum = () => {
  const [isLoading, setisLoading] = useState(true);
  const [album, setAlbum] = useState([]);
  const [params] = useSearchParams();
  const keyword = params.get("keyword") || "";
  //copyrightStatus

  useEffect(() => {
    setisLoading(true);
    if (keyword) {
      const albumTitle = keyword.toLowerCase().trim();
      const FetchSearchAlbum = async () => {
        apiSearchAlbumByTitle(albumTitle).then((response) => {
          setAlbum(response.data.data);
          setisLoading(false);
        });
      };
      FetchSearchAlbum();
    }
  }, [keyword]);
  return (
    <div className="col-lg-12">
      <div className="iq-card">
        {/* <div className="row pt-3 pb-2 pl-4 d-flex justify-content-between ">
                <div className="col-lg-2 ">
                  <div>
                    <label htmlFor="exampleInputText1">Artist </label>
                    <input
                      style={{
                        border: "1px solid #e3e6f0",
                        boxShadow: "none",
                      }}
                      type="text"
                      className="form-control "
                      id="exampleInputText1"
                      placeholder="Enter Artist Name"
                      onChange={(e) => {
                        const value = e.target.value;
                        const filter = album.filter((item) => {
                          return item.artists?.some((artist) => {
                            return artist.name
                              .toLowerCase()
                              .includes(value.toLowerCase());
                          });
                        });
                        setAlbum(filter);
                      }}
                    />
                  </div>
                </div>
              </div> */}

        <div className="col-lg-12">
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">Album</h4>
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
                  {album.length > 0 ? (
                    album.map((album, index) => {
                      return (
                        <li
                          key={index}
                          className="col-xl-2 col-lg-4 col-md-4 iq-music-box"
                        >
                          <div className="iq-card ">
                            <div className="iq-card-body p-0">
                              <div
                                style={{
                                  cursor: "pointer",
                                }}
                                className="iq-thumb"
                              >
                                <Link to={`/albums/${album?.slug}`}>
                                  <div className="iq-music-overlay" />
                                  <img
                                    src={
                                      album?.album_art &&
                                      album?.album_art !== ""
                                        ? album?.album_art
                                        : "assets/images/dashboard/album-song/01.png"
                                    }
                                    className="img-border-radius img-fluid w-100"
                                    alt="album-img"
                                  />
                                </Link>
                              </div>
                              <div className="feature-list text-center">
                                        <Link to={`/albums/${album?.slug}`}>
                                          <h6
                                            className="font-weight-600  mb-0 home_footer_link "
                                            data-toggle="tooltip"
                                            title={album?.title}
                                          >
                                            {album?.title &&
                                            album?.title.length > 30
                                              ? album?.title.slice(0, 30) +
                                                "..."
                                              : album?.title}
                                          </h6>
                                        </Link>
                                        <Link
                                          to={`/artists/${album?.artists[0].slug}`}
                                        >
                                          <p
                                            style={{
                                              textOverflow: "ellipsis",
                                              overflow: "hidden",
                                              whiteSpace: "nowrap",
                                            }}
                                            onMouseEnter={(e) => {
                                              e.target.style.overflow =
                                                "visible";
                                              e.target.style.whiteSpace =
                                                "normal";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.target.style.overflow =
                                                "hidden";
                                              e.target.style.whiteSpace =
                                                "nowrap";
                                            }}
                                            className="home_footer_link mb-0"
                                          >
                                            {album?.artists &&
                                            album?.artists.length > 0
                                              ? album?.artists
                                                  .map((artist) => artist.name)
                                                  .join(", ")
                                              : "Chưa thêm"}
                                          </p>
                                        </Link>
                                      </div>
                            </div>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="mb-3 mt-5 col-12">
                      <div className="d-flex justify-content-center align-items-center ">
                        <h5 className="mb-0 text-gray">Không có kết quả</h5>
                      </div>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAlbum;
