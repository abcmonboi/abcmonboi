import React, {
  Fragment,
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { AddMultipleSong, Loading } from "../../../components";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import {
  apiCreateSubTheme,
  apiUpdateSubTheme,
  apiGetSubTheme,
  apiGetAllThemes,
} from "../../../apis";
import Select from "react-select";

const AddSubTheme = ({ modeEdit }) => {
  const { stid } = useParams();
  const addSub = useRef(null);
  const [themesubArtworkPreview, setThemesubArtworkPreview] = useState();
  const [themes, setThemes] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [isLoaddingSong, setisLoaddingSong] = useState(true);
  const [validate, setValidate] = useState("");
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    title: "",
    themesubArtwork: "",
    description: "",
    status: "" || true,
    themes: "",
    song: [],
  });
  var dataForm = new FormData();
  const handlePreviewArtwork = (e) => {
    const file = e.target.files[0];
    dataForm.append("themesubArtwork", file);
    file.preview = URL.createObjectURL(file);
    setThemesubArtworkPreview(file);
  };
  const handleClear = () => {
    setThemesubArtworkPreview("");
    themesubArtworkPreview &&
      URL.revokeObjectURL(themesubArtworkPreview.preview);
    setPayload({
      title: "",
      themesArtwork: "",
      description: "",
      status: true,
      themes: "",
      song: [],
    });
  };
  useEffect(() => {
    dataForm.append("title", payload?.title?.trim());
    dataForm.append("description", payload.description.trim());
    dataForm.append("themesubArtwork", payload.themesubArtwork);
    dataForm.append("status", payload.status);
    dataForm.append("themes", payload.themes);
    payload?.song &&
      // eslint-disable-next-line
      payload?.song.map((item) => {
        dataForm.append("song", item?._id);
      });
    // eslint-disable-next-line
  }, [payload]);
  const handleSubmit = () => {
    if (modeEdit) {
      const FetchUpdateSubTheme = async () => {
        await apiUpdateSubTheme(stid, dataForm)
          .then((response) => {
            setisLoading(false);
            if (response.status === 200) {
              Swal.fire(
                "Success",
                "Sub Theme has been updated",
                "success"
              ).then(() => {
                navigate("/admin/sub-theme");
              });
            } else {
              Swal.fire("Error", `${response.data.mes}`, "error");
            }
          })
          .catch((error) => {
            if (error.response.data.mes.includes("E11000")) {
              Swal.fire("Error", `Sub Theme name đã tồn tại`, "error");
            } else {
              Swal.fire("Error", `${error.response.data.mes}`, "error");
            }
          });
      };

      if (payload.title === "") {
        window.scrollTo(0, 0);

        setValidate("Theme title is required");
      } else if (payload.title.length < 3) {
        window.scrollTo(0, 0);
        setValidate("Theme title must be at least 3 characters");
      } else if (payload.themes === "" || payload.themes?.length  === 0) {
        console.log("asdasd")
        window.scrollTo(0, 0);
        Swal.fire(
          "Error",
          "Please select a theme",

          "error"
        );
        setisLoading(false);
      } else {
        // for (const pair of dataForm.entries()) {
        //   console.log(`${pair[0]}, ${pair[1]}`);
        // }
        // console.log(payload)

        addSub.current.scrollIntoView({ behavior: "smooth", block: "center" });
        setisLoading(true);
        FetchUpdateSubTheme();
      }
    } else {
      const FetchCreateSubTheme = async () => {
        await apiCreateSubTheme(dataForm)
          .then((response) => {
            setisLoading(false);
            if (response.status === 200) {
              Swal.fire(
                "Success",
                "Sub Theme has been created",
                "success"
              ).then(() => {
                navigate("/admin/sub-theme");
              });
            } else {
              Swal.fire("Error", `${response.data.mes}`, "error");
            }
          })
          .catch((error) => {
            setisLoading(false);

            if (error.response.data.mes.includes("E11000")) {
              Swal.fire("Error", `Sub Theme name đã tồn tại`, "error");
            } else {
              Swal.fire("Error", `${error.response.data.mes}`, "error");
            }
          });
      };
      if (payload.title === "") {
        window.scrollTo(0, 0);
        setValidate("Theme title is required");
      } else if (payload.title.length < 3) {
        window.scrollTo(0, 0);
        setValidate("Theme title must be at least 3 characters");
      } else if (payload.themes === "" || payload.themes.length === 0) {
        window.scrollTo(0, 0);
        Swal.fire(
          "Error",
          "Please select a theme",

          "error"
        );
        setisLoading(false);
      } else {
        //   for (const pair of dataForm.entries()) {
        //     console.log(`${pair[0]}, ${pair[1]}`);
        //   }
        addSub.current.scrollIntoView({ behavior: "smooth", block: "center" });
        setisLoading(true);
        FetchCreateSubTheme();
      }
    }
  };
  const handlePayloadSong = useCallback(
    (item) => {
      if (
        payload?.song.map((itemFilter) => itemFilter?._id).includes(item?._id)
      ) {
        setPayload({
          ...payload,
          song: payload?.song.filter(
            (itemFilter) => itemFilter?._id !== item?._id
          ),
        });
        return;
      }
      setPayload({
        ...payload,
        song: [
          ...payload.song,
          {
            _id: item?._id,
            title: item?.title,
          },
        ],
      });
    },
    [payload]
  );
  const FetchGetSubTheme = async () => {
    const response = await apiGetSubTheme(stid);
    const data = response.data.data;
    setPayload({
      title: data?.title || "",
      description: data?.description || "",

      song: data?.song?.map((item) => {
        return {
          _id: item._id,
          title: item.title,
        };
      }),
      // artists_names: data?.artists_names,

      themes: data?.themes?.map((item) => {
        return item._id;
      }),

      themesubArtwork: data?.themesubArtwork || "",
      status: data?.status,
    });

    setThemesubArtworkPreview(data?.themesubArtwork);
    setisLoaddingSong(false);
  };
  useEffect(() => {
    if (modeEdit) {
      FetchGetSubTheme();
    }
    // eslint-disable-next-line
  }, [modeEdit]);
  const FetchGetAllThemes = async () => {
    const response = await apiGetAllThemes({
      fields: "_id title",
    });
    const data = response.data.data
      .map((item) => {
        return {
          value: item._id,
          label: item.title,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
    setThemes(data);
  };
  useEffect(() => {
    FetchGetAllThemes();
  }, []);
  return (
    <Fragment>
      <div ref={addSub} id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row ">
            <div className="col-sm-12">
              <div className="iq-card position-relative">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">
                      {" "}
                      {modeEdit ? "Edit Sub Theme" : "Add Sub Theme"}
                    </h4>
                  </div>
                </div>
                {isLoading && (
                  <div
                    style={{
                      top: "0",
                      backgroundColor: "rgba(0,0,0,0.3)",
                      borderRadius: "15px",
                      zIndex: "3",
                    }}
                    className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center "
                  >
                    {" "}
                    <Loading />
                  </div>
                )}
                <div
                  style={
                    `${modeEdit && isLoaddingSong}` === "true"
                      ? { height: "500px" }
                      : { height: "auto" }
                  }
                  className="iq-card-body"
                >
                  {modeEdit && isLoaddingSong ? (
                    <div
                      style={{
                        position: "absolute",
                        top: "42%",
                        left: "46%",
                      }}
                    >
                      {" "}
                      <Loading />
                    </div>
                  ) : (
                    <form action="admin-song.html">
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
                          value={payload?.title}
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setValidate("");
                            setPayload({
                              ...payload,
                              title: e.target.value,
                            });
                          }}
                        />
                        <small className="text-danger">{validate}</small>
                      </div>
                      <div
                        style={{
                          color: "black",
                        }}
                        className="form-group"
                      >
                        <label>
                          {" "}
                          <span className="text-danger font-size-16 font-weight-bold">
                            *{" "}
                          </span>
                          Theme:
                        </label>
                        <Select
                          // isClearable={true}
                          disabled={themes?.length === 0}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              background: "rgba(0,0,0,0)",
                              border: "1px solid #e3e6f0",
                              boxShadow: "none",
                              "&:hover": {
                                border: "1px solid #e3e6f0",
                              },
                            }),
                            zIndex: 9999,
                          }}
                          name="name"
                          options={themes}
                          isSearchable={true}
                          className="basic-select"
                          classNamePrefix="select"
                          onChange={(e) => {
                            // console.log(e.value);
                            setPayload({
                              ...payload,
                              themes: e.value,
                            });
                          }}
                          value={themes?.map((item) => {
                            return payload?.themes?.includes(item.value)
                              ? {
                                  value: item.value,
                                  label: item.label,
                                }
                              : null;
                          })}
                        />
                      </div>
                      <AddMultipleSong
                        listSongID={payload?.song}
                        handlePayloadSong={handlePayloadSong}
                      />
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
                          defaultValue={payload?.description}
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
                                themesubArtwork: e.target.files[0],
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
                      {themesubArtworkPreview && (
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
                              themesubArtworkPreview?.preview
                                ? themesubArtworkPreview?.preview
                                : payload?.themesubArtwork
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
                                themesubArtwork: "",
                              });
                              setThemesubArtworkPreview();
                              URL.revokeObjectURL(
                                themesubArtworkPreview?.preview
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
                        {modeEdit ? "Update" : "Submit"}
                      </button>
                      <button
                        onClick={handleClear}
                        type="reset"
                        className="btn btn-danger"
                      >
                        Reset
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddSubTheme;
