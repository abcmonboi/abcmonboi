import { React, useEffect, useState, memo } from "react";
import bgBackground from "assets/images/bg.jpg";
import {
  apiGetAllMoodByTitle,
  apiGetAllInstrumentByTitle,
  apiGetAllGenreByTitle,
} from "apis";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "components";
import useDebounce from "hooks/useDebounce";

const SearchMoodGenreInstrument = ({
  placeholder,
  activeClick,
  changeActiveFilter,
  handleListFilterMood,
}) => {
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fields, setFields] = useState(["name"]);
  const FetchGetDataByTitle = async (params) => {
    if (window.location.pathname === "/music/mood") {
      await apiGetAllMoodByTitle(params).then((response) => {
        setIsLoading(false);
        if (response?.data?.data?.length === 0) {
          setHasMore(false);
          setData([]);
        } else if (response?.data?.data?.length > 0 && currentPage !== 1) {
          setData([...data, ...response.data.data]);
          if (
            +response.data?.skip + +response.data?.limit >=
            +response.data?.counts
          ) {
            setHasMore(false);
          }
        } else if (response?.data?.data?.length > 0 && currentPage === 1) {
          setData(response.data.data);
          if (
            +response.data?.skip + +response.data?.limit >=
            +response.data?.counts
          ) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
          setData([]);
        }
      });
    }
    if (window.location.pathname === "/music/genre") {
      await apiGetAllGenreByTitle(params).then((response) => {
        setIsLoading(false);
        if (response?.data?.data?.length === 0) {
          setHasMore(false);
          setData([]);
        } else if (response?.data?.data?.length > 0 && currentPage !== 1) {
          setData([...data, ...response.data.data]);
          if (
            +response.data?.skip + +response.data?.limit >=
            +response.data?.counts
          ) {
            setHasMore(false);
          }
        } else if (response?.data?.data?.length > 0 && currentPage === 1) {
          setData(response.data.data);
          if (
            +response.data?.skip + +response.data?.limit >=
            +response.data?.counts
          ) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
          setData([]);
        }
      });
    }
    if (window.location.pathname === "/music/instrument") {
      await apiGetAllInstrumentByTitle(params).then((response) => {
        setIsLoading(false);
        if (response?.data?.data?.length === 0) {
          setHasMore(false);
          setData([]);
        } else if (response?.data?.data?.length > 0 && currentPage !== 1) {
          setData([...data, ...response.data.data]);
          if (
            +response.data?.skip + +response.data?.limit >=
            +response.data?.counts
          ) {
            setHasMore(false);
          }
        } else if (response?.data?.data?.length > 0 && currentPage === 1) {
          setData(response.data.data);
          if (
            +response.data?.skip + +response.data?.limit >=
            +response.data?.counts
          ) {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
          setData([]);
        }
      });
    }
  };
  const debouceSearch = useDebounce(keyword, 200);
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      let params = {
        page: 1,
        limit: limit,
        fields: fields?.join(","),
      };
      if (keyword !== "") {
        params = {
          ...params,
          title: keyword,
        };
        FetchGetDataByTitle(params);
      }
    }
    // eslint-disable-next-line
  }, [debouceSearch]);
  useEffect(() => {
    setIsLoading(true);
    let params = {
      limit,
      page: currentPage,
      fields: fields.join(","),
    };
    if (keyword) {
      params = {
        ...params,
        title: keyword,
      };
    }
    FetchGetDataByTitle(params);
  }, [currentPage]);
  const handlerSearch = async (e) => {
    //eslint-disable-next-line
    if ((e.key === "Enter" && keyword !== "") || e.type === "click") {
      setTimeout(() => {
        if (data?.length > 0) {
          handleListFilterMood(data[0], "add");
        }
      }, 600);
    }
  };
  const fetchMoreData = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <div className="col-lg-12">
      <div className="iq-card iq-realease">
        <div
          style={{
            backgroundBlendMode: "multiply",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${bgBackground})`,
            backgroundSize: "cover",
            height: "500px",
            padding: "0px 0 0 0",
          }}
          className="iq-card-body iq-song-back3"
        >
          <div className="row">
            <div
              style={{
                paddingLeft: "0",
                borderRadius: "0 50px",
              }}
              className="col-lg-12 hero-header-search__box "
            >
              <div
                className="hero-header is--search is--retracted is--color-light is--align-left is--type-home"
                style={{
                  height: "auto",
                  maxWidth: "none",
                  position: "relative",
                  display: "block",
                  width: "100%",
                  margin: "0 auto",
                  padding: "0",
                  boxSizing: "inherit",
                  lineHeight: "1.8125rem",
                  WebkitFontSmoothing: "antialiased",
                  fontSize: "100%",
                  WebkitTextSizeAdjust: "100%",
                }}
              >
                <div
                  className="inner-search"
                  style={{
                    height: "31.25rem",
                    padding: "0 0 20px 0",
                    position: "relative",
                    minHeight: "17.5rem",
                    maxWidth: "120.625rem",
                    margin: "0 auto",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    boxSizing: "inherit",
                    lineHeight: "1.8125rem",
                    WebkitFontSmoothing: "antialiased",
                    fontSize: "100%",
                    textRendering: "optimizeLegibility",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      marginBottom: "0.625rem",
                      textAlign: "left",
                      width: "100%",
                      order: "1",
                      zIndex: "6",
                      flex: "none",
                      margin: "0",
                      padding: "0",
                      boxSizing: "inherit",
                      display: "block",
                    }}
                    className="hero-header-search__text"
                  >
                    <h1
                      style={{
                        fontSize: "2.5rem",
                        lineHeight: "2.75rem",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "normal",
                        marginBottom: "0.625rem",
                        margin: "0",
                        padding: "0 0 0 50px",
                        boxSizing: "inherit",

                        display: "block",

                        textAlign: "center",
                      }}
                      className="search__title text-white"
                    >
                      AudioBay Library
                    </h1>
                    <p
                      style={{
                        fontSize: "1.25rem",
                        lineHeight: "1.8125rem",
                        textTransform: "none",
                        letterSpacing: "normal",
                        fontWeight: "400",
                        margin: "0",
                        color: "rgba(255,255,255, .66)",
                        padding: "0 0 0 50px",
                        boxSizing: "inherit",
                        marginBlockStart: "0.67em",
                        marginBlockEnd: "0.67em",
                        marginInlineStart: "0px",
                        marginInlineEnd: "0px",
                        display: "block",
                        textAlign: "center",
                      }}
                      className="search__description text-white"
                    >
                      Thư viện âm nhạc miễn phí chất lượng cao
                    </p>
                  </div>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    autoComplete="off"
                    action=""
                    style={{
                      marginBottom: "3.75rem",
                      marginTop: "2.1875rem",
                      width: "100%",
                      order: "1",
                      color: "#000",
                      zIndex: "5",
                      position: "relative",
                      display: "block",
                      transitionProperty: "all",
                      transitionDuration: ".2s",
                      transitionTimingFunction: "ease-in-out",
                      maxWidth: "50.75rem",
                      flex: "none",
                      margin: "0",
                      padding: "0 0 0 50px",
                      boxSizing: "inherit",
                    }}
                    className="hero-header-search__form"
                  >
                    <div
                      onClick={(e) => {
                        changeActiveFilter(placeholder);
                      }}
                      style={{
                        height: "3.425rem",
                        borderRadius: "0.125rem",
                        borderWidth: "2px",
                        position: "relative",
                        padding: "0",
                        boxShadow: "0 0 0 8px rgba(229,124,44,0)",
                        border: "1px solid rgba(229,124,44,0)",
                        transitionProperty: "box-shadow,border-color",
                        transitionDuration: ".2s",
                        transitionTimingFunction: "ease-in-out",
                        width: "100%",
                      }}
                      className="iq-search-bar d-flex align-items-center justify-content-between m-0"
                    >
                      <a
                        style={{
                          top: "8px",
                          position: "absolute",
                          left: "10px",
                          opacity: "1",
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="search-link"
                      >
                        <i className="ri-search-line "></i>
                      </a>
                      <a
                        style={{
                          pointerEvents: keyword ? "auto" : "none",
                          top: "22%",
                          position: "absolute",
                          right: "10px",
                          opacity: "1",
                          zIndex: "6",
                        }}
                        onClick={(e) => {
                          setKeyword("");
                          setIsLoading(true);
                          setData([]);
                          e.stopPropagation();

                          if (currentPage !== 1) {
                            setCurrentPage(1);
                          } else {
                            !hasMore && setHasMore(true);

                            let params = {
                              page: 1,
                              limit: limit,
                              fields: fields?.join(","),
                            };

                            FetchGetDataByTitle(params);
                          }
                        }}
                        className="search-audio"
                      >
                        <i className="las la-times text-black"></i>
                      </a>
                      <input
                        onClick={(e) => {
                          activeClick === placeholder && e.stopPropagation();
                        }}
                        id="search-input"
                        value={keyword}
                        onKeyUp={handlerSearch}
                        onChange={(e) => {
                          setData([]);
                          setIsLoading(true);
                          if (e.target.value !== "") {
                            setKeyword(e.target.value);
                          } else {
                            setKeyword("");
                            !hasMore && setHasMore(true);
                            if (currentPage !== 1) {
                              setCurrentPage(1);
                            } else {
                              let params = {
                                page: 1,
                                limit: limit,
                                fields: fields?.join(","),
                              };

                              FetchGetDataByTitle(params);
                            }
                          }
                        }}
                        style={{
                          height: "100%",
                          opacity: "1",
                          width: "100%",
                        }}
                        className="text search-input"
                        placeholder={placeholder}
                        type="text"
                      />
                      {activeClick === placeholder && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            top: "calc(100% - 12px)",
                            cursor: "default",
                            borderLeft: "1px solid var(--iq-dark-border-light)",
                            borderRight:
                              "1px solid var(--iq-dark-border-light)",
                            borderBottom:
                              "1px solid var(--iq-dark-border-light)",
                            borderRadius: "0px 0px 14px 30px",
                          }}
                          className="position-absolute bg-white asdas w-100 m-0 "
                        >
                          <div
                            id="scrollableDiv"
                            style={{
                              height: "30vh",
                              overflow: "auto",
                              display: "flex",
                              flexDirection: "column",
                            }}
                            className="pl-4 pt-2 text-black"
                          >
                            
                            <div className="d-flex justify-content-start align-items-center">
                            <i className="ri-lightbulb-flash-line mr-2 text-primary"></i>
                              
                              <span className="mr-3 font-size-16 font-italic font-weight-normal ">

                                {keyword
                                  ? `Kết quả tìm kiếm cho "${keyword}"`
                                  : "Tất cả từ khóa"}

                              </span>
                            </div>
                            <InfiniteScroll
                              dataLength={data.length}
                              next={fetchMoreData}
                              hasMore={hasMore}
                              loader={
                                hasMore && (
                                  <p style={{ textAlign: "center" }}>...</p>
                                )
                              }
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                              scrollableTarget="scrollableDiv"
                            >
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="d-flex flex-column mt-2 search-item-checkbox"
                                style={{
                                  cursor: "pointer",
                                  width: "calc(100% )",
                                }}
                              >
                                {data?.length > 0 ? (
                                  data.map((item, index) => (
                                    <li
                                      style={{
                                        hover: "pointer",
                                      }}
                                      className="d-flex btn font-size-14 bg-light-hover justify-content-between"
                                      key={index}
                                    >
                                      <div
                                        onClick={() => {
                                          //append new mood to listFilterMood
                                          handleListFilterMood(item, "add");
                                        }}
                                        className="schedule-text w-100 text-left"
                                      >
                                        <span>{item.name}</span>
                                      </div>
                                      <div className="schedule-icon">
                                        <i
                                          onClick={() => {
                                            handleListFilterMood(item, "add");
                                          }}
                                          className="ri-add-circle-fill mr-2 text-primary font-size-20"
                                        />
                                        <i
                                          onClick={() => {
                                            handleListFilterMood(
                                              item,
                                              "remove"
                                            );

                                            // setPage(1);
                                          }}
                                          className="ri-indeterminate-circle-fill mr-2 text-primary font-size-20"
                                        />
                                      </div>
                                    </li>
                                  ))
                                ) : isLoading ? (
                                  <p style={{ textAlign: "center" }}>
                                    <Loading />
                                  </p>
                                ) : (
                                  <div className="d-flex justify-content-center align-items-center">
                                    <span>
                                      {keyword
                                        ? `Không có kết quả tìm kiếm cho "${keyword}"`
                                        : "Không có kết quả"}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </InfiniteScroll>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SearchMoodGenreInstrument);
