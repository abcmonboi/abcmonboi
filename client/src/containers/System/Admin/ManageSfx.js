import React, { Fragment, useState, useEffect, useCallback } from "react";
import {
  createSearchParams,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { Loading,
  // PostFilterForm 
} from "components";
import moment from "moment";
import { apiDeleteSfx, apiGetAllSfx } from "apis";
import Swal from "sweetalert2";
const ManageSfx = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [counts, setCounts] = useState(0);
  const [listSfx, setListSfx] = useState([]);
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
      pathname: "/admin/sfx",
      search: createSearchParams({
        page: item,
        limit: limit,
        sort: sort,
        fields: fields,
      }).toString(),
    });
  };
  const handleEdit = useCallback((sid) => {
    navigate(`edit/${sid}`);
    // eslint-disable-next-line
  }, []);
  const HandleAdd = useCallback(() => {
    navigate("/admin/sfx/add");
    // eslint-disable-next-line
  }, []);
  const FetchGetAllSfx = async () => {
    // eslint-disable-next-line
     await apiGetAllSfx({
      page: currentPage,
      limit: limit,
      sort: sort,
      fields: fields,
    })
      .then((res) => {
        if (res.data.data && res.data.data?.length > 0) {
          setListSfx(res.data.data);
          setCounts(res.data.counts);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          Swal.fire("Cảnh báo", "Không có hiệu ứng nào được thêm", "warning");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        Swal.fire("Cảnh báo", "Không có hiệu ứng nào được thêm", "warning");
      });
  };
  const handleDelete = useCallback((aid) => {
    setIsLoading(true);
    const FetchDeleteSfx = async () => {
      await apiDeleteSfx(aid);
      if (listSfx.length === 1) {
        let page = currentPage - 1;
        navigate({
          pathname: "/admin/sfx",
          search: createSearchParams({
            page: page,
            limit: limit,
            sort: sort,
            fields: fields,
          }).toString(),
        });
      } else {
        FetchGetAllSfx();
      }
    
    };
    FetchDeleteSfx();
    // eslint-disable-next-line
  });
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
  }, [counts, listSfx, currentPage]);
  useEffect(() => {
    setIsLoading(true);
    FetchGetAllSfx();
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
                    <h4 className="card-title">Sound Effect Lists</h4>
                  </div>
                  <div className="iq-card-header-toolbar d-flex align-items-center">
                    <Link onClick={HandleAdd} className="btn btn-primary">
                      Add New Sfx
                    </Link>
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
                        <div
                          id="user_list_datatable_info"
                          className="dataTables_filter"
                        >
                          {/* <PostFilterForm /> */}
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6">
                        {/* <div className="user-list-files d-flex float-right">
                                  <a   className="iq-bg-primary"  >
                                     Print
                                   </a>
                                  <a   className="iq-bg-primary" >
                                     Excel
                                   </a>
                                   <a   className="iq-bg-primary" >
                                     Pdf
                                   </a>
                                 </div> */}
                      </div>
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
                      className="table table-striped table-bordered mt-4"
                      role="grid"
                      aria-describedby="user-list-page-info"
                    >
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Sound Effect Title</th>
                          <th>Sfx Category</th>
                          <th>Artists</th>
                          <th>Hashtag</th>
                          <th>Update At</th>
                          <th>Create At</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                   
                        <tbody>
                          {listSfx &&
                            listSfx.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>

                                  <td>{item?.title}</td>
                                  <td>
                                    {item?.sfxCategory?.[0]
                                      ? item?.sfxCategory
                                          .map((item) => item.title)
                                          .join(",")
                                      : "Chưa thêm"}
                                  </td>
                                  <td>
                                    {" "}
                                    {item?.artists?.[0]
                                      ? item?.artists
                                          .map((item) => item.name)
                                          .join(",")
                                      : "Chưa thêm"}
                                  </td>
                                  <td>
                                    {" "}
                                    {item?.hashtag?.[0]
                                      ? item?.hashtag
                                          .map((item) => item)
                                          .join(",")
                                      : "Chưa thêm"}
                                  </td>

                                  <td>
                                    {moment(item?.updateAt).format("DD/MM/YY")}
                                  </td>
                                  <td>
                                    {moment(item?.createdAt).format("DD/MM/YY")}
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
                                    <div className="d-flex align-items-center list-user-action">
                                      <Link
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
                                      </Link>
                                      <Link
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
                                      </Link>
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
                    {(listSfx !== undefined || listSfx !== null )
                      && (
                        <Fragment>
                          <div id="user-list-page-info" className="col-md-6">
                            Showing 1 to {listSfx.length} of {counts} entries
                          </div>
                          <div className="col-md-6">
                            <nav aria-label="Page navigation example">
                              <ul className="pagination justify-content-end mb-0">
                                {!isHideStart && (
                                  <Fragment>
                                    <li type="end" className="page-item">
                                      <Link to={`/admin/sfx?page=1`}
                                        // onClick={() => {
                                        //   navigate(`/admin/sfx?page=1`);
                                        // }}
                                        className="page-link"
                                      >{`<<<`}</Link>
                                    </li>
                                    <li className="page-item ">
                                      <Link
                                        className="page-link"
                                        tabIndex="-1"
                                        aria-disabled="true"
                                        onClick={() => {
                                          handleChangePage(+currentPage - 1);
                                        }}
                                      >
                                        Previous
                                      </Link>
                                    </li>
                                  </Fragment>
                                )}

                                {arrPage.map((item, index) => {
                                  return (
                                    <Link
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
                                      <Link className="page-link">{item}</Link>
                                    </Link>
                                  );
                                })}
                                {!isHideEnd && (
                                  <Fragment>
                                    <li className="page-item">
                                      <Link
                                        onClick={() => {
                                          handleChangePage(+currentPage + 1);
                                        }}
                                        className="page-link"
                                      >
                                        Next
                                      </Link>
                                    </li>
                                    <li type="end" className="page-item">
                                      <Link to={`/admin/sfx?page=${Math.ceil(
                                              counts / limit
                                            )}`}
                                        // onClick={() => {
                                        //   navigate(
                                        //     `/admin/sfx?page=${Math.ceil(
                                        //       counts / limit
                                        //     )}`
                                        //   );
                                        // }}
                                        className="page-link"
                                      >{`>>>`}</Link>
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

export default ManageSfx;
