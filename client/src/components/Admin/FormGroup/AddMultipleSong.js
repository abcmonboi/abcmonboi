import React, { memo, useState, useEffect, Fragment } from "react";
import { apiFilterSearchSong } from "apis";
import Swal from "sweetalert2";
import useDebounce from "hooks/useDebounce";
import { Loading } from "components";
const AddMultipleSong = ({ listSongID, handlePayloadSong }) => {
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
  ]);
  const [arrPage, setArrPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);

  const FetchGetAllSong = async (queries) => {
    // eslint-disable-next-line
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
    <div className="form-group">
      <label>
        <span className="text-danger  font-weight-bold">* </span> Songs:
      </label>

      <div
        className="p-4"
        style={
          `${isLoading}` === "true"
            ? {
                height: "659px",
                border: "1px solid #8f8f8f",
                borderRadius: "5px",
              }
            : {
                height: "auto",
                border: "1px solid #8f8f8f",
                borderRadius: "5px",
              }
        }
      >
        <div
          style={{
            overflowX: "hidden",
          }}
          className="table-responsive"
        >
          <div className="row justify-content-between">
            <div className="col-12">
              <div className="iq-card-header-toolbar ">
                {listSongID?.length > 0 &&
                  listSongID.map((item, index) => (
                    <a
                      key={index}
                      onClick={() => {
                        handlePayloadSong(item);
                      }}
                      className="btn btn-primary mr-2 mb-3 "
                    >
                      {item?.title}
                      <i className="ri-close-line ml-2" />
                    </a>
                  ))}
              </div>
            </div>
          </div>
          <div>
            <div className="iq-search-bar w-100 mt-2">
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
                        Artwork
                      </th>
                      <th style={{ width: "34%" }}>Song Name</th>
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
                                  (song) => song._id === item._id
                                ) ? (
                                  <a
                                    className="bg-danger"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Delete Song From Album"
                                    data-original-title="Delete"
                                    onClick={() => {
                                      handlePayloadSong(item);
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
                                    data-original-title="Edit"
                                    onClick={() => {
                                      handlePayloadSong(item);
                                    }}
                                  >
                                    <i className="ri-add-circle-line"></i>
                                  </a>
                                )}
                              </div>
                            </td>
                            <td className="text-center">
                              <img
                                style={{
                                  objectFit: "cover",
                                }}
                                src={item?.thumbnail}
                                className="img-fluid avatar-40 rounded"
                                alt="artw"
                              />
                            </td>
                            <td>{item?.title}</td>

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

        <div className="row justify-content-between mt-3 ">
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
    </div>
  );
};

export default memo(AddMultipleSong);
