import React, { Fragment, useEffect, useState } from "react";
import { Loading } from "../../components";
import { useNavigate } from "react-router-dom";
import { apiGetAllSubTheme } from "apis";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchSubTheme = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const [params] = useSearchParams();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const keyword = params.get("title") || "";
  const [limit, setLimit] = useState(8);
  const [sort, setSort] = useState("-createdAt");
  const [fields, setFields] = useState([
    "title",
    "themesubArtwork",
    "slug",
    "song",
    "description",
  ]);
  const fetchMore = () => {
    setPage(page + 1);
  };
  const FetchSearchDataByTitle = async (queries) => {
    try {
      const response = await apiGetAllSubTheme(queries);
      const dataRes = response?.data?.data;
      if (dataRes) {
        if (dataRes?.length === 0) {
          setHasMore(false);
          setListData([]);
        }
        if (queries?.page === 1) {
          setListData(dataRes);
        } else {
          setListData([...listData, ...dataRes]);
        }

        if (
          +response.data?.skip + +response.data?.limit >=
          +response.data?.counts
        ) {
          setHasMore(false);
        }
      } else {
        setListData([]);
        setHasMore(false);
      }
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  };
  useEffect(() => {
    !isLoading && setisLoading(true);
    page !== 1 && setPage(1);
    !hasMore && setHasMore(true);
    let params = {
      page: 1,
      limit: limit,
      sort: sort,
      fields: fields?.join(","),
    };
    if (keyword) {
      params = {
        ...params,
        title: keyword,
      };
    }
    FetchSearchDataByTitle(params);
  }, [keyword]);
  useEffect(() => {
    if (page !== 1) {
      let params = {
        page: page,
        limit: limit,
        sort: sort,
        status: true,
        fields: fields.join(","),
      };
      if (keyword) {
        params = {
          ...params,
          title: keyword,
        };
      }
      FetchSearchDataByTitle(params);
    }
    //eslint-disable-next-line
  }, [page]);
  return (
    <div className="col-lg-12">
      <div className="iq-card">
        <div className="col-lg-12">
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">Chủ đề</h4>
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
              ) : listData?.length > 0 ? (
                <InfiniteScroll
                  style={{ overflow: "hidden" }}
                  dataLength={listData?.length}
                  next={fetchMore}
                  hasMore={hasMore}
                  loader={
                    hasMore && (
                      <p style={{ textAlign: "center" }}>
                        <Loading />
                      </p>
                    )
                  }
                >
                  <ul className="list-unstyled row  iq-box-hover mb-0">
                    {listData &&
                      listData.map((item, index) => {
                        return (
                          <li
                            key={index}
                            className="col-xl-3 col-lg-4 col-md-4 iq-music-box"
                          >
                            <div
                              onClick={() => {
                                navigate(
                                  `/themes/${item?.themes[0]?.slug}/${item?.slug}`
                                );
                              }}
                              style={{
                                cursor: "pointer",
                              }}
                              className="iq-card "
                            >
                              <div className="iq-card-body p-0">
                                <div className="iq-thumb">
                                  <div className="iq-music-overlay" />
                                  <a>
                                    <img
                                      src={item?.themesubArtwork}
                                      className="img-border-radius img-fluid w-100"
                                      alt="themes"
                                    />
                                  </a>
                                </div>
                                <div className="feature-list text-center">
                                  <h6 className="font-weight-600  mb-0">
                                    {" "}
                                    {item?.title}
                                  </h6>
                                  <p className="mb-0">
                                    {item?.song?.length > 0
                                      ? item?.song?.length + " tracks"
                                      : "No tracks"}
                                  </p>
                                  <p title={item?.description} className="mb-0">
                                    {isLoading
                                      ? Array(200).fill(".").join(" ")
                                      : item?.description?.slice(0, 23) + "..."}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </InfiniteScroll>
              ) : (
                <div className="text-center mb-5 text-muted">
                  <h5 className="text-muted">No data</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSubTheme;
