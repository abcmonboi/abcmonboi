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
import { apiCreateSubTheme } from "../../../apis";

const CreateSubThemeToThemeComponent = ({
  theme,
  handleUploadSubTheme,
  handleLoading,
  handleLoadingSubTheme,
}) => {
  const [themesubArtworkPreview, setThemesubArtworkPreview] = useState();
  const [isLoading, setisLoading] = useState(false);
  const [validate, setValidate] = useState("");
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    title: "",
    themesubArtwork: "",
    description: "",
    status: "" || true,
    themes: theme?._id,
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
      status: "" || true,
      themes: theme?._id,
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
    const FetchCreateSubTheme = async () => {
      await apiCreateSubTheme(dataForm)
        .then((response) => {
          setisLoading(false);
          if (response.status === 200) {
            Swal.fire("Success", "Sub Theme has been created", "success");
            handleUploadSubTheme(false);
            handleLoading(true);
            handleLoadingSubTheme(true);
          } else {
            Swal.fire("Error", `${response.data.mes}`, "error");
            handleUploadSubTheme(false);
            handleLoading(true);
            handleLoadingSubTheme(true);
          }
        })
        .catch((error) => {
          if (error.response.data.mes.includes("E11000")) {
            Swal.fire("Error", `Sub Theme name đã tồn tại`, "error");
            handleUploadSubTheme(false);
            handleLoading(true);
            handleLoadingSubTheme(true);
          } else {
            Swal.fire("Error", `${error.response.data.mes}`, "error");
            handleUploadSubTheme(false);
            handleLoading(true);
            handleLoadingSubTheme(true);
          }
        });
    };
    if (payload.title === "") {
      window.scrollTo(0, 0);
      setValidate("Theme title is required");
    } else if (payload.title.length < 3) {
      window.scrollTo(0, 0);
      setValidate("Theme title must be at least 3 characters");
    } else {
        // for (const pair of dataForm.entries()) {
        //   console.log(`${pair[0]}, ${pair[1]}`);
        // }
      setisLoading(true);
      FetchCreateSubTheme();
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
  return (
    <Fragment>
      <div className="row">
        <div className="col-sm-12">
          <div className="iq-card">
            <div className="iq-card-header d-flex justify-content-between">
              <div className="iq-header-title">
                <h4 className="card-title">
                  {" "}
                  Add Sub Theme To Theme: {theme?.title}
                </h4>
              </div>
            </div>

            <div
              style={
                `${isLoading}` === "true"
                  ? { height: "350px" }
                  : { height: "auto" }
              }
              className="iq-card-body"
            >
              {isLoading ? (
                <div
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "46%",
                  }}
                >
                  {" "}
                  <Loading />
                </div>
              ) : (
                <form>
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
                            themesArtwork: "",
                          });
                          setThemesubArtworkPreview();
                          URL.revokeObjectURL(themesubArtworkPreview?.preview);
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
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(CreateSubThemeToThemeComponent);
