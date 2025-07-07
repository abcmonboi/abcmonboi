import React, { Fragment, useRef, useState } from "react";
import { apiGetAllGenre } from "../../../apis/genre";
import { apiGetAllArtist } from "../../../apis/artist";
import {
  apiCreateAlbum,
  apiGetAlbumById,
  apiUpdateAlbum,
} from "../../../apis/album";
import { useEffect } from "react";
import { Loading } from "../../../components";
import Select from "react-select";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const AddAlbum = (modeEdit) => {
  const navigate = useNavigate();
  const { aid } = useParams();
  const [isLoading, setisLoading] = useState(false);
  const listRef = useRef();
  var dataForm = new FormData();
  const [albumArt, setAlbumArt] = useState();
  const [albumCover, setAlbumCover] = useState();
  const [payload, setPayload] = useState({
    title: "",
    isActive: true,
    artists: [],
    genres: [],
    album_art: "",
    album_cover: "",
    description: "",
  });
  const [genre, setGenre] = useState([]);
  const [artist, setArtist] = useState([]);
  const FetchGetAllGenre = async () => {
    const response = await apiGetAllGenre();
    const data = response.data.data.map((item) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
    setGenre(data);
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
  const handlePreviewArt = (e) => {
    setisLoading(true);
    const file = e.target.files[0];
    dataForm.append("album_art", file);
    file.preview = URL.createObjectURL(file);
    setAlbumArt(file);
    setisLoading(false);
  };
  const handlePreviewCover = (e) => {
    setisLoading(true);
    const file = e.target.files[0];
    dataForm.append("album_cover", file);
    file.preview = URL.createObjectURL(file);
    setAlbumCover(file);
    setisLoading(false);
  };
  const handleClear = () => {
    setAlbumArt();
    setAlbumCover();
    setPayload({
      title: "",
      isActive: true,
      artists: [],
      genres: [],
      album_art: "",
      album_cover: "",
      description: "",
    });
  };
  useEffect(() => {
    setisLoading(true);
    FetchGetAllGenre();
    FetchGetAllArtist();
    setisLoading(false);
  }, []);
  const handleSubmit = () => {
    setisLoading(true);

    if (modeEdit.modeEdit) {
      const FetchUpdateAlbum = async () => {
        const response = await apiUpdateAlbum(aid, dataForm);
        if (response.status === 200) {
          setisLoading(false);
          Swal.fire("Success", "Album has been updated", "success");
          navigate("/admin/album");
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
        // payload.title === "" ||
        payload.artists === "" ||
        // payload.genres === "" ||
        // payload.price === "" ||
        payload.album_art === "" 
        // ||        payload.album_cover === ""
      ) {
        listRef.current.scrollIntoView({ behavior: "smooth" });
        Swal.fire("Error", "Please check full input", "error");
        setisLoading(false);
      } else {

        FetchUpdateAlbum();
      }
    } else {
      const FetchCreateAlbum = async () => {
        const response = await apiCreateAlbum(dataForm);
        listRef.current.scrollIntoView({ behavior: "smooth" });
        if (response.status === 200) {
          setisLoading(false);
          Swal.fire("Success", "Album has been created", "success");
          navigate("/admin/album");
        } else {
          setisLoading(false);
          Swal.fire("Error", "Something went wrong", "error");
        }
      };
      if (
        payload.title === "" ||
        // payload.title === "" ||
        payload.artists === "" ||
        // payload.genres === "" ||
        // payload.price === "" ||
        payload.album_art === ""
        //  ||       payload.album_cover === ""
      ) {
        listRef.current.scrollIntoView({ behavior: "smooth" });
        Swal.fire("Error", "Please check full input", "error");
        setisLoading(false);
      } else {
        FetchCreateAlbum();
      }
    }
  };
  useEffect(() => {
    dataForm.append("title", payload.title.trim());
    dataForm.append("isActive", payload.isActive);
    payload?.artists &&
      //eslint-disable-next-line
      payload?.artists.map((item) => {
        dataForm.append("artists", item);
      });

    payload?.genres &&
      //eslint-disable-next-line
      payload?.genres.map((item) => {
        dataForm.append("genres", item);
      });
    dataForm.append("album_art", payload.album_art);
    dataForm.append("album_cover", payload.album_cover);
    dataForm.append("description", payload.description);
    //eslint-disable-next-line
  }, [payload]);
  const FetchGetAlbum = async () => {
    const response = await apiGetAlbumById(aid);
    const data = response.data.data;
    setPayload({
      title: data?.title || "",
      description: data?.description || "",

      artists: data?.artists.map((item) => {
        return item._id;
      }),
      artists_names: data?.artists_names,

      genres: data?.genres.map((item) => {
        return item._id;
      }),

      isActive: data?.isActive,
      album_art: data?.album_art || "",
      album_cover: data?.album_cover || "",
      //eslint-disable-next-line
      description: data?.description || "",
    });
    setAlbumArt(data?.album_art);
    setAlbumCover(data?.album_cover);
    setisLoading(false);
  };
  useEffect(() => {
    if (modeEdit.modeEdit) {
      setisLoading(true);
      FetchGetAlbum();
    }
    //eslint-disable-next-line
  }, [modeEdit]);
  return (
    <Fragment>
      <div id="content-page" className="content-page">
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
              <div ref={listRef} className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title"> {modeEdit.modeEdit ? "Edit" : "Create"} Album</h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <form action="admin-song.html">
                    <div className="form-group">
                      <label><span className="text-danger font-size-16 font-weight-bold">* </span>Album Title:</label>
                      <input
                        value={payload?.title}
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

                    <div
                      style={{
                        color: "black",
                      }}
                      className="form-group"
                    >
                      <label>Genre:</label>

                      <Select
                        isClearable={true}
                        disabled={genre.length === 0}
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
                        options={genre}
                        isSearchable={true}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e) => {
                          setPayload({
                            ...payload,
                            genres: e.map((item) => {
                              return item.value;
                            }),
                          });
                        }}
                        value={genre.map((item) => {
                          return payload.genres.includes(item.value)
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
                      <label><span className="text-danger font-size-16 font-weight-bold">* </span>Artist:</label>
                      <Select
                        isClearable={true}
                        disabled={artist.length === 0}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            background: "rgba(255,255,255,0.8)",
                            // border: "1px solid #e3e6f0",
                            // boxShadow: "none",
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

                    <div className="form-group">
                      <label>Status:</label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                        onChange={(e) => {
                          setPayload({
                            ...payload,
                            isActive: e.target.value,
                          });
                        }}
                        value={payload?.isActive}
                      >
                        <option value="" disabled="">
                          Choose Status
                        </option>
                        <option value={true}>active</option>
                        <option value={false}>disabled</option>
                      </select>
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
                      <label><span className="text-danger font-size-16 font-weight-bold">* </span>{`Album Art: (Recommended: 364X364)`}</label>
                      <div className="custom-file">
                        <input
                          onChange={(e) => {
                            setPayload({
                              ...payload,
                              album_art: e.target.files[0],
                            });
                            handlePreviewArt(e);
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
                    {albumArt && (
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
                            albumArt?.preview
                              ? albumArt?.preview
                              : payload?.album_art
                          }
                          className="img-thumbnail"
                          alt="Responsive"
                          style={{
                            width: "400px",
                            height: "300px",
                            objectFit: "cover",
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
                              album_art: {},
                            });
                            setAlbumArt() && URL.revokeObjectURL(albumArt);
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
                          <i className="ri-pencil-line upload-button"></i>
                        </div>
                      </div>
                    )}
                    <div className="form-group">
                      <label>{`Album Art Cover: (Recommended: 920X420) Không thêm sẽ dùng chung ảnh với Album Art`}</label>
                      <div className="custom-file">
                        <input
                          onChange={(e) => {
                            setPayload({
                              ...payload,
                              album_cover: e.target.files[0],
                            });
                            handlePreviewCover(e);
                          }}
                          type="file"
                          className="custom-file-input"
                          id="customFileThumbnailLarge"
                          accept="image/*"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFileThumbnailLarge"
                        >
                          Choose file
                        </label>
                      </div>
                    </div>
                    {albumCover && (
                      <div
                        className="form-group"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                           <div className="position-relative">
                        <img
                          src={
                            albumCover.preview
                              ? albumCover.preview
                              : payload?.album_cover
                          }
                          className="img-thumbnail"
                          alt="Responsive"
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
                              album_cover: "",
                            });
                            setAlbumCover() && URL.revokeObjectURL(albumCover);
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
                      type="button"
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

export default AddAlbum;
