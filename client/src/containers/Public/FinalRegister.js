import React, { useEffect,Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
import Swal from "sweetalert2";
import bgBackground from "../../assets/images/login.jpg";

const FinalRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "success") {
      Swal.fire({
        icon: "success",
        title: "Đăng ký thành công",
        text: "Vui lòng đăng nhập để sử dụng dịch vụ",
        confirmButtonText: "Đăng nhập",
        confirmButtonColor: "#ff0000",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(path.SIGNIN);
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Đăng ký thất bại",
        text: "Vui lòng thử lại",
        confirmButtonText: "Đăng ký",
        confirmButtonColor: "#ff0000",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(path.SIGNNUP);
        }
      });
    }
  }, [status]);
  return (
    <Fragment>
      <div>
        <section
          style={{
            backgroundImage: `url(${bgBackground})`,
          }}
          className="sign-in-page"
        ></section>
      </div>
    </Fragment>
  );
};

export default FinalRegister;
