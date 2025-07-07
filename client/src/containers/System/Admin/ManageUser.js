import React, { useEffect, useState, Fragment, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { apiGetUsers, apiUpdateUserbyAdmin, apiDeleteUserbyAdmin } from "apis";
import {
  Loading,
  SearchInput,
  InputHookForm,
  SelectHookForm,
} from "components";
import Swal from "sweetalert2";
import moment from "moment";
import { path, roles, blockStatus } from "ultils/constant";
import useDebounce from "hooks/useDebounce";
import { useForm } from "react-hook-form";
const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [editElm, setEditElm] = useState(null);
  const [counts, setCounts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [arrPage, setArrPage] = useState([]);
  const [limit, setLimit] = useState(5);
  const [queries, setQueries] = useState({
    q: "",
  });
  // eslint-disable-next-line
  const fetchUsers = async (params) => {
    await apiGetUsers(params)
      .then((res) => {
        if (res.data.data && res.data.data?.length > 0) {
          setUsers(res.data.data);
          setCounts(res.data.counts);
          setIsLoading(false);
        } else if (res.data.data?.length === 0) {
          setUsers([]);
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
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    email: "",
    firstname: "",
    lastname: "",
    mobile: "",
    role: "",
    isBlocked: "",
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
  }, [counts, users, currentPage]);
  const queriesDebounce = useDebounce(queries?.q, 300);

  useEffect(() => {
    setIsLoading(true);
    let query = {
      page: currentPage,
      limit: limit,
    };
    if (queriesDebounce !== "") {
      query.page = 1;
      query = {
        ...query,
        q: queries?.q.trim(), 
      };
    }

    fetchUsers(query);
  }, [currentPage, update,queriesDebounce]);
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const handleUpdate = async (data) => {
    const response = await apiUpdateUserbyAdmin(data, editElm?._id)
      .then((res) => {
        setEditElm(null);
        render();
        Swal.fire("Success", "Cập nhật thành công", "success");
      })
      .catch((err) => {
        if (err.response.data.mes.includes("E11000")) {
          Swal.fire("Error", `Mobile hoặc email đã tồn tại`, "error");
        } else {
          Swal.fire("Error", `${err.response.data.mes}`, "error");
        }
      });
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
        await apiDeleteUserbyAdmin(uid)
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
    <Fragment>
      <div id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Manage User</h4>
                  </div>
                  <div className="iq-card-header-toolbar d-flex align-items-center">
                    {/* {editElm && (
                     <a  className="btn btn-primary">
                     Update
                   </a>
                   )    } */}
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
                      placeholder="Search name or email here..."
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
                      <form onSubmit={handleSubmit(handleUpdate)}>
                        {editElm && (
                          <button
                            className="btn btn-danger ml-4 mt-4"
                            type="submit"
                          >
                            Update
                          </button>
                        )}
                        <table
                          id="user-list-table"
                          className=" table  table-striped table-bordered mt-4"
                          role="grid"
                          aria-describedby="user-list-page-info"
                        >
                          <thead>
                            <tr>
                              <th>#</th>
                              <th className="text-center">Avatar</th>
                              <th>Email address</th>
                              <th>FirstName</th>
                              <th>LastName</th>
                              <th className="text-center">Role</th>
                              <th>Phone</th>
                              <th>Status</th>
                              <th>Created At</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          {users !== undefined && users.length > 0 ? (
                            <tbody>
                              {users?.length > 0 &&
                                users.map((item, index) => {
                                  return (
                                    <tr key={item?._id}>
                                      <td>{index + 1}</td>
                                      <td>
                                        <img
                                          className="rounded img-fluid avatar-40"
                                          src={item?.avatar}
                                          alt="avatar"
                                        />
                                      </td>

                                      <td title={item?.email}>
                                        {editElm?._id === item?._id ? (
                                          <InputHookForm
                                            register={register}
                                            errors={errors}
                                            fullWidth
                                            id={`email`}
                                            placeholder={`Email`}
                                            validate={{
                                              required: `Required`,
                                              pattern: {
                                                value:
                                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Wrong format",
                                              },
                                            }}
                                            defaultValue={editElm?.email}
                                          />
                                        ) : (
                                          <span>{item?.email}</span>
                                        )}
                                      </td>
                                      <td title={item?.firstname}>
                                        {editElm?._id === item?._id ? (
                                          <InputHookForm
                                            register={register}
                                            errors={errors}
                                            fullWidth
                                            placeholder={`FirstName`}
                                            id={`firstname`}
                                            validate={{
                                              required: `Required`,
                                            }}
                                            defaultValue={editElm?.firstname}
                                          />
                                        ) : (
                                          <span>{item?.firstname}</span>
                                        )}
                                      </td>
                                      <td title={item?.lastname}>
                                        {editElm?._id === item?._id ? (
                                          <InputHookForm
                                            register={register}
                                            errors={errors}
                                            fullWidth
                                            id={`lastname`}
                                            placeholder={`LastName`}
                                            validate={{
                                              required: `Required`,
                                            }}
                                            defaultValue={editElm?.lastname}
                                          />
                                        ) : (
                                          <span>{item?.lastname}</span>
                                        )}
                                      </td>
                                      <td className="text-center">
                                        {editElm?._id === item?._id ? (
                                          <SelectHookForm
                                            register={register}
                                            errors={errors}
                                            defaultValue={item?.role}
                                            id={`role`}
                                            validate={{ required: "Required" }}
                                            options={roles}
                                          />
                                        ) : (
                                          <span>
                                            {
                                              roles.find(
                                                (role) =>
                                                  +role.code === +item?.role
                                              )?.value
                                            }
                                          </span>
                                        )}
                                      </td>
                                      <td title={item?.mobile}>
                                        {editElm?._id === item?._id ? (
                                          <InputHookForm
                                            register={register}
                                            errors={errors}
                                            fullWidth
                                            id={`mobile`}
                                            placeholder={`Mobile`}
                                            validate={{
                                              required: `Required`,
                                              pattern: {
                                                value:
                                                  /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                                                message: "Wrong format",
                                              },
                                            }}
                                            defaultValue={editElm?.mobile}
                                          />
                                        ) : (
                                          <span>{item?.mobile}</span>
                                        )}
                                      </td>

                                      <td>
                                        {editElm?._id === item?._id ? (
                                          <SelectHookForm
                                            register={register}
                                            fullWidth
                                            errors={errors}
                                            defaultValue={item?.isBlocked}
                                            id={`isBlocked`}
                                            validate={{ required: "Required" }}
                                            options={blockStatus}
                                          />
                                        ) : item?.isBlocked === true ? (
                                          <span className="badge iq-bg-danger">
                                            Blocked
                                          </span>
                                        ) : (
                                          <span className="badge iq-bg-primary">
                                            Active
                                          </span>
                                        )}
                                      </td>

                                      <td>
                                        {moment(item?.createdAt).format(
                                          "DD/MM/YY"
                                        )}
                                      </td>

                                      <td>
                                        <div className="d-flex align-items-center list-user-action">
                                          {editElm?._id === item._id ? (
                                            <a
                                              className="iq-bg-primary"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title="Back"
                                              data-original-title="Edit"
                                              onClick={() => {
                                                reset();
                                                setEditElm(null);
                                              }}
                                            >
                                              <i className="ri-arrow-left-circle-line"></i>
                                            </a>
                                          ) : (
                                            <a
                                              className="iq-bg-danger"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title="Edit"
                                              data-original-title="Edit"
                                              onClick={() => {
                                                reset();
                                                setEditElm(item);
                                              }}
                                            >
                                              <i className="ri-pencil-line"></i>
                                            </a>
                                          )}

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
                    {(users !== undefined || users !== null) && (
                      <Fragment>
                        <div id="user-list-page-info" className="col-md-6">
                          Showing 1 to {users.length} of {counts} entries
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
    </Fragment>
  );
};

export default ManageUser;
