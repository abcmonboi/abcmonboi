import React, { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { path } from "ultils/constant";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, token, role } = useSelector((state) => state.auth);
  const { dataUser } = useSelector((state) => state.auth);

  const { currentUser } = useSelector((state) => state.user);
  //Navigation Active
  const [isActive, setIsActive] = useState(window.location.pathname);
  const handleClick = (event) => {
    // 👇️ toggle isActive state on click
    // setIsActive(event);
    navigate(event);
  };
  // go to login
  const goLogin = useCallback(() => {
    navigate(path.SIGNIN);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (window.location.pathname) {
      setIsActive(window.location.pathname);
    }
    //eslint-disable-next-line
  }, [window.location.pathname]);

  return (
    <Fragment>
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
                <a className="header-logo">
                  <img
                    src="/assets/images/logo.png"
                    className="img-fluid rounded-normal"
                    alt=""
                  />

                  <div className="pt-2 pl-2 logo-title">
                    <span className="text-primary text-uppercase">
                      AudioBay
                    </span>
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/*eslint-disable-next-line*/}
              {(isLoggedIn && token && +role === 6699) ||
              +currentUser?.role === 6699 ? (
                ""
              ) : (
                <ul className="list-unstyled iq-menu-top d-flex justify-content-between mb-0 p-0">
                  <li
                    className={
                      isActive === path.MUSIC || isActive === "/music"
                        ? "active"
                        : ""
                    }
                    onClick={() => handleClick("/music")}
                  >
                    <a>Music</a>
                  </li>
                  <li
                    className={isActive === path.SOUND_EFFECT ? "active" : ""}
                    onClick={() => handleClick(path.SOUND_EFFECT)}
                  >
                    <a>Sound Effects</a>
                  </li>
                  <li
                    className={isActive === path.ALBUMS ? "active" : ""}
                    onClick={() => handleClick(path.ALBUMS)}
                  >
                    <a>Albums</a>
                  </li>
                  <li
                    className={isActive === path.COLLECTIONS ? "active" : ""}
                    onClick={() => handleClick(path.COLLECTIONS)}
                  >
                    <a>Collections </a>
                  </li>
                  <li
                    className={isActive === path.ARTISTS ? "active" : ""}
                    onClick={() => handleClick(path.ARTISTS)}
                  >
                    <a>Artists </a>
                  </li>
                </ul>
              )}

              <ul className="navbar-nav ml-auto navbar-list">
                <li className="nav-item nav-icon">
                  <div className="iq-search-bar">
                    {/* <form action="#" className="searchbox">
                      <input
                        type="text"
                        className="text search-input"
                        placeholder="Search Here.."
                      />
                      <a className="search-link">
                        <i className="ri-search-line text-black"></i>
                      </a>
                      <a className="search-audio">
                        <i className="las la-microphone text-black"></i>
                      </a>
                    </form> */}
                  </div>
                </li>
                <li className="nav-item nav-icon search-content">
                  {/* <a className="search-toggle iq-waves-effect text-gray rounded">
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
                  </form> */}
                </li>
                {/* <li
                  onClick={() => {
                    document
                      .getElementsByClassName("line-height pt-3")[0]
                      .classList.toggle("iq-show");
                  }}
                  className="nav-item nav-icon"
                >
                  <a className="search-toggle iq-waves-effect text-black rounded">
                    <i className="las la-cog"></i>
                    <span className=" dots"></span>
                  </a>
                </li> */}
                <li className="line-height pt-3">
                  <a
                    onClick={() => {
                      if (!isLoggedIn) {
                        // <Link target={"_blank"} to={path.SIGNIN}/>
                        // window.open(`${path.SIGNIN}`,"bfs","width=500,height=500,scrollbars=yes,resizable=yes,top=500,left=10");
                        goLogin();
                      }
                    }}
                    className="search-toggle iq-waves-effect d-flex align-items-center"
                  >
                    {/* <img src="/assets/images/user/11.png" className="img-fluid rounded-circle" alt="user"/> */}
                    {!isLoggedIn ||
                    /*eslint-disable-next-line*/
                    (currentUser?.avatar === undefined &&
                      /*eslint-disable-next-line*/
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

                    {/* {isLoggedIn && (
                      <button type="button" class="btn mb-1 btn-primary"><i class="ri-account-box-line"></i>Sign in</button>
                    )} */}
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
                                : dataUser?.firstname +
                                  " " +
                                  dataUser?.lastname}
                            </h5>
                            <span className="text-white font-size-12">
                              {currentUser !== null
                                ? currentUser?.email
                                : dataUser?.email}
                            </span>
                          </div>
                          <a
                            onClick={() => {
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
                          {/* <a 
                          
                          onClick={() => {
                            navigate('/user/'+path.USER.ACCOUNT_SETTINGS);
                          }}
                          className="iq-sub-card iq-bg-primary-hover">
                            <div className="media align-items-center">
                              <div className="rounded iq-card-icon iq-bg-primary">
                                <i className="ri-account-box-line"></i>
                              </div>
                              <div
                              
                              className="media-body ml-3">
                                <h6 className="mb-0 ">Account settings</h6>
                                <p className="mb-0 font-size-12">
                                  Manage your account parameters.
                                </p>
                              </div>
                            </div>
                          </a> */}
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
                                <h6 className="mb-0 ">Privacy </h6>
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

                                // dispatch(actions.setIsPlaying(false));
                                // dispatch(actions.setCurrentSongId(null));
                                // actions.logout();
                                // navigate(path.PUBLIC);
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
    </Fragment>
  );
};

export default memo(Header);
