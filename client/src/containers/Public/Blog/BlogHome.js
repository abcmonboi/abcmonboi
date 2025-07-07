import {
  BlogBanner,
  BlogContent1,
  BlogContent2,
  BlogContent3,
  BlogContent4,
} from "components";
import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { apiGetAllBlog } from "apis";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Loading } from "components";
import { readingTime } from "ultils/fn";
import metablog from "assets/images/audiobayblog.jpg";
import shadow3 from "assets/images/shadow-3.svg";
import { HelmetComponent } from "components";
const BlogHome = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(6);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const blogByTitle = useRef(null);
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

  useEffect(() => {
    blogByTitle?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    !hasMore && setHasMore(true);
    setIsLoading(true);
    page !== 1 && setPage(1);
    if (title) {
      const q = {
        page: 1,
        limit: limit,
        title: title,
        status: true,
      };

      FetchData(q);
    }
  }, [title]);
  useEffect(() => {
    if (page !== 1) {
      const q = {
        page: page,
        limit: limit,
        title: title,
        status: true,
      };
      FetchData(q);
    }
  }, [page]);

  return (
    <Fragment>
      <HelmetComponent
        title={`AudioBay Blog Thư viện âm nhạc chất lượng cao`}
        description={`Nhạc nền cho Video và những thủ thuật nâng tầm giá trị chất lượng sản phẩm cho các nhà sáng tạo nội dung số, Youtube, mạng xã hội, phim ảnh và các sự kiện "Sáng tạo và đột phá cùng âm nhạc của chúng tôi".`}
        imageUrl={metablog}
        imageAlt="AudioBay - Blog"
        href="https://audiobay.net/blog"
      />
      <main ref={blogByTitle}>
        <article>
          {title ? (
            <section
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
                    Kết quả tìm kiếm cho: {title}
                  </span>
                </h2>
                {isLoading ? (
                  <div className="d-flex justify-content-center align-items-start min-vh-100">
                    <Loading />
                  </div>
                ) : (
                  <Fragment>
                    <ul className="feature-list-blog-by-cate p-0">
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
                                  alt="BlogThumnail"
                                  className="img-cover-blog"
                                />
                              </figure>
                              <div className="card-content-blog">
                                <div className="card-wrapper-blog">
                                  {item?.blogCategory[0] && (
                                    <div className="card-tag-blog">
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
                                                  item?.blogCategory?.length >
                                                    0 && item?.blogCategory[0],
                                              },
                                            }
                                          );
                                        }}
                                        className="span-blog hover-2-blog"
                                      >
                                        {item?.blogCategory[0]?.title?.length >
                                        30
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
                                      {readingTime(
                                        item?.description + item?.title
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <h3
                                  style={{
                                    height: "2.8em",
                                  }}
                                  onClick={() => {
                                    navigate(`/blog/post/${item?.slug}`, {
                                      state: {
                                        blog: item,
                                      },
                                    });
                                  }}
                                  title={item?.title}
                                  className="headline-blog headline-3-blog description-infor-2-line"
                                >
                                  <a
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
                src={shadow3}
                width={500}
                height={1500}
                alt="anh"
                className="feature-bg-blog"
              />
            </section>
          ) : (
            <Fragment>
              <BlogBanner />
              <BlogContent1 />
              <BlogContent2 />
              <BlogContent3 />
              {/* Lỗi ở đây */}
              <BlogContent4 />
            </Fragment>
          )}
        </article>
      </main>
    </Fragment>
  );
};

export default BlogHome;
