import React, { memo,useCallback} from 'react'
import { Loading } from "../../../components";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {  apiDeleteSubTheme } from "apis";

const TableSubThemeByThemeComponent = ({
    subTheme,
    isLoadingSubTheme,
    title,
    handleLoading,
            handleLoadingSubTheme,
}) => {
  const navigate = useNavigate();
  const handleEdit = useCallback((tid) => {
    navigate(`/admin/sub-theme/edit/${tid}`);
    // eslint-disable-next-line
  }, []);
  const handleDelete = useCallback((tid) => {
    const FetchDeleteMood = async () => {
      await apiDeleteSubTheme(tid).then ((res) => {
          handleLoading(true);
          handleLoadingSubTheme(true);

      });
      
      }
      FetchDeleteMood();

  });
  return (
    <div className="row">
    <div className="col-sm-12">
      <div className="iq-card">
        <div className="iq-card-header d-flex justify-content-between">
          <div className="iq-header-title">
          {title ? (
            <h4 className="card-title"> {`List SubTheme of Theme ${title}`} </h4>
          ) : (
            <h4 className="card-title"> List SubTheme of Theme </h4>
          )} 
          </div>
        </div>
        <div
          style={
            `${isLoadingSubTheme}` === "true"
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
            {isLoadingSubTheme ? (
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
                            <th>No</th>
                            <th
                              style={{
                                width: "8%",
                              }}
                            >
                              Artwork
                            </th>
                            <th>Title</th>
                            <th
                             
                            >
                              Description
                            </th>
                            <th
                              style={{
                                width: "8%",
                              }}
                            >
                              Status
                            </th>
                            <th  style={{
                                width: "8%",
                              }}>Update At</th>
                            <th  style={{
                                width: "8%",
                              }}>Create At</th>
                            <th style={{
                                width: "8%",
                              }}>Action</th>
                          </tr>
                </thead>

                <tbody>
                  {subTheme?.length > 0 &&
                    subTheme.map((item, index) => {
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
                        <td title={item?.description}>{item?.description}</td>
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
        </div>
      </div>
    </div>
  </div>
  )
}

export default memo(TableSubThemeByThemeComponent)