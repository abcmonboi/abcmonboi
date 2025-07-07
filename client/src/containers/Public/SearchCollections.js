import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loading } from "../../components";
import { useNavigate } from "react-router-dom";
import { apiSearchCollectionByTitle } from "../../apis";
import { useSearchParams } from "react-router-dom";

const SearchCollections = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [params] = useSearchParams();
  const keyword = params.get("keyword") || "";
  //copyrightStatus

  useEffect(() => {
    if (keyword) {
      setisLoading(true);
      const collectionTitle = keyword.toLowerCase().trim();
      const FetchSearchCollection = async () => {
        apiSearchCollectionByTitle(collectionTitle).then((response) => {
          setCollections([
            ...response.data.data?.musicCollections,
            ...response.data.data?.sfxCollections,
          ]);
          setisLoading(false);
        });
      };
      FetchSearchCollection();
    }
  }, [keyword]);
  return (
    <div className="col-lg-12">
      <div className="iq-card">
        <div className="col-lg-12">
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">Bộ sưu tập</h4>
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
                  {collections.length > 0 ? (
                    collections.map((item, index) => {
                      return (
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
                                    src={item?.thumbnail_collection}
                                    className="img-border-radius img-fluid w-100"
                                    alt="collection"
                                  />
                                </a>
                                <div className="overlay-music-icon"></div>
                              </div>
                              <div className="feature-list text-center">
                                <h6
                                  onClick={() => {
                                    navigate(`/collection/${item?.slug}`);
                                  }}
                                  className="font-weight-600 mb-0 home_footer_link mb-0 description-infor-1-line"
                                  title={item?.title}
                                >
                                  {item?.title}
                                </h6>
                                <p className="mb-0 description-infor-1-line">
                                  Bộ sưu tập
                                  {item?.collection_type === 1
                                    ? " bài hát"
                                    : " âm thanh"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="mb-3 mt-5 col-12">
                      <div className="d-flex justify-content-center align-items-center ">
                        <h5 className="mb-0 text-gray">No Collection Found</h5>
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

export default SearchCollections;
