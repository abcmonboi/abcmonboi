import React, { memo, useState, useCallback,useRef } from "react";
import { Loading } from "../../../components";
import { path } from "../../../ultils/constant";
import { useNavigate } from "react-router-dom";
import { apiDeleteSong, apiUpdateSong } from "../../../apis";
import Swal from "sweetalert2";

const TableSongByAlbumComponent = ({
  song,
  isLoadingSong,
  handleModal,
  handleLoadingSong,
  handleLoading,
}) => {
  const navigate = useNavigate();
  const handleEdit = useCallback((sid) => {
    navigate(`/admin/song/edit/${sid}`);
  }, []);
  const handleDelete = useCallback((sid) => {
 

    const FetchDeleteSong = async () => {
      await apiDeleteSong(sid)
        .then((response) => {
          handleLoadingSong(true);
          handleLoading(true);
          // Swal.fire("Success", "Song has delete ", "success");
        })
        .catch((err) => {
          Swal.fire("Error", "Có lỗi từ hệ thống", "error");
        });
    };

    FetchDeleteSong();

    // eslint-disable-next-line
  });
  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="iq-card">
          <div className="iq-card-header d-flex justify-content-between">
            <div className="iq-header-title">
              <h4 className="card-title">List Song By Album</h4>
            </div>
          </div>
          <div
            style={
              `${isLoadingSong}` === "true"
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
                  ></div>
                </div>
              </div>
              {isLoadingSong ? (
                <div
                  style={{
                    position: "absolute",
                    top: "46%",
                    left: "46%",
                  }}
                >
                  {" "}
                  <Loading />
                </div>
              ) : (
                <table
                  className="data-tables table  table-striped table-bordered mt-4"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }}>No</th>
                      <th style={{ width: "5%" }}>ArtWork</th>
                      <th style={{ width: "25%" }}>Name</th>
                      <th style={{ width: "10%" }}>Mood</th>
                      <th style={{ width: "5%" }}>Tempo</th>
                      <th style={{ width: "5%" }}>Price</th>
                      <th>Status</th>
                      <th style={{ width: "10%" }}>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {song?.length > 0 &&
                      song.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                }}
                                src={item.thumbnail}
                                className="img-fluid avatar-50 rounded"
                                alt="author-profile"
                              />
                            </td>
                            <td>{item.title}</td>

                            <td>
                              {item?.moods.map((item, index, self) => {
                                return ` ${
                                  item.name +
                                  (index === self.length - 1 ? "" : ", ")
                                }`;
                              })}{" "}
                            </td>

                            <td>{item?.tempo}</td>
                            <td>{`${item?.price || ""}`}</td>
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
                              <div className="d-flex align-items-center list-user-action justify-content-center">
                                <a
                                  className="bg-primary mr-4"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Edit Song"
                                  data-original-title="Edit"
                                  onClick={() => {
                                    handleEdit(item._id);
                                  }}
                                >
                                  <i className="ri-pencil-line"></i>
                                </a>
                                <a
                                  onClick={() => {
                                    handleDelete(item._id);
                                  }}
                                  className="bg-primary"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Delete Song Forever"
                                  data-original-title="Delete"
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
  );
};

export default memo(TableSongByAlbumComponent);
