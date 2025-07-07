import React, { useEffect, useState, memo } from "react";
import { Link, NavLink, createSearchParams, useNavigate } from "react-router-dom";
import logohblack from "assets/images/logo-headphone-black.svg";
import logohwhite from "assets/images/logo-headphone-white.svg";
import { apiGetAllBlogCategory } from "apis";
import { addEventOnElements } from "ultils/fn";
import { useForm } from "react-hook-form";
import { path } from "ultils/constant";

const BlogHeader = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [logos, setLogos] = useState(logohwhite);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({});

  useEffect(() => {
    const fetchData = async () => {
      apiGetAllBlogCategory({
        fields: "title slug description blogCategory_thumbnail",
        limit: 5,
      })
        .then((res) => {
          setMenu(res?.data?.data.slice(0, 5));
        })
        .catch((err) => {
          if (err) navigate("/home");
        });
    };
    fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navbar = document.querySelector("[data-navbar]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const toggleNav = () => {
    navbar && navbar?.classList.toggle("active");
    navTogglers && document?.body?.classList.toggle("nav-active");
  };

  addEventOnElements(navTogglers, "click", toggleNav);
  const header = document.querySelector("[data-header]");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header && header?.classList.add("active");
      header?.classList.contains("active") && setLogos(logohblack);
    } else {
      header?.classList.contains("active") &&
        header?.classList.remove("active");
      logos !== logohwhite && setLogos(logohwhite);
    }
  });
  const handleCreateData = async (data) => {
    const title = data.title?.trim();
    if (title) {
      reset();
      navigate({
        pathname: "/blog",
        search: createSearchParams({
          title,
        }).toString(),
      });
    } else {
      navigate("/blog");
    }
  };
  return (
    <header className="header-blog" data-header>
      <div className="container-blog">
        <NavLink to={path.BLOG} className="logo-blog">
          <img
            src={logos}
            // width={176}
            // height={50
            // width={119}
            // height={37}
            alt="AudioBay"
          />
        </NavLink>

        <nav className="navbar-blog" data-navbar>
          <div className="navbar-top-blog">
            <NavLink to={"/blog/"} className="logo-blog">
              <img
                src={logos}
                // width 505 x 126
                width={119}
                height={37}
                alt="AudioBay"
              />
            </NavLink>

            <button
              className="nav-close-btn-blog"
              aria-label="close menu"
              data-nav-toggler
            >
              <i className="las la-times font-size-28 " aria-hidden="true"></i>
            </button>
          </div>
          <ul className="navbar-list-blog p-0 mb-0">
            {menu?.length > 0 &&
              menu?.map((item, index) => (
                <li key={index}>
                  <Link to={`/blog/${item.slug}`}
                    style={
                      window.location.pathname === `/blog/${item.slug}`
                        ? {
                            color: "var(--bg-prussian-blue)",
                            fontWeight: "bold",
                          }
                        : {}
                    }
              
                    className="navbar-link-blog hover-1-blog text-center "
                    data-nav-toggler
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        <div className="input-wrapper-blog w-auto font-size-12 border rounded-pill shadow-sm">
          <form onSubmit={handleSubmit(handleCreateData)}>
            <input
              id="title"
              type="text"
              name="title"
              {...register("title")}
              placeholder="Search..."
              // required
              className="input-field-blog p-2 "
              autoComplete="off"
            />
          </form>
          <span className="search-link-blog">
            <i className="ri-search-line "></i>
          </span>
        </div>
        <Link
          style={{
            cursor: "pointer",
            fontSize: "28px",
          }}
          to="/"
          className=" text-center text-primary  "
        >
          <i className="fa fa-home" aria-hidden="true"></i>
        </Link>

        <button
          className="nav-open-btn-blog m-0 p-0"
          aria-label="open menu"
          data-nav-toggler
        >
          <i className="las la-bars font-size-28"></i>
        </button>
      </div>
    </header>
  );
};

export default memo(BlogHeader);
