import React, { useEffect, useState, Fragment, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetAllLicense,apiDeleteLicense } from "apis";
import {
  Loading,
  SearchInput,
} from "components";
import Swal from "sweetalert2";
import moment from "moment";
import { path } from "ultils/constant";
import useDebounce from "hooks/useDebounce";
import DOMPurify from "dompurify";


const ManageLicense = () => {
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [editElm, setEditElm] = useState(null);
  const [counts, setCounts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [arrPage, setArrPage] = useState([]);
  const [limit, setLimit] = useState(5);
  const [sort, setSort] = useState("title");
  const [queries, setQueries] = useState({
    q: "",
  });
  // eslint-disable-next-line
  const fetchDataTable = async (params) => {
    await apiGetAllLicense(params)
      .then((res) => {
        if (res.data.data && res.data.data?.length > 0) {
          setDataTable(res.data.data);
          setCounts(res.data.counts);
          setIsLoading(false);
        } else if (res.data.data?.length === 0) {
          setDataTable([]);
          setCounts(0);
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
    if (+currentPage > maxPage - 1) {
      setIsHideEnd(true);
    } else {
      setIsHideEnd(false);
    }
    if (+currentPage < 2) {
      setIsHideStart(true);
    } else {
      setIsHideStart(false);
    }
    // eslint-disable-next-line
  }, [counts, dataTable, currentPage]);
  const queriesDebounce = useDebounce(queries?.q, 300);

  useEffect(() => {
    setIsLoading(true);
    let query = {
      page: currentPage,
      limit: limit,
      sort: sort,
    };
    if (queriesDebounce !== "") {
      query.page = 1;
      query = {
        ...query,
        title: queries?.q.trim(), 
      };
    }

    fetchDataTable(query);
  }, [currentPage, update,queriesDebounce]);
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const handleUpdate = (lid) => {
    navigate(`edit/${lid}`);

  };
  const handleDelete = async (uid) => {
    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await apiDeleteLicense(uid)
          .then((res) => {
            render();
            Swal.fire("Success", `${res.data.mes}`, "success");
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
                <h4 className="card-title">Manage License</h4>
              </div>
              <div className="iq-card-header-toolbar d-flex align-items-center">
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
                  nameKey={`q`}
                  value={queries?.q}
                  setValue={setQueries}
                  placeholder="Search title here..."
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
                  <form >
                   
                    <table
                      id="user-list-table"
                      className=" table  table-striped table-bordered mt-4"
                      role="grid"
                      aria-describedby="user-list-page-info"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th style={{
                            width: "20%"
                          }}>License</th>
                          <th style={{
                            width: "50%"
                          }}>Description</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      {dataTable !== undefined && dataTable.length > 0 ? (
                        <tbody>
                          {dataTable?.length > 0 &&
                            dataTable.map((item, index) => {
                              return (
                                <tr key={item?._id}>
                                  <td>{index + 1}</td>
                                  <td title={item.title}>
                                 {item?.title}
                                  </td>

                                  <td className="mb-0 description-infor-3-line"
                                   dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(item?.description),
                            }} >
                                  
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
                                    <div className="d-flex align-items-center list-user-action">
                                    
                                        <a
                                          className="iq-bg-danger"
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
                                        className="iq-bg-danger"
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
                                {queries?.q !== "" ? (
                                  <p className="mb-0">
                                    Không có kết quả tìm kiếm với từ khóa
                                    <span className="font-weight-bold">
                                      {" "}
                                      {queries?.q}
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
                  </form>
                )}
              </div>
              <div
                className={
                  `${isLoading}` === "true"
                    ? "d-none"
                    : "row justify-content-between mt-3"
                }
              >
                {(dataTable !== undefined || dataTable !== null) && (
                  <Fragment>
                    <div id="user-list-page-info" className="col-md-6">
                      Showing 1 to {dataTable.length} of {counts} entries
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

                          {arrPage.map((item, index) => {
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
  )
}

export default ManageLicense