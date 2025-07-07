import React, { Fragment, useEffect, useState } from "react";
import { apiCreateThemes, apiUpdateTheme, apiGetTheme } from "../../../apis";
import Swal from "sweetalert2";
import { Loading } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
const AddVideoTheme = (modeEdit) => {
  const { mid } = useParams();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [themesArtworkPreview, setThemesArtworkPreview] = useState();
  const [validate, setValidate] = useState("");
  const [payload, setPayload] = useState({
    title: "",
    themesArtwork: "",
    description: "",
    status: "" || true,
  });
  var dataForm = new FormData();

  const FetchGetTheme = async () => {
    await apiGetTheme(mid)
      .then((response) => {
        const data = response.data.data;
        setPayload({
          title: data?.title,
          description: data?.description.trim(),
          status: data?.status,
          themesArtwork: data?.themesArtwork,
        });
        setThemesArtworkPreview(data?.themesArtwork);
        setisLoading(false);
      })
      .catch((error) => {
        Swal.fire("Error", `${error.response.data.message}`, "error"); //change from `error.response.data.message` to `${error.response.data.message}
        setisLoading(false);
      });
  };
  useEffect(() => {
    if (modeEdit.modeEdit) {
      setisLoading(true);
      FetchGetTheme();
    }
    // eslint-disable-next-line
  }, [modeEdit]);

  const handleSubmit = () => {
    setisLoading(true);
    if (modeEdit.modeEdit) {
      const FetchUpdateTheme = async () => {
        await apiUpdateTheme(mid, dataForm)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire("Success", "Theme has been updated", "success");
              navigate("/admin/theme");
            } else {
              Swal.fire("Error", `${response.data.mes}`, "error"); //change from `error.response.data.message` to `${error.response.data.message}
            }
          })
          .catch((error) => {
            if (error.response.data.mes.includes("E11000")) {
              Swal.fire("Error", `Theme title đã tồn tại`, "error");
            } else {
              Swal.fire("Error", `${error.response.data.mes}`, "error");
            } //change from `error.response.data.message` to `${error.response.data.message}
          });
      };
      if (payload.title === "") {
        setValidate("Theme title is required");
      } else if (payload.title.length < 3) {
        setValidate("Theme title must be at least 3 characters");
      } else {
  //  for (const pair of dataForm.entries()) {
  //           console.log(`${pair[0]}, ${pair[1]}`);
  //         }
         
        FetchUpdateTheme();
      }
    } else {
      const FetchCreateTheme = async () => {
        await apiCreateThemes(dataForm)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire("Success", "Theme has been created", "success");
              navigate("/admin/theme");
            } else {
              Swal.fire("Error", `${response.data.mes}`, "error");
            }
          })
          .catch((error) => {
            if (error.response.data.mes.includes("E11000")) {
              Swal.fire("Error", `Theme name đã tồn tại`, "error");
            } else {
              Swal.fire("Error", `${error.response.data.mes}`, "error");
            }
          });
      };
      if (payload.title === "") {
        setValidate("Theme title is required");
      } else if (payload.title.length < 3) {
        setValidate("Theme title must be at least 3 characters");
      } else {
        FetchCreateTheme();
      }
    }
  };
  const handlePreviewArtwork = (e) => {
    const file = e.target.files[0];
    dataForm.append("themesArtwork", file);
    file.preview = URL.createObjectURL(file);
    setThemesArtworkPreview(file);
  };
  const handleClear = () => {
    setThemesArtworkPreview("");
    themesArtworkPreview && URL.revokeObjectURL(themesArtworkPreview.preview);
    setPayload({
      title: "",
      themesArtwork: "",
      description: "",
      status: "" || true,
    });
  };
  useEffect(() => {
    dataForm.append("title", payload?.title?.trim());
    dataForm.append("description", payload.description.trim());
    dataForm.append("themesArtwork", payload.themesArtwork);
    dataForm.append("status", payload.status);
    // eslint-disable-next-line
  }, [payload]);
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
              <div className="col-sm-12">
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                      <h4 className="card-title">
                        {" "}
                        {modeEdit.modeEdit ? "Edit Theme" : "Add Theme"}
                      </h4>
                    </div>
                  </div>
                  <div className="iq-card-body">
                    <form action="admin-category.html">
                      <div className="form-group">
                        <div className="custom-control custom-switch custom-switch-text custom-control-inline">
                          <div className="custom-switch-inner">
                            <span className="text-danger font-size-16 font-weight-bold">
                              *{" "}
                            </span>
                            <input
                              onChange={(e) => {
                                setPayload({
                                  ...payload,
                                  status: e.target.checked,
                                });
                              }}
                              type="checkbox"
                              className="custom-control-input"
                              id="customSwitch-11"
                              defaultChecked={payload.status}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customSwitch-11"
                              data-on-label="On"
                              data-off-label="Off"
                            ></label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>
                          <span className="text-danger font-size-16 font-weight-bold">
                            *{" "}
                          </span>{" "}
                          Title:
                        </label>
                        <input
                          defaultValue={modeEdit.modeEdit ? payload.title : ""}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setValidate("");
                            setPayload({
                              ...payload,
                              title: e.target.value.trim(),
                            });
                          }}
                        />
                        <small className="text-danger">{validate}</small>
                      </div>
                      <div className="form-group">
                        <label>
                          {" "}
                          <span className="text-danger font-size-16 font-weight-bold">
                            *{" "}
                          </span>
                          Description:
                        </label>
                        <textarea
                          onChange={(e) => {
                            setValidate("");
                            setPayload({
                              ...payload,
                              description: e.target.value,
                            });
                          }}
                          defaultValue={payload.description}
                          className="form-control"
                          rows="2"
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label>
                          <span className="text-danger font-size-16 font-weight-bold">
                            *{" "}
                          </span>
                          {`ThemeArtwork: (Recommended(1:1): 400x400)`}
                        </label>
                        <div className="custom-file">
                          <input
                            onChange={(e) => {
                              setPayload({
                                ...payload,
                                themesArtwork: e.target.files[0],
                              });
                              handlePreviewArtwork(e);
                            }}
                            type="file"
                            className="custom-file-input"
                            id="customFileThumbnail"
                            accept="image/*"
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFileThumbnail"
                          >
                            Choose file
                          </label>
                        </div>
                      </div>
                      {themesArtworkPreview && (
                        <div
                          className="form-group"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            position: "relative",
                          }}
                        >
                          <img
                            src={
                              themesArtworkPreview?.preview
                                ? themesArtworkPreview?.preview
                                : payload?.themesArtwork
                            }
                            className="img-thumbnail bg-dark p-0"
                            alt="Responsive "
                            style={{
                              width: "304px",
                              height: "304px",
                              objectFit: "contain",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              bottom: "12%",
                              right: "49%",
                            }}
                            onClick={() => {
                              setPayload({
                                ...payload,
                                themesArtwork: "",
                              });
                              setThemesArtworkPreview();
                              URL.revokeObjectURL(
                                themesArtworkPreview?.preview
                              );
                            }}
                            className="p-image"
                          >
                            <label
                              title="Xóa"
                              style={{ cursor: "pointer" }}
                              htmlFor="file-delete"
                            >
                              <i className="las la-trash upload-button text-white"></i>
                            </label>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={handleSubmit}
                        style={{ marginRight: "4px" }}
                        type="button"
                        className="btn btn-primary"
                        disabled={isLoading}
                      >
                        Submit
                      </button>
                      <button
                        onClick={handleClear}
                        type="reset"
                        className="btn btn-danger"
                      >
                        Reset
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddVideoTheme;
