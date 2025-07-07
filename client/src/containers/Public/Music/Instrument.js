import React, {
  useState,
  useRef,
  useEffect,
  Fragment,
  useCallback,
} from "react";
import {
  apiGetAllInstrument,
  apiGetAllSongAvailablebyInstrument,
  apiGetAllInstrumentByTitle,
} from "apis";
import InfiniteScroll from "react-infinite-scroll-component";
import { MusicPlayer, Search, SearchMoodGenreInstrument, Loading } from "components";

const Instrument = () => {
  const [instrument, setInstrument] = useState([]);
  const [query, setQuery] = useState("");
  const [topSong, setTopSong] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSong, setIsLoadingSong] = useState(true);
  const musicInstrumentPage = useRef(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("-createdAt");
  const [InstrumentId, setInstrumentId] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [listFilterInstrument, setListFilterInstrument] = useState([]);
  const [activeClick, setActiveClick] = useState(null);

  const FetchGetTopSong = async (page) => {
    await apiGetAllSongAvailablebyInstrument(
      `${page}`,
      "12",
      `${sort}`,
      "",
      `${InstrumentId}`
    ).then((response) => {
      if (response?.data?.data?.length === 0) {
        setHasMore(false);
        setIsLoadingSong(false);
        setTopSong([]);
      }
      if (response?.data?.data) {
        setTopSong([...topSong, ...response.data.data]);
        setIsLoadingSong(false);
        if (
          +response.data?.skip + +response.data?.limit >=
          +response.data?.counts
        ) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
        setIsLoadingSong(false);
        setTopSong([]);
      }
    });
  };
  const fetchMoreSong = () => {
    setPage(page + 1);
  };
  const FetchGetAllInstrument = async () => {
    await apiGetAllInstrument("", "", "name", "")
      .then((res) => {
        setInstrument(
          res.data.data.sort((a, b) => a.name.localeCompare(b.name))
        );
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    musicInstrumentPage.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    FetchGetAllInstrument();
  }, []);
  useEffect(() => {
    setInstrumentId(listFilterInstrument.map((item) => item.id).join(","));
    setHasMore(true);
  }, [listFilterInstrument]);
  useEffect(() => {
    FetchGetTopSong(1);
  }, [InstrumentId]);
  useEffect(() => {
    if (page !== 1) {
      FetchGetTopSong(page);
    }
  }, [page]);
  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) {
        setActiveClick(null);
        return;
      } else setActiveClick(name);
    },
    [activeClick]
  );
  const handleListFilterMood = useCallback(
    (item, type) => {
      if (type === "add") {
        if (
          listFilterInstrument
            .map((itemFilter) => itemFilter?.id)
            .includes(item?._id)
        ) {
          return;
        }

        setListFilterInstrument([
          ...listFilterInstrument,
          {
            name: item?.name,
            id: item?._id,
            slug: item?.slug,
          },
        ]);
        setIsLoadingSong(true);
        setTopSong([]);
      }
      if (type === "remove") {
        setListFilterInstrument(
          listFilterInstrument.filter(
            (itemFilter) => itemFilter?.id !== item?._id
          )
        );
        setIsLoadingSong(true);
        setTopSong([]);
      }
    },
    [listFilterInstrument]
  );
  return (
    <Fragment>
      <div
        onClick={() => {
          activeClick && setActiveClick(null);
        }}
        ref={musicInstrumentPage}
        id="content-page"
        className="content-page"
      >
        <SearchMoodGenreInstrument
          placeholder={"Tìm kiếm các ca khúc theo nhạc cụ... "}
          activeClick={activeClick}
          changeActiveFilter={changeActiveFilter}
          handleListFilterMood={handleListFilterMood}
        />

        <div className="container-fluid">
          <div className="row row-eq-height">
            <div className="col-md-3">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title font-weight-normal">Nhạc cụ</h4>
                  </div>
                </div>
                <div
                  style={
                    `${isLoading}` === "true"
                      ? { height: "50vh" }
                      : { height: "50vh", overflowY: "scroll" }
                  }
                  className="iq-card-body "
                >
                  {isLoading ? (
                    <div
                      style={{
                        position: "absolute",
                        top: "42%",
                        left: "40%",
                      }}
                    >
                      {" "}
                      <Loading />
                    </div>
                  ) : (
                    <Fragment>
                      <div
                        className=" 
                         mb-3 d-flex flex-direction-row justify-content-center align-items-center position-relative
                      "
                      >
                        <input
                          type="text"
                          className="form-control w-100 "
                          placeholder="Tìm kiếm nhạc cụ..."
                          aria-label="Search"
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              setQuery(e.target.value);
                            }
                          }}
                        ></input>
                        <div
                          className=" position-absolute bg-primary  h-100 d-flex justify-content-center align-items-center"
                          style={{
                            right: "0",
                            width: "3rem",
                            borderTopRightRadius: "0.25rem",
                            borderBottomRightRadius: "0.25rem",
                          }}
                        >
                          <i className="ri-search-line text-white"></i>
                        </div>
                      </div>

                      <ul className="m-0 p-0 job-classification ">
                        {instrument?.length > 0 &&
                          instrument
                            .filter((item) =>
                              item.name
                                .toLowerCase()
                                .includes(query.toLowerCase())
                            )
                            .map((item, index) => (
                              <li
                                className="d-flex btn font-size-16 btn-light justify-content-between"
                                key={index}
                              >
                                <div
                                  onClick={() => {
                                    //append new genre to listFilterGenre
                                    if (
                                      listFilterInstrument
                                        .map((itemFilter) => itemFilter.id)
                                        .includes(item._id)
                                    ) {
                                      return;
                                    }

                                    setListFilterInstrument([
                                      ...listFilterInstrument,
                                      {
                                        name: item.name,
                                        id: item._id,
                                        slug: item.slug,
                                      },
                                    ]);
                                    setIsLoadingSong(true);
                                    setTopSong([]);
                                    // setPage(1);
                                  }}
                                  className="schedule-text w-100 text-left"
                                >
                                  <span>{item.name}</span>
                                </div>
                                <div className="schedule-icon">
                                  <i
                                    onClick={() => {
                                      if (
                                        listFilterInstrument
                                          .map((itemFilter) => itemFilter.id)
                                          .includes(item._id)
                                      ) {
                                        return;
                                      }

                                      //append new genre to listFilterGenre
                                      setListFilterInstrument([
                                        ...listFilterInstrument,
                                        {
                                          name: item.name,
                                          id: item._id,
                                          slug: item.slug,
                                        },
                                      ]);
                                      setIsLoadingSong(true);
                                      setTopSong([]);
                                      // setPage(1);
                                    }}
                                    className="ri-add-circle-fill mr-2 text-primary font-size-20"
                                  />
                                  <i
                                    onClick={() => {
                                      setListFilterInstrument(
                                        listFilterInstrument.filter(
                                          (itemFilter) =>
                                            itemFilter.id !== item._id
                                        )
                                      );
                                      setIsLoadingSong(true);
                                      setTopSong([]);
                                      // setPage(1);
                                    }}
                                    className="ri-indeterminate-circle-fill mr-2 text-primary font-size-20"
                                  />
                                </div>
                              </li>
                            ))}
                      </ul>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title font-weight-normal">
                      Ca khúc theo nhạc cụ
                    </h4>
                  </div>
                  <div className="iq-card-header-toolbar d-flex align-items-center">
                    {listFilterInstrument?.length > 0 &&
                      listFilterInstrument.map((item, index) => (
                        <a
                          key={index}
                          onClick={() => {
                            setListFilterInstrument(
                              listFilterInstrument.filter(
                                (itemFilter) => itemFilter.id !== item.id
                              )
                            );
                            setIsLoadingSong(true);
                            setTopSong([]);
                            // setPage(1);
                          }}
                          className="btn btn-primary mr-2"
                        >
                          {item.name}
                          <i className="ri-close-line ml-2" />
                        </a>
                      ))}
                  </div>
                </div>
                <div
                  style={
                    `${isLoadingSong}` === "true"
                      ? { height: "50vh" }
                      : { height: "auto" }
                  }
                  className="iq-card-body"
                >
                  {isLoadingSong ? (
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
                    <InfiniteScroll
                      endMessage={
                        <p style={{ textAlign: "center" }}>
                          <b>Yay! That's all</b>
                        </p>
                      }
                      dataLength={topSong.length}
                      next={fetchMoreSong}
                      hasMore={hasMore}
                      loader={
                        hasMore && (
                          <p style={{ textAlign: "center" }}>
                            <Loading />
                          </p>
                        )
                      }
                    >
                      <ul className="list-unstyled iq-music-slide mb-0">
                        {topSong.length > 0 ? (
                          topSong.map((item, index) => {
                            return (
                              <Fragment key={index}>
                                <MusicPlayer song={item} />
                              </Fragment>
                            );
                          })
                        ) : (
                          <li className="mb-3">
                            <div className="d-flex justify-content-center align-items-center row position-relative">
                              <div
                                style={{
                                  paddingRight: "0px",
                                }}
                                className="media align-items-center "
                              >
                                <h5 className="mb-0 text-gray">
                                  No Song Found
                                </h5>
                              </div>
                            </div>
                          </li>
                        )}
                      </ul>
                    </InfiniteScroll>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Instrument;
