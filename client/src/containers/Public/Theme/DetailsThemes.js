import { useEffect, React, useState, Fragment, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { HelmetComponent, Loading } from "components";
import { apiGetAllSubTheme, apiGetThemeBySlug } from "apis";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { path } from "ultils/constant";
const DetailsThemes = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const [isLoadingSubThemes, setisLoadingSubThemes] = useState(true);
  const [listSubThemes, setListSubThemes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 8;
  const sort = "-createdAt";
  const fields = ["title", "themesubArtwork", "slug", "description"];
  const [theme, setTheme] = useState([]);
  const detailsThemePage = useRef(null);
  const fetchMore = () => {
    setPage(page + 1);
  };
  const FetchGetThemeBySlug = async () => {
    try {
      const response = await apiGetThemeBySlug(slug);
      const data = response.data.data;
      if (data.status === false) {
        navigate(path.THEMES);
      }
      setTheme(data);
      setisLoading(false);
    } catch (error) {}
  };
  const FetchGetAllSubThemeByThemeSlug = async (queries) => {
    try {
      const response = await apiGetAllSubTheme(queries);
      const dataRes = response?.data?.data;
      if (dataRes) {
        if (dataRes?.length === 0) {
          setHasMore(false);
          setListSubThemes([]);
        }
        if (queries?.page === 1) {
          setListSubThemes(dataRes);
        } else {
          setListSubThemes([...listSubThemes, ...dataRes]);
        }

        if (
          +response.data?.skip + +response.data?.limit >=
          +response.data?.counts
        ) {
          setHasMore(false);
        }
      } else {
        setListSubThemes([]);
        setHasMore(false);
      }
      setisLoadingSubThemes(false);
    } catch (error) {
      setisLoadingSubThemes(false);
    }
  };
  useEffect(() => {
    const q = {
      page: page,
      limit: limit,
      sort: sort,
      status: true,
      themeSlug: slug,
      fields: fields.join(","),
    };
    if (slug) {
      FetchGetThemeBySlug();
       if (page === 1) {
        q.page = 1;
        FetchGetAllSubThemeByThemeSlug(q);
       } else if (page !== 1) {
        q.page = page;
        FetchGetAllSubThemeByThemeSlug(q);
       }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, page]);

  return (
    <div ref={detailsThemePage} id="content-page" className="content-page">
      <HelmetComponent
        title="AudioBay - Chủ Đề Âm Thanh"
        description={theme?.title + " - " + theme?.description}
        imageUrl={theme?.themesArtwork}
        imageAlt={theme?.title + " - " + theme?.description}
        href={"https://audiobay.net/themes/" + theme?.slug}
      />
      <div className="container-fluid">
        <Fragment>
          <div className="row  ">
            <div className="col-lg-12 ">
              <div className="iq-card position-relative">
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  className="iq-card"
                  viewBox="0 0 640 427"
                  preserveAspectRatio="xMidYMid slice"
                >
                  {!isLoading && (
                    <img
                      filter="url(#blur)"
                      style={{
                        objectFit: "cover",
                        width: "inherit",
                        height: "inherit",
                      }}
                      className="iq-card"
                      src={theme?.themesArtwork}
                      alt="SFX"
                    />
                  )}
                </div>
                <div
                  className="iq-card position-absolute"
                  style={{
                    height: "100%",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0,0,0,.7)",
                  }}
                />
                <div className="iq-card-body ">
                  <div className="row d-flex justify-content-spacebetween  ">
                    <div className="col-lg-12  ">
                      <div className="d-flex align-items-top justify-content-between iq-music-play-detail">
                        <div className="music-detail ">
                          <div className="row d-flex justify-content-between pr-3 pl-3">
                            <h6 className="text-white">Chủ đề</h6>
                          </div>
                          <h3 className="mb-2 text-white">
                            {isLoading ? "..." : theme?.title}
                          </h3>
                          <span className="text-white details-theme-mobile">
                            {isLoading
                              ? Array(200).fill(".").join(" ")
                              : theme?.description}
                          </span>
                          <div className="d-flex align-items-center">
                            <div className=" d-flex align-items-center mr-2 mt-3">
                              <p
                                className="btn btn-primary mr-2 d-flex align-items-center"
                                onClick={() => {
                                  if (
                                    navigator.clipboard &&
                                    window.isSecureContext
                                  ) {
                                    navigator.clipboard?.writeText(
                                      window.location.href
                                    );
                                  } else {
                                    alert(
                                      "Your browser doesn't support copy to clipboard"
                                    );
                                  }

                                  document.getElementById(
                                    "shareLink"
                                  ).style.opacity = 1;
                                  document.getElementById(
                                    "shareLink"
                                  ).style.display = "flex";

                                  setTimeout(() => {
                                    document.getElementById(
                                      "shareLink"
                                    ).style.opacity = 0;
                                    document.getElementById(
                                      "shareLink"
                                    ).style.display = "none";
                                  }, 3000);
                                }}
                              >
                                Share{" "}
                                <i
                                  style={{
                                    fontSize: "20px",
                                  }}
                                  className="ml-1 las la-share-alt-square text-white"
                                ></i>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="iq-card ">
              <div
                style={
                  `${isLoadingSubThemes}` === "true"
                    ? { height: "500px" }
                    : { height: "auto" }
                }
                className="iq-card-body"
              >
                {isLoadingSubThemes ? (
                  <div
                    style={{
                      position: "absolute",
                      top: "42%",
                      left: "46%",
                    }}
                  >
                    {" "}
                    <Loading />
                  </div>
                ) : listSubThemes?.length > 0 ? (
                  <InfiniteScroll
                    style={{ overflow: "hidden" }}
                    dataLength={listSubThemes?.length}
                    next={fetchMore}
                    hasMore={hasMore}
                    loader={
                      hasMore && (
                        <p style={{ textAlign: "center" }}>
                          <Loading />
                        </p>
                      )
                    }
                  >
                    <ul className="list-unstyled row  iq-box-hover mb-0">
                      {listSubThemes &&
                        listSubThemes.map((item, index) => {
                          return (
                            <li
                              key={index}
                              className="col-xl-3 col-lg-4 col-md-4 iq-music-box"
                            >
                              <Link to={`${item.slug}`}>
                              <div
                                // onClick={() => {
                                //   navigate(`${item.slug}`);
                                // }}
                                // style={{
                                //   cursor: "pointer",
                                // }}
                                className="iq-card "
                              >
                                <div className="iq-card-body p-0">
                                  <div className="iq-thumb">
                                    <div className="iq-music-overlay" />
                                    <small>
                                      <img
                                        src={item?.themesubArtwork}
                                        className="img-border-radius img-fluid w-100"
                                        alt="themes"
                                      />
                                    </small>
                                  </div>
                                  <div className="feature-list text-center">
                                    <h6 className="font-weight-600  mb-0">
                                      {" "}
                                      {item?.title}
                                    </h6>
                                    <p className="mb-0">
                                      {item?.song?.length > 0
                                        ? item?.song?.length + " tracks"
                                        : "No tracks"}
                                    </p>
                                    <p
                                      title={item?.description}
                                      className="mb-0"
                                    >
                                      {isLoadingSubThemes
                                        ? Array(200).fill(".").join(" ")
                                        : item?.description?.slice(0, 23) +
                                          "..."}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </InfiniteScroll>
                ) : (
                  <div className="text-center mb-5 text-muted">
                    <h5 className="text-muted">No data</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default DetailsThemes;
