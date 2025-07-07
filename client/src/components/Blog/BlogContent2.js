import React, { memo, useState, useEffect, Fragment } from "react";
import { apiGetAllBlog } from "apis";
import { Loading } from "components";
import { useNavigate } from "react-router-dom";
import { readingTime } from "ultils/fn";
import moment from "moment";
import shadow3 from "assets/images/shadow-3.svg";

const BlogContent2 = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const FetchData = async () => {
    try {
      const response = await apiGetAllBlog({
        limit: 5,
        status: true,
      });
      const dataRes = response?.data?.data;
      setData(dataRes);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      navigate("/404");
    }
  };
  useEffect(() => {
    FetchData();
  }, []);
  return (
    <section
      className="section-blog feature-blog d-block"
      aria-label="feature"
      id="featured-blog"
    >
      <div className="container-blog">
        <h2 className="headline-blog headline-2-blog section-title-blog">
          <span className="span-blog font-weight-600">
            Biên tập viên lựa chọn
          </span>
        </h2>
        <p className="section-text-blog">Featured and highly rated articles</p>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-start min-vh-100">
            <Loading />
          </div>
        ) : (
          <Fragment>
            <ul className="feature-list-blog p-0">
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
                          {item?.blogCategory[0] && (
                            <div className="card-tag-blog ">
                              #
                              <a
                                onClick={() => {
                                  navigate(
                                    `/blog/${
                                      item?.blogCategory?.length > 0 &&
                                      item?.blogCategory[0]?.slug
                                    }`,
                                    {
                                      state: {
                                        blogCate:
                                          item?.blogCategory?.length > 0 &&
                                          item?.blogCategory[0],
                                      },
                                    }
                                  );
                                }}
                                className="span-blog hover-2-blog"
                                title = {item?.blogCategory[0]?.title}
                              >
                                {item?.blogCategory[0]?.title?.length > 30
                                  ? item?.blogCategory[0]?.title?.substring(
                                      0,
                                      34
                                    ) + "..."
                                  : item?.blogCategory[0]?.title}
                              </a>
                            </div>
                          )}
                          <div className="wrapper-blog">
                            <i className="lar la-clock font-size-20" />
                            <span className="span-blog">
                              {readingTime(item?.description + item?.title)}
                            </span>
                          </div>
                        </div>
                        <h3 className="headline-blog headline-3-blog">
                          <a
                            onClick={() => {
                              navigate(`/blog/post/${item?.slug}`, {
                                state: {
                                  blog: item,
                                },
                              });
                            }}
                            title={item?.title}
                            className="card-title-blog hover-2-blog"
                          >
                            {item?.title}
                          </a>
                        </h3>
                        <div className="card-wrapper-blog">
                          <div className="profile-card-blog">
                            <img
                              src={item?.author?.avatar}
                              style={{
                                objectFit: "cover",
                                width: "48px",
                                height: "48px",
                              }}
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
                                className="card-title-blog mb-0"
                              >
                                {item?.author?.firstname +
                                  " " +
                                  item?.author?.lastname}
                              </p>
                              <p className="card-subtitle-blog mb-0">
                                {moment(item?.createdAt).format("DD MMM YYYY")}
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
            </ul>
          </Fragment>
        )}
        <a href="#recent-blog" className="btn-blog btn-secondary-blog">
          <span className="span-blog">Show More Posts</span>
          <i className="las la-arrow-right" aria-hidden="true"></i>
        </a>
      </div>
      <img
        src={shadow3}
        width={500}
        height={1500}
        alt="anh"
        className="feature-bg-blog"
      />
    </section>
  );
};

export default memo(BlogContent2);
