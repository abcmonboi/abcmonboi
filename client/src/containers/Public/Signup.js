import React, { useCallback, useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import defaultAvatar from "../../assets/images/default_avatar.png";
import bgBackground from "../../assets/images/bg.jpg";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [isLoading, setIsLoading] = useState(true);
  const [invalidField, setInvalidField] = useState([]);
  const { msgSignup, update, success } = useSelector((state) => state.auth);

  const [payload, setPayload] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
  });
  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);
    fields.forEach((item) => {
      if (item[1] === "") {
        setInvalidField((prev) => [
          ...prev,
          {
            name: item[0],
            message: "This field is required",
          },
        ]);
        invalids++;
      }
    });
    fields.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 6) {
            setInvalidField((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Password must be at least 6 characters",
              },
            ]);
            invalids++;
          }
          break;
        case "email":
          if (!item[1].match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            setInvalidField((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Email is invalid",
              },
            ]);
            invalids++;
          }
          break;
        case "mobile":
          if (!item[1].match(/^[0-9]{10}$/)) {
            setInvalidField((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Mobile is invalid",
              },
            ]);
            invalids++;
          }
          break;

        default:
          break;
      }
    });
    return invalids;
  };

  const HandleSignIn = useCallback(() => {
    navigate(path.SIGNIN);
    // eslint-disable-next-line
  }, []);
  const handleSubmit = async () => {
    let invalids = validate(payload);
    if (invalids === 0) {
      dispatch(actions.register(payload));
      // setTimeout(() => {
      //   navigate("/signin");
      // }, 1000);
    }
  };

  useEffect(() => {
    msgSignup && Swal.fire("Có lỗi rùi...", msgSignup, "error");
    success === true &&
      msgSignup &&
      Swal.fire({
        icon: "success",
        text: msgSignup,
        title: "Success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          HandleSignIn();
        }
      });

    // eslint-disable-next-line
  }, [msgSignup, update]);

  return (
    <Fragment>
      <section style={{
            backgroundImage: `url(${bgBackground})`,
          }} className="sign-in-page">
        <div className="container">
          <div className="row justify-content-center align-items-center height-self-center">
            <div className="col-md-6 col-sm-12 col-12 align-self-center">
              <div className="sign-user_card ">
                <div className="d-flex justify-content-center">
                  <div className="sign-user_logo">
                    {/* <img
                      src="assets/images/login/user.png"
                      className=" img-fluid"
                      alt="Logo"
                    /> */}
                    {/* <img
                      src={defaultAvatar}
                      className=" img-fluid"
                      alt="Logo"
                    /> */}
                    <div
                        className=" rounded-circle  d-flex align-items-center justify-content-center "
                        style={{
                          width: "100px",
                          height: "100px",
                          // backgroundColor: "var(--iq-dark-primary)",
                          border: "1px solid #c6c2b0",
                        }}
                      >
                        <i
                          style={{
                            fontSize: "50px",
                            color:"var(--iq-primary)"
                          }}
                          className="fa fa-user  "
                        ></i>
                      </div>
                  </div>
                </div>
                <div className="sign-in-page-data">
                  <div className="sign-in-from w-100 m-auto pt-5">
                    <h1 className="mb-3 text-center">Sign Up</h1>
                    <form className="mt-4">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail2">First Name</label>
                        <input
                          onFocus={() => setInvalidField([])}
                          value={payload.firstname}
                          type="firstname"
                          // type="text"
                          className="form-control mb-0"
                          id="exampleInputEmail2"
                          placeholder="Your First Name"
                          required={true}
                          onChange={(e) => {
                            setPayload({
                              ...payload,
                              firstname: e.target.value,
                            });
                          }}
                        />
                        {invalidField.length > 0 &&
                          invalidField.some((i) => i.name === "firstname") && (
                            <small className="text-danger">
                              {
                                invalidField.find((i) => i.name === "firstname")
                                  .message
                              }
                            </small>
                          )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail2">Last Name</label>
                        <input
                          onFocus={() => setInvalidField([])}
                          value={payload.lastname}
                          type="lastname"
                          // type="text"
                          className="form-control mb-0"
                          id="exampleInputEmail2"
                          placeholder="Your Last Name"
                          required={true}
                          onChange={(e) => {
                            setPayload({
                              ...payload,
                              lastname: e.target.value,
                            });
                          }}
                        />
                        {invalidField.length > 0 &&
                          invalidField.some((i) => i.name === "lastname") && (
                            <small className="text-danger">
                              {
                                invalidField.find((i) => i.name === "lastname")
                                  .message
                              }
                            </small>
                          )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail3">
                          Email address
                        </label>
                        <input
                          onFocus={() => setInvalidField([])}
                          value={payload.email}
                          type="email"
                          className="form-control mb-0"
                          id="exampleInputEmail3"
                          placeholder="Enter email"
                          required={true}
                          onChange={(e) => {
                            setPayload({
                              ...payload,
                              email: e.target.value,
                            });
                          }}
                        />{" "}
                        {invalidField.length > 0 &&
                          invalidField.some((i) => i.name === "email") && (
                            <small className="text-danger">
                              {
                                invalidField.find((i) => i.name === "email")
                                  .message
                              }
                            </small>
                          )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail3">Phone Number</label>
                        <input
                          onFocus={() => setInvalidField([])}
                          value={payload.mobile}
                          type="mobile"
                          className="form-control mb-0"
                          id="exampleInputPhonenumber"
                          placeholder="Enter Phone Number"
                          required={true}
                          onChange={(e) => {
                            setPayload({
                              ...payload,
                              mobile: e.target.value,
                            });
                          }}
                        />
                        {invalidField.length > 0 &&
                          invalidField.some((i) => i.name === "mobile") && (
                            <small className="text-danger">
                              {
                                invalidField.find((i) => i.name === "mobile")
                                  .message
                              }
                            </small>
                          )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputPassword2">Password</label>
                        <input
                          onFocus={() => setInvalidField([])}
                          value={payload.password}
                          type="password"
                          className="form-control mb-0"
                          id="exampleInputPassword2"
                          placeholder="Password"
                          required={true}
                          onChange={(e) => {
                            setPayload({
                              ...payload,
                              password: e.target.value,
                            });
                          }}
                        />
                        {invalidField.length > 0 &&
                          invalidField.some((i) => i.name === "password") && (
                            <small className="text-danger">
                              {
                                invalidField.find((i) => i.name === "password")
                                  .message
                              }
                            </small>
                          )}
                      </div>
                      <div className="d-inline-block w-100">
                        <div className="custom-control custom-checkbox d-inline-block mt-2">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck2"
                            required={true}
                          />

                          <label
                            className="custom-control-label"
                            htmlFor="customCheck2"
                          >
                            I accept{" "}
                            <a >Terms and Conditions</a>
                          </label>
                        </div>
                      </div>
                      <div className=" mt-3">
                        <button
                          id="submitBtn"
                          type="button"
                          onClick={handleSubmit}
                          className="btn btn-primary mb-2"
                        >
                          Sign Up
                        </button>
                        <span className="d-block line-height-2">
                          Already Have Account ?{" "}
                          <a
                       
                            onClick={() => {
                              dispatch(actions.clearState());
                              HandleSignIn();
                            }}
                          >
                            Sign In
                          </a>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Signup;
