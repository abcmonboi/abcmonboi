import React, { Fragment, useEffect, useState, memo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { path } from "ultils/constant";
import { useSelector } from "react-redux";
import { ImMusic } from "react-icons/im";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { GiSoundWaves } from "react-icons/gi";
import { adminSidebar } from "ultils/constant";
import { MdSlowMotionVideo } from "react-icons/md";
import { FaGuitar, FaTheaterMasks } from "react-icons/fa";
import { RiUserVoiceFill } from "react-icons/ri";
const Sidebar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, token, role } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.user);
  const [isActive, setIsActive] = useState(window.location.pathname);

  const handleClick = (event) => {
    setIsActive(event);
  };
  useEffect(() => {
    setIsActive(window.location.pathname);
    //eslint-disable-next-line
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
          {(isLoggedIn && token && +role === 6699) ||
          +currentUser?.role === 6699 ? (
            <ul id="iq-sidebar-toggle" className="iq-menu">
              {adminSidebar.map((el) =>
                el.submenus ? (
                  <li key={el.id} className="active-menu">
                    <a
                      href={`#${el.link}`}
                      className="iq-waves-effect collapsed"
                      data-toggle="collapse"
                      aria-expanded="false"
                    >
                      {el.icon}
                      <span>{el.text}</span>
                      <i className="ri-arrow-right-s-line iq-arrow-right"></i>
                    </a>
                    <ul
                      id={el.link}
                      className="iq-submenu collapse"
                      data-parent="#iq-sidebar-toggle"
                    >
                      {el.submenus.map((sub) => (
                        <li
                          key={sub.id}
                          className={
                            isActive === (path.ADMIN.HOME + sub.link).trim()
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            handleClick(path.ADMIN.HOME + sub.link)
                          }
                        >
                          <Link to={path.ADMIN.HOME + sub.link}>
                            {sub.icon}
                            {sub.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li
                    key={el.id}
                    className={
                      isActive === (path.ADMIN.HOME + el.link).trim()
                        ? "active"
                        : ""
                    }
                  >
                    <Link
                      to={path.ADMIN.HOME + el.link}
                      className="iq-waves-effect"
                      data-toggle="collapse"
                      aria-expanded="false"
                    >
                      <span className="ripple rippleEffect"></span>
                      {el?.icon}
                      <span>{el?.text}</span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          ) : (
            <ul id="iq-sidebar-toggle" className="iq-menu">
              {isActive.includes("/music") ? (
                <Fragment>
                  <li className={isActive.includes("/home") ? "active" : ""}>
                    <Link to={path.HOME} className="iq-waves-effect">
                      <span className="ripple rippleEffect"></span>
                      <i className="las la-home iq-arrow-left"></i>
                      <span>Trang chủ</span>
                    </Link>
                  </li>

                  <li className={isActive.includes("/music") ? "active" : ""}>
                    <Link to={"/music"} className="iq-waves-effect">
                      <span className="ripple rippleEffect"></span>
                      <i>
                        <ImMusic className="icon-outside-react iq-arrow-left" />
                      </i>

                      {/* <i className="las la-headphones iq-arrow-left"></i> */}
                      <span>Âm nhạc</span>
                    </Link>
                  </li>

                  <li
                    className={
                      isActive.includes(path.MOOD_MUSIC) ? "active" : ""
                    }
                  >
                    <Link
                      to={path.MOOD_MUSIC}
                      className="iq-waves-effect"
                      data-toggle="collapse"
                      aria-expanded="false"
                    >
                      <span className="ripple rippleEffect"></span>
                      <i>
                        <FaTheaterMasks
                          size={22}
                          className="icon-outside-react iq-arrow-left"
                        />
                      </i>
                      {/* <i className="ri-drop-fill"></i> */}
                      <span>Tâm trạng</span>
                    </Link>
                  </li>
                  {/* 
                  <li
                    className={
                      isActive.includes(path.VIDEO_THEME_MUSIC) ? "active" : ""
                    }
                    onClick={() => {
                      navigate(path.VIDEO_THEME_MUSIC);
                    }}
                  >
                    <a
                      className="iq-waves-effect"
                      data-toggle="collapse"
                      aria-expanded="false"
                    >
                      <span className="ripple rippleEffect"></span>
                      <i className="ri-movie-fill"></i>
                      <span>Theme</span>
                    </a>
                  </li> */}

                  <li
                    className={
                      isActive.includes(path.GENRE_MUSIC) ? "active" : ""
                    }
                  >
                    <Link
                      to={path.GENRE_MUSIC}
                      className="iq-waves-effect"
                      data-toggle="collapse"
                      aria-expanded="false"
                    >
                      <span className="ripple rippleEffect"></span>
                      <i className="ri-function-line"></i>
                      <span>Thể loại</span>
                    </Link>
                  </li>

                  <li
                    className={
                      isActive.includes(path.INSTRUMENT_MUSIC) ? "active" : ""
                    }
                    // onClick={() => {
                    //   navigate(path.INSTRUMENT_MUSIC);
                    // }}
                  >
                    <Link
                      to={path.INSTRUMENT_MUSIC}
                      className="iq-waves-effect"
                      data-toggle="collapse"
                      aria-expanded="false"
                    >
                      <span className="ripple rippleEffect"></span>
                      <i>
                        <FaGuitar
                          size={22}
                          className="icon-outside-react iq-arrow-left"
                        />
                      </i>

                      <span>Nhạc cụ</span>
                    </Link>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li className={isActive.includes("/home") ? "active" : ""}>
                    <Link to={path.HOME} className="iq-waves-effect">
                      <span className="ripple rippleEffect"></span>
                      <i className="las la-home iq-arrow-left"></i>
                      <span>Trang chủ</span>
                    </Link>
                  </li>
                  <li
                    // onClick={() => {
                    //   navigate("/music");
                    // }}
                    className={isActive.includes("/music") ? "active" : ""}
                  >
                    <Link to={path.MUSIC} className="iq-waves-effect">
                      <span className="ripple rippleEffect"></span>
                      {/* <i className="las la-headphones iq-arrow-left"></i> */}
                      <i>
                        {" "}
                        <ImMusic className="icon-outside-react iq-arrow-left" />{" "}
                      </i>
                      <span>Âm nhạc</span>
                    </Link>
                  </li>
                  <li
                    className={
                      isActive.includes(path.THEMES) ||
                      isActive.includes(path.SEARCH_SUBTHEME)
                        ? "active"
                        : ""
                    }
                  >
                    <Link to={path.THEMES} className="iq-waves-effect">
                      <span className="ripple rippleEffect"></span>
                      <i>
                        <MdSlowMotionVideo
                          size={22}
                          className="icon-outside-react iq-arrow-left"
                        />
                      </i>
                      <span>Nhạc Nền Video</span>
                    </Link>
                  </li>
                  <li
                    className={isActive.includes("/collection") ? "active" : ""}
                  >
                    <Link to={path.COLLECTIONS} className="iq-waves-effect">
                      <span className="ripple rippleEffect"></span>
                      {/* <i className="lab la-elementor "></i> */}
                      <i>
                        <BsFillCollectionPlayFill className="icon-outside-react font-size-18" />
                      </i>
                      <span>Bộ sưu tập</span>
                    </Link>
                  </li>
                  <li className={isActive.includes("/albums") ? "active" : ""}>
                    <Link to={path.ALBUMS} className="iq-waves-effect">
                      <span className="ripple rippleEffect"></span>
                      <i className="ri-disc-fill"></i>
                      <span>Album</span>
                    </Link>
                  </li>
                  <li
                    className={isActive.includes("/sfx") ? "active" : ""}
                    // onClick={() => {
                    //   navigate("/sfx");
                    // }}
                  >
                    <Link to={path.SOUND_EFFECT} className="iq-waves-effect">
                      <span className="ripple rippleEffect"></span>
                      {/* <i className="ri-function-line"></i> */}
                      <i>
                        <GiSoundWaves className="icon-outside-react font-size-18" />
                      </i>
                      <span>Hiệu ứng âm thanh</span>
                    </Link>
                  </li>
                  <li
                    className={isActive.includes("/artists") ? "active" : ""}
                    onClick={() => {
                      navigate("/artists");
                    }}
                  >
                    <Link to={path.ARTISTS} className="iq-waves-effect">
                      <span className="ripple rippleEffect"></span>

                      <i>
                        <RiUserVoiceFill
                          size={22}
                          className="icon-outside-react iq-arrow-left"
                        />
                      </i>
                      <span>Nghệ sĩ</span>
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
};

export default memo(Sidebar);
