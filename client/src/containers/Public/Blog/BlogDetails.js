import React, { useEffect, useState, Fragment, useRef } from "react";
import { apiGetAllBlog, apiGetBlogBySlug } from "apis";
import { Link, useNavigate } from "react-router-dom";
import { HelmetComponent, Loading } from "components";
import { useLocation } from "react-router-dom";
import { parseTextFromMarkDown, readingTime } from "ultils/fn";
import moment from "moment";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { state } = useLocation();
  const { bslug } = useParams();
  const [data, setData] = useState();
  const [similar, setSimilar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async (slug) => {
    await apiGetBlogBySlug(slug)
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/404");
      });
  };
  const fetchSimilarData = async (bcid) => {
    await apiGetAllBlog({
      limit: 5,
      status: true,
      blogCategory: bcid,
    })
      .then((res) => {
        setSimilar(res?.data?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/404");
      });
  };

  const blogPage = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    blogPage.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [bslug]);
  useEffect(() => {
    if (state?.blog) {
      !isLoading && setIsLoading(true);
      setData(state?.blog);
      fetchSimilarData(state?.blog?.blogCategory[0]?._id);
    } else {
      fetchData(bslug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bslug]);
  useEffect(() => {
    if (!state || state === null) {
      if (data?.blogCategory?.length > 0) {
        !isLoading && setIsLoading(true);
        fetchSimilarData(data?.blogCategory[0]?._id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, state]);
  return (
    <main>
      <HelmetComponent
        title={data?.seo_title ? data?.seo_title : data?.title}
        description={
          data?.seo_description
            ? data?.seo_description
            : parseTextFromMarkDown(data?.description)
        }
        imageUrl={data?.blog_thumbnail}
        imageAlt={data?.title}
        href={"https://audiobay.co/blog/post/" + data?.slug}
      />
      <article>
        <section
          ref={blogPage}
          className="detail-blog feature-blog d-block"
          aria-label="detail-blog"
        >
          <div className="container-blog">
            <div className="hero-content-blog ">
              <div className="text-primary mb-4 ">
                {data?.blogCategory?.length > 0 &&
                  data?.blogCategory.map((el, index, self) => {
                    return (
                      <p
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate(`/blog/${el.slug}`, {
                            state: {
                              blogCate: el,
                            },
                          });
                        }}
                        key={index}
                        className="d-inline-block hero-subtitle-blog m-0 font-weight-bold text-uppercase"
                      >
                        {el.title}
                        {index === self.length - 1 ? (
                          ""
                        ) : (
                          <span className="d-inline-block ml-3 mr-3">|</span>
                        )}
                      </p>
                    );
                  })}
              </div>

              <h1 className="headline-blog headline-1-blog section-title-blog">
                <span
                  style={{
                    letterSpacing: "0.01em",
                  }}
                  className="font-weight-600  text-black"
                >
                  {data?.title}
                </span>
              </h1>
              <p className="hero-text-blog text-black font-size-18 mb-0 text-dark">
                {moment(data?.createdAt).format("DD MMM YYYY")}
                <span className="d-inline-block ml-2 mr-2">|</span>
                {data?.author?.firstname + " " + data?.author?.lastname}
                <span className="d-inline-block ml-2 mr-2">|</span>
                {data?.description
                  ? readingTime(data?.description + data?.title)
                  : ""}
              </p>
            </div>
            <div className="hero-banner-blog">
              <div className="card-blog feature-card-blog">
                <figure className="card-banner-blog img-holder-blog-feature">
                  <img
                    src={data?.blog_thumbnail}
                    width={1602}
                    height={903}
                    alt="Self-observation is the first step of inner unfolding"
                    className="img-cover-blog"
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>
        <section
          className="section-blog recent-post-blog d-block"
          id="recent-blog"
          aria-labelledby="recent-label"
        >
          <div className="container-blog">
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center ">
                <Loading />
              </div>
            ) : (
              <Fragment>
                <div className="card-detail-blog">
                  <div
                    //reset all style of html tag
                    style={{ all: "revert" }}
                    //parse html from markdown to html with DOMPurify to prevent XSS attack
                    // fix iframe not working
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(data?.description, {
                        ADD_TAGS: ["iframe", "img"],
                      }),
                    }}
                  ></div>
                </div>
              </Fragment>
            )}
            <div className="post-aside-blog grid-list-blog">
              <div className="card-blog aside-card-blog">
                <h3 className="headline-blog headline-2-blog aside-title-blog">
                  <span className="span-blog font-weight-600">
                    Bài viết liên quan
                  </span>
                </h3>
                {isLoading ? (
                  <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <Loading />
                  </div>
                ) : (
                  <Fragment>
                    <ul className="popular-list-blog p-0">
                      {similar?.length > 0 &&
                        similar?.map((item, index) => (
                          <li key={index}>
                            <div className="popular-card-blog">
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
                                className="card-banner-blog  img-holder-blog-post-popular"
                                // style={{ width: 64, height: 64 }}
                              >
                                <img
                                  src={item?.blog_thumbnail}
                                  width={64}
                                  height={64}
                                  alt={item?.title}
                                  className="img-cover-blog"
                                />
                              </figure>
                              <div className="card-content-blog">
                                <h4 className="headline-blog headline-4-blog card-title-blog">
                                  <Link
                                    to={`/blog/post/${item?.slug}`}
                                    // onClick={() => {
                                    //   navigate(`/blog/post/${item?.slug}`, {
                                    //     state: {
                                    //       blog: item,
                                    //     },
                                    //   });
                                    // }}
                                    className="link-blog hover-2-blog font-weight-400"
                                  >
                                    {item?.title}
                                  </Link>
                                </h4>
                                <div className="warpper-blog">
                                  <p className="card-subtitle-blog mb-0">
                                    {readingTime(
                                      item?.description + item?.title
                                    )}
                                  </p>
                                  <time
                                    className="publish-date-blog"
                                    dateTime="2022-04-15"
                                  >
                                    {moment(data?.createdAt).format(
                                      "DD MMM YYYY"
                                    )}
                                  </time>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default BlogDetails;
