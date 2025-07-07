import React, {
  Fragment,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { Outlet } from "react-router-dom";
import { SearchMoodGenreInstrument } from "components";
import { Loading } from "../../../components";
import InfiniteScroll from "react-infinite-scroll-component";
import {MusicPlayer} from "components";
import { apiGetAllMoodByTitle, apiGetAllMood, apiGetAllSongAvailablebyMood } from "apis";

const MoodMusic = () => {
  const [mood, setMood] = useState([]);
  const [query, setQuery] = useState("");
  const [topSong, setTopSong] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSong, setIsLoadingSong] = useState(true);
  const musicMoodPage = useRef(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("-createdAt");
  const [moodId, setMoodId] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [listFilterMood, setListFilterMood] = useState([]);
  const [activeClick, setActiveClick] = useState(null);

  const FetchGetTopSong = async (page) => {
    await apiGetAllSongAvailablebyMood(
      `${page}`,
      "12",
      `${sort}`,
      "",
      `${moodId}`
    ).then((response) => {
      setIsLoadingSong(false);
      if (response?.data?.data?.length === 0) {
        setHasMore(false);
        setTopSong([]);
      }
      if (response?.data) {
        setTopSong([...topSong, ...response.data.data]);
        if (
          +response.data?.skip + +response.data?.limit >=
          +response.data?.counts
        ) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
        setTopSong([]);
      }
    });
  };
  const fetchMoreSong = () => {
    setPage(page + 1);
  };
  const FetchGetAllMood = async () => {
    await apiGetAllMood("", "", "name", "")
      .then((res) => {
        setMood(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    musicMoodPage.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    FetchGetAllMood();
  }, []);
  useEffect(() => {
    setMoodId(listFilterMood.map((item) => item.id).join(","));
    setHasMore(true);
  }, [listFilterMood]);
  useEffect(() => {
    if (page !== 1) {
      FetchGetTopSong(page);
    }
  }, [page]);
  useEffect(() => {
    FetchGetTopSong(1);
  }, [moodId]);
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
    (item,type) => {
      if(type === "add"){
        if (
          listFilterMood
            .map((itemFilter) => itemFilter?.id)
            .includes(item?._id)
        ) {
          return;
        }

        setListFilterMood([
          ...listFilterMood,
          {
            name: item?.name,
            id: item?._id,
            slug: item?.slug,
          },
        ]);
        setIsLoadingSong(true);
        setTopSong([]);
      }
      if(type === "remove"){
        setListFilterMood(
          listFilterMood.filter(
            (itemFilter) =>
              itemFilter?.id !== item?._id
          )
        );
        setIsLoadingSong(true);
        setTopSong([]);
      }
    
    },
    [listFilterMood]
  );
  return (
    <Fragment>
      <div
        onClick={() => {
          activeClick && setActiveClick(null);
        }}
        ref={musicMoodPage}
        id="content-page"
        className="content-page"
      >
        <SearchMoodGenreInstrument
          placeholder={"Tìm kiếm các ca khúc theo tâm trạng... "}
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
                    <h4 className="card-title font-weight-normal">Tâm trạng</h4>
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
                          placeholder="Tìm kiếm tâm trạng"
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
                        {mood?.length > 0 &&
                          mood
                            .filter((item) => {
                              if (query === "") {
                                return item;
                              } else if (
                                item.name
                                  .toLowerCase()
                                  .includes(query.toLowerCase())
                              ) {
                                return item;
                              }
                            })
                            .map((item, index) => (
                              <li
                                className="d-flex btn font-size-16 btn-light justify-content-between"
                                key={index}
                              >
                                <div
                                  onClick={() => {
                                    //append new mood to listFilterMood
                                    if (
                                      listFilterMood
                                        .map((itemFilter) => itemFilter.id)
                                        .includes(item._id)
                                    ) {
                                      return;
                                    }

                                    setListFilterMood([
                                      ...listFilterMood,
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
                                        listFilterMood
                                          .map((itemFilter) => itemFilter.id)
                                          .includes(item._id)
                                      ) {
                                        return;
                                      }

                                      //append new mood to listFilterMood
                                      setListFilterMood([
                                        ...listFilterMood,
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
                                      setListFilterMood(
                                        listFilterMood.filter(
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
                    <h4 className="card-title font-weight-normal">Âm nhạc theo tâm trạng</h4>
                  </div>
                  <div className="iq-card-header-toolbar d-flex align-items-center">
                    {listFilterMood?.length > 0 &&
                      listFilterMood.map((item, index) => (
                        <a
                          key={index}
                          onClick={() => {
                            setListFilterMood(
                              listFilterMood.filter(
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

export default MoodMusic;
