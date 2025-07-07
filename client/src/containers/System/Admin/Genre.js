import { useNavigate } from "react-router-dom";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { apiGetAllGenre, apiDeleteGenre } from "../../../apis";
import { Loading } from "../../../components";
import Swal from "sweetalert2";
const Genre = () => {
  const navigate = useNavigate();
  const [genre, setGenre] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const FetchGetAllGenre = async () => {
    await apiGetAllGenre()
      .then((res) => {
        if (res.data.data && res.data.data?.length > 0) {
          const data = res.data.data.map((item) => {
            return {
              id: item._id,
              name: item.name,
              description: item.description,
            };
          });
          setGenre(data);
          setisLoading(false);
        } else {
          setisLoading(false);
          Swal.fire("Cảnh báo", "Không có thể loại được thêm", "warning");
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
    const FetchDeleteGenre = async () => {
      await apiDeleteGenre(gid);

      FetchGetAllGenre();
    };

    FetchDeleteGenre();
  }, []);
  const handleEdit = useCallback((gid) => {
    navigate(`edit/${gid}`);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    FetchGetAllGenre();
  }, []);

  return (
    <Fragment>
      <div id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Genre Lists</h4>
                  </div>
                  <div className="iq-card-header-toolbar d-flex align-items-center">
                    <a onClick={HandleAdd} className="btn btn-primary">
                      Add New Genre
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
                      className="data-tables table table-striped table-bordered"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th style={{ width: "5%" }}>No</th>
                          <th style={{ width: "20%" }}>Song Genre</th>
                          <th style={{ width: "65%" }}>Genre Description</th>
                          <th style={{ width: "10%" }}>Action</th>
                        </tr>
                      </thead>
                 
                        <tbody>
                          {genre &&
                            genre?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item.name}</td>
                                  <td>
                                    <p className="mb-0">{item.description}</p>
                                  </td>
                                  <td>
                                    <div className="flex align-items-center list-user-action ">
                                      <a
                                        className="bg-primary"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title=""
                                        data-original-title="Edit"
                                        onClick={() => {
                                          handleEdit(item.id);
                                        }}
                                        style={{
                                          marginRight: "8px",
                                          marginLeft: "28px",
                                        }}
                                      >
                                        <i className="ri-pencil-line"></i>
                                      </a>
                                      <a
                                        className="bg-primary"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title=""
                                        data-original-title="Delete"
                                        onClick={() => {
                                          handleDelete(item.id);
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Genre;
