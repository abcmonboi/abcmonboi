import React, { Fragment, useEffect, useRef, useState } from "react";
import { apiGetAllThemes } from "apis";
import { HelmetComponent, Loading, Search } from "components";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const Themes = () => {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const [listThemes, setListThemes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(12);
  const [sort, setSort] = useState("-createdAt");
  const [fields, setFields] = useState([
    "title",
    "themesArtwork",
    "countThemesub",
    "slug",
  ]);
  const themePage = useRef(null);
  const fetchMore = () => {
    setPage(page + 1);
  };
  const FetchGetAllThemes = async (queries) => {
    try {
      const response = await apiGetAllThemes(queries);
      const dataRes = response?.data?.data;
      if (dataRes) {
        if (dataRes?.length === 0) {
          setHasMore(false);
          setListThemes([]);
        }
        if (queries?.page === 1) {
          setListThemes(dataRes);
        } else {
          setListThemes([...listThemes, ...dataRes]);
        }

        if (
          +response.data?.skip + +response.data?.limit >=
          +response.data?.counts
        ) {
          setHasMore(false);
        }
      } else {
        setListThemes([]);
        setHasMore(false);
      }
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  };
  useEffect(() => {
    themePage.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    FetchGetAllThemes({
      page: 1,
      limit: limit,
      sort: sort,
      status: true,
      fields: fields.join(","),
    });
  }, []);
  useEffect(() => {
    if (page !== 1) {
      const q = {
        page: page,
        limit: limit,
        sort: sort,
        status: true,
        fields: fields.join(","),
      };
      FetchGetAllThemes(q);
    }
    //eslint-disable-next-line
  }, [page]);
  return (
    <Fragment>
      <HelmetComponent
        title="Chủ Đề - AudioBay"
        description="Nền tảng âm nhạc và âm thanh đa dạng, từ miễn phí đến bản quyền. Khám phá và tận hưởng những bản nhạc chất lượng cao, phù hợp với mọi nhu cầu sáng tạo nội dung của bạn."
        imageUrl={listThemes?.[0]?.themesArtwork}
        imageAlt="chủ đề âm thanh"
        href={"https://audiobay.net/themes"}
      />
      <div ref={themePage} id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <Search />

            <Fragment>
              <div className="col-lg-12">
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between align-items-center">
                    <div className="iq-header-title">
                      <h4 className="card-title font-weight-normal">Chủ Đề</h4>
                    </div>
                    <div
                      id="feature-album-artist-slick-arrow"
                      className="slick-aerrow-block"
                    ></div>
                  </div>
                  <div
                    style={
                      `${isLoading}` === "true"
                        ? { height: "300px" }
                        : { height: "auto" }
                    }
                    className="iq-card-body"
                  >
                    {isLoading ? (
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
                    ) : listThemes?.length > 0 ? (
                      <InfiniteScroll
                        dataLength={listThemes?.length}
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
                          {listThemes &&
                            listThemes.map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  className="col-xl-2 col-lg-3 col-md-4 iq-music-box"
                                >
                                  <div
                                    onClick={() => {
                                      navigate(`/themes/${item?.slug}`);
                                    }}
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    className="iq-card "
                                  >
                                    <div className="iq-card-body p-0">
                                      <div className="iq-thumb">
                                        <div className="iq-music-overlay" />
                                        <a>
                                          <img
                                            src={item?.themesArtwork}
                                            className="img-border-radius img-fluid w-100"
                                            alt="themes"
                                          />
                                        </a>
                                      </div>
                                      <div className="feature-list text-center">
                                        <h6 className="font-weight-600  mb-0">
                                          {" "}
                                          {item?.title}
                                        </h6>
                                        <p className="mb-0">
                                          {item?.countThemesub > 0
                                            ? item?.countThemesub + " Playlist"
                                            : "No Playlist"}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
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
      </div>
    </Fragment>
  );
};

export default Themes;
