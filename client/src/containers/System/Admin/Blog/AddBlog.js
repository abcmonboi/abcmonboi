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
  apiCreateBlog,
  apiGetAllBlogCategory,
  apiGetBlog,
  apiUpdateBlog,
} from "apis";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { path } from "ultils/constant";
import { useSelector } from "react-redux";

const AddBlog = ({ modeEdit }) => {
  const { bid } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState();
  const [blogThumnailPreview, setBlogThumnailPreview] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const navigate = useNavigate();
  const fpage = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // watch,
  } = useForm({});
  const [blogCategory, setblogCategory] = useState([]);
  const fetchAllBlogCategory = async () => {
    apiGetAllBlogCategory().then((res) => {
      const data = res.data.data.sort((a, b) => a.title.localeCompare(b.title));
      setblogCategory(
        data.map((el) => ({
          code: el._id,
          value: el.title,
        }))
      );
    });
  };
  useEffect(() => {
    fetchAllBlogCategory();
  }, []);
  const [payload, setPayload] = useState({
    description: "",
    blog_thumbnail: "",
    hashtag: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    // eslint-disable-next-line
    [payload]
  );
  const handleCreateData = async (data) => {
    fpage.current.scrollIntoView({ behavior: "smooth", block: "start" });
    //check if payload is empty
    setIsUploading(true);
    if (data?.author) data.author = user._id;
    const finalPayload = { ...data, ...payload };
    finalPayload?.blogCategory && delete finalPayload.blogCategory;
    finalPayload?.hashtag && delete finalPayload.hashtag;
    if(!isHide) delete finalPayload.seo_title && delete finalPayload.seo_description;
    const formData = new FormData();
    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
    data?.blogCategory &&
      data.blogCategory.map((el) => formData.append("blogCategory", el));
    payload?.hashtag &&
      payload.hashtag.map((el) => formData.append("hashtag", el));
    // const response = await apiCreateBlog(formData);
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    if (modeEdit) {
      await apiUpdateBlog(bid, formData)
        .then((res) => {
          setIsUploading(false);
          Swal.fire("Success", "Update data successfully", "success").then(
            () => {
              navigate(path.ADMIN.HOME + path.ADMIN.MANAGEBLOG);
            }
          );
        })
        .catch((err) => {
          Swal.fire("Error", `${err.response.data.mes}`, "error");
        });
    } else {
      // const formData = new FormData();
      // for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      await apiCreateBlog(formData)
        .then((res) => {
          setIsUploading(false);
          Swal.fire("Success", "Create data successfully", "success").then(
            () => {
              navigate(path.ADMIN.HOME + path.ADMIN.MANAGEBLOG);
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
    const response = await apiGetBlog(bid);
    const data = response.data.data;
    reset({
      title: data.title,
      blogCategory: data.blogCategory?.map((el) => el._id),
      status: data.status,
      author: data.author?.firstname + " " + data.author?.lastname,
      seo_title: data?.seo_title,
      seo_description: data?.seo_description,
    });
    if(data?.seo_title || data?.seo_description) setIsHide(true);
    setPayload({
      description: data.description,
      blog_thumbnail: data.blog_thumbnail,
      hashtag: data.hashtag,
    });
    setBlogThumnailPreview(data.blog_thumbnail);
  };
  useEffect(() => {
    // reset({
    //   title: "",
    //   blogCategory: "",
    // });
    // setPayload({
    //   description: "",
    // });
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
  useEffect(
    () => {
      if (currentUser) {
        setUser(currentUser);
        reset({
          author: currentUser?.firstname + " " + currentUser?.lastname,
        });
      }
    },
    // eslint-disable-next-line
    [currentUser]
  );
  //watch blogCategory
  const handlePayLoadHashtag = useCallback(
    (value, type) => {
      if (type === "add") {
        if (value?.length > 1) {
          value = value?.map((item) => {
            return item.trim();
          });
          setPayload({
            ...payload,
            hashtag: [...payload.hashtag, ...value],
          });
        } else {
          setPayload({
            ...payload,
            hashtag: [...payload.hashtag, ...value],
          });
        }
      } else {
        setPayload({
          ...payload,
          hashtag: payload.hashtag.filter(
            (itemHashtag) => itemHashtag !== value
          ),
        });
      }
    },
    [payload]
  );
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
                  {" "}
                  <Loading />
                </div>
              )}
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">
                    {modeEdit ? "Edit Blog" : "New Blog"}
                  </h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form
                  onKeyDown={(e) => checkKeyDown(e)}
                  onSubmit={handleSubmit(handleCreateData)}
                >
                  <CheckBoxHookForm
                    id="status"
                    register={register}
                    defaultChecked={!modeEdit && true}
                    errors={errors}
                  />

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
                  <div className="row">
                    <div className="col-md-6">
                      <InputHookForm
                        label="Author"
                        id="author"
                        type="text"
                        fullWidth={true}
                        register={register}
                        errors={errors}
                        validate={{ required: "Required!" }}
                        readOnly={true}
                        defaultValue={
                          user && user?.firstname + " " + user?.lastname
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <SelectHookForm
                        label="Blog Category"
                        options={blogCategory}
                        register={register}
                        id={"blogCategory"}
                        errors={errors}
                        validate={{ required: "Required!" }}
                        multiple={true}
                      />
                    </div>
                  </div>
                  <HashtagForm
                    handlePayLoadHashtag={handlePayLoadHashtag}
                    hashtags={payload?.hashtag}
                  />
                  <div className="form-group">
                    <label>
                      <span className="text-danger font-size-16 font-weight-bold">
                        *{" "}
                      </span>
                      {`Blog Thumbnail: (Recommend: 1600x900)`}
                    </label>
                    <div className="custom-file">
                      <input
                        onChange={(e) => {
                          setPayload({
                            ...payload,
                            blog_thumbnail: e.target.files[0],
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
                            : payload?.blog_thumbnail
                        }
                        className="img-thumbnail"
                        alt="Responsive "
                        style={{
                          width: "457px",
                          height: "258px",
                          objectFit: "cover",
                          aspectRatio: "16/9",
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
                            blog_thumbnail: "",
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
                  <MarkdownEditor
                    value={payload?.description}
                    name="description"
                    changeValue={changeValue}
                    label="Description:"
                    invalidFields={invalidFields}
                    setInvalidFields={setInvalidFields}
                  />
                  <div className="form-group">
                    <div className="custom-control custom-checkbox custom-checkbox-color custom-control-inline">
                      <input
                        type="checkbox"
                        className="custom-control-input "
                        id="custom_seo"
                        onChange={(e) => setIsHide(e.target.checked)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="custom_seo"
                      >
                        Custom SEO
                      </label>
                    </div>
                  </div>
                  {isHide && (
                    <div className="fadeIn">
                      <InputHookForm
                        label="Meta Title (SEO)"
                        id="seo_title"
                        type="text"
                        placeholder="Enter meta title (Meta title)"
                        fullWidth={true}
                        register={register}
                        errors={errors}
                        validate={{ required: "Required!" }}
                      />
                       <TextAreaHookForm
                        label="Meta Description (SEO)"
                        id="seo_description"
                        type="text"
                        placeholder="Enter meta description (Meta description)"
                        fullWidth={true}
                        register={register}
                        errors={errors}
                        validate={{ required: "Required!" }}
                      />
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

export default AddBlog;
