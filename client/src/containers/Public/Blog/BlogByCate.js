import React, { useEffect, useState, Fragment, useRef } from "react";
import { apiGetAllBlog, apiGetBlogCategoryBySlug } from "apis";
import { useNavigate } from "react-router-dom";
import { HelmetComponent, Loading } from "components";
import { useLocation } from "react-router-dom";
import { readingTime } from "ultils/fn";
import moment from "moment";
import { useParams } from "react-router-dom";

const BlogByCate = () => {
  const { state } = useLocation();
  const BlogByCatePage = useRef(null);
  // const blogCate = state?.blogCate;
  const { bcslug } = useParams();

  const [blogCate, setBlogCate] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(6);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const FetchData = async (queries) => {
    try {
      const response = await apiGetAllBlog(queries);
      const dataRes = response?.data?.data;
      if (dataRes) {
        if (dataRes?.length === 0) {
          setHasMore(false);
          setData([]);
        }
        if (queries?.page === 1) {
          setData(dataRes);
        } else {
          setData([...data, ...dataRes]);
        }

        if (
          +response.data?.skip + +response.data?.limit >=
          +response.data?.counts
        ) {
          setHasMore(false);
        }
      } else {
        setData([]);
        setHasMore(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      navigate("/404");
    }
  };
  const fetchMoreData = () => {
    setPage(page + 1);
  };
  const fetchBlogCategory = async (slug) => {
    await apiGetBlogCategoryBySlug(slug)
      .then((res) => {
        setBlogCate(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/404");
      });
  };

  useEffect(() => {
    if (page !== 1) {
      const q = {
        page: page,
        limit: limit,
        blogCategory: blogCate?._id,
        status: true,
      };
      FetchData(q);
    }
  }, [page]);

  useEffect(() => {
    BlogByCatePage.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    !hasMore && setHasMore(true);
   !isLoading && setIsLoading(true);
    if (state?.blogCate) {
      setBlogCate(state?.blogCate);
    } else {
      fetchBlogCategory(bcslug);
    }
    page !== 1 && setPage(1);
  }, [bcslug]);
  useEffect(() => {
    if (blogCate) {
      const q = {
        page: 1,
        limit: limit,
        blogCategory: blogCate?._id,
        status: true,
      };

      FetchData(q);
    }
  }, [blogCate]);
  return (
    <Fragment>
      <HelmetComponent
        title={blogCate?.title}
        description={blogCate?.description}
        imageUrl={blogCate?.blogCategory_thumbnail}
        imageAlt={`${blogCate?.title} - Audiobay}`}
        href={`https://audiobay.net/blog/${blogCate?.slug}`}
      />
      <main>
        <article>
          <section
            ref={BlogByCatePage}
            style={{
              paddingBlockStart: "calc(var(--section-padding) + 80px)",
            }}
            className="section-blog feature-blog d-block"
            aria-label="feature"
            id="featured-blog"
          >
            <div className="container-blog">
              <h2 className="headline-blog headline-2-blog section-title-blog">
                <span className="span-blog font-weight-600">
                  {blogCate?.title}
                </span>
              </h2>
              <p className="section-text-blog">{blogCate?.description}</p>
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-start min-vh-100">
                  <Loading />
                </div>
              ) : (
                <Fragment>
                  <ul className="feature-list-blog-by-cate p-0">
                    {/* <ul className="feature-list-blog p-0"> */}
                    {data?.length > 0 &&
                      data?.map((item, index) => (
                        <li key={index}>
                          <div className="card-blog feature-card-blog">
                            <figure
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                navigate(`/blog/post/${item?.slug}`, {
                                  state: {
                                    blog: item,
                                  },
                                });
                              }}
                              className="card-banner-blog img-holder-blog-feature"
                            >
                              <img
                                src={item?.blog_thumbnail}
                                width={1602}
                                height={903}
                                alt="Self-observation is the first step of inner unfolding"
                                className="img-cover-blog"
                              />
                            </figure>
                            <div className="card-content-blog">
                              <div className="card-wrapper-blog">
                                <div className="card-tag-blog">
                                  #
                                  <a
                                    onClick={() => {
                                      navigate(
                                        `/blog/${
                                          item?.blogCategory?.length > 0 &&
                                          item?.blogCategory?.find(
                                            (el) => el._id !== blogCate?._id
                                          )?.slug
                                        }`,
                                        {
                                          state: {
                                            blogCate:
                                              item?.blogCategory?.length > 0 &&
                                              item?.blogCategory?.find(
                                                (el) => el._id !== blogCate?._id
                                              ),
                                          },
                                        }
                                      );
                                    }}
                                    className="span-blog hover-2-blog"
                                  >
                                    {item?.blogCategory?.length > 0 &&
                                      item?.blogCategory?.find(
                                        (el) => el._id !== blogCate?._id
                                      )?.title}
                                  </a>
                                </div>
                                <div className="wrapper-blog">
                                  <i className="lar la-clock font-size-20" />
                                  <span className="span-blog">
                                    {readingTime(
                                      item?.description + item?.title
                                    )}
                                  </span>
                                </div>
                              </div>
                              <h3
                                style={{
                                  //min height by line
                                  height: "2.8em",
                                }}
                                className="headline-blog headline-3-blog description-infor-2-line"
                              >
                                <a
                                  onClick={() => {
                                    navigate(`/blog/post/${item?.slug}`, {
                                      state: {
                                        blog: item,
                                      },
                                    });
                                  }}
                                  title={item?.title}
                                  className="card-title-blog hover-2-blog "
                                >
                                  {item?.title}
                                </a>
                              </h3>
                              <div className="card-wrapper-blog">
                                <div className="profile-card-blog">
                                  <img
                                    style={{
                                      objectFit: "cover",
                                      width: "48px",
                                      height: "48px",
                                    }}
                                    src={item?.author?.avatar}
                                    //   width={48}
                                    //   height={48}

                                    alt="Joseph"
                                    className="profile-banner-blog"
                                  />
                                  <div>
                                    <p
                                      title={
                                        item?.author?.firstname +
                                        " " +
                                        item?.author?.lastname
                                      }
                                      className="card-title-blog mb-0 description-infor-1-line"
                                    >
                                      {item?.author?.firstname +
                                        " " +
                                        item?.author?.lastname}
                                    </p>
                                    <p className="card-subtitle-blog mb-0">
                                      {moment(item?.createdAt).format(
                                        "DD MMM YYYY"
                                      )}
                                    </p>
                                  </div>
                                </div>

                                <a
                                  onClick={() => {
                                    navigate(`/blog/post/${item?.slug}`, {
                                      state: {
                                        blog: item,
                                      },
                                    });
                                  }}
                                  className="card-btn-blog"
                                >
                                  Đọc thêm
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    {/* <li>
                <div className="card-blog feature-card-blog">
                  <figure
                    className="card-banner-blog img-holder-blog-feature"
                    //  style={{width: 1602, height: 903}}
                  >
                    <img
                      src="../assets/images/featured-2.png"
                      width={1602}
                      height={903}
                      
                      alt="Self-observation is the first step of inner unfolding"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="card-content-blog">
                    <div className="card-wrapper-blog">
                      <div className="card-tag-blog">
                        <a href="#" className="span-blog hover-2-blog">
                          #Design
                        </a>
                        <a href="#" className="span-blog hover-2-blog">
                          #Movie
                        </a>
                      </div>
                      <div className="wrapper-blog">
                        <ion-icon name="time-outline" aria-hidden="true" />
                        <span className="span-blog">6 mins read</span>
                      </div>
                    </div>
                    <h3 className="headline-blog headline-3-blog">
                      <a href="#" className="card-title-blog hover-2-blog">
                        Self-observation is the first step of inner unfolding
                      </a>
                    </h3>
                    <div className="card-wrapper-blog">
                      <div className="profile-card-blog">
                        <img
                          src="../assets/images/author-1.png"
                          width={48}
                          height={48}
                          
                          alt="Joseph"
                          className="profile-banner-blog"
                        />
                        <div>
                          <p className="card-title-blog mb-0">Joseph</p>
                          <p className="card-subtitle-blog mb-0">25 Nov 2022</p>
                        </div>
                      </div>
                      <a href="#" className="card-btn-blog">
                        Read more
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="card-blog feature-card-blog">
                  <figure
                    className="card-banner-blog img-holder-blog-feature"
                    //  style={{width: 1602, height: 903}}
                  >
                    <img
                      src="../assets/images/featured-3.png"
                      width={1602}
                      height={903}
                      
                      alt="Self-observation is the first step of inner unfolding"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="card-content-blog">
                    <div className="card-wrapper-blog">
                      <div className="card-tag-blog">
                        <a href="#" className="span-blog hover-2-blog">
                          #Design
                        </a>
                        <a href="#" className="span-blog hover-2-blog">
                          #Movie
                        </a>
                      </div>
                      <div className="wrapper-blog">
                        <ion-icon name="time-outline" aria-hidden="true" />
                        <span className="span-blog">6 mins read</span>
                      </div>
                    </div>
                    <h3 className="headline-blog headline-3-blog">
                      <a href="#" className="card-title-blog hover-2-blog">
                        Self-observation is the first step of inner unfolding
                      </a>
                    </h3>
                    <div className="card-wrapper-blog">
                      <div className="profile-card-blog">
                        <img
                          src="../assets/images/author-1.png"
                          width={48}
                          height={48}
                          
                          alt="Joseph"
                          className="profile-banner-blog"
                        />
                        <div>
                          <p className="card-title-blog mb-0">Joseph</p>
                          <p className="card-subtitle-blog mb-0">25 Nov 2022</p>
                        </div>
                      </div>
                      <a href="#" className="card-btn-blog">
                        Read more
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="card-blog feature-card-blog">
                  <figure
                    className="card-banner-blog img-holder-blog-feature"
                    //  style={{--width= "1602", --height= "903"}}
                  >
                    <img
                      src="../assets/images/featured-4.png"
                      width={1602}
                      height={903}
                      
                      alt="Self-observation is the first step of inner unfolding"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="card-content-blog">
                    <div className="card-wrapper-blog">
                      <div className="card-tag-blog">
                        <a href="#" className="span-blog hover-2-blog">
                          #Design
                        </a>
                        <a href="#" className="span-blog hover-2-blog">
                          #Movie
                        </a>
                      </div>
                      <div className="wrapper-blog">
                        <ion-icon name="time-outline" aria-hidden="true" />
                        <span className="span-blog">6 mins read</span>
                      </div>
                    </div>
                    <h3 className="headline-blog headline-3-blog">
                      <a href="#" className="card-title-blog hover-2-blog">
                        Self-observation is the first step of inner unfolding
                      </a>
                    </h3>
                    <div className="card-wrapper-blog">
                      <div className="profile-card-blog">
                        <img
                          src="../assets/images/author-1.png"
                          width={48}
                          height={48}
                          
                          alt="Joseph"
                          className="profile-banner-blog"
                        />
                        <div>
                          <p className="card-title-blog mb-0">Joseph</p>
                          <p className="card-subtitle-blog mb-0">25 Nov 2022</p>
                        </div>
                      </div>
                      <a href="#" className="card-btn-blog">
                        Read more
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="card-blog feature-card-blog">
                  <figure
                    className="card-banner-blog img-holder-blog-feature"
                    //  style={{width: 1602, height: 903}}
                  >
                    <img
                      src="../assets/images/featured-5.png"
                      width={1602}
                      height={903}
                      
                      alt="Self-observation is the first step of inner unfolding"
                      className="img-cover-blog"
                    />
                  </figure>
                  <div className="card-content-blog">
                    <div className="card-wrapper-blog">
                      <div className="card-tag-blog">
                        <a href="#" className="span-blog hover-2-blog">
                          #Design
                        </a>
                        <a href="#" className="span-blog hover-2-blog">
                          #Movie
                        </a>
                      </div>
                      <div className="wrapper-blog">
                        <ion-icon name="time-outline" aria-hidden="true" />
                        <span className="span-blog">6 mins read</span>
                      </div>
                    </div>
                    <h3 className="headline-blog headline-3-blog">
                      <a href="#" className="card-title-blog hover-2-blog">
                        Self-observation is the first step of inner unfolding
                      </a>
                    </h3>
                    <div className="card-wrapper-blog">
                      <div className="profile-card-blog">
                        <img
                          src="../assets/images/author-1.png"
                          width={48}
                          height={48}
                          
                          alt="Joseph"
                          className="profile-banner-blog"
                        />
                        <div>
                          <p className="card-title-blog mb-0">Joseph</p>
                          <p className="card-subtitle-blog mb-0">25 Nov 2022</p>
                        </div>
                      </div>
                      <a href="#" className="card-btn-blog">
                        Read more
                      </a>
                    </div>
                  </div>
                </div>
              </li> */}
                  </ul>
                </Fragment>
              )}
              {hasMore && (
                <a
                  onClick={fetchMoreData}
                  className="btn-blog btn-secondary-blog"
                >
                  <span className="span-blog">
                    {isLoading ? "Đang tải..." : "Xem thêm"}
                  </span>
                  <i
                    className="las la-arrow-right font-size-16"
                    aria-hidden="true"
                  ></i>
                </a>
              )}
            </div>
            <img
              src="../assets/images/shadow-3.svg"
              width={500}
              height={1500}
              alt="anh"
              className="feature-bg-blog"
            />
          </section>
        </article>
      </main>
    </Fragment>
  );
};

export default BlogByCate;
