import { useNavigate } from "react-router-dom";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { apiGetAllArtist, apiDeleteArtist } from "../../../apis";
import { Loading } from "../../../components";
import Swal from "sweetalert2";
const ManageArtist = () => {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const FetchGetAllArtist = async () => {
    await apiGetAllArtist()
      .then((res) => {
        if (res.data.data && res.data.data?.length > 0) {
          const data = res?.data?.data;
          setArtists(data);
          setisLoading(false);
        } else {
          setisLoading(false);
          Swal.fire("Cảnh báo", "Không có tác giả được thêm", "warning");
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
  const handleDelete = useCallback((aid) => {
    const FetchDeleteArtist = async () => {
      setisLoading(true);
      const response = await apiDeleteArtist(aid);
      const data = response?.data?.data;
      setArtists(data);
    };

    FetchDeleteArtist();
    setTimeout(() => {
      FetchGetAllArtist();
    }, 300);
  });

  const handleEdit = useCallback((aid) => {
    navigate(`edit/${aid}`);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    FetchGetAllArtist();
  }, []);
  // useEffect(() => {
  //   if (artists) {
  //     setisLoading(false);
  //   }
  // }, [artists]);
  return (
    <Fragment>
      <div id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            {isLoading ? (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                }}
              >
                {" "}
                <Loading />
              </div>
            ) : (
              <Fragment>
                <div className="col-sm-12">
                  <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                      <div className="iq-header-title">
                        <h4 className="card-title">Artist Lists</h4>
                      </div>
                      <div className="iq-card-header-toolbar d-flex align-items-center">
                        <a onClick={HandleAdd} className="btn btn-primary">
                          Add New Artist
                        </a>
                      </div>
                    </div>
                    <div className="iq-card-body">
                      <div className="table-responsive">
                        <table
                          className="data-tables table table-striped table-bordered"
                          style={{
                            width: "100%",
                          }}
                        >
                          <thead>
                            <tr>
                              <th style={{ width: "5%" }}>No</th>
                              <th style={{ width: "5%" }}>Profile</th>
                              <th style={{ width: "15%" }}>Artist Name</th>
                              <th style={{ width: "15%" }}>Email</th>
                              <th style={{ width: "15%" }}>Date of Birth</th>
                              <th style={{ width: "35%" }}>
                                Writer Description
                              </th>
                              <th style={{ width: "10%" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {artists.map((artist, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    <img
                                      src={
                                        artist.thumbnail
                                          ? artist.thumbnail
                                          : "/assets/images/user/01.jpg"
                                      }
                                      className="img-fluid avatar-50 rounded"
                                      alt="author-profile"
                                    />
                                  </td>
                                  <td>{artist?.name}</td>
                                  <td>
                                    {artist?.emailAddress
                                      ? artist?.emailAddress
                                      : "no info yet"}
                                  </td>
                                  <td>
                                    {artist?.DateofBirth
                                      ? artist?.DateofBirth
                                      : "no info yet"}
                                  </td>
                                  <td>
                                    <p className="mb-0">
                                      {artist?.description
                                        ? artist?.description
                                        : "no info yet"}
                                    </p>
                                  </td>
                                  <td>
                                    <div className="flex align-items-center list-user-action">
                                      <a
                                        className="bg-primary"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title=""
                                        data-original-title="Edit"
                                        onClick={() => {
                                          handleEdit(artist._id);
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
                                          handleDelete(artist._id);
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
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ManageArtist;
