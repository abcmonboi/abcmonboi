import {
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { apiGetAllSubTheme, apiDeleteSubTheme } from "../../../apis";
import { Loading } from "../../../components";
import Swal from "sweetalert2";
import moment from "moment";

const ManageAllSubTheme = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [subThemes, setSubTheme] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [counts, setCounts] = useState(0);
  const currentPage = params.get("page") || 1;
  const [arrPage, setArrPage] = useState([]);
  // eslint-disable-next-line
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [limit, setLimit] = useState(12);
  // eslint-disable-next-line
  const [sort, setSort] = useState("-createdAt");
  // eslint-disable-next-line
  const [fields, setFields] = useState("");
  const handleChangePage = (item) => {
    navigate({
      pathname: "/admin/sub-theme",
      search: createSearchParams({
        page: item,
        limit: limit,
        sort: sort,
        fields: fields,
      }).toString(),
    });
  };
  const FetchGetAllTheme = async () => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    let queries = {};
    for (let i of param) {
      queries[i[0]] = i[1];
    }
    if(queries.limit === undefined){
      queries.limit = 12;
    }
    await apiGetAllSubTheme(queries)
      .then((res) => {
        if (res.data.data && res.data.data?.length > 0) {
          setSubTheme(res.data.data);
          setCounts(res.data.counts);
          setisLoading(false);
        } else {
          setisLoading(false);
          Swal.fire("Cảnh báo", "Không có videotheme được thêm", "warning");
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
  const handleDelete = useCallback((tid) => {
    setisLoading(true);
    const FetchDeleteMood = async () => {
      await apiDeleteSubTheme(tid);
      if (subThemes.length === 1) {
        let page = currentPage - 1;
        navigate({
          pathname: "/admin/sub-theme",
          search: createSearchParams({
            page: page,
            limit: limit,
            sort: sort,
            fields: fields,
          }).toString(),
        });
      } else {
        FetchGetAllTheme();
      }
    };

    FetchDeleteMood();
  });
  const handleEdit = useCallback((tid) => {
    navigate(`edit/${tid}`);
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
  }, [counts, subThemes, currentPage]);
  useEffect(() => {
    setisLoading(true);
    FetchGetAllTheme();
  }, [currentPage]);
  const handleManage = useCallback((tid) => {
    navigate(`/admin/theme/manage/${tid}`);
    // eslint-disable-next-line
  });
  return (
    <Fragment>
      <div id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">SubTheme Lists</h4>
                  </div>
                  <div className="iq-card-header-toolbar d-flex align-items-center">
                    <a onClick={HandleAdd} className="btn btn-primary">
                      Add New SubTheme
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
                            <th
                              style={{
                                width: "8%",
                              }}
                            >
                              Artwork
                            </th>
                            <th
                              style={{
                                width: "15%",
                              }}
                            >
                              Title
                            </th>
                            <th
                              style={{
                                width: "12%",
                              }}
                              className="bg-primary text-white"
                            >
                              Theme
                            </th>
                            <th>Description</th>
                            <th
                              style={{
                                width: "8%",
                              }}
                            >
                              Status
                            </th>

                            <th
                              style={{
                                width: "8%",
                              }}
                            >
                              Create At
                            </th>
                            <th
                              style={{
                                width: "10%",
                              }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {subThemes?.length > 0 &&
                            subThemes.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>

                                  <td>
                                    <img
                                      className="rounded img-fluid"
                                      src={item?.themesubArtwork}
                                      alt="themes"
                                    />
                                  </td>

                                  <td title={item?.title}>{item?.title}</td>
                                  <td
                                    className="bg-primary text-white font-weight-bold"
                                    title={item?.themes
                                      ?.map((el) => 
                                        el?.title
                                      )
                                      .join(",")}
                                  >
                                    {item?.themes
                                      ?.map((el,index) => {
                                        return (
                                          <span key={index}  onClick={() => {
                                            handleManage(el._id);
                                          }} className="home_footer_link">
                                            {el?.title}
                                          </span>
                                        );
                                      })
                                      }
                                  </td>
                                  <td title={item?.description}>
                                    {item?.description}
                                  </td>
                                  <td>
                                    {item?.status === true ? (
                                      <span className="badge iq-bg-primary">
                                        Active
                                      </span>
                                    ) : (
                                      <span className="badge iq-bg-danger">
                                        Inactive
                                      </span>
                                    )}
                                  </td>

                                  <td>
                                    {moment(item?.createdAt).format("DD/MM/YY")}
                                  </td>

                                  <td className="text-center">
                                    <a
                                      className="iq-bg-primary mr-4"
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
                    {(subThemes !== undefined || subThemes !== null) && (
                      <Fragment>
                        <div id="user-list-page-info" className="col-md-6">
                          Showing 1 to {subThemes.length} of {counts} entries
                        </div>
                        <div className="col-md-6">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end mb-0">
                              {!isHideStart && (
                                <Fragment>
                                  <li type="end" className="page-item">
                                    <a
                                      onClick={() => {
                                        navigate({
                                          pathname: "/admin/sub-theme",
                                          search: createSearchParams({
                                            page: 1,
                                          }).toString(),
                                        });
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
                                        navigate({
                                          pathname: "/admin/sub-theme",
                                          search: createSearchParams({
                                            page: Math.ceil(counts / limit),
                                          }).toString(),
                                        });
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

export default ManageAllSubTheme;
