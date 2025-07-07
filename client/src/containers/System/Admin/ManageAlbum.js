import React, { Fragment, useState, useEffect, useCallback } from "react";
import PostFilterForm from "../../../components/PostFilterForm";
import * as actions from "../../../store/actions/";
import { useDispatch, useSelector } from "react-redux";
import { Loading, Pagination, SearchInput } from "../../../components";
import {
  createSearchParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { apiGetAllAlbum, apiDeleteAlbum } from "../../../apis";
import Swal from "sweetalert2";
import moment from "moment";
import { path } from "../../../ultils/constant";
import useDebounce from "hooks/useDebounce";

const ManageAlbum = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listAlbum, setListAlbum] = useState([]);
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
  const [skip, setSkip] = useState(0);
  const [queries, setQueries] = useState({
    title: "",
  });
  const queriesDebounce = useDebounce(queries?.title, 500);
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
  const FetchGetAllAlbum = async (searchParam) => {
    // eslint-disable-next-line
    await apiGetAllAlbum({ ...searchParam, limit: limit })
      .then((res) => {
        if (res.data.data && res.data.data?.length > 0) {
          setListAlbum(res.data.data);
          setCounts(res.data.counts);
          setSkip(res.data.skip);
          setIsLoading(false);
        } else {
          setCounts(0);
          setListAlbum([]);
          // Swal.fire("Cảnh báo", `${res.data?.msg}`, "warning");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        Swal.fire("Error", "Có lỗi từ hệ thống", "error");
      });
  };
  const handleEdit = useCallback((sid) => {
    navigate(`edit/${sid}`);
    // eslint-disable-next-line
  }, []);
  const handleManage = useCallback((sid) => {
    navigate(`manage/${sid}`);
    // eslint-disable-next-line
  });
  const HandleAdd = useCallback(() => {
    navigate("/admin/album/add");
    // eslint-disable-next-line
  }, []);
  const handleDelete = useCallback((aid) => {
    setIsLoading(true);
    const FetchDeleteAlbum = async () => {
      await apiDeleteAlbum(aid);
      if (listAlbum.length === 1) {
        let page = currentPage - 1;
        navigate({
          pathname: "/admin/album",
          search: createSearchParams({
            page: page,
            limit: limit,
            sort: sort,
            fields: fields,
          }).toString(),
        });
      } else {
        FetchGetAllAlbum();
      }
    };
    FetchDeleteAlbum();

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
  }, [counts, listAlbum, currentPage]);
  useEffect(() => {
    !isLoading && setIsLoading(true);
    if (queriesDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ title: queriesDebounce }).toString(),
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
    FetchGetAllAlbum(searchParams);
  }, [params]);

  return (
    <Fragment>
      <div id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Albums Lists</h4>
                  </div>
                  <div className="iq-card-header-toolbar d-flex align-items-center">
                    <a onClick={HandleAdd} className="btn btn-primary">
                      Add New Album
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
                      nameKey={"title"}
                      value={queries?.title}
                      setValue={setQueries}
                      placeholder={"Search album by title"}
                      isHidelabel
                    />
                    <div className="row justify-content-between">
                      {/* <div className="col-sm-12 col-md-6">
                            <div
                              id="user_list_datatable_info"
                              className="dataTables_filter"
                            >
                              <PostFilterForm />
                            </div>
                          </div> */}
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
                        className=" table  table-striped table-bordered mt-4"
                        role="grid"
                        aria-describedby="user-list-page-info"
                      >
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Profile</th>
                            <th>Album Title</th>
                            <th>Genre</th>
                            <th>Artists</th>
                            <th>Update At</th>
                            <th>Create At</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {listAlbum !== undefined && listAlbum.length > 0 ? (
                          <tbody>
                            {listAlbum &&
                              listAlbum.map((item, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="text-center">
                                      <img
                                        className="rounded img-fluid avatar-40"
                                        src={
                                          item?.album_art
                                            ? item?.album_art
                                            : "https://via.placeholder.com/150"
                                        }
                                        alt="profile"
                                      />
                                    </td>
                                    <td>{item?.title}</td>
                                    <td>
                                      {item?.genres?.[0]
                                        ? item?.genres
                                            .map((item) => item.name)
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
                                      {item.isActive === true ? (
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
                                          title="Manage Album"
                                          data-original-title="Delete"
                                          onClick={() => {
                                            handleManage(item._id);
                                          }}
                                        >
                                          <i className="ri-folder-line"></i>
                                        </a>
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
                    )}
                  </div>
                  <Pagination
                    skip={skip}
                    isLoading={isLoading}
                    dataTable={listAlbum}
                    counts={counts}
                    limit={limit}
                    isHideStart={isHideStart}
                    isHideEnd={isHideEnd}
                    currentPage={currentPage}
                    arrPage={arrPage}
                    handleChangePage={handleChangePage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ManageAlbum;
