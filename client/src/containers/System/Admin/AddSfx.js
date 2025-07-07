import React, { Fragment, useRef, useState } from "react";
import { apiCreateSfx, apiGetSfxById, apiUpdateSfx,apiGetAllSfxCategory,apiGetAllArtist } from "apis";
import { useEffect } from "react";
import { Loading } from "components";
import Select from "react-select";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const AddSfx = (modeEdit) => {
  const navigate = useNavigate();
  // const hashtagInput = useRef();
  const { sid } = useParams();
  const [sfxCategory, setSfxCategory] = useState([]);
  const [artist, setArtist] = useState([]);
  // eslint-disable-next-line
  const [isLoading, setisLoading] = useState(false);
  const [audioPreview, setAudioPreview] = useState();
  var dataForm = new FormData();
  const addSfx = useRef();
  const [payload, setPayload] = useState({
    title: "",
    description: "",
    artists: "",
    sfxCategory: "",
    streaming: "",
    price: "",
    copyrightStatus: "" || "1",
    status: "" || true,
    hashtags: "",
  });
  let input, hashtagArray, container;

  input = document.querySelector("#hashtags");
  container = document.querySelector(".tag-container");
  hashtagArray = [];
  const handlerHashtag = async (e) => {
    document.getElementById("error").innerHTML = "";
    if (e.which === 13 && e.target.value !== "") {
      if (payload.hashtags.includes(e.target.value)) {
        e.preventDefault();
        input.value = "";
        document.getElementById("error").innerHTML = "Hashtag already exists";
        return;
      }
      setPayload({
        ...payload,
        hashtags: [...payload.hashtags, e.target.value],
      });
      e.preventDefault();
      input.value = "";
    }
  };

  const handlePreviewFile = (e) => {
    // console.log(e)
    setAudioPreview(e.target.files[0]);
  };

  const handleClear = () => {
    setAudioPreview();
    setPayload({
      title: "",
      description: "",
      artists: "",
      sfxCategory: "",
      streaming: "",
      price: "",
      copyrightStatus: "",
      status: "",
      hashtags: "",
    });
  };
  const FetchGetAllSfxCategory = async () => {
    const response = await apiGetAllSfxCategory();
    const data = response.data.data.map((item) => {
      return {
        value: item._id,
        label: item.title,
      };
    });
    setSfxCategory(data);
  };
  const FetchGetAllArtist = async () => {
    const response = await apiGetAllArtist();
    const data = response.data.data.map((item) => {
      return {
        value: item._id,
        label: item.name,
      };
    });

    setArtist(data);
  };
  useEffect(() => {
    setisLoading(true);
    FetchGetAllSfxCategory();
    FetchGetAllArtist();
    setisLoading(false);
  }, []);

  const handleSubmit = () => {
    setisLoading(true);
    // for (const pair of dataForm.entries()) {
    //   }
    if (modeEdit.modeEdit) {
      const FetchUpdateSfx = async () => {
        const response = await apiUpdateSfx(sid, dataForm);
        if (response.status === 200) {
          setisLoading(false);
          Swal.fire("Success", "Sfx has been updated", "success");
          navigate("/admin/sfx");
        } else if (response.status !== 200) {
          setisLoading(false);
          Swal.fire("Error", "Something went wrong", "error");
        } else {
          setisLoading(false);
          Swal.fire("Error", "Something went wrong", "error");
        }
      };
      if (
        payload.title === "" ||
        payload.artists === "" ||
        payload.sfxCategory === "" ||
        payload.streaming === "" ||
        payload.copyrightStatus === "" ||
        payload.status === ""
      ) {
        addSfx.current.scrollIntoView({ behavior: "smooth" });
        Swal.fire("Error", "Please check full input", "error");
        setisLoading(false);
      } else {
        FetchUpdateSfx();
      }
    } else {
      const FetchCreateSfx = async () => {
        const response = await apiCreateSfx(dataForm);
        // addSong.current.scrollIntoView({ behavior: "smooth" });
        if (response.status === 200) {
          setisLoading(false);
          Swal.fire("Success", "Sfx has been created", "success");
          navigate("/admin/sfx");
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      };
      if (
        payload.title === "" ||
        payload.artists === "" ||
        payload.sfxCategory === "" ||
        payload.streaming === "" ||
        payload.copyrightStatus === "" ||
        payload.status === ""
      ) {
        addSfx.current.scrollIntoView({ behavior: "smooth" });
        Swal.fire("Error", "Please check full input", "error");
        setisLoading(false);
      } else {
        FetchCreateSfx();
      }
    }
  };
  useEffect(() => {
    dataForm.append("title", payload.title.trim());
    dataForm.append("description", payload.description);
    payload?.artists &&
      // eslint-disable-next-line
      payload?.artists.map((item) => {
        dataForm.append("artists", item);
      });
    payload?.sfxCategory &&
      // eslint-disable-next-line
      payload?.sfxCategory.map((item) => {
        dataForm.append("sfxCategory", item);
      });
    // eslint-disable-next-line
    payload?.hashtags &&
      // eslint-disable-next-line
      payload?.hashtags.map((item) => {
        dataForm.append("hashtag", item);
      });
    dataForm.append("streaming", payload.streaming);
    dataForm.append("price", payload.price);
    dataForm.append("copyrightStatus", payload.copyrightStatus);
    dataForm.append("status", payload.status);
    // eslint-disable-next-line
  }, [payload]);
  const FetchGetSfx = async () => {
    const response = await apiGetSfxById(sid);
    const data = response.data.data;
    setPayload({
      title: data?.title || "",
      description: data?.description || "",
      artists: data?.artists.map((item) => {
        return item._id;
      }),
      sfxCategory: data?.sfxCategory.map((item) => {
        return item._id;
      }),
      hashtags: data?.hashtag || "",
      streaming: data?.streaming || "",
      price: data?.price || "",
      copyrightStatus: data?.copyrightStatus || 1,
      status: data?.status,
    });
    document.getElementById("customSwitch-11").checked =
      data?.status === true ? true : false;
    setAudioPreview(data?.streaming);
    setisLoading(false);
  };
  useEffect(() => {
    if (modeEdit.modeEdit) {
      setisLoading(true);
      FetchGetSfx();
    }

    // eslint-disable-next-line
  }, [modeEdit]);

  return (
    <Fragment>
      <div ref={addSfx} id="content-page" className="content-page">
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
                      {modeEdit.modeEdit ? "Edit" : "Add"} Sfx
                    </h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <form action="admin-song.html">
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
                      <label>Sound Effect Title:</label>
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
                      <label>
                        {`Upload Sound::(Tối đa: 100MB)`}

                      </label>
                      <div className="custom-file">
                        <input
                          type="file"
                          accept={".mp3 , .wav"}
                          className="custom-file-input"
                          id="customFile"
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              setPayload({
                                ...payload,
                                streaming: e.target.files[0],
                              });
                              handlePreviewFile(e);
                            }
                          }}
                        />
                        {audioPreview ? (
                          <label
                            className="custom-file-label text-black"
                            htmlFor="customFile"
                          >
                            {audioPreview.name
                              ? audioPreview.name
                              : payload?.title}
                          </label>
                        ) : (
                          <label
                            className={
                              modeEdit.modeEdit
                                ? "custom-file-label text-black"
                                : "custom-file-label "
                            }
                            htmlFor="customFile"
                          >
                            {modeEdit.modeEdit && payload?.streaming
                              ? payload.title
                              : "Choose file"}
                          </label>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        color: "black",
                      }}
                      className="form-group"
                    >
                      <label>Artist:</label>
                      <Select
                        isClearable={true}
                        disabled={artist.length === 0}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            background: "rgba(255,255,255,0.8)",
                            border: "1px solid #e3e6f0",
                            boxShadow: "none",
                            "&:hover": {
                              border: "1px solid #e3e6f0",
                            },
                          }),
                          zIndex: 9999,
                        }}
                        isMulti
                        name="name"
                        options={artist}
                        isSearchable={true}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e) => {
                          setPayload({
                            ...payload,
                            artists: e.map((item) => {
                              return item.value;
                            }),
                          });
                        }}
                        value={artist.map((item) => {
                          return payload.artists.includes(item.value)
                            ? {
                                value: item.value,
                                label: item.label,
                              }
                            : null;
                        })}
                      />
                    </div>

                    <div
                      style={{
                        color: "black",
                      }}
                      className="form-group"
                    >
                      <label>Sfx Category</label>

                      <Select
                        isClearable={true}
                        disabled={sfxCategory.length === 0}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            background: "rgba(255,255,255,0.8)",
                            border: "1px solid #e3e6f0",
                            boxShadow: "none",
                            "&:hover": {
                              border: "1px solid #e3e6f0",
                            },
                            color: "black",
                          }),
                          zIndex: 9999,
                        }}
                        isMulti
                        name="name"
                        options={sfxCategory}
                        isSearchable={true}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e) => {
                          setPayload({
                            ...payload,
                            sfxCategory: e.map((item) => {
                              return item.value;
                            }),
                          });
                        }}
                        value={sfxCategory.map((item) => {
                          return payload.sfxCategory.includes(item.value)
                            ? {
                                value: item.value,
                                label: item.label,
                              }
                            : null;
                        })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Hashtag:</label>
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <input
                          onKeyUp={handlerHashtag}
                          id="hashtags"
                          type="text"
                          className="form-control"
                        />
                        <i
                          onClick={() => {
                            setPayload({
                              ...payload,
                              hashtags: [],
                            });
                            document.getElementById("hashtags").value = "";
                          }}
                          style={{
                            position: "absolute",
                            right: "10px",
                            top: "10px",
                            zIndex: "9999",
                            cursor: "pointer",
                            width: "50px",
                          }}
                          className="fa fa-trash"
                        ></i>
                      </div>
                      <small id="error" className="text-danger "></small>
                      <div
                        style={{
                          display: "flex",
                          flexFlow: "row wrap",
                        }}
                        className="tag-container"
                      >
                        {payload?.hashtags &&
                          payload.hashtags.map((item, index) => {
                            return (
                              <div
                                key={index}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  padding: "5px 10px",
                                  margin: "5px",
                                  background: "#e3e6f0",
                                  borderRadius: "5px",
                                }}
                              >
                                <span>{item}</span>
                                <span
                                  onClick={() => {
                                    setPayload({
                                      ...payload,
                                      hashtags: payload.hashtags.filter(
                                        (itemHashtag) => itemHashtag !== item
                                      ),
                                    });
                                  }}
                                  style={{
                                    cursor: "pointer",
                                    padding: "0 5px",
                                    borderRadius: "50%",
                                    background: "#FF4545",
                                    color: "white",
                                    marginLeft: "5px",
                                  }}
                                >
                                  x
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Copyright status:</label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        onChange={(e) => {
                          setPayload({
                            ...payload,
                            copyrightStatus: e.target.value,
                          });
                        }}
                        value={payload?.copyrightStatus}
                      >
                        <option value="" disabled="">
                          Choose Status
                        </option>
                        <option value={1}>available</option>
                        <option value={2}>unavailable</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Price:</label>
                      <input
                        onChange={(e) => {
                          ("");
                          setPayload({
                            ...payload,
                            price: +e.target.value,
                          });
                        }}
                        defaultValue={modeEdit.modeEdit ? payload.price : ""}
                        type="number"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Description:</label>
                      <textarea
                        onChange={(e) => {
                          ("");
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

export default AddSfx;
