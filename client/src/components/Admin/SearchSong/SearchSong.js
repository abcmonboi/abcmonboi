import React, { memo, useState, useEffect, Fragment } from "react";
import { apiFilterSearchSong, apiGetAllSfx } from "apis";
import Swal from "sweetalert2";
import useDebounce from "hooks/useDebounce";
import { Loading } from "components";
import * as actions from "store/actions";
import { useDispatch, useSelector } from "react-redux";
const SearchSong = ({ setList, listSongID, handlePayloadSong, type }) => {
  const dispatch = useDispatch();
  const { currentSongID, isPlaying } = useSelector((state) => state.music);
  const [listSong, setListSong] = useState([]);
  const [counts, setCounts] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(8);
  const [sort, setSort] = useState("-createdAt");
  const [fields, setFields] = useState([
    "title",
    "status",
    "thumbnail",
    "createdAt",
    "updatedAt",
    "streaming",
  ]);
  const [arrPage, setArrPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);

  const handlePlayMusic = (song) => {
    if (song?.streaming !== undefined) {
      if (isPlaying && currentSongID === song._id) {
        dispatch(actions.setIsPlaying(false));
      } else {
        dispatch(actions.playAlbum(false));
        dispatch(actions.setCurrentSongId(song._id));
        dispatch(actions.setIsPlaying(true));
      }
    }
  };
  const FetchGetAllSong = async (queries) => {
    // eslint-disable-next-line
    if (type === "sfx") {
      await apiGetAllSfx(queries)
        .then((res) => {
          if (res.data.data) {
            setListSong(res.data.data);
            setCounts(res.data.counts);
            setisLoading(false);
          }
        })
        .catch((err) => {
          Swal.fire("Error", "Có lỗi từ hệ thống", "error");
          setisLoading(false);
        });
    } else {
      await apiFilterSearchSong(queries)
        .then((res) => {
          if (res.data.data) {
            setListSong(res.data.data);
            setCounts(res.data.counts);
            setisLoading(false);
          }
        })
        .catch((err) => {
          Swal.fire("Error", "Có lỗi từ hệ thống", "error");
          setisLoading(false);
        });
    }
  };
  const handleChangePage = (item) => {
    setCurrentPage(item);
  };
  useEffect(() => {
    let maxPage = Math.ceil(counts / limit);
    let end = +currentPage + 1 > maxPage ? maxPage : +currentPage + 1;
    let start = +currentPage - 1 <= 0 ? 1 : +currentPage - 1;
    let temp = [];
    for (let i = start; i <= end; i++) {
      temp.push(i);
    }
    setArrPage(temp);
    if (+currentPage >= maxPage - 1) {
      setIsHideEnd(true);
    } else {
      setIsHideEnd(false);
    }
    if (+currentPage <= 2) {
      setIsHideStart(true);
    } else {
      setIsHideStart(false);
    }
    // eslint-disable-next-line
  }, [counts, listSong, currentPage]);
  const debouceSearch = useDebounce(search, 300);
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      let queries = {
        page: 1,
        limit: limit,
        sort: sort,
        fields: fields?.join(","),
        status: true,
      };
      if (search !== "") {
        queries = {
          ...queries,
          title: search,
        };
        FetchGetAllSong(queries);
      }
    }
    // eslint-disable-next-line
  }, [debouceSearch]);
  useEffect(() => {
    setisLoading(true);
    let queries = {
      page: currentPage,
      limit: limit,
      sort: sort,
      fields: fields?.join(","),
      status: true,
    };
    if (search !== "") {
      queries = {
        ...queries,
        title: search,
      };
    }

    FetchGetAllSong(queries);

    // eslint-disable-next-line
  }, [currentPage]);
  return (
    <div>
      <div
        style={{
          overflowX: "hidden",
        }}
        className="table-responsive"
      >
        <div>
          <div className="iq-search-bar w-100 mt-1">
            <div className="searchbox w-100">
              <input
                value={search ? search : ""}
                type="text"
                className="text search-input w-100"
                placeholder="Search Song Title Here.."
                onChange={(e) => {
                  setisLoading(true);

                  if (e.target.value !== "") {
                    setSearch(e.target.value);
                  } else {
                    setSearch("");
                    if (currentPage !== 1) {
                      setCurrentPage(1);
                    } else {
                      let queries = {
                        page: 1,
                        limit: limit,
                        sort: sort,
                        fields: fields?.join(","),
                      };

                      FetchGetAllSong(queries);
                    }
                  }
                }}
              />
              <div className="search-link">
                <i className="ri-search-line text-black"></i>
              </div>
              <a
                style={{
                  pointerEvents: search ? "auto" : "none",
                }}
                onClick={(e) => {
                  setSearch("");

                  if (currentPage !== 1) {
                    setCurrentPage(1);
                  } else {
                    setisLoading(true);

                    let queries = {
                      page: 1,
                      limit: limit,
                      sort: sort,
                      fields: fields?.join(","),
                    };

                    FetchGetAllSong(queries);
                  }
                }}
                className="search-audio"
              >
                <i className="las la-times text-black"></i>
              </a>
            </div>
          </div>

          <div
            style={
              `${isLoading}` === "true"
                ? { height: "500px" }
                : { height: "auto", minHeight: "500px" }
            }
            className="p-4 position-relative"
          >
            {isLoading ? (
              <div
                style={{
                  position: "absolute",
                  bottom: "40%",
                  left: "44%",
                }}
              >
                {" "}
                <Loading />
              </div>
            ) : (
              <table
                className="data-tables table  table-striped  table-sm table-borderless"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: "8%" }}>
                      Action
                    </th>
                    <th className="text-center" style={{ width: "8%" }}>
                    </th>
                    <th style={{ width: "34%" }}>Title</th>
                    <th style={{ width: "30%" }}>Artist</th>
                  </tr>
                </thead>

                <tbody>
                  {listSong !== undefined &&
                    listSong.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center justify-content-center list-user-action">
                              {listSongID?.find(
                                (song) => song.id === item._id
                              ) ? (
                                <a
                                  className="bg-danger"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Delete Song From Album"
                                  data-original-title="Delete"
                                  onClick={() => {
                                    setList((listSongID) => {
                                      const newList = listSongID.filter(
                                        (song) => song.id !== item._id
                                      );
                                      return newList;
                                    });
                                  }}
                                >
                                  <i className="ri-indeterminate-circle-line"></i>
                                </a>
                              ) : (
                                <a
                                  className="bg-primary"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Add"
                                  onClick={() => {
                                    setList((listSongID) => [
                                      ...listSongID,
                                      {
                                        id: item._id,
                                        title: item.title,
                                        thumbnail: item.thumbnail,
                                        album: item.album,
                                        artists: item.artists,
                                        streaming: item.streaming,
                                      },
                                    ]);
                                  }}
                                >
                                  <i className="ri-add-circle-line"></i>
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="text-center position-relative">
                            <div
                              style={item && { maxHeight: "60px" }}
                              className="iq-thumb-hotsong"
                            >
                              <div
                                style={{ cursor: "pointer" }}
                                className="iq-music-overlay"
                              ></div>
                              <small>
                                {type !== "sfx" ? (
                                  <img
                                    style={{
                                      objectFit: "cover",
                                      minHeight: "60px",
                                      minWidth: "60px",
                                    }}
                                    src={
                                      item?.thumbnail
                                        ? item.thumbnail
                                        : item.album?.album_art
                                    }
                                    className="img-border-radius avatar-60 img-fluid"
                                    alt=""
                                  />
                                ) : (
                                  <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                      width: "60px",
                                      height: "60px",
                                    }}
                                  >
                                    <i className="ri-surround-sound-line sfx-player-icon"></i>
                                  </div>
                                )}
                              </small>
                              <div
                                onClick={() => {
                                  handlePlayMusic(item);
                                }}
                                className="overlay-music-icon"
                              >
                                <a
                                  className="d-flex align-items-center justify-content-center"
                                  style={{
                                    fontSize: "35px",
                                  }}
                                >
                                  <i
                                    className="las la-play-circle bg-primary rounded-circle 
                           "
                                  ></i>
                                </a>
                              </div>
                            </div>
                            {/* <img
                            
                              style={{
                                objectFit: "cover",
                              }}
                              src={item?.thumbnail}
                              className="img-fluid avatar-50 rounded"
                              alt="artw"
                            />
                            <div
                              onClick={(e) => {
                                handlePlayMusic(item);
                              }} className="overlay-music-icon ">
                              <a>
                                <i className="las la-play-circle bg-primary rounded-circle font-size-24"></i>
                              </a>
                            </div> */}
                          </td>
                          <td
                            style={{
                              minHeight: "2.5rem",
                            }}
                            className="description-infor-2-line"
                          >
                            {item?.title}
                          </td>

                          <td>
                            {item?.artists.map((item, index, self) => {
                              return ` ${
                                item.name +
                                (index === self.length - 1 ? "" : ", ")
                              }`;
                            })}{" "}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <div className="row justify-content-between  ">
        {(listSong !== undefined || listSong !== null) && (
          <Fragment>
            <div id="user-list-page-info" className="col-md-6"></div>

            <div className="col-md-6">
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end mb-0">
                  {!isHideStart && (
                    <Fragment>
                      <li type="end" className="page-item">
                        <a
                          onClick={() => {
                            setCurrentPage(1);
                          }}
                          className="page-link"
                        >{`<<<`}</a>
                      </li>
                      <li className="page-item ">
                        <a
                          className="page-link"
                          tabIndex="-1"
                          aria-disabled="true"
                          onClick={() => {
                            handleChangePage(+currentPage - 1);
                          }}
                        >
                          Previous
                        </a>
                      </li>
                    </Fragment>
                  )}

                  {arrPage !== undefined &&
                    arrPage.map((item, index) => {
                      return (
                        <li
                          onClick={() => {
                            handleChangePage(item);
                          }}
                          key={index}
                          className={
                            +currentPage === +item
                              ? "page-item active"
                              : "page-item"
                          }
                        >
                          <a className="page-link">{item}</a>
                        </li>
                      );
                    })}
                  {!isHideEnd && (
                    <Fragment>
                      <li className="page-item">
                        <a
                          onClick={() => {
                            handleChangePage(+currentPage + 1);
                          }}
                          className="page-link"
                        >
                          Next
                        </a>
                      </li>
                      <li type="end" className="page-item">
                        <a
                          onClick={() => {
                            setCurrentPage(Math.ceil(counts / limit));
                          }}
                          className="page-link"
                        >{`>>>`}</a>
                      </li>
                    </Fragment>
                  )}
                </ul>
              </nav>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default memo(SearchSong);
