import {
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { apiDeleteInstrument, apiGetAllInstrument } from "../../../apis";
import { Loading } from "../../../components";
import Swal from "sweetalert2";
import moment from "moment";
const ManageInstrument = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [instrument, setInstrument] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [counts, setCounts] = useState(0);
  const currentPage = params.get("page") || 1;
  const [arrPage, setArrPage] = useState([]);
  // eslint-disable-next-line
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [limit, setLimit] = useState(10);
  // eslint-disable-next-line
  const [sort, setSort] = useState("-createdAt");
  // eslint-disable-next-line
  const [fields, setFields] = useState("");
  const handleChangePage = (item) => {
    navigate({
      pathname: "/admin/instrument",
      search: createSearchParams({
        page: item,
        limit: limit,
        sort: sort,
        fields: fields,
      }).toString(),
    });
  };
  const FetchGetAllInstrument = async () => {
    await apiGetAllInstrument(currentPage, limit, sort, fields)
      .then((res) => {
        if (res.data.data && res.data.data?.length > 0) {
          setInstrument(res.data.data);
          setCounts(res.data.counts);
          setisLoading(false);
        } else {
          setisLoading(false);
          Swal.fire("Cảnh báo", "Không có instrument được thêm", "warning");
        }
      })
      .catch((err) => {
        setisLoading(false);
        Swal.fire("Error", "Có lỗi từ hệ thống", "error");
      });
  };
  const HandleAdd = useCallback(() => {
    navigate("add");
    // eslint-disable-next-line
  }, []);
  const handleDelete = useCallback((gid) => {
    setisLoading(true);
    const FetchDeleteInstrument = async () => {
      await apiDeleteInstrument(gid);
      if (instrument.length === 1) {
        let page = currentPage - 1;
        navigate({
          pathname: "/admin/instrument",
          search: createSearchParams({
            page: page,
            limit: limit,
            sort: sort,
            fields: fields,
          }).toString(),
        });
      } else {
        FetchGetAllInstrument();
      }
    };

    FetchDeleteInstrument();
  });
  const handleEdit = useCallback((mid) => {
    navigate(`edit/${mid}`);
    // eslint-disable-next-line
  }, []);
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
  }, [counts, instrument, currentPage]);
  useEffect(() => {
    setisLoading(true);
    FetchGetAllInstrument();
  }, [currentPage]);

  return (
    <Fragment>
      <div id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Instrument Lists</h4>
                  </div>
                  <div className="iq-card-header-toolbar d-flex align-items-center">
                    <a onClick={HandleAdd} className="btn btn-primary">
                      Add New Instrument
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
                      <div className="col-sm-12 col-md-6"></div>
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
                      id="user-list-table"
                      className=" table  table-striped table-bordered mt-4"
                      role="grid"
                      aria-describedby="user-list-page-info"
                    >
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Name</th>
                          <th>Update At</th>
                          <th>Create At</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                   
                        <tbody>
                          {instrument &&
                            instrument.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>

                                  <td>{item?.name}</td>

                                  <td>
                                    {moment(item?.updateAt).format("DD/MM/YY")}
                                  </td>
                                  <td>
                                    {moment(item?.createdAt).format("DD/MM/YY")}
                                  </td>

                                  <td>
                                    <div className="d-flex align-items-center list-user-action">
                                      <a
                                        className="iq-bg-primary"
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
                                        className="iq-bg-primary"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title=""
                                        data-original-title="Delete"
                                        onClick={() => {
                                          handleDelete(item._id);
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
                    {(instrument !== undefined || instrument !== null) && (
                      <Fragment>
                        <div id="user-list-page-info" className="col-md-6">
                          Showing 1 to {instrument.length} of {counts} entries
                        </div>
                        <div className="col-md-6">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end mb-0">
                              {!isHideStart && (
                                <Fragment>
                                  <li type="end" className="page-item">
                                    <a
                                      onClick={() => {
                                        navigate(`/admin/instrument?page=1`);
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
                                        navigate(
                                          `/admin/instrument?page=${Math.ceil(
                                            counts / limit
                                          )}`
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

export default ManageInstrument;
