import React, { Fragment, useState, useEffect, useCallback } from "react";
import {
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { Loading } from "../../../components";
import moment from "moment";
import { apiGetAllSfxCategories,apiDeleteSfxCategory } from "../../../apis";
import Swal from "sweetalert2";
const ManageSfxCategory = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listSfxCategories,setListSfxCategories] = useState([]);
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
      pathname: "/admin/sfxcategory",
      search: createSearchParams({
        page: item,
        limit: limit,
        sort: sort,
        fields: fields,
      }).toString(),
    });
  };
  const FetchGetAllSfxCategory = async () => {
    await apiGetAllSfxCategories(currentPage, limit, sort, fields).then((res) => {
      if (res.data.data && res.data.data?.length > 0) {
    setListSfxCategories(res.data.data);
    setCounts(res.data.counts);
    setIsLoading(false);
      } else {
        setIsLoading(false);
        Swal.fire("Cảnh báo", "Không có thể loại hiệu ứng âm thanh nào", "warning");
      }
    })
    .catch((err) => {
      setIsLoading(false);
      Swal.fire("Error", "Có lỗi từ hệ thống", "error");
    } );
    
  };
  const handleEdit = useCallback((sid) => {
    navigate(`edit/${sid}`);
  }, []);
  const HandleAdd = useCallback(() => {
    navigate("/admin/sfxcategory/add");
  }, []);
  const handleDelete = useCallback((aid) => {
    setIsLoading(true);
    const FetchDeleteSfxCate = async () => {
      await apiDeleteSfxCategory(aid);
      if (listSfxCategories.length === 1) {
        let page = currentPage - 1;
        navigate({
          pathname: "/admin/sfxcategory",
          search: createSearchParams({
            page: page,
            limit: limit,
            sort: sort,
            fields: fields,
          }).toString(),
        });
      } else {
        FetchGetAllSfxCategory();
      }
    };

    FetchDeleteSfxCate();
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
  }, [counts, listSfxCategories, currentPage]);
  useEffect(() => {
    setIsLoading(true);
    FetchGetAllSfxCategory ();
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
                        <h4 className="card-title">Sound Effect Category</h4>
                      </div>
                      <div className="iq-card-header-toolbar d-flex align-items-center">
                        <a
                          
                          onClick={HandleAdd}
                          className="btn btn-primary"
                        >
                          Add New Sfx Category
                        </a>
                      </div>
                    </div>
                    <div  style={
                      `${isLoading}` === "true"
                        ? { height: "500px" }
                        : { height: "auto" }
                    } className="iq-card-body">
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
                              <th
                                style={{
                                  width: "200px",
                                }}
                              >
                                Video Thumb
                              </th>
                              <th>Category</th>
                              <th>Update At</th>
                              <th>Create At</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                      
                          <tbody>
                            {listSfxCategories &&
                              listSfxCategories.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <video
                                        style={{
                                          minHeight: "50px",
                                          height: "100%",
                                          objectFit: "contain",
                                        }}
                                        src={item?.video_thumnail}
                                        className="img-border-radius img-fluid w-100"
                                        alt="SFX"
                                        autoPlay
                                        loop
                                        muted
                                      />
                                    </td>
                                    <td>{item?.title}</td>

                                    <td>
                                      {moment(item?.updateAt).format(
                                        "DD/MM/YY"
                                      )}
                                    </td>
                                    <td>
                                      {moment(item?.createdAt).format(
                                        "DD/MM/YY"
                                      )}
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
                     
                      <div className={  `${isLoading}` === "true"
                        ? "d-none"
                        : "row justify-content-between mt-3"}>
                           {(listSfxCategories !== undefined ||  listSfxCategories !== null )
                     
                     && (
                      <Fragment>
                        <div id="user-list-page-info" className="col-md-6">
                          Showing 1 to {listSfxCategories.length} of {counts}{" "}
                          entries
                        </div>
                        <div className="col-md-6">
                          <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end mb-0">
                              {!isHideStart && (
                                <Fragment>
                                  <li type="end" className="page-item">
                                    <a
                                      
                                      onClick={() => {
                                        navigate(`/admin/sfxcategory?page=1`);
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
                                    <a  className="page-link">
                                      {item}
                                    </a>
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
                                          `/admin/sfxcategory?page=${Math.ceil(
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

export default ManageSfxCategory;
