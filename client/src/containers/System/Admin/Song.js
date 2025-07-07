import React, {
  useCallback,
  useState,
  useEffect,
  Fragment,
  useRef,
} from "react";
import {
  useNavigate,
} from "react-router-dom";
import { apiDeleteSong, apiFilterSearchSong } from "../../../apis";
import { Loading } from "../../../components";
import { useDispatch } from "react-redux";
import { apiGetAllSong } from "../../../apis";
import Swal from "sweetalert2";
import { FaCreativeCommons } from "react-icons/fa";
import useDebounce from "hooks/useDebounce";

export const Song = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const navigate = useNavigate();
  const [listSong, setListSong] = useState([]);
  const [counts, setCounts] = useState(0);
  const [arrPage, setArrPage] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  // eslint-disable-next-line
  const [limit, setLimit] = useState(10);
  // eslint-disable-next-line
  const [sort, setSort] = useState("-createdAt");
  const [search, setSearch] = useState("");

  // eslint-disable-next-line
  const [fields, setFields] = useState("");
  const listRef = useRef();
  const handleEdit = useCallback((sid) => {
    navigate(`edit/${sid}`);
    // eslint-disable-next-line
  }, []);

  const HandleAddSong = useCallback(() => {
    navigate("/admin/song/add");
    // eslint-disable-next-line
  }, []);
  const handleChangePage = (item) => {
    setCurrentPage(item);
  };
  useEffect(() => {
    let maxPage = Math.ceil(counts / limit);
    let end = +currentPage + 9 > maxPage ? maxPage : +currentPage + 9;
    let start = +currentPage - 1 <= 0 ? 1 : +currentPage - 1;
    let temp = [];
    for (let i = start; i <= end; i++) {
      temp.push(i);
    }
    setArrPage(temp);
    if (+currentPage >= maxPage - 9) {
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
        if (res.data.data && res.data.data?.length > 0) {
          setListSong(res.data.data);
          setCounts(res.data.counts);
          setisLoading(false);
        } else if (res.data.data?.length === 0) {
          setListSong([]);
          setCounts(0);
          // Swal.fire("Cảnh báo", `${res.data?.msg}`, "warning");
          setisLoading(false);
        } else {
          Swal.fire("Cảnh báo", `${res.data?.msg}`, "warning");

          setisLoading(false);
        }
      })
      .catch((err) => {
        Swal.fire("Error", "Có lỗi từ hệ thống", "error");
        setisLoading(false);
      });
  };
  const debouceSearch = useDebounce(search, 500);
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      let queries = {
        page: 1,
        limit: limit,
        sort: sort,
      };
      if (search !== "") {
        queries = {
          ...queries,
          title: search.trim(),
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
    };
    if (search !== "") {
      queries = {
        ...queries,
        title: search.trim(),
      };
    }

    FetchGetAllSong(queries);
    // listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    // eslint-disable-next-line
  }, [currentPage]);
  const handleDelete = useCallback((sid) => {
    setisLoading(true);
    const FetchDeleteSong = async () => {
      await apiDeleteSong(sid);
      if (listSong.length === 1) {
        let page = currentPage - 1;
        setCurrentPage(page);
        let queries = {
          page: page,
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
      } else {
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
      }
    };

    FetchDeleteSong();


    // eslint-disable-next-line
  });

  return (
    <Fragment>
      <div id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div ref={listRef} className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Song Lists</h4>
                  </div>
                  <div className="iq-card-header-toolbar d-flex align-items-center">
                    <a onClick={HandleAddSong} className="btn btn-primary">
                      Add New Song
                    </a>
                  </div>
                </div>
                <div
                  style={
                    `${isLoading}` === "true"
                      ? { height: "500px" }
                      : { height: "auto" }
                  }
                  className="iq-card-body"
                >
                  <div className="table-responsive">
                    <div className="row justify-content-between">
                      <div className="col-sm-12 col-md-6">
                        {/* <div
                          id="user_list_datatable_info"
                          className="dataTables_filter"
                        >
                          <PostFilterForm onSubmit={handleFilterChange} />
                        </div> */}
                        <div className="iq-search-bar w-100 mt-2 ">
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
                      </div>
                      {/* <div className="col-sm-12 col-md-6">
                            <div className="user-list-files d-flex float-right">
                              <a  className="iq-bg-primary">Print</a>
                              <a  className="iq-bg-primary">Excel</a>
                              <a  className="iq-bg-primary">Pdf</a>
                            </div>
                          </div> */}
                    </div>
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
                        className="data-tables table  table-striped table-bordered mt-4"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th style={{ width: "5%" }}>No</th>
                            <th style={{ width: "10%" }}>ISRC</th>
                            <th style={{ width: "15%" }}>License</th>
                            <th style={{ width: "5%" }}>Image</th>
                            <th style={{ width: "15%" }}>Song Name</th>
                            <th style={{ width: "15%" }}>Genre</th>
                            <th style={{ width: "10%" }}>Artist</th>
                            <th style={{ width: "10%" }}>Mood</th>
                            <th style={{}}>Album</th>
                            <th style={{ width: "5%" }}>Price</th>
                            <th>Status</th>
                            <th style={{ width: "10%" }}>Action</th>
                          </tr>
                        </thead>
                        {listSong !== undefined && listSong.length > 0 ? (
                          <tbody>
                            {listSong !== undefined &&
                              listSong.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item?.isrc}</td>

                                    <td>
                                    {item?.license?.title}
                                    </td>

                                    <td>
                                      <img
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          objectFit: "cover",
                                        }}
                                        src={item.thumbnail}
                                        className="img-fluid avatar-50 rounded"
                                        alt="artw"
                                      />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>
                                      {item?.genres.map((item, index, self) => {
                                        return ` ${
                                          item.name +
                                          (index === self.length - 1
                                            ? ""
                                            : ", ")
                                        }`;
                                      })}
                                    </td>

                                    <td>
                                      {item?.artists.map(
                                        (item, index, self) => {
                                          return ` ${
                                            item.name +
                                            (index === self.length - 1
                                              ? ""
                                              : ", ")
                                          }`;
                                        }
                                      )}{" "}
                                    </td>
                                    <td>
                                      {item?.moods.map((item, index, self) => {
                                        return ` ${
                                          item.name +
                                          (index === self.length - 1
                                            ? ""
                                            : ", ")
                                        }`;
                                      })}{" "}
                                    </td>
                                    <td>
                                      <p className="mb-0">
                                        {item?.album?.title}
                                      </p>
                                    </td>
                                    <td>{`${item?.price || ""}`}</td>
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
                                      <div className="d-flex align-items-center justify-content-center list-user-action">
                                        <a
                                          className="bg-primary mr-4"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title=""
                                          data-original-title="Edit"
                                          onClick={() => {
                                            handleEdit(item._id);
                                          }}
                                        >
                                          <i className="ri-pencil-line"></i>
                                        </a>
                                        <a
                                          onClick={() => {
                                            handleDelete(item._id);
                                          }}
                                          className="bg-primary"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title=""
                                          data-original-title="Delete"
                                        >
                                          <i className="ri-delete-bin-line"></i>
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        ) : (
                          <tbody>
                            <tr>
                              <td colSpan="12">
                                <div className="d-flex align-items-center justify-content-center">
                                  {search !== "" ? (
                                    <p className="mb-0">
                                      Không có kết quả tìm kiếm với từ khóa
                                      <span className="font-weight-bold">
                                        {" "}
                                        {search}
                                      </span>
                                    </p>
                                  ) : (
                                    "Không có dữ liệu"
                                  )}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        )}
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
                    {(listSong !== undefined || listSong !== null) && (
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
                                        setCurrentPage(
                                          Math.ceil(counts / limit)
                                        );
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
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
