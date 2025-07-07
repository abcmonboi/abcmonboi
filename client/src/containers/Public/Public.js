import React, { Fragment, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import * as actions from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import { path } from "ultils/constant";
import Swal from "sweetalert2";
import {
  ModalLicence,
  Sidebar,
  ModalFade,
  Footer,
  HeaderPublic,
  ModalShare,
} from "components";
const Public = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const { isLoggedIn, msg } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.user);
  const { isShowModal, modalData } = useSelector((state) => state.app);


  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(actions.getCurrentUser());
    }, 500);
    return () => {
      clearTimeout(setTimeoutId);
    };

    //eslint-disable-next-line
  }, [isLoggedIn]);

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 500);
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (msg) {
      Swal.fire("Oops...", msg, "info").then(() => {
        dispatch(actions.clearMsg());
        navigate(`${path.SIGNIN}`);
      });
    }
    //eslint-disable-next-line
  }, [msg]);
useEffect(()=>{
  var chatbox = document.getElementById("fb-customer-chat");
  chatbox.setAttribute("page_id", "102364172854277");
  chatbox.setAttribute("attribution", "biz_inbox");

},[])
  // if (isLoggedIn && +currentUser?.role === 6699)
  //   return <Navigate to={path.ADMIN.HOME} />;
  return (
    <div
      onClick={() => {
        if (isShowModal === true) dispatch(actions.setIsShowModal(false));
        if (modalData !== null) {
          dispatch(actions.setModalData(null));
          document.body.classList.remove("modal-open");
          //remove div classname="modal-backdrop fade show"
          var modalShow = document.getElementsByClassName(
            "modal-backdrop fade show"
          );
          modalShow.length > 0 && modalShow[0].remove();
        }
      }}

    >
      {isLoading && (
        <div id="loading">
          <div id="loading-center"></div>
        </div>
      )}
      <div
        id="shareLink"
        style={{
          border: "1px solid #1faf16",
          borderRadius: "0.3rem",
          position: "fixed",
          zIndex: "999",
          top: "80px",
          right: "10%",
          padding: "0.5rem 0.75rem",
          display: "none",
          justifyContent: "center",
          backgroundColor: "#daffdc",
          color: "#212529",
          fontSize: "16x",
          opacity: "0",
          transition: "all 0.3s ease-in-out",
          marginRight: "1rem",
        }}
      >
        <span>
          {"Link copied to clipboard "}
          <i className="las la-check-circle"></i>
        </span>
      </div>

      <HeaderPublic />
      <Sidebar />
      <Outlet />
      <Footer />

      {modalData && (
        <Fragment>
          <ModalFade />
          <ModalLicence />
          <ModalShare />
        </Fragment>
      )}
      {isShowModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default Public;
