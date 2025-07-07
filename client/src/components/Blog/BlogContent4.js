import React, { useState, useEffect, memo, Fragment, useRef } from "react";
import { apiGetAllBlog } from "apis";
import {
  useSearchParams,
  createSearchParams,
  useLocation,
  Link,
} from "react-router-dom";
import { readingTime, parseTextFromMarkDown } from "ultils/fn";
import Loading from "components/Loading/Loading";
import instapot1 from "assets/images/insta-post-1.png";
import porpolarpot from "assets/images/popular-post-1.jpg";
import porpolarpot2 from "assets/images/popular-post-2.jpg";
import porpolarpot3 from "assets/images/popular-post-3.jpg";
import porpolarpot4 from "assets/images/popular-post-4.jpg";
import logo from "assets/images/LOGO AUDIOBAY PNG.png";

const BlogContent4 = () => {
  const [dataTable, setDataTable] = useState([]);
  const location = useLocation();
  const [params] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [counts, setCounts] = useState(0);
  // const [skip, setSkip] = useState(0);
  const currentPage = params.get("page") || 1;
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [arrPage, setArrPage] = useState([]);
  const limit = 5;
  const postBlog = useRef(null);
  const fetchDataTable = async (searchParam) => {
    await apiGetAllBlog({
      ...searchParam,
      limit: limit,
      status: true,
      fields: "title description status slug blog_thumbnail",
    })
      .then((res) => {
        if (res.data.data && res.data.data?.length > 0) {
          setDataTable(res.data.data);
          setCounts(res.data.counts);
          // setSkip(res.data.skip);
          setIsLoading(false);
        } else if (res.data.data?.length === 0) {
          setDataTable([]);
          setCounts(0);
          // setSkip(0);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    let maxPage = Math.ceil(counts / limit);
    let end = +currentPage + 3 > maxPage ? maxPage : +currentPage + 3;
    let start = +currentPage - 1 <= 0 ? 1 : +currentPage - 1;
    let temp = [];
    for (let i = start; i <= end; i++) {
      temp.push(i);
    }
    setArrPage(temp);
    if (+currentPage >= maxPage - 2) {
      setIsHideEnd(true);
    } else {
      setIsHideEnd(false);
    }
    if (+currentPage <= 2) {
      setIsHideStart(true);
    } else {
      setIsHideStart(false);
    }
    // eslint-disable-next-line
  }, [counts, dataTable, currentPage]);

  useEffect(() => {
    if (params) {
      setIsLoading(true);
      const searchParams = Object.fromEntries([...params]);
      if (searchParams?.page) {
        postBlog?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      fetchDataTable(searchParams);
    }
  }, [params]);
  return (
    <section
      className="section-blog recent-post-blog d-block"
      id="recent-blog"
      // aria-labelledby="recent-label"
      ref={postBlog}
    >
      <div className="container-blog">
        <div className="post-main-blog">
          <h2 className="headline-blog headline-2-blog section-title-blog">
            <span className="span-blog font-weight-600">Bài viết gần đây</span>
          </h2>
          <p className="section-text-blog ">
            Đừng bỏ lỡ những bài viết mới nhất
          </p>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
              <Loading />
            </div>
          ) : (
            <Fragment>
              <ul className="grid-list-blog p-0">
                {dataTable?.length > 0 &&
                  dataTable?.map((item, index) => {
                    return (
                      <li key={index}>
                        <div className="recent-post-card-blog">
                          <Link to={`/blog/post/${item?.slug}`}>
                            <figure
                              style={{
                                cursor: "pointer",
                              }}
                              className="card-banner-blog  img-holder-blog-post"
                            >
                              <img
                                src={item?.blog_thumbnail}
                                height={258}
                                width={457}
                                alt={item?.title}
                                className="img-cover-blog"
                              />
                            </figure>
                          </Link>
                          <div className="card-content-blog">
                            <Link
                              to={`/blog/${item?.blogCategory[0].slug}`}
                              className="card-badge-blog"
                            >
                              {item?.blogCategory[0].title}
                            </Link>
                            <h3 className="headline-blog headline-3-blog card-title-blog description-infor-2-line">
                              <Link
                                to={`/blog/post/${item?.slug}`}
                                title={item?.title}
                                className="link-blog hover-2-blog"
                              >
                                {item?.title}
                              </Link>
                            </h3>
                            <p className="card-text-blog mb-0 description-infor-2-line ">
                              {item?.description?.length > 200
                                ? parseTextFromMarkDown(
                                    item?.description
                                  )?.slice(0, 200)
                                : parseTextFromMarkDown(item?.description)}
                            </p>
                            <div className="card-wrapper-blog">
                              <div className="card-tag-blog">
                                {item?.blogCategory?.length > 2 &&
                                  item?.blogCategory?.map((item, index) => {
                                    if (index === 1) {
                                      return (
                                        <Link
                                          to={`/blog/${item?.slug}`}
                                          key={index}
                                          className="span-blog hover-2-blog"
                                        >
                                          {"# " + item?.title}
                                        </Link>
                                      );
                                    } else {
                                      return null;
                                    }
                                  })}
                              </div>
                              <div className="wrapper-blog">
                                <i className="lar la-clock font-size-20" />
                                <span className="span-blog">
                                  {readingTime(item?.description + item?.title)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </Fragment>
          )}
          {!isLoading && dataTable?.length > 0 && (
            <nav aria-label="pagination" className="pagination-blog">
              {!isHideStart && (
                <Fragment>
                  <Link
                    to={{
                      pathname: location.pathname,
                      search: createSearchParams({
                        page: +currentPage - 1,
                      }).toString(),
                    }}
                    // onClick={() => {
                    //   handleChangePage(+currentPage - 1);
                    // }}
                    className="pagination-btn-blog"
                    aria-label="previous page"
                  >
                    <i className="las la-arrow-left" aria-hidden="true"></i>
                  </Link>
                  <Link
                    to={location.pathname}
                    // onClick={() => {
                    //   handleChangePage(1);
                    // }}
                    className="pagination-btn-blog"
                    aria-label="more page"
                  >
                    ...
                  </Link>
                </Fragment>
              )}

              {arrPage?.length > 0 &&
                arrPage?.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      to={{
                        pathname: location.pathname,
                        search: createSearchParams({
                          page: item,
                        }).toString(),
                      }}
                      // onClick={() => {
                      //   handleChangePage(item);
                      // }}
                      className={`pagination-btn-blog ${
                        +currentPage === +item ? "active" : ""
                      }`}
                    >
                      {item}
                    </Link>
                  );
                })}
              {!isHideEnd && (
                <Fragment>
                  <Link
                    to={{
                      pathname: location.pathname,
                      search: createSearchParams({
                        page: Math.ceil(counts / limit),
                      }).toString(),
                    }}
                    // onClick={() => {
                    //   handleChangePage(Math.ceil(counts / limit));
                    // }}
                    className="pagination-btn-blog"
                    aria-label="more page"
                  >
                    ...
                  </Link>
                  <Link
                    to={{
                      pathname: location.pathname,
                      search: createSearchParams({
                        page: +currentPage + 1,
                      }).toString(),
                    }}
                    // onClick={() => {
                    //   handleChangePage(+currentPage + 1);
                    // }}
                    className="pagination-btn-blog"
                    aria-label="next page"
                  >
                    <i className="las la-arrow-right" aria-hidden="true"></i>
                  </Link>
                </Fragment>
              )}
            </nav>
          )}
        </div>
        <div className="post-aside-blog grid-list-blog">
          <div className="card-blog aside-card-blog">
            <h3 className="headline-blog headline-2-blog aside-title-blog">
              <span className="span-blog font-weight-600">
                Bài viết phổ biến
              </span>
            </h3>
            <ul className="popular-list-blog p-0">
              <li>
                <div className="popular-card-blog">
                  <figure className="card-banner-blog  img-holder-blog-post-popular">
                    <img
                      src={porpolarpot}
                      width={64}
                      height={64}
                      alt="Creating is a privilege but it’s also a gift"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="card-content-blog">
                    <h4 className="headline-blog headline-4-blog card-title-blog">
                      <Link className="link-blog hover-2-blog">
                        Creating is a privilege but it’s also a gift
                      </Link>
                    </h4>
                    <div className="warpper-blog">
                      <p className="card-subtitle-blog mb-0">15 mins read</p>
                      <time className="publish-date-blog" dateTime="2022-04-15">
                        15 April 2022
                      </time>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="popular-card-blog">
                  <figure className="card-banner-blog  img-holder-blog-post-popular">
                    <img
                      src={porpolarpot2}
                      width={64}
                      height={64}
                      alt="Being unique is better than being perfect"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="card-content-blog">
                    <h4 className="headline-blog headline-4-blog card-title-blog">
                      <Link className="link-blog hover-2-blog">
                        Being unique is better than being perfect
                      </Link>
                    </h4>
                    <div className="warpper-blog">
                      <p className="card-subtitle-blog mb-0">15 mins read</p>
                      <time className="publish-date-blog" dateTime="2022-04-15">
                        15 April 2022
                      </time>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="popular-card-blog">
                  <figure
                    className="card-banner-blog  img-holder-blog-post-popular"
                    // style={{ width: 64, height: 64 }}
                  >
                    <img
                      src={porpolarpot3}
                      width={64}
                      height={64}
                      alt="Every day, in every city and town across the country"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="card-content-blog">
                    <h4 className="headline-blog headline-4-blog card-title-blog">
                      <Link className="link-blog hover-2-blog">
                        Every day, in every city and town across the country
                      </Link>
                    </h4>
                    <div className="warpper-blog">
                      <p className="card-subtitle-blog mb-0">15 mins read</p>
                      <time className="publish-date-blog" dateTime="2022-04-15">
                        15 April 2022
                      </time>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="popular-card-blog">
                  <figure
                    className="card-banner-blog  img-holder-blog-post-popular"
                    // style={{ width: 64, height: 64 }}
                  >
                    <img
                      src={porpolarpot4}
                      width={64}
                      height={64}
                      alt="Your voice, your mind, your story, your vision"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="card-content-blog">
                    <h4 className="headline-blog headline-4-blog card-title-blog">
                      <Link className="link-blog hover-2-blog">
                        Your voice, your mind, your story, your vision
                      </Link>
                    </h4>
                    <div className="warpper-blog">
                      <p className="card-subtitle-blog mb-0">15 mins read</p>
                      <time className="publish-date-blog" dateTime="2022-04-15">
                        15 April 2022
                      </time>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="popular-card-blog">
                  <figure
                    className="card-banner-blog  img-holder-blog-post-popular"
                    // style={{ width: 64, height: 64 }}
                  >
                    <img
                      src={porpolarpot2}
                      width={64}
                      height={64}
                      alt="Being unique is better than being perfect"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="card-content-blog">
                    <h4 className="headline-blog headline-4-blog card-title-blog">
                      <Link className="link-blog hover-2-blog">
                        Being unique is better than being perfect
                      </Link>
                    </h4>
                    <div className="warpper-blog">
                      <p className="card-subtitle-blog mb-0">15 mins read</p>
                      <time className="publish-date-blog" dateTime="2022-04-15">
                        15 April 2022
                      </time>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="card-blog aside-card-blog insta-card-blog">
            <Link className="logo-blog">
              <img src={logo} width={119} height={37} alt="AudioBay Logo" />
            </Link>
            <p className="card-text-blog mb-0">Follow us on instagram</p>
            <ul className="insta-list-blog p-0">
              <li>
                <Link className="insta-post-blog img-holder-blog-insta">
                  <img
                    src={instapot1}
                    width={276}
                    height={277}
                    alt="insta post"
                    className="img-cover-blog"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(BlogContent4);
