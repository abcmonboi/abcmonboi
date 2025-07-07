import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { apiGetAllAlbum } from "apis";
import { Search, Loading, HelmetComponent, HotAlbum } from "components";
import InfiniteScroll from "react-infinite-scroll-component";

const Albums = () => {
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState([]);
  const [newAlbum, setNewAlbum] = useState([]);
  const albumPage = useRef(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 8;

  const FetchData = async (queries) => {
    try {
      const response = await apiGetAllAlbum(queries);
      const dataRes = response?.data?.data;
      if (dataRes) {
        if (dataRes?.length === 0) {
          setHasMore(false);
          setData([]);
        }
        if (queries?.page === 1) {
          setData(dataRes);
          setNewAlbum(dataRes[0]);
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
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  };
  const fetchMoreData = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    albumPage.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  useEffect(() => {
    const q = {
      page: page,
      limit: limit,
      isActive: true,
    };
    FetchData(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <Fragment>
      <HelmetComponent
        title="Album - AudioBay"
        description="Nền tảng âm nhạc và âm thanh đa dạng, từ miễn phí đến bản quyền. Khám phá và tận hưởng những bản nhạc chất lượng cao, phù hợp với mọi nhu cầu sáng tạo nội dung của bạn."
        imageUrl={newAlbum?.album_cover}
        imageAlt="Album"
        href={"https://audiobay.net/albums"}
      />
      <div ref={albumPage} id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <Fragment>
              <Search />
              <HotAlbum album={newAlbum} />
              <div className="col-lg-12">
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                      <h4 className="card-title">Album</h4>
                    </div>
                  </div>
                  <div className="iq-card-body">
                    {isLoading ? (
                      <div className="d-flex justify-content-center align-items-center min-vh-100">
                        <Loading />
                      </div>
                    ) : data?.length > 0 ? (
                      <InfiniteScroll
                        dataLength={data.length}
                        next={fetchMoreData}
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
                          {data &&
                            data.map((album, index) => {
                              return (
                                <li
                                  key={index}
                                  className="col-xl-3 col-lg-4 col-md-4 iq-music-box"
                                >
                                  <div className="iq-card ">
                                    <div className="iq-card-body p-0">
                                      <div className="iq-thumb">
                                        <Link to={`/albums/${album?.slug}`}>
                                          <div className="iq-music-overlay" />
                                          <img
                                            src={
                                              album?.album_art &&
                                              album?.album_art !== ""
                                                ? album?.album_art
                                                : "assets/images/dashboard/album-song/01.png"
                                            }
                                            className="img-border-radius img-fluid w-100"
                                            alt="album-img"
                                          />
                                        </Link>
                                      </div>
                                      <div className="feature-list text-center">
                                        <Link to={`/albums/${album?.slug}`}>
                                          <h6
                                            className="font-weight-600  mb-0 home_footer_link "
                                            data-toggle="tooltip"
                                            title={album?.title}
                                          >
                                            {album?.title &&
                                            album?.title.length > 30
                                              ? album?.title.slice(0, 30) +
                                                "..."
                                              : album?.title}
                                          </h6>
                                        </Link>
                                        <Link
                                          to={`/artists/${album?.artists[0].slug}`}
                                        >
                                          <p
                                            style={{
                                              textOverflow: "ellipsis",
                                              overflow: "hidden",
                                              whiteSpace: "nowrap",
                                            }}
                                            onMouseEnter={(e) => {
                                              e.target.style.overflow =
                                                "visible";
                                              e.target.style.whiteSpace =
                                                "normal";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.target.style.overflow =
                                                "hidden";
                                              e.target.style.whiteSpace =
                                                "nowrap";
                                            }}
                                            className="home_footer_link mb-0"
                                          >
                                            {album?.artists &&
                                            album?.artists.length > 0
                                              ? album?.artists
                                                  .map((artist) => artist.name)
                                                  .join(", ")
                                              : "Chưa thêm"}
                                          </p>
                                        </Link>
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
                        <h5 className="text-muted">
                          Không có album nào trong kho dữ liệu
                        </h5>
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

export default Albums;
