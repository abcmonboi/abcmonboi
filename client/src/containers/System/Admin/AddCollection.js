import React, { Fragment, useRef, useState } from "react";
import {
  apiCreateCollection,
  apiUpdateCollection,
  apiGetCollectionById,
} from "apis/collection";
import { useEffect } from "react";
import { Loading, Dnd, SearchSong } from "components";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
const AddCollection = (collection, modeEdit) => {
  const navigate = useNavigate();
  const { sid } = useParams();
  const [list, setList] = useState([]);
  const [songSortable, setSongSortable] = useState([]);
  // eslint-disable-next-line
  const [isLoading, setisLoading] = useState(false);
  const [avatarPreviewLarge, setAvatarPreviewLarge] = useState();
  var dataForm = new FormData();
  const addCollection = useRef();
  const [payload, setPayload] = useState({
    title: "",
    description: "",
    status: "" || true,
    thumbnail_collection: "",
    list: "",
  });

  const handleClear = () => {
    setPayload({
      title: "",
      description: "",
      status: "",
      thumbnail_collection: "",
      list: "",
    });
  };

  const handlePreviewThumbnailLarge = (e) => {
    setisLoading(true);
    const file = e.target.files[0];
    dataForm.append("thumbnail_medium", file);
    file.preview = URL.createObjectURL(file);
    setAvatarPreviewLarge(file);
    setisLoading(false);
  };
  const handleSubmit = () => {
    setisLoading(true);
    // for (const pair of dataForm.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }
    if (collection.modeEdit) {
      const FetchUpdateCollection = async () => {
        const response = await apiUpdateCollection(sid, dataForm);
        if (response.status === 200) {
          setisLoading(false);
          Swal.fire("Success", "Data has been updated", "success");
          if (collection.collection === "music")
            navigate("/admin/musiccollection");
          if (collection.collection === "sfx") navigate("/admin/sfxcollection");
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
        payload.thumbnail_collection === "" ||
        // payload.list === "" ||
        payload.status === ""
      ) {
        addCollection.current.scrollIntoView({ behavior: "smooth" });
        Swal.fire("Error", "Please check full input", "error");
        setisLoading(false);
      } else {
        FetchUpdateCollection();
      }
    } else {
      const FetchCreateCollection = async () => {
        const response = await apiCreateCollection(dataForm);
        // addSong.current.scrollIntoView({ behavior: "smooth" });
        if (response.status === 200) {
          setisLoading(false);
          if (collection.collection === "music")
            Swal.fire(
              "Success",
              "Music Collection has been created",
              "success"
            );

          if (collection.collection === "sfx")
            Swal.fire("Success", " Collection has been created", "success");
          if (collection.collection === "music")
            navigate("/admin/musiccollection");
          if (collection.collection === "sfx") navigate("/admin/sfxcollection");
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      };
      if (
        payload.title === "" ||
        payload.thumbnail_collection === "" ||
        // payload.list === "" ||
        payload.status === ""
      ) {
        addCollection.current.scrollIntoView({ behavior: "smooth" });
        Swal.fire("Error", "Please check full input", "error");
        setisLoading(false);
      } else {
        FetchCreateCollection();
      }
    }
  };
  useEffect(() => {
    dataForm.append("title", payload?.title.trim());
    dataForm.append("description", payload.description);
    payload?.list &&
      // eslint-disable-next-line
      payload?.list.map((item) => {
        if (collection.collection === "music") dataForm.append("song", item);
        if (collection.collection === "sfx") dataForm.append("sfx", item);
      });
    if (collection.collection === "music")
      dataForm.append("collection_type", 1);
    if (collection.collection === "sfx") dataForm.append("collection_type", 2);
    dataForm.append("status", payload.status);
    dataForm.append("thumbnail_collection", payload.thumbnail_collection);

    // eslint-disable-next-line
  }, [payload]);
  const FetchGetCollection = async () => {
    const response = await apiGetCollectionById(sid);
    const data = response.data.data;
    if (collection.collection === "sfx") {
      const sfx = data?.sfx.map((item) => {
        return {
          id: item._id,
          title: item.title,
          album: item.album,
          artists: item.artists,
          streaming: item.streaming,
        };
      });
      setSongSortable(sfx);
    } else {
      const song = data?.song.map((item) => {
        return {
          id: item._id,
          title: item.title,
          thumbnail: item.thumbnail,
          album: item.album,
          artists: item.artists,
          streaming: item.streaming,
        };
      });
      setSongSortable(song);
    }
    setPayload({
      title: data?.title || "",
      description: data?.description || "",
      list:
        data.song == ""
          ? data?.sfx.map((item) => {
              return item._id;
            })
          : data?.song.map((item) => {
              return item._id;
            }),
      thumbnail_collection: data?.thumbnail_collection || "",
      status: data?.status,
    });
    setAvatarPreviewLarge(data?.thumbnail_collection);
    document.getElementById("customSwitch-11").checked =
      data?.status === true ? true : false;
    setisLoading(false);
  };
  useEffect(() => {
    if (collection.modeEdit) {
      setisLoading(true);
      FetchGetCollection();
    }

    // eslint-disable-next-line
  }, [modeEdit]);
  useEffect(() => {
    if (songSortable.length > 0) {
      setPayload({
        ...payload,
        list: songSortable.map((item) => {
          return item.id;
        }),
      });
    }
    // eslint-disable-next-line
  }, [songSortable]);
  useEffect(() => {
    addCollection.current.scrollIntoView({ behavior: "smooth" });
  }, []);
  return (
    <Fragment>
      <div ref={addCollection} id="content-page" className="content-page">
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

            <div className="col-sm-7">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">
                      {" "}
                      {collection.modeEdit ? "Edit" : "Add"}
                      {collection.collection === "sfx" ? " Sfx " : " Music "}
                      Collection
                    </h4>
                  </div>
                </div>

                <div className="iq-card-body">
                  <form>
                    <div className="row">
                      <div className="col-sm-6">
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
                          <label>
                            <span className="text-danger font-size-16 font-weight-bold">
                              *{" "}
                            </span>{" "}
                            Title:
                          </label>
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
                          <label>Description:</label>
                          <textarea
                            onChange={(e) => {
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
                            {`Recommended size: 400x400px`}
                          </label>
                          <div className="custom-file">
                            <input
                              onChange={(e) => {
                                setPayload({
                                  ...payload,
                                  thumbnail_collection: e.target.files[0],
                                });
                                handlePreviewThumbnailLarge(e);
                              }}
                              type="file"
                              accept="image/*"
                              className="custom-file-input"
                              id="customFileThumbnailLarge"
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFileThumbnailLarge"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>
                        {avatarPreviewLarge && (
                          <div
                            style={{
                              position: "relative",
                            }}
                          >
                            <div
                              className="form-group"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={
                                  avatarPreviewLarge.preview
                                    ? avatarPreviewLarge.preview
                                    : payload?.thumbnail_collection
                                }
                                className="img-thumbnail"
                                alt="Responsive "
                                style={{
                                  width: "500px",
                                  objectFit: "cover",
                                  position: "relative",
                                }}
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
                                    thumbnail_collection: "",
                                  });
                                  setAvatarPreviewLarge() &&
                                    URL.revokeObjectURL(avatarPreviewLarge);
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
                                {/* <i  className="ri-pencil-line upload-button"></i> */}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <div
                          style={{
                            height: "60vh",
                            overflowY: "scroll",
                          }}
                          className="form-group "
                        >
                          <label className="">
                            Sortable{" "}
                            {collection.collection === "sfx" ? "Sfx:" : "Song:"}
                          </label>
                          <Dnd list={songSortable} setList={setSongSortable} />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleSubmit}
                      style={{ marginRight: "8px" }}
                      type="button"
                      className="btn btn-primary"
                    >
                      {collection.modeEdit ? "Update" : "Submit"}
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
            <div className="col-sm-5">
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">
                      Find {collection.collection === "sfx" ? "sfx " : "song "}
                      to add
                    </h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <SearchSong
                    setList={setSongSortable}
                    listSongID={songSortable}
                    type={collection.collection}
                    //map list song to id
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default AddCollection;
