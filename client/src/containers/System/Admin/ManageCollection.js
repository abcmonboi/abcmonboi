import React, { Fragment, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { Loading } from "../../../components";
import moment from "moment";
import {
  apiDeleteCollection,
  apiGetAllMusicCollection,
  apiGetAllSfxCollection,
} from "../../../apis";
import Swal from "sweetalert2";
const ManageCollection = (collection) => {
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listCollections, setListCollections] = useState([]);
  const [counts, setCounts] = useState(0);
  // const { listMusicCollectionsHome, counts, listSfxCollectionsHome } = useSelector(
  //   (state) => state.collection
  // );
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
      pathname: `${
        collection.collection === "music"
          ? "/admin/musiccollection"
          : "/admin/sfxcollection"
      }`,
      search: createSearchParams({
        page: item,
        limit: limit,
        sort: sort,
        fields: fields,
      }).toString(),
    });
  };
  const handleEdit = (sid) => {
    if (collection.collection === "music")
      navigate(`/admin/musiccollection/edit/${sid}`);
    if (collection.collection === "sfx")
      navigate(`/admin/sfxcollection/edit/${sid}`);
    // eslint-disable-next-line
  };
  const HandleAdd = () => {
    collection.collection === "music"
      ? navigate("/admin/musiccollection/add")
      : navigate("/admin/sfxcollection/add");
    // eslint-disable-next-line
  };
  const FetchGetAllMusicCollection = async () => {
    // eslint-disable-next-line
    await apiGetAllMusicCollection(currentPage, limit, sort, fields)
      .then((res) => {
        if (res.data.data && res.data.data?.length > 0) {
          setListCollections(res.data.data);
          setCounts(res.data.counts);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setCounts(0);
          setListCollections([]);
          Swal.fire("Cảnh báo", `${res.data?.msg}`, "warning");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        Swal.fire("Cảnh báo", "Có lỗi từ hệ thống", "warning");
      });
  };
  const FetchGetAllSfxCollection = async () => {
    // eslint-disable-next-line
    apiGetAllSfxCollection(currentPage, limit, sort, fields)
      .then((res) => {
        if (res.data.data && res.data.data?.length > 0) {
          setListCollections(res.data.data);
          setCounts(res.data.counts);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setListCollections([]);
          setCounts(0);
          Swal.fire("Cảnh báo", `${res.data?.msg}`, "warning");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        Swal.fire("Cảnh báo", "Có lỗi từ hệ thống", "warning");
      });
  };
  const handleDelete = useCallback((aid) => {
    setIsLoading(true);
    const FetchDeleteCollection = async () => {
      await apiDeleteCollection(aid);
      if (listCollections.length === 1) {
        let page = currentPage - 1;
        collection.collection === "music" &&
          navigate({
            pathname: "/admin/musiccollection",
            search: createSearchParams({
              page: page,
              limit: limit,
              sort: sort,
              fields: fields,
            }).toString(),
          });
        collection.collection === "sfx" &&
          navigate({
            pathname: "/admin/sfxcollection",
            search: createSearchParams({
              page: page,
              limit: limit,
              sort: sort,
              fields: fields,
            }).toString(),
          });
      } else {
        collection.collection === "music" && FetchGetAllMusicCollection();
        collection.collection === "sfx" && FetchGetAllSfxCollection();
      }
    };
    FetchDeleteCollection();

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
  }, [counts, listCollections, currentPage]);
  useEffect(() => {
    setIsLoading(true);
    collection.collection === "music" && FetchGetAllMusicCollection();
    collection.collection === "sfx" && FetchGetAllSfxCollection();
    // eslint-disable-next-line
  }, [currentPage, collection]);
  

  return (
    <Fragment>
      <div id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">
                      {collection.collection === "sfx"
                        ? "SFX Collections"
                        : "Music Collections"}
                    </h4>
                  </div>
                  <div className="iq-card-header-toolbar d-flex align-items-center">
                    <a onClick={HandleAdd} className="btn btn-primary">
                      {collection.collection === "sfx"
                        ? "Add New SFX Collections"
                        : "Add New Music Collections"}
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
                        <div
                          id="user_list_datatable_info"
                          className="dataTables_filter"
                        >
                          {/* <PostFilterForm /> */}
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6">
                        {/* <div className="user-list-files d-flex float-right">
                              <a  className="iq-bg-primary"  >
                                 Print
                               </a>
                              <a  className="iq-bg-primary" >
                                 Excel
                               </a>
                               <a  className="iq-bg-primary" >
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
                            <th>Collection Thumbnail</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Update At</th>
                            <th>Create At</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {listCollections &&
                            listCollections.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    <img
                                      src={
                                        item?.thumbnail_collection
                                          ? item?.thumbnail_collection
                                          : ""
                                      }
                                      className="rounded img-fluid  avatar-100"
                                      alt={
                                        collection.collection === "sfx"
                                          ? "sfx Collection thumnail"
                                          : "Music Collection thumnail"
                                      }
                                    />
                                  </td>
                                  <td>{item?.title}</td>
                                  <td>{item?.description}</td>

                                  <td>
                                    {moment(item?.updateAt).format("DD/MM/YY")}
                                  </td>
                                  <td>
                                    {moment(item?.createdAt).format("DD/MM/YY")}
                                  </td>
                                  <td>
                                    {item?.status === true ? (
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
                                        onClick={() => handleEdit(item._id)}
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
                    {(listCollections !== undefined ||
                      listCollections !== null) && (
                      <Fragment>
                        <div id="user-list-page-info" className="col-md-6">
                          Showing 1 to {listCollections?.length} of {counts}{" "}
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
                                        collection.collection === "music"
                                          ? navigate(
                                              `/admin/musiccollection?page=1
                                          )}`
                                            )
                                          : navigate(
                                              `/admin/sfxcollection?page=1
                                            )}`
                                            );
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
                                        collection.collection === "music"
                                          ? navigate(
                                              `/admin/musiccollection?page=${Math.ceil(
                                                counts / limit
                                              )}`
                                            )
                                          : navigate(
                                              `/admin/sfxcollection?page=${Math.ceil(
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

export default ManageCollection;
