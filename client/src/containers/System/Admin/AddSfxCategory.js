import React, { Fragment, useRef, useState, useEffect } from "react";
import { Loading } from "../../../components";
import Swal from "sweetalert2";
import { apiCreateSfxCategory, apiUpdateSfxCategory,apiGetSfxCategoryById } from "../../../apis";
import { useNavigate, useParams } from "react-router-dom";
const AddSfxCategory = (modeEdit) => {
  const navigate = useNavigate();
  const {sid } = useParams();
  const [isLoading, setisLoading] = useState(false);
  const addSfxCategory = useRef(null);
  const [videoPreview, setVideoPreview] = useState();
  var dataForm = new FormData();
  const [payload, setPayload] = useState({
    title: "",
    status: "" || true,
    video_thumnail: "",
  });
  const handleClear = () => {
    setPayload({
      title: "",
      status: "" || true,
      video_thumnail: "",
    });
  };
  const handlePreviewVideo = (e) => {
    setisLoading(true);
    const file = e.target.files[0];
    dataForm.append("video_thumnail", file);
    file.preview = URL.createObjectURL(file);
    setVideoPreview(file);
    setisLoading(false);
  };
  const handleSubmit = () => {
    setisLoading(true);

    if (modeEdit.modeEdit) {
      const FetchUpdateSfxCategory = async () => {
        await apiUpdateSfxCategory(sid,dataForm)
          .then((response) => {
            Swal.fire("Success", "SfxCate has been updated", "success");
            navigate("/admin/sfxcategory");
          })
          .catch((error) => {
            setisLoading(false);
            if (error?.response?.data?.mes) {
              Swal.fire("Error", error.response.data.mes, "error");
            } else {
              Swal.fire("Error", "Có lỗi từ hệ thống", "error");
            }
          });
      };

      if (
        payload.title === "" ||
        payload.video_thumnail === "" ||
        payload.status === ""
      ) {
        addSfxCategory.current.scrollIntoView({ behavior: "smooth" });
        Swal.fire("Error", "Please check full input", "error");
        setisLoading(false);
      } else {
        FetchUpdateSfxCategory();
      }

    } else {
      const FetchCreateSfxCategory = async () => {
        await apiCreateSfxCategory(dataForm)
          .then((response) => {
            Swal.fire("Success", "SfxCate has been created", "success");
            navigate("/admin/sfxcategory");
          })
          .catch((error) => {
            setisLoading(false);
            if (error?.response?.data?.mes) {
              Swal.fire("Error", error.response.data.mes, "error");
            } else {
              Swal.fire("Error", "Có lỗi từ hệ thống", "error");
            }
          });
      };

      if (
        payload.title === "" ||
        payload.video_thumnail === "" ||
        payload.status === ""
      ) {
        addSfxCategory.current.scrollIntoView({ behavior: "smooth" });
        Swal.fire("Error", "Please check full input", "error");
        setisLoading(false);
      } else {
        FetchCreateSfxCategory();
      }
    }
  };
  useEffect(() => {
    dataForm.append("title", payload.title.trim());
    dataForm.append("status", payload.status);
    dataForm.append("video_thumnail", payload.video_thumnail);

    // eslint-disable-next-line
  }, [payload]);
  const FetchGetSfxCategory = async () => {
    const response = await apiGetSfxCategoryById(sid);
    const data = response.data.data;
    setPayload({
      title: data?.title || "",
      video_thumnail: data?.video_thumnail || "",
      status: data?.status,
    });
    setVideoPreview(data?.video_thumnail);
    document.getElementById("customSwitch-11").checked =
      data?.status === true ? true : false;
    setisLoading(false);
  };
  useEffect(() => {
    if (modeEdit.modeEdit) {
      setisLoading(true);
      FetchGetSfxCategory();
    }

    // eslint-disable-next-line
  }, [modeEdit]);
  return (
    <Fragment>
      <div ref={addSfxCategory} id="content-page" className="content-page">
        <div className="container-fluid">
          <div
            style={{
              position: "relative",
            }}
            className="row"
          >
            {isLoading && (
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  margin: "auto",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: "999",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.3)",
                }}
              >
                {" "}
                <Loading />
              </div>
            )}
            <div className="col-sm-12">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">
                      {" "}
                      {modeEdit.modeEdit ? "Edit" : "Add"}
                      SFX Category
                    </h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <form>
                    <div className="form-group">
                      <div className="custom-control custom-switch custom-switch-text custom-control-inline">
                        <div className="custom-switch-inner">
                          <input
                            onChange={(e) => {
                              setPayload({
                                ...payload,
                                status: e.target.checked ? true : false,
                              });
                            }}
                            type="checkbox"
                            className="custom-control-input"
                            id="customSwitch-11"
                            defaultChecked={true}
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
                      <label> Title:</label>
                      <input
                        value={payload.title}
                        onChange={(e) => {
                          setPayload({
                            ...payload,
                            title: e.target.value,
                          });
                        }}
                        type="text"
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label>{`Video Thumb: (Recommended: 232X250)`}</label>
                      <div className="custom-file">
                        <input
                          onChange={(e) => {
                            setPayload({
                              ...payload,
                              video_thumnail: e.target.files[0],
                            });
                            handlePreviewVideo(e);
                          }}
                          type="file"
                          className="custom-file-input"
                          id="customFileThumbnailLarge"
                          accept={".mp4"}
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFileThumbnailLarge"
                        >
                          Choose file
                        </label>
                      </div>
                    </div>
                    {videoPreview && (
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <div
                          className="form-group"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <video
                            src={
                              videoPreview.preview
                                ? videoPreview.preview
                                : payload?.video_thumnail
                            }
                            className="img-thumbnail"
                            alt="Responsive "
                            style={{
                              width: "500px",
                              objectFit: "cover",
                              position: "relative",
                            }}
                            autoPlay
                            loop
                            muted
                          />
                          <div
                            style={{
                              position: "absolute",
                              bottom: "12%",
                              right: "50%",
                            }}
                            onClick={() => {
                              setPayload({
                                ...payload,
                                video_thumnail: {},
                              });
                              setVideoPreview() &&
                                URL.revokeObjectURL(videoPreview.preview);
                            }}
                            className="p-image"
                          >
                            <label
                              title="Xóa"
                              style={{ cursor: "pointer" }}
                              htmlFor="file-delete"
                            >
                              <i className="las la-trash upload-button "></i>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleSubmit}
                      style={{ marginRight: "8px" }}
                      type="button"
                      className="btn btn-primary"
                    >
                      {modeEdit.modeEdit ? "Update" : "Submit"}
                    </button>
                    <button
                      style={{ marginRight: "4px" }}
                      type="reset"
                      className="btn btn-danger"
                      onClick={handleClear}
                    >
                      Reset
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddSfxCategory;
