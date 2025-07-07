import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { path } from "../../ultils/constant";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import bgBackground from "../../assets/images/bg.jpg";
// import { set } from "mongoose";
import defaultAvatar from "../../assets/images/default_avatar.png";
import { HelmetComponent } from "components";
const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // get state auth from root reducer in redux
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(true);

  const { update, msgSignin } = useSelector((state) => state.auth);
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  const [invalidField, setInvalidField] = useState([]);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
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
        default:
          break;
      }
    });
    return invalids;
  };

  const handleSubmit = async () => {
    // setIsRefreshPage(false);
    let invalids = validate(payload);
    if (invalids === 0) {
      setIsLoading(true);
      dispatch(actions.login(payload));
      // if (role === "admin") {
      //   // navigate(path.ADMIN.HOME);
      //   // navigate(path.PUBLIC);
      // }

      setIsLoading(false);
    }
    if (
      document.cookie
        .split(";")
        .filter((item) => item.includes("remember=true")).length
    ) {
      document.cookie = "email" + "=" + payload.email ;
      document.cookie= "password" + "=" + payload.password ;
      // console.log(document.cookie);
    } else {
      document.cookie = "email=" + "";
      document.cookie = "password=" + "";
    }

    // console.log(actions.register(payload));
    // navigate(path.SIGNIN);
  };
  const HandleSignUp = useCallback(() => {
    navigate(path.SIGNNUP);
    // eslint-disable-next-line
  }, []);
  const HandleForgotPassword = useCallback(() => {
    navigate(path.FORGOT_PASSWORD);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    msgSignin && Swal.fire("Có lỗi rùi...", msgSignin, "error");
  }, [msgSignin, update]);
  useEffect(() => {
    if (isLoggedIn && +role === 6699) {
      // handleSignInSuccess();
      navigate(path.ADMIN.HOME);
      // navigate(path.PUBLIC);
    }
    if (isLoggedIn && +role === 1346) {
      navigate(path.PUBLIC);
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);
  const RememberMe = (e) => {
    document.cookie = "remember=" + e.target.checked;
  };
  useEffect(() => {
    if (
      document.cookie
        .split(";")
        .filter((item) => item.includes("remember=true")).length
    ) {
      document.getElementById("customCheck1").checked = true;
      setPayload ({
        ...payload,
        email: document.cookie
          .split("; ")
          .find((row) => row.startsWith("email"))
          .split("=")[1],
        password: document.cookie
          .split("; ")
          .find((row) => row.startsWith("password"))
          .split("=")[1],
      });
      
      // console.log(document.cookie);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
            <HelmetComponent
        title="Đăng nhập - AudioBay"
        description="Nền tảng âm nhạc và âm thanh đa dạng, từ miễn phí đến bản quyền. Khám phá và tận hưởng những bản nhạc chất lượng cao, phù hợp với mọi nhu cầu sáng tạo nội dung của bạn."
        imageAlt="đăng nhập"
        imageUrl={bgBackground}
        href={"https://audiobay.net/signin"}
      />
      <div>
        <section
          style={{
            backgroundImage: `url(${bgBackground})`,
          }}
          className="sign-in-page"
        >
          <div className="container">
            <div className="row justify-content-center align-items-center height-self-center">
              <div className="col-md-6 col-sm-12 col-12 align-self-center">
                <div className="sign-user_card ">
                  <div className="d-flex justify-content-center">
                    <div className="sign-user_logo">
                      {/* <img src="assets/images/login/user.png" className=" img-fluid" alt="Logo"/> */}
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
                            color: "var(--iq-primary)",
                          }}
                          className="fa fa-user  "
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div className="sign-in-page-data">
                    <div className="sign-in-from w-100 pt-5 m-auto">
                      <h1 className=" text-center">Sign in</h1>
                
                                 <h2 style={{
                                  cursor: "pointer",
                                 }} onClick={()=>
                                 navigate(path.PUBLIC)
                                } className=" text-center text-primary" ><i className="fa fa-home font-size-45" aria-hidden="true"></i></h2>
                      {/* <small id="errorMsg" className="text-danger">sss</small> */}
                      <form className="">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail2">
                            Email address
                          </label>
                          <input
                            autoComplete="off"
                            onFocus={() => setInvalidField([])}
                            value={payload.email}
                            type="email"
                            className="form-control mb-0"
                            placeholder="Enter your email"
                            onChange={(e) => {
                              // document.getElementById("errorMsg").innerHTML = "";
                              setPayload({
                                ...payload,
                                email: e.target.value,
                              });
                            }}
                          />
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
                          <label htmlFor="exampleInputPassword2">
                            Password
                          </label>
                          <input
                            autoComplete="off"
                            onFocus={() => setInvalidField([])}
                            type="password"
                            className="form-control mb-0"
                            placeholder="Password"
                            value={payload.password}
                            onChange={(e) => {
                              // document.getElementById("errorMsg").innerHTML = "";
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
                                  invalidField.find(
                                    (i) => i.name === "password"
                                  ).message
                                }
                              </small>
                            )}
                        </div>
                        <div className="sign-info">
                          <button
                            onClick={handleSubmit}
                            type="button"
                            className="btn btn-primary mb-2"
                            id="submitBtn"
                          >
                            Sign in
                          </button>
                          <span className="dark-color d-block line-height-2">
                            Don't have an account?{" "}
                            <a
                              onClick={() => {
                                HandleSignUp();
                              }}
                            >
                              Sign up
                            </a>
                          </span>
                        </div>
                        <div className="d-inline-block w-100">
                          <div className="custom-control custom-checkbox d-inline-block mt-2 pt-1">
                            <input
                              type="checkbox"
                              // checked={document.cookie.split(';').filter((item) => item.includes('remember=true')).length}
                              className="custom-control-input"
                              id="customCheck1"
                              onClick={(e) => RememberMe(e)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck1"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="d-flex justify-content-center links">
                      Don't have an account?{" "}
                      <a
                        onClick={() => {
                          dispatch(actions.clearState());
                          HandleSignUp();
                        }}
                        className="ml-2"
                      >
                        Sign Up
                      </a>
                    </div>
                    <div className="d-flex justify-content-center links">
                      <a
                        onClick={() => {
                          dispatch(actions.clearState());
                          HandleForgotPassword();
                        }}
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* {/* Sign in END */}
            {/* {/* color-customizer */}
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Signin;
