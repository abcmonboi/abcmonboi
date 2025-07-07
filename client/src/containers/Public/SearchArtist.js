import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loading } from "../../components";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { apiSearchArtistByName } from "../../apis";
const SearchArtist = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const keyword = params.get("keyword") || "";
  const [isLoading, setisLoading] = useState(true);
  const [artist, setArtist] = useState([]);
  //copyrightStatus
  useEffect(() => {
    if (keyword) {
      setisLoading(true);
      const artistName = keyword.toLowerCase().trim();
      const FetchSearchArtist = async () => {
        apiSearchArtistByName(artistName).then((response) => {
          setArtist(response.data.data);
          setisLoading(false);
        });
      };
      FetchSearchArtist();
    }
  }, [keyword]);

  return (
    <Fragment>
      <div className="col-lg-12">
        <div className="iq-card">
          <div className="row pt-3 pb-2 pl-3 d-flex justify-content-center "></div>

          <div className="col-lg-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between align-items-center">
                <div className="iq-header-title">
                  <h4 className="card-title"> Artists found </h4>
                </div>
                <div
                  id="feature-album-artist-slick-arrow"
                  className="slick-aerrow-block"
                ></div>
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
                  <ul className="list-unstyled row feature-album-artist mb-0 ">
                    {artist.length > 0 ? (
                      artist.map((item, index) => {
                        return (
                          <li
                            key={item._id}
                            className="col-lg-2  iq-music-box mb-5"
                          >
                            <div
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                navigate(`/artists/${item?.slug}`);
                              }}
                              className="iq-thumb-artist"
                            >
                              <div className="iq-music-overlay"></div>
                              <a>
                                <img
                                  style={{
                                    height: "235px",
                                    width: "235px",
                                    objectFit: "cover",
                                  }}
                                  src={item.thumbnail}
                                  className="w-100 img-fluid "
                                  alt="artist-profile"
                                />
                              </a>
                              <div className="overlay-music-icon">
                                <a>
                                  <i className="las la-play-circle"></i>
                                </a>
                              </div>
                            </div>
                            <div className="feature-list text-center">
                              <h6 className="font-weight-600  mb-0">
                                {item.name}
                              </h6>
                            </div>
                          </li>
                        );
                      })
                    ) : (
                      <li className="mb-3 mt-5 col-12">
                        <div className="d-flex justify-content-center align-items-center ">
                          <h5 className="mb-0 text-gray">No Artist Found</h5>
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
    </Fragment>
  );
};

export default SearchArtist;
