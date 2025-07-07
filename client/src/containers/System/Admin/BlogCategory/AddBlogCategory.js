import {
  CheckBoxHookForm,
  HashtagForm,
  InputHookForm,
  Loading,
  MarkdownEditor,
  SelectHookForm,
  TextAreaHookForm,
} from "components";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  apiCreateBlogCategory,
  apiGetBlogCategory,
  apiUpdateBlogCategory,
} from "apis";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { path } from "ultils/constant";
import { useSelector } from "react-redux";
const AddBlogCategory = ({ modeEdit }) => {
  const { bcid } = useParams();
  const [blogThumnailPreview, setBlogThumnailPreview] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const fpage = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({});

  const [payload, setPayload] = useState({
    blogCategory_thumbnail: "",
  });

  const handleCreateData = async (data) => {
    fpage.current.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsUploading(true);
    const finalPayload = { ...data, ...payload };
    const formData = new FormData();
    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }

    if (modeEdit) {
      await apiUpdateBlogCategory(bcid, formData)
        .then((res) => {
          setIsUploading(false);
          Swal.fire("Success", "Update data successfully", "success").then(
            () => {
              navigate(path.ADMIN.HOME + path.ADMIN.MANAGEBLOGCATEGORY);
            }
          );
        })
        .catch((err) => {
          Swal.fire("Error", `${err.response.data.mes}`, "error");
        });
    } else {
      await apiCreateBlogCategory(formData)
        .then((res) => {
          setIsUploading(false);
          Swal.fire("Success", "Create data successfully", "success").then(
            () => {
              navigate(path.ADMIN.HOME + path.ADMIN.MANAGEBLOGCATEGORY);
            }
          );
        })
        .catch((err) => {
          Swal.fire("Error", `${err.response.data.mes}`, "error");
          setIsUploading(false);
        });
    }
  };
  //   console.log("watch", watch('data'));
  const FetchGetData = async () => {
    const response = await apiGetBlogCategory(bcid);
    const data = response.data.data;
    reset({
      title: data.title,
      description: data.description,
    });
    setPayload({
      blogCategory_thumbnail: data.blogCategory_thumbnail,
    });
    setBlogThumnailPreview(data.blogCategory_thumbnail);
  };
  useEffect(() => {
    if (modeEdit) {
      FetchGetData();
    }
    // eslint-disable-next-line
  }, [modeEdit]);
  const handlePreviewThumbnail = (e) => {
    const file = e.target.files[0];
    // dataForm.append("thumbnail", file);
    file.preview = URL.createObjectURL(file);
    setBlogThumnailPreview(file);
  };
  //watch blogCategory
  const checkKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };
  return (
    <div ref={fpage} id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row ">
          <div className="col-sm-12 position-relative ">
            <div className="iq-card position-relative  ">
              {isUploading && (
                <div
                  style={{
                    borderRadius: "15px",
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
                  <Loading />
                </div>
              )}
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">
                    {modeEdit ? "Edit Category" : "New Category"}
                  </h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form
                  onKeyDown={(e) => checkKeyDown(e)}
                  onSubmit={handleSubmit(handleCreateData)}
                >
                  <InputHookForm
                    label="Title"
                    id="title"
                    type="text"
                    placeholder="Enter title"
                    fullWidth={true}
                    register={register}
                    errors={errors}
                    validate={{ required: "Required!" }}
                  />
                  <TextAreaHookForm
                    label="Description"
                    id="description"
                    rows={3}
                    placeholder="Enter Description"
                    fullWidth={true}
                    register={register}
                    errors={errors}
                    validate={{ required: "Required!" }}
                  />
                  <div className="form-group">
                    <label>
                      <span className="text-danger font-size-16 font-weight-bold">
                        *{" "}
                      </span>
                      {`Category Thumbnail: (Recommend: 400x400)`}
                    </label>
                    <div className="custom-file">
                      <input
                        onChange={(e) => {
                          setPayload({
                            ...payload,
                            blogCategory_thumbnail: e.target.files[0],
                          });
                          handlePreviewThumbnail(e);
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
                  {blogThumnailPreview && (
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
                          blogThumnailPreview?.preview
                            ? blogThumnailPreview?.preview
                            : payload?.blogCategory_thumbnail
                        }
                        className="img-thumbnail"
                        alt="Responsive "
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          bottom: "10%",
                          right: "49%",
                        }}
                        onClick={() => {
                          setPayload({
                            ...payload,
                            blogCategory_thumbnail: "",
                          });
                          setBlogThumnailPreview() &&
                            URL.revokeObjectURL(blogThumnailPreview);
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

                  <button type="submit" className="btn btn-primary mr-2">
                    {modeEdit ? "Edit" : "Create"}
                  </button>
                  <button type="reset" className="btn btn-danger">
                    Reset
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlogCategory;
