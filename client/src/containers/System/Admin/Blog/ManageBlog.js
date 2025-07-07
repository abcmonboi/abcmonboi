import React, { useEffect, useState, Fragment, useCallback } from "react";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
  useLocation,
} from "react-router-dom";
import { apiGetAllBlog,apiDeleteBlog } from "apis";
import { Loading, Pagination, SearchInput } from "components";
import Swal from "sweetalert2";
import moment from "moment";
import { path } from "ultils/constant";
import useDebounce from "hooks/useDebounce";

const ManageBlog = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation();
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [editElm, setEditElm] = useState(null);
  const [counts, setCounts] = useState(0);
  const [skip, setSkip] = useState(0);
  const currentPage = params.get("page") || 1;
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [arrPage, setArrPage] = useState([]);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState("-createdAt");
  const [fields, setFields] = useState("");
  const [queries, setQueries] = useState({
    title: "",
  });
  // eslint-disable-next-line
  const fetchDataTable = async (searchParam) => {
    await apiGetAllBlog({ ...searchParam, limit: limit })
      .then((res) => {
        if (res.data.data && res.data.data?.length > 0) {
          setDataTable(res.data.data);
          setCounts(res.data.counts);
          setSkip(res.data.skip);
          setIsLoading(false);
        } else if (res.data.data?.length === 0) {
          setDataTable([]);
          setCounts(0);
          setSkip(0);
          // Swal.fire("Cảnh báo", `${res.data?.msg}`, "warning");
          setIsLoading(false);
        } else {
          Swal.fire("Cảnh báo", `${res.data?.msg}`, "warning");

          setIsLoading(false);
        }
      })
      .catch((err) => {
        Swal.fire("Error", "Có lỗi từ hệ thống", "error");
        setIsLoading(false);
      });
  };
  const handleChangePage = (item) => {
    if (queriesDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({
          title: queriesDebounce.trim(),
          page: item,
          sort: sort,
          fields: fields,
        }).toString(),
      });
    } else {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({
          page: item,
          sort: sort,
          fields: fields,
        }).toString(),
      });
    }
  };

  const queriesDebounce = useDebounce(queries?.title, 800);
  useEffect(() => {
    !isLoading && setIsLoading(true);
    if (queriesDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ title: queries?.title }).toString(),
      });
    } else {
      navigate({
        pathname: location.pathname,
      });
    }
  }, [queriesDebounce]);
  useEffect(() => {
    !isLoading && setIsLoading(true);
    const searchParams = Object.fromEntries([...params]);
    fetchDataTable(searchParams);
  }, [params, update]);

  useEffect(() => {
    let maxPage = Math.ceil(counts / limit);
    let end = +currentPage + 4 > maxPage ? maxPage : +currentPage + 4;
    let start = +currentPage - 1 <= 0 ? 1 : +currentPage - 1;
    let temp = [];
    for (let i = start; i <= end; i++) {
      temp.push(i);
    }
    setArrPage(temp);
    if (+currentPage >= maxPage - 2) {
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
  }, [counts, dataTable, currentPage]);

  const handleUpdate = (bid) => {
    navigate(`edit/${bid}`);
  };
  const HandleAddSong = useCallback(() => {
    navigate("add");
  }, []);
  const handleDelete = async (bid) => {
    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiDeleteBlog(bid)
          .then((res) => {
            Swal.fire("Success", `${res.data.mes}`, "success");
            setUpdate(!update);
          })
          .catch((err) => {
            Swal.fire("Error", `${err.response.data.mes}`, "error");
          });
      }
    });
  };
  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Manage Blog</h4>
                </div>
                <div className="iq-card-header-toolbar d-flex align-items-center">
                <a onClick={HandleAddSong} className="btn btn-primary">
                      Add New Blog
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
                  <SearchInput
                    nameKey={`title`}
                    value={queries?.title}
                    setValue={setQueries}
                    placeholder="Search blog title here..."
                    isHidelabel
                  />
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
                    <form>
                      <table
                        id="user-list-table"
                        className=" table  table-striped table-bordered mt-4"
                        role="grid"
                        aria-describedby="user-list-page-info"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th style={{ width: "5%" }}>Profile</th>

                            <th
                              style={{
                                width: "20%",
                              }}
                            >
                              Title
                            </th>
                            <th
                              style={{
                                width: "15%",
                              }}
                            >
                              Author Name
                            </th>
                            <th
                              style={{
                                width: "15%",
                              }}
                            >
                              Blog Category
                            </th>
                            <th> Status</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th
                              className="text-center"
                              style={{
                                width: "10%",
                              }}
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>
                        {dataTable !== undefined && dataTable.length > 0 ? (
                          <tbody>
                            {dataTable?.length > 0 &&
                              dataTable.map((item, index) => {
                                return (
                                  <tr key={item?._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <img
                                        src={item?.blog_thumbnail}
                                        className="img-fluid avatar-50 rounded"
                                        alt={"blog"+index}
                                      />
                                    </td>
                                    <td title={item.title}>{item?.title}</td>

                                    <td
                                      title={
                                        item?.author
                                          ? item?.author?.firstname +
                                            " " +
                                            item?.author?.lastname
                                          : "Unknown"
                                      }
                                    >
                                      {item?.author
                                        ? item?.author?.firstname +
                                          " " +
                                          item?.author?.lastname
                                        : "Unknown"}
                                    </td>
                                    <td
                                      title={item?.blogCategory?.map(
                                        (item, index, self) => {
                                          return (
                                            item?.title +
                                            (index === self.length - 1
                                              ? ""
                                              : ", ")
                                          );
                                        }
                                      )}
                                    >
                                      {item?.blogCategory?.map(
                                        (item, index, self) => {
                                          return (
                                            item?.title +
                                            (index === self.length - 1
                                              ? ""
                                              : ", ")
                                          );
                                        }
                                      )}
                                    </td>
                                    <td title="Status">
                                      {item?.status ? (
                                        <span className="badge badge-primary">
                                          Active
                                        </span>
                                      ) : (
                                        <span className="badge badge-danger">
                                          Disable
                                        </span>
                                      )}
                                    </td>

                                    <td title={item?.createdAt}>
                                      {moment(item?.createdAt).format(
                                        "DD/MM/YY"
                                      )}
                                    </td>
                                    <td title={item?.updateAt}>
                                      {moment(item?.updateAt).format(
                                        "DD/MM/YY"
                                      )}
                                    </td>

                                    <td>
                                      <div className="d-flex justify-content-center align-items-center list-user-action">
                                        <a
                                          className="bg-info mr-3"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Edit"
                                          data-original-title="Edit"
                                          onClick={() => {
                                            handleUpdate(item?._id);
                                          }}
                                        >
                                          <i className="ri-pencil-line"></i>
                                        </a>

                                        <a
                                          className="bg-danger"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Delete"
                                          data-original-title="Delete"
                                          onClick={() => {
                                            handleDelete(item?._id);
                                          }}
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
                                  {queries?.title !== "" ? (
                                    <p className="mb-0">
                                      Không có kết quả tìm kiếm với từ khóa
                                      <span className="font-weight-bold">
                                        {" "}
                                        {queries?.q}
                                      </span>
                                    </p>
                                  ) : (
                                    "Chưa thêm dữ liệu"
                                  )}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        )}
                      </table>
                      <Pagination
                        skip={skip}
                        isLoading={isLoading}
                        dataTable={dataTable}
                        counts={counts}
                        limit={limit}
                        isHideStart={isHideStart}
                        isHideEnd={isHideEnd}
                        currentPage={currentPage}
                        arrPage={arrPage}
                        handleChangePage={handleChangePage}
                      />
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBlog;
