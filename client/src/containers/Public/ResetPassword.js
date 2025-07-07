import React, { useEffect, useState } from "react";
import defaultAvatar from "../../assets/images/default_avatar.png";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../ultils/constant";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions/auth";
import bgBackground from "../../assets/images/bg.jpg";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    password: "",
    token: token,
  });
  const { resetPasswordSuccess,update } = useSelector((state) => state.auth);
  const handleSubmit = async () => {
    if (payload.password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password is required!",
      });
    } else {
      dispatch(actions.resetPassword(payload));
      
    }
  };
  useEffect(() => {
    if (resetPasswordSuccess) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Reset password successfully!",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(path.SIGNIN);
        }
      });
    } if (resetPasswordSuccess === false) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Đổi mật khẩu thất bại!. Đường dẫn đã hết hạn",
      });
    }
    //eslint-disable-next-line
  }, [resetPasswordSuccess,update]);

  return (
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
                  <h4 className="mt-3 text-white mb-0 text-center">
                    ResetPassword
                  </h4>
                  <p className="text-white text-center">
                    Enter your new password.
                  </p>
                  <form className="mt-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">New Password</label>
                      <input
                        onChange={(e) =>
                          setPayload({ ...payload, password: e.target.value })
                        }
                        type="Password"
                        className="form-control mb-0"
                        id="exampleInputEmail1"
                        placeholder="Password"
                      />
                    </div>
                    <div className="d-inline-block w-100">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-primary float-right"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
