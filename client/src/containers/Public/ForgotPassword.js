import React, { Fragment } from "react";
import { useState, useEffect, useCallback } from "react";
import * as actions from "../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
import Swal from "sweetalert2";
import bgBackground from "../../assets/images/bg.jpg";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [hadSend, setHadSend] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [invalidField, setInvalidField] = useState([]);
  const { msgforgotPassWord, forgotPassWordSuccess, update } = useSelector(
    (state) => state.auth
  );

  const validate = (email) => {
    let invalids = 0;
    if (email === "") {
      setInvalidField((prev) => [
        ...prev,
        {
          name: "email",
          message: "This field is required",
        },
      ]);
      invalids++;
    } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setInvalidField((prev) => [
        ...prev,
        {
          name: "email",
          message: "Email is invalid",
        },
      ]);
      invalids++;
    } else {
      setInvalidField([]);
    }

    return invalids;
  };
  const HandleSignIn = useCallback(() => {
    //clear state
    dispatch(actions.clearState());
    navigate(path.SIGNIN);
    //eslint-disable-next-line
  }, []);
  const handleSubmit = async () => {
    let invalids = validate(email);
    if (invalids === 0) {
     
      dispatch(actions.forgotPassword({ email:email }));
      setIsSending(true);
    }
  };

  useEffect(() => {
    if (
      forgotPassWordSuccess === false &&
      isSending === true &&
      msgforgotPassWord !== undefined
    ) {
      setIsSending(false);
      Swal.fire("Opps...Something wrong !!!", msgforgotPassWord, "error");
    }
    if (forgotPassWordSuccess === true && isSending === true) {
      setIsSending(false);
      setHadSend(true);
    }
    //eslint-disable-next-line
  }, [forgotPassWordSuccess, update]);

  useEffect(() => {
    if (hadSend === true) {
      Swal.fire({
        icon: "success",
        text:
          "Email đã được gửi tới địa chỉ " +
          email +
          '. Kiểm tra hộp thư của bạn. Nhấn "OK" để về trang đăng nhập',
        title: "Success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          HandleSignIn();
        }
      });
    }
  });
  return (
    <Fragment>
      <section
      style={{
        backgroundImage: `url(${bgBackground})`,
      }} className="sign-in-page">
        <div className="container h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-md-6 col-sm-12 col-12 ">
              <div className="sign-user_card ">
                <div className="d-flex justify-content-center">
                  <div className="sign-user_logo">
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
                  <div className="sign-in-from w-100 m-auto pt-5">
                    <h1 className="mb-0">Reset Password</h1>
                    <p className="text-white">
                      Enter your email address and we'll send you an email with
                      instructions to reset your password.
                    </p>
                    <form className="mt-4">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <input
                          value={email}
                          type="email"
                          className="form-control mb-0"
                          id="exampleInputEmail1"
                          placeholder="Enter email"
                          onChange={(e) => setEmail(e.target.value)}
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
                      <div className="d-inline-block w-100">
                        <a
                          style={
                            isSending === true
                              ? { pointerEvents: "none" }
                              : { pointerEvents: "auto" }
                          }
                          onClick={handleSubmit}
                          className="btn btn-primary float-right"
                        >
                          {isSending === true ? "Sending..." : "Reset Password"}
                        </a>
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

export default ForgotPassword;
