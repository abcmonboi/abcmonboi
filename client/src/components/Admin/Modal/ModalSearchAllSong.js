import React, { useCallback, useState, useEffect, Fragment, memo } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { apiDeleteSong, apiUpdateSong } from "../../../apis";
import { Loading } from "../../../components";
import { apiFilterSearchSong } from "../../../apis";
import Swal from "sweetalert2";
import useDebounce from "hooks/useDebounce";

const ModalSearchAllSong = ({
  handleModal,
  aid,
  handleLoadingSong,
  handleLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const navigate = useNavigate();
  const [listSong, setListSong] = useState([]);
  const [counts, setCounts] = useState(0);
  const [arrPage, setArrPage] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [limit, setLimit] = useState(6);
  const [sort, setSort] = useState("-createdAt");
  const [fields, setFields] = useState("");
  const [search, setSearch] = useState("");

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

  const handleDelete = useCallback((sid) => {
    setisLoading(true);
    let queries = {
      page: currentPage,
      limit: limit,
      sort: sort,
    };
    if (search !== "") {
      queries = {
        ...queries,
        title: search,
      };
    }
    const FetchUpdateSong = async () => {
      await apiUpdateSong(sid, { album: null })
        .then((response) => {
          setisLoading(false);
          Swal.fire("Success", "Song has delete from album", "success");
        })
        .catch((err) => {
          Swal.fire("Error", "Có lỗi từ hệ thống", "error");
          setisLoading(false);
        });
      setisLoading(true);
      FetchGetAllSong(queries);
    };

    FetchUpdateSong();

    // eslint-disable-next-line
  });
  const HandleAddSong = useCallback((sid) => {
    setisLoading(true);
    let queries = {
      page: currentPage,
      limit: limit,
      sort: sort,
    };
    if (search !== "") {
      queries = {
        ...queries,
        title: search,
      };
    }
    const FetchUpdateSong = async () => {
      await apiUpdateSong(sid, { album: aid })
        .then((response) => {
          setisLoading(false);
          Swal.fire("Success", "Song has add to album", "success");
        })
        .catch((err) => {
          Swal.fire("Error", "Có lỗi từ hệ thống", "error");
          setisLoading(false);
        });
      setisLoading(true);
      FetchGetAllSong(queries);
    };

    FetchUpdateSong();
  });
  const debouceSearch = useDebounce(search, 500);
  useEffect(() => {
    setisLoading(true);
    let queries = {
      page: currentPage,
      limit: limit,
      sort: sort,
    };
    if (search !== "") {
      queries = {
        ...queries,
        title: search,
      };
    }
    FetchGetAllSong(queries);
  }, [currentPage, debouceSearch]);
  return (
    <div
      style={{
        zIndex: 9999,
        height: "90vh",
        width: "60vw",
      }}
      // id="exampleModalCenteredScrollable"
      // className="modal fade"
      // tabIndex={-1}
      // role="dialog"
      // aria-labelledby="exampleModalCenteredScrollableTitle"
      // style={{ display: "none" }}
      // aria-hidden="true"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title"
              id="exampleModalCenteredScrollableTitle"
            >
              Add Available Song To Album
            </h5>
            <button
              type="button"
              className="close"
              onClick={() => {
                handleModal(false);
                handleLoadingSong(true);
                handleLoading(true);
              }}
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="iq-search-bar w-100 mt-2 mb-4">
              <form className="searchbox w-100">
                <input
                  value={search ? search : ""}
                  type="text"
                  className="text search-input w-100"
                  placeholder="Search Song Title Here.."
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      currentPage !== 1 && setCurrentPage(1);
                      setSearch(e.target.value);
                    } else {
                      setSearch("");
                    }
                  }}
                />
                <div className="search-link">
                  <i className="ri-search-line text-black"></i>
                </div>
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearch("");
                
                  }}
                  className="search-audio"
                >
                  <i className="las la-times text-black"></i>
                </a>
              </form>
            </div>

            <div
              style={
                `${isLoading}` === "true"
                  ? { minHeight: "615px", minWidth: "650px" }
                  : { height: "auto" }
              }
              className="iq-card-body"
            >
              <div className="table-responsive">
                <div className="row justify-content-between"></div>
                {isLoading ? (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "46%",
                    }}
                  >
                    {" "}
                    <Loading />
                  </div>
                ) : (
                  <table
                    className="data-tables table  table-striped table-bordered "
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "5%" }}>No</th>
                        <th style={{ width: "5%" }}>Image</th>
                        <th style={{ width: "35%" }}> Name</th>
                        <th style={{ width: "25%" }}>Album</th>

                        <th style={{ width: "20%" }}>Artist</th>
                        <th>Status</th>
                        <th style={{}}>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {listSong !== undefined &&
                        listSong.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "cover",
                                  }}
                                  src={item.thumbnail}
                                  className="img-fluid avatar-50 rounded"
                                  alt="author"
                                />
                              </td>
                              <td data-toggle="tooltip" title={item?.title}>
                                {item?.title}
                              </td>

                              <td title={item?.album?.title}>
                                {item?.album?._id === aid ? (
                                  <p className="mb-0 text-primary font-weight-bold">
                                    {item?.album?.title}
                                  </p>
                                ) : (
                                  <p className="mb-0 text-danger font-weight-bold ">
                                    {item?.album?.title}
                                  </p>
                                )}
                              </td>
                              {/* css td for text just use 1 line */}
                              <td style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "200px",
                                 
                              }}>
                                {item?.artists.map((item, index, self) => {
                                  return ` ${
                                    item.name +
                                    (index === self.length - 1 ? "" : ", ")
                                  }`;
                                })}{" "}
                              </td>

                              <td>
                                {item.status === true ? (
                                  <span className="badge iq-bg-success">
                                    Active
                                  </span>
                                ) : (
                                  <span className="badge iq-bg-danger">
                                    InActive
                                  </span>
                                )}
                              </td>
                              <td>
                                <div className="d-flex align-items-center list-user-action justify-content-center">
                                  {item?.album?._id === aid ? (
                                    <a
                                      onClick={() => {
                                        handleDelete(item?._id);
                                      }}
                                      className="bg-primary"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Delete Song From Album"
                                      data-original-title="Delete"
                                    >
                                      <i className="ri-indeterminate-circle-line"></i>
                                    </a>
                                  ) : (
                                    <a
                                      onClick={() => {
                                        HandleAddSong(item._id);
                                      }}
                                      className="bg-danger"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Add Song To Album"
                                      data-original-title="Add"
                                    >
                                      <i className="ri-add-circle-line"></i>
                                    </a>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                )}
              </div>

              <div
                className={
                  `${isLoading}` === "true"
                    ? "d-none"
                    : "row justify-content-between mt-3"
                }
              >
                {listSong?.length > 0 ? (
                  <Fragment>
                    <div id="user-list-page-info" className="col-md-6">
                      <span>
                        Showing 1 to {listSong.length} of {counts} entries
                      </span>
                    </div>

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
                ) : (
                  <Fragment>
                    <div id="user-list-page-info" className="col-md-6">
                      <span>Không có bài hát nào</span>
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                handleModal(false);
                handleLoadingSong(true);
                handleLoading(true);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ModalSearchAllSong);
