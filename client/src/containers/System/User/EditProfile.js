import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Loading } from "../../../components";
import { apiUpdateUser } from "../../../apis";
import moment from "moment";
import * as actions from "../../../store/actions";
const EditProfile = () => {
  const [invalidFields, setInvalidFields] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [avatarPreview, setAvatarPreview] = useState();
  const [isLoading, setisLoading] = useState(false);
  var dataForm = new FormData();

  const [payload, setPayload] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    gender: "",
    age: "",
    addressString: "",
    avatar: "",
  });

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    // dataForm.append("thumbnail", file);
    file.preview = URL.createObjectURL(file);
    setAvatarPreview(file);
  };

  useEffect(() => {
    setPayload({
      firstname: currentUser?.firstname,
      lastname: currentUser?.lastname,
      dateOfBirth: currentUser?.dateOfBirth || "",
      gender: currentUser?.gender,
      age: currentUser?.age || "",
      addressString: currentUser?.addressString || "",
      avatar: currentUser?.avatar || "",
    });
    switch (currentUser?.gender) {
      case 1:
        document.getElementById("maleGender").checked = true;
        break;
      case 2:
        document.getElementById("femaleGender").checked = true;
        break;
      case 3:
        document.getElementById("otherGender").checked = true;
        break;
      default:
        break;
    }
  }, [currentUser]);

  useEffect(() => {
    dataForm.append("firstname", payload?.firstname?.trim() || "");
    dataForm.append("lastname", payload?.lastname?.trim() || "");
    dataForm.append("dateOfBirth", payload?.dateOfBirth || "");
    dataForm.append("gender", payload?.gender || 3);
    dataForm.append("age", payload?.age || "");
    dataForm.append("addressString", payload?.addressString.trim() || "");
    dataForm.append("avatar", payload?.avatar || "");
    // eslint-disable-next-line
  }, [payload]);
  const handleSubmit = () => {
    // console.log("payload")
    // console.log(payload);
    // for (const pair of dataForm.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }
    setisLoading(true);
    const FetchUpdateUser = async () => {
      const response = await apiUpdateUser(dataForm);
      dispatch(actions.getCurrentUser());
      setisLoading(false);
      // if (response.status === 200) {
      //   setisLoading(false);
      //   Swal.fire("Success", "Song has been created", "success");
      //   navigate("/admin/song");
      // } else {
      //   Swal.fire("Error", "Something went wrong", "error");
      // }
    };
    FetchUpdateUser();
  };

  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 ">
            <div className="iq-card ">
              <div className="iq-card-body p-0 ">
                <div className="iq-edit-list ">
                  <ul className="iq-edit-profile d-flex nav nav-pills d-flex justify-content-center">
                    <li className="col p-0">
                      <a
                        className="nav-link active"
                        data-toggle="pill"
                        href="#personal-information"
                      >
                        Personal Information
                      </a>
                    </li>
                    {/* <li className="col p-0">
                      <a
                        className="nav-link"
                        data-toggle="pill"
                        href="#chang-pwd"
                      >
                        Change Password
                      </a>
                    </li> */}
                    {/* <li className="col-md-3 p-0">
                      <a
                        className="nav-link"
                        data-toggle="pill"
                        href="#emailandsms"
                      >
                        Email and SMS
                      </a>
                    </li>
                    <li className="col-md-3 p-0">
                      <a
                        className="nav-link"
                        data-toggle="pill"
                        href="#manage-contact"
                      >
                        Manage Contact
                      </a>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12  ">
            <div className="iq-edit-list-data ">
              <div className="tab-content position-relative">
                <div
                  className="tab-pane fade active show "
                  id="personal-information"
                  role="tabpanel"
                >
                  <div className="iq-card ">
                    <div className="iq-card-header d-flex justify-content-between">
                      <div className="iq-header-title">
                        <h4 className="card-title">Personal Information</h4>
                      </div>
                    </div>
                    {isLoading ? (
                      <div
                        style={{
                          position: "absolute",
                          // top: "46%",
                          // left: "46%",
                          zIndex: "1000",
                          width: "100%",
                          height: "100%",
                        }}
                        className="d-flex justify-content-center align-items-center"
                      >
                        {" "}
                        <Loading />
                      </div>
                    ) : (
                      <div className="iq-card-body  ">
                        <form>
                          <div className="form-group row align-items-center">
                            <div className="col-md-12">
                              <div className="profile-img-edit">
                                {!avatarPreview ? (
                                  <Fragment>
                                    {currentUser?.avatar ? (
                                      <img
                                        style={{
                                          width: "150px",
                                          height: "150px",
                                          objectFit: "cover",
                                        }}
                                        className="profile-pic"
                                        htmlFor="file-upload"
                                        src={currentUser?.avatar}
                                        alt="profile-pic"
                                      />
                                    ) : (
                                      <div
                                        className=" rounded-circle  d-flex align-items-center justify-content-center "
                                        style={{
                                          width: "150px",
                                          height: "150px",
                                          margin: "0 auto",
                                          backgroundColor:
                                            "var(--iq-dark-primary)",
                                        }}
                                      >
                                        <i
                                          style={{
                                            fontSize: "80px",
                                          }}
                                          className="fa fa-user text-primary "
                                        ></i>
                                      </div>
                                    )}
                                    <div className="p-image">
                                      <label
                                        style={{ cursor: "pointer" }}
                                        htmlFor="file-upload"
                                      >
                                        {" "}
                                        <i className="ri-pencil-line upload-button"></i>
                                      </label>
                                      <input
                                        hidden
                                        // onChange={handleFileChange}
                                        onChange={(e) => {
                                          setPayload({
                                            ...payload,
                                            avatar: e.target.files[0],
                                          });
                                          handlePreviewAvatar(e);
                                        }}
                                        id="file-upload"
                                        //  className="file-upload"
                                        type="file"
                                        accept="image/*"
                                      />
                                    </div>
                                  </Fragment>
                                ) : (
                                  <Fragment>
                                    <img
                                      style={{
                                        width: "150px",
                                        height: "150px",
                                        objectFit: "cover",
                                      }}
                                      className="profile-pic"
                                      src={avatarPreview.preview}
                                      alt="profile-pic"
                                    />
                                    <div
                                      onClick={() => {
                                        setPayload({
                                          ...payload,
                                          avatar: {},
                                        });
                                        setAvatarPreview() &&
                                          URL.revokeObjectURL(avatarPreview);
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
                                  </Fragment>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className=" row align-items-center">
                            <div className="form-group col-sm-6">
                              <label htmlFor="firstname">First Name:</label>
                              <input
                                onFocus={() => setInvalidFields([])}
                                type="text"
                                className="form-control"
                                id="firstname"
                                name="firstname"
                                defaultValue={payload?.firstname}
                                onChange={(e) => {
                                  setPayload({
                                    ...payload,
                                    firstname: e.target.value,
                                  });
                                }}
                              />
                              {invalidFields.length > 0 &&
                                invalidFields.some(
                                  (i) => i.name === "firstname"
                                ) && (
                                  <small className="text-danger">
                                    {
                                      invalidFields.find(
                                        (i) => i.name === "firstname"
                                      ).message
                                    }
                                  </small>
                                )}
                            </div>
                            <div className="form-group col-sm-6">
                              <label htmlFor="lastname">Last Name:</label>
                              <input
                                onFocus={() => setInvalidFields([])}
                                type="text"
                                className="form-control"
                                id="lastname"
                                name="lastname"
                                defaultValue={payload?.lastname}
                                onChange={(e) => {
                                  setPayload({
                                    ...payload,
                                    lastname: e.target.value,
                                  });
                                }}
                              />
                              {invalidFields.length > 0 &&
                                invalidFields.some(
                                  (i) => i.name === "lastname"
                                ) && (
                                  <small className="text-danger">
                                    {
                                      invalidFields.find(
                                        (i) => i.name === "lastname"
                                      ).message
                                    }
                                  </small>
                                )}
                            </div>

                            <div className="form-group col-sm-6">
                              <label htmlFor="uname">Email Address:</label>
                              <input
                                readOnly
                                type="text"
                                className="form-control"
                                id="uname"
                                defaultValue={currentUser?.email}
                              />
                            </div>
                            <div className="form-group col-sm-6">
                              <label htmlFor="uname">Phone Number:</label>
                              <input
                                readOnly
                                type="text"
                                className="form-control"
                                id="uname"
                                defaultValue={currentUser?.mobile}
                              />
                            </div>
                            <div className="form-group col-sm-6">
                              <label htmlFor="example-date">
                                Date Of Birth:
                              </label>
                              <input
                                name="birthday"
                                defaultValue={payload?.dateOfBirth}
                                onFocus={(e) => {
                                  e.target.type = "date";
                                }}
                                onChange={(e) => {
                                  // console.log(moment(e.target.value).format("DD/MM/YYYY"));
                                  setPayload({
                                    ...payload,
                                    dateOfBirth: moment(e.target.value).format(
                                      "MM/DD/YYYY"
                                    ),
                                  });
                                }}
                                className="form-control"
                                type="text"
                                id="example-date"
                              ></input>
                            </div>
                            <div className="form-group col-sm-6">
                              <label className="d-block">Gender:</label>
                              <div className="custom-control custom-radio custom-control-inline">
                                <input
                                  type="radio"
                                  id="maleGender"
                                  name="customRadio1"
                                  className="custom-control-input"
                                  value={1}
                                  onChange={(e) => {
                                    setPayload({
                                      ...payload,
                                      gender: e.target.value,
                                    });
                                  }}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="maleGender"
                                >
                                  {" "}
                                  Male{" "}
                                </label>
                              </div>
                              <div className="custom-control custom-radio custom-control-inline">
                                <input
                                  type="radio"
                                  id="femaleGender"
                                  name="customRadio1"
                                  className="custom-control-input"
                                  value={2}
                                  onChange={(e) => {
                                    setPayload({
                                      ...payload,
                                      gender: e.target.value,
                                    });
                                  }}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="femaleGender"
                                >
                                  {" "}
                                  Female{" "}
                                </label>
                              </div>
                              <div className="custom-control custom-radio custom-control-inline">
                                <input
                                  type="radio"
                                  id="otherGender"
                                  name="customRadio1"
                                  className="custom-control-input"
                                  value={3}
                                  onChange={(e) => {
                                    setPayload({
                                      ...payload,
                                      gender: e.target.value,
                                    });
                                  }}
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="otherGender"
                                >
                                  {" "}
                                  Other{" "}
                                </label>
                              </div>
                            </div>
                            <div className="form-group col-sm-6">
                              <label htmlFor="uage">Age:</label>
                              <select
                                className="form-control"
                                id="exampleFormControlSelect2"
                                value={payload?.age}
                                onChange={(e) => {
                                  setPayload({
                                    ...payload,
                                    age: e.target.value,
                                  });
                                }}
                              >
                                <option value={""}>--Select Age--</option>
                                <option value={"12-18"}>12-18</option>
                                <option value={"19-32"}>19-32</option>
                                <option value={"33-35"}>33-45</option>
                                <option value={"46-62"}>46-62</option>
                                <option value={"63..."}>63... </option>
                              </select>
                            </div>
                            <div className="form-group col-sm-6">
                              <label>Address:</label>
                              <input
                                defaultValue={currentUser?.addressString}
                                onChange={(e) => {
                                  setPayload({
                                    ...payload,
                                    addressString: e.target.value,
                                  });
                                }}
                                className="form-control"
                                id="exampleFormControlSelect1"
                              ></input>
                            </div>
                          </div>
                          <button
                            onClick={handleSubmit}
                            type="button"
                            className="btn btn-primary mr-2"
                          >
                            Update
                          </button>
                          <button type="reset" className="btn iq-bg-danger">
                            Cancel
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className="tab-pane fade" id="chang-pwd" role="tabpanel">
                  <div className="iq-card">
                    <div className="iq-card-header d-flex justify-content-between">
                      <div className="iq-header-title">
                        <h4 className="card-title">Change Password</h4>
                      </div>
                    </div>
                    <div className="iq-card-body">
                      <form>
                        <div className="form-group">
                          <label htmlFor="cpass">Current Password:</label>
                          <a  className="float-right">
                            Forgot Password
                          </a>
                          <input
                            readOnly
                            type="Password"
                            className="form-control"
                            id="cpass"
                            value=""
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="npass">New Password:</label>
                          <input
                            readOnly
                            type="Password"
                            className="form-control"
                            id="npass"
                            value=""
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="vpass">Verify Password:</label>
                          <input
                            readOnly
                            type="Password"
                            className="form-control"
                            id="vpass"
                            value=""
                          />
                        </div>
                        <button type="submit" className="btn btn-primary mr-2">
                          Submit
                        </button>
                        <button type="reset" className="btn iq-bg-danger">
                          Cancel
                        </button>
                      </form>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
