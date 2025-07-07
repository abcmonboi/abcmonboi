import React, { useState, memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "store/actions";
import { path } from "ultils/constant";
import useFileDownloader from "hooks/useFileDownloader";
import logo from "assets/images/logo.png";
const HeaderPublic = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [donwloadFile, DownloaderComponentUI] = useFileDownloader();
  const download = (file) => donwloadFile(file);
  const navigate = useNavigate();
  const { token, role } = useSelector((state) => state.auth);
  const { dataUser } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.user);
  const [isActive, setIsActive] = useState(window.location.pathname);
  const { fileList } = useSelector((state) => state.music);

  useEffect(() => {
    if (fileList?.length > 0) {
      download(fileList[fileList?.length - 1]);
    }
  }, [fileList]);
  useEffect(() => {
    return () => {
      dispatch(actions.setDownload());
    };
  }, []);
  useEffect(() => {
    if (window.location.pathname) {
      setIsActive(window.location.pathname);
    }
    //eslint-disable-next-line
  }, [window.location.pathname]);
  return (
    <div className="iq-top-navbar">
      <div className="iq-navbar-custom">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <div className="iq-menu-bt d-flex align-items-center">
            <div className="wrapper-menu">
              <div className="main-circle">
                <i className="las la-bars"></i>
              </div>
            </div>
            <div className="iq-navbar-logo d-flex justify-content-between">
              <a onClick={() => navigate(path.HOME)} className="header-logo">
                <img src={logo} className="img-fluid rounded-normal" alt="" />

                <div className="pt-2 pl-2 logo-title">
                  <span className="text-primary text-uppercase">AudioBay</span>
                </div>
              </a>
            </div>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-label="Toggle navigation"
          >
            <i className="ri-menu-3-line"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {(isLoggedIn && token && +role === 6699) ||
            +currentUser?.role === 6699 ? (
              ""
            ) : (
              <ul className="list-unstyled iq-menu-top d-flex justify-content-between mb-0 p-0">
                <li
                  className={
                    isActive === "/" || isActive === "/home" ? "active" : ""
                  }
                >
                  <Link to={path.HOME}>Trang chủ</Link>
                </li>

                <li className={isActive.includes("/music") ? "active" : ""}>
                  <Link to={path.MUSIC}>Âm nhạc</Link>
                </li>

                <li
                  className={isActive.includes("/collection") ? "active" : ""}
                >
                  <Link to={path.COLLECTIONS}>Bộ sưu tập </Link>
                </li>
                <li className={isActive.includes("/albums") ? "active" : ""}>
                  <Link to={path.ALBUMS}>Album</Link>
                </li>
                <li
                  className={isActive.includes("/sfx") ? "active" : ""}
                >
                  <Link to={path.SOUND_EFFECT}>Hiệu ứng âm thanh</Link>
                </li>
                <li
                  className={isActive.includes("/artists") ? "active" : ""}
                >
                  <Link to={
                    path.ARTISTS
                  }>Nghệ sĩ </Link>
                </li>
              </ul>
            )}

            <ul className="navbar-nav ml-auto navbar-list">
              <li className="nav-item nav-icon"></li>
              <li className="nav-item nav-icon search-content">
                <a className="search-toggle iq-waves-effect text-gray rounded">
                  <span className="ripple rippleEffect "></span>
                  <i className="ri-search-line text-black"></i>
                </a>
                <form action="#" className="search-box p-0">
                  <input
                    type="text"
                    className="text search-input"
                    placeholder="Type here to search..."
                  />
                  <a className="search-link">
                    <i className="ri-search-line text-black"></i>
                  </a>
                  <a className="search-audio">
                    <i className="las la-microphone text-black"></i>
                  </a>
                </form>
              </li>
              {/* {isLoggedIn && token && (
            <li className="nav-item nav-icon ">
              <a
                onClick={() => {
                  document
                    .getElementsByClassName("line-height pt-3")[0]
                    .classList.toggle("iq-show");
                }}
                className="search-toggle iq-waves-effect text-black rounded"
              >
                <i className="las la-cog"></i>
                <span className=" dots"></span>
              </a>
            </li>
            )} */}

              {DownloaderComponentUI}
              <li className="line-height pt-3">
                <a
                  onClick={() => {
                    if (!isLoggedIn) {
                      navigate(path.SIGNIN);
                    }
                  }}
                  className="search-toggle iq-waves-effect d-flex align-items-center"
                >
                  {!isLoggedIn ||
                  (currentUser?.avatar === undefined &&
                    dataUser?.avatar === undefined) ||
                  currentUser?.avatar === "" ||
                  dataUser?.avatar === "" ? (
                    <div
                      className="rounded-circle  d-flex align-items-center justify-content-center "
                      style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "var(--iq-dark-primary)",
                      }}
                    >
                      <i
                        style={{
                          fontSize: "30px",
                        }}
                        className="fa fa-user  "
                      ></i>
                    </div>
                  ) : (
                    <img
                      src={
                        currentUser !== null
                          ? currentUser?.avatar
                          : dataUser?.avatar
                      }
                      className="img-fluid rounded-circle"
                      alt="user"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </a>

                {isLoggedIn && (
                  <div className="iq-sub-dropdown iq-user-dropdown">
                    <div className="iq-card shadow-none m-0">
                      <div className="iq-card-body p-0 ">
                        <div className="bg-primary p-3">
                          <h5 className="mb-0 text-white line-height">
                            Hello{" "}
                            {currentUser !== null
                              ? currentUser?.firstname +
                                " " +
                                currentUser?.lastname
                              : dataUser?.firstname + " " + dataUser?.lastname}
                          </h5>
                          <span className="text-white font-size-12">
                            {currentUser !== null
                              ? currentUser?.email
                              : dataUser?.email}
                          </span>
                        </div>
                        <a
                          onClick={() => {
                            // handleRemoveAudio();
                            navigate("/user/" + path.USER.PROFILE);
                          }}
                          className="iq-sub-card iq-bg-primary-hover"
                        >
                          <div className="media align-items-center">
                            <div className="rounded iq-card-icon iq-bg-primary">
                              <i className="ri-file-user-line"></i>
                            </div>
                            <div className="media-body ml-3">
                              <h6 className="mb-0 ">My Profile</h6>
                              <p className="mb-0 font-size-12">
                                View personal profile details.
                              </p>
                            </div>
                          </div>
                        </a>
                        <a
                          onClick={() => {
                            navigate("/user/" + path.USER.EDIT_PROFILE);
                          }}
                          className="iq-sub-card iq-bg-primary-hover"
                        >
                          <div className="media align-items-center">
                            <div className="rounded iq-card-icon iq-bg-primary">
                              <i className="ri-profile-line"></i>
                            </div>
                            <div className="media-body ml-3">
                              <h6 className="mb-0 ">Edit Profile</h6>
                              <p className="mb-0 font-size-12">
                                Modify your personal details.
                              </p>
                            </div>
                          </div>
                        </a>

                        <a
                          onClick={() => {
                            navigate("/user/" + path.USER.PRIVACY_SETTINGS);
                          }}
                          className="iq-sub-card iq-bg-primary-hover"
                        >
                          <div className="media align-items-center">
                            <div className="rounded iq-card-icon iq-bg-primary">
                              <i className="ri-lock-line"></i>
                            </div>
                            <div className="media-body ml-3">
                              <h6 className="mb-0 ">Privacy</h6>
                              <p className="mb-0 font-size-12">
                                Control your privacy parameters.
                              </p>
                            </div>
                          </div>
                        </a>
                        <div className="d-inline-block w-100 text-center p-3">
                          <a
                            className="bg-primary iq-sign-btn"
                            onClick={() => {
                              dispatch(actions.clearState());
                              dispatch(actions.logout());
                            }}
                            role="button"
                          >
                            Sign out<i className="ri-login-box-line ml-2"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default memo(HeaderPublic);
