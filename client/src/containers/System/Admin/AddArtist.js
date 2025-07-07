import React, { Fragment, useEffect, useState } from "react";
import { apiCreateArtist, apiGetArtist, apiUpdateArtist } from "../../../apis";
import Swal from "sweetalert2";
import { Loading } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";

const AddArtist = (modeEdit) => {
  var dataForm = new FormData();
  const { aid } = useParams();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [validate, setValidate] = useState("");
  const [payload, setPayload] = useState({
    name: "",
    description: "",
    emailAddress: "",
    DateofBirth: "",
    cover: "",
    thumbnail: "",
  });
  const [thumnailPreview, setThumbnailPreview] = useState();
  const [coverPreview, setCoverPreview] = useState();
  const FetchGetArtist = async () => {
    const response = await apiGetArtist(aid);
    const data = response.data.data;
    setPayload({
      name: data.name,
      description: data.description,
      emailAddress: data.emailAddress,
      DateofBirth: data.DateofBirth,
      cover: data.cover,
      thumbnail: data.thumbnail,

    });
    setThumbnailPreview(data.thumbnail);
    setCoverPreview(data.cover);
    setisLoading(false);
  };
  useEffect(() => {
    if (modeEdit.modeEdit) {
      setisLoading(true);
      FetchGetArtist();
    }
    // eslint-disable-next-line
  }, [modeEdit]);
  const handlePreviewThumbnail = (e) => {
    const file = e.target.files[0];
    dataForm.append("thumbnail", e.target.files[0]);
    file.preview = URL.createObjectURL(file);
    // console.log(file.preview);
    setThumbnailPreview(file);
  };
  const handlePreviewCover = (e) => {
    const file = e.target.files[0];
    dataForm.append("cover", e.target.files[0]);
    file.preview = URL.createObjectURL(file);
    // console.log(file.preview);
    setCoverPreview(file);
  };

  const handleSubmit = () => {
    setisLoading(true);

    if (modeEdit.modeEdit) {
      const FetchUpdateArtist = async () => {
        const response = await apiUpdateArtist(aid, dataForm);
        if (response.status === 200) {
          Swal.fire("Success", "Artist has been updated", "success");
          navigate("/admin/artist");
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      };
      if (payload.name === "") {
        setValidate("Artist name is required");
      } else if (payload.name.length < 3) {
        setValidate("Artist name must be at least 3 characters");
      } else {
        console.log(payload);
        FetchUpdateArtist();
      }
    } else {
      const FetchCreateArtist = async () => {
        const response = await apiCreateArtist(dataForm);
        if (response.status === 200) {
          setisLoading(false);
          Swal.fire("Success", "Artist has been created", "success");
          navigate("/admin/artist");
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      };
      if (payload.name === "") {
        setValidate("Artist name is required");
        setisLoading(false);
      } else if (payload.name.length < 3) {
        setisLoading(false);
        setValidate("Artist name must be at least 3 characters");
      } else {
        FetchCreateArtist();
      }
    }
  };
  useEffect(() => {
    dataForm.append("name", payload.name);
    dataForm.append("description", payload.description);
    dataForm.append("emailAddress", payload.emailAddress);
    dataForm.append("DateofBirth", payload.DateofBirth);
    dataForm.append("cover", payload.cover);
    dataForm.append("thumbnail", payload.thumbnail);
  },
  // eslint-disable-next-line
   [payload]);
useEffect(() => {
  return () => {
    thumnailPreview &&  URL.revokeObjectURL(thumnailPreview);
    coverPreview &&  URL.revokeObjectURL(coverPreview);
  };
}, [thumnailPreview, coverPreview]);

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
              <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">Add Artist</h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <form action="admin-Artist.html">
                    <div className="form-group">
                      <label>Artist Name:</label>
                      <input
                      defaultValue={
                        modeEdit.modeEdit ? payload.name : payload.name
                      }
                        onChange={(e) => {
                          setValidate("");
                          setPayload({
                            ...payload,
                            name: e.target.value.trim(),
                          });
                        }}
                        type="text"
                        className="form-control"
                      />
                      <small className="text-danger">{validate}</small>
                    </div>
                    <div className="form-group">
                      <label>{`Artist Art Profile: (Recommended: 280X270)`}</label>
                      <div className="custom-file">
                        <input

                          onChange={(e) => {
                            setPayload({
                              ...payload,
                              thumbnail: e.target.files[0],
                            });
                            handlePreviewThumbnail(e);
                          }}
                          type="file"
                          className="custom-file-input"
                          id="customFile"
                          accept="image/*"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFile"
                        >
                          Choose file
                        </label>
                      </div>
                    </div>
                    {thumnailPreview && (
                      <div
                        className="form-group"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <img
                          src={ thumnailPreview?.preview ? thumnailPreview?.preview : payload.thumbnail}
                          className="img-thumbnail"
                          alt="Responsive"
                          style={{
                            width: "200px",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: "2%",
                            left: "54%",
                          }}
                          onClick={() => {
                            setPayload({
                              ...payload,
                              thumbnail: {},
                            });
                            setThumbnailPreview() &&  URL.revokeObjectURL(thumnailPreview);
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
                    ) 
                  }
               
                    <div className="form-group">
                      <label>{`Artist Art Cover: (Recommended: 1740X230)`}</label>
                      <div className="custom-file">
                        <input
                          onChange={(e) => {
                            setPayload({
                              ...payload,
                              cover: e.target.files[0],
                            });
                            handlePreviewCover(e);
                          }}
                          type="file"
                          className="custom-file-input"
                          id="customFileCover"
                          accept="image/*"
                        />
                        <label
                          className="custom-file-label"
                          htmlFor="customFileCover"
                        >
                          Choose file
                        </label>
                      </div>
                    </div>
                    {coverPreview && (
                      <div
                        className="form-group"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          position: "relative",
                        }}
                      >
                        <img
                          src={ coverPreview?.preview ? coverPreview?.preview : payload.cover}
                          className="img-thumbnail"
                          alt="Responsive"
                          style={{
                            width: "1278px",
                            height: "464px",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: "2%",
                            right: "2%",
                          }}
                          onClick={() => {
                            setPayload({
                              ...payload,
                              cover: {},
                            });
                            setCoverPreview() &&  URL.revokeObjectURL(coverPreview);
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
                    )}
                    <div className="form-group">
                      <label>Artist Email:</label>
                      <input
                        defaultValue={
                          modeEdit.modeEdit ? payload.emailAddress : payload.emailAddress
                        }
                        onChange={(e) => {
                          setPayload({
                            ...payload,
                            emailAddress: e.target.value.trim(),
                          });
                        }}
                        type="email"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Date of Birth:</label>
                      <input
                        defaultValue={
                          modeEdit.modeEdit ? payload.DateofBirth : payload.DateofBirth
                        }
                        className="form-control"
                        type="date"
                        id="example-date"
                        onChange={(e) => {
                          setPayload({
                            ...payload,
                            DateofBirth: e.target.value.trim(),
                          });
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Artist Description:</label>
                      <textarea
                        defaultValue={
                          modeEdit.modeEdit ? payload.description : payload.description
                        }
                        onChange={(e) => {
                          setPayload({
                            ...payload,
                            description: e.target.value.trim(),
                          });
                        }}
                        className="form-control"
                        rows="4"
                      ></textarea>
                    </div>
                    <button
                      onClick={handleSubmit}
                      type="button"
                      className="btn btn-primary"
                    >
                     {modeEdit.modeEdit ? "Update" : "Submit"}
                    </button>
                    <button
                      onClick={() => {
                        setPayload({
                          name: "",
                          cover: {},
                          thumbnail: {},
                          emailAddress: "",
                          DateofBirth: "",
                          description: "",
                        });
                      }}
                      type="button"
                      className="btn btn-danger"
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

export default AddArtist;
