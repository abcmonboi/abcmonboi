import React, { Fragment, useCallback, useEffect, useState, memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { path } from "ultils/constant";
import { useSelector } from "react-redux";
import { ImMusic } from "react-icons/im";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { GiSoundWaves } from "react-icons/gi";
import { adminSidebar } from "ultils/constant";
const BlogSideBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, token, role } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.user);
  const [isActive, setIsActive] = useState(window.location.pathname);
  const handleHome = useCallback(() => {
    if (isLoggedIn && token && +currentUser?.role === 6699) {
      navigate(path.ADMIN.DASHBOARD);
    } else {
      navigate(path.PUBLIC);
      // window.open("https://audiobay.net/home", "_blank");
    }
    //eslint-disable-next-line
  }, []);

  const handleClick = (event) => {
    // 👇️ toggle isActive state on click
    setIsActive(event);
    navigate(event);
  };
  useEffect(() => {
    setIsActive(window.location.pathname);
  }, [window.location.pathname]);
  return (
    <div className="iq-sidebar">
      <div className="iq-sidebar-logo d-flex justify-content-between">
        <Link to={path.PUBLIC} className="header-logo">
          <img
            src="/assets/images/logo.png"
            className="img-fluid rounded-normal"
            alt=""
          />
          <div className="logo-title">
            <span className="text-primary text-uppercase">AudioBay</span>
          </div>
        </Link>
        <div className="iq-menu-bt-sidebar">
          <div className="iq-menu-bt align-self-center">
            <div className="wrapper-menu ">
              <div className="main-circle">
                <i className="las la-bars"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="sidebar-scrollbar">
        <nav className="iq-sidebar-menu">
          <ul id="iq-sidebar-toggle" className="iq-menu">
            {isActive.includes("/music") ? (
              <Fragment>
                <li
                  onClick={() => {
                    navigate("/home");
                  }}
                  className={isActive.includes("/home") ? "active" : ""}
                >
                  <a className="iq-waves-effect">
                    <span className="ripple rippleEffect"></span>
                    <i className="las la-home iq-arrow-left"></i>
                    <span>Trang chủ</span>
                  </a>
                </li>

                <li
                  onClick={() => {
                    navigate("/music");
                  }}
                  className={isActive.includes("/music") ? "active" : ""}
                >
                  <a className="iq-waves-effect">
                    <span className="ripple rippleEffect"></span>
                    <i>
                      <ImMusic className="icon-outside-react iq-arrow-left" />
                    </i>

                    <span>Âm nhạc</span>
                  </a>
                </li>

                <li
                  className={isActive.includes(path.MOOD_MUSIC) ? "active" : ""}
                  onClick={() => {
                    navigate(path.MOOD_MUSIC);
                  }}
                >
                  <a
                    className="iq-waves-effect"
                    data-toggle="collapse"
                    aria-expanded="false"
                  >
                    <span className="ripple rippleEffect"></span>
                    <i className="ri-drop-fill"></i>
                    <span>Tâm trạng</span>
                  </a>
                </li>

                <li
                  className={
                    isActive.includes(path.GENRE_MUSIC) ? "active" : ""
                  }
                  onClick={() => {
                    navigate(path.GENRE_MUSIC);
                  }}
                >
                  <a
                    className="iq-waves-effect"
                    data-toggle="collapse"
                    aria-expanded="false"
                  >
                    <span className="ripple rippleEffect"></span>
                    <i className="ri-function-line"></i>
                    <span>Thể loại</span>
                  </a>
                </li>

                <li
                  className={
                    isActive.includes(path.INSTRUMENT_MUSIC) ? "active" : ""
                  }
                  onClick={() => {
                    navigate(path.INSTRUMENT_MUSIC);
                  }}
                >
                  <a
                    className="iq-waves-effect"
                    data-toggle="collapse"
                    aria-expanded="false"
                  >
                    <span className="ripple rippleEffect"></span>
                    <i className="ri-netease-cloud-music-line"></i>

                    <span>Nhạc cụ</span>
                  </a>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <li
                  onClick={() => {
                    navigate("/home");
                  }}
                  className={isActive.includes("/home") ? "active" : ""}
                >
                  <a className="iq-waves-effect">
                    <span className="ripple rippleEffect"></span>
                    <i className="las la-home iq-arrow-left"></i>
                    <span>Trang chủ</span>
                  </a>
                </li>
                <li
                  onClick={() => {
                    navigate("/music");
                  }}
                  className={isActive.includes("/music") ? "active" : ""}
                >
                  <a className="iq-waves-effect">
                    <span className="ripple rippleEffect"></span>
                    <i>
                      {" "}
                      <ImMusic className="icon-outside-react iq-arrow-left" />{" "}
                    </i>
                    <span>Âm nhạc</span>
                  </a>
                </li>
                <li
                  className={
                    isActive.includes(path.THEMES) ||
                    isActive.includes(path.SEARCH_SUBTHEME)
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    navigate(path.THEMES);
                  }}
                >
                  <a className="iq-waves-effect">
                    <span className="ripple rippleEffect"></span>
                    <i className="ri-film-fill iq-arrow-left"></i>
                    <span>Nhạc Nền Video</span>
                  </a>
                </li>
                <li
                  className={isActive.includes("/collection") ? "active" : ""}
                  onClick={() => {
                    navigate("/collections");
                  }}
                >
                  <a className="iq-waves-effect">
                    <span className="ripple rippleEffect"></span>
                    <i>
                      <BsFillCollectionPlayFill className="icon-outside-react font-size-18" />
                    </i>
                    <span>Bộ sưu tập</span>
                  </a>
                </li>
                <li
                  className={isActive.includes("/albums") ? "active" : ""}
                  onClick={() => {
                    navigate("/albums");
                  }}
                >
                  <a className="iq-waves-effect">
                    <span className="ripple rippleEffect"></span>
                    <i className="ri-disc-fill"></i>
                    <span>Album</span>
                  </a>
                </li>
                <li
                  className={isActive.includes("/sfx") ? "active" : ""}
                  onClick={() => {
                    navigate("/sfx");
                  }}
                >
                  <a className="iq-waves-effect">
                    <span className="ripple rippleEffect"></span>
                    <i>
                      <GiSoundWaves className="icon-outside-react font-size-18" />
                    </i>
                    <span>Hiệu ứng âm thanh</span>
                  </a>
                </li>
                <li
                  className={isActive.includes("/artists") ? "active" : ""}
                  onClick={() => {
                    navigate("/artists");
                  }}
                >
                  <a className="iq-waves-effect">
                    <span className="ripple rippleEffect"></span>
                    <i className="ri-admin-line iq-arrow-left"></i>
                    <span>Nghệ sĩ</span>
                  </a>
                </li>
              </Fragment>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default memo(BlogSideBar);
