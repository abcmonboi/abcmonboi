import React, { Fragment, useEffect, useRef, useState } from "react";
import { Loading, HelmetComponent } from "components";
import { Link } from "react-router-dom";
import { apiGetAllArtist } from "apis/artist";
import { Search } from "components";
const Artist = () => {
  const [isLoading, setisLoading] = useState(true);
  const [listArtist, setListArtist] = useState([]);
  const artistPage = useRef(null);
  const FetchGetAllArtist = async () => {
    try {
      const response = await apiGetAllArtist();
      const data = response.data.data;
      setListArtist(data);
      setisLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    artistPage.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    FetchGetAllArtist();
  }, []);

  return (
    <Fragment>
      <HelmetComponent
        title="Nghệ Sĩ - AudioBay"
        description="Nền tảng âm nhạc và âm thanh đa dạng, từ miễn phí đến bản quyền. Khám phá và tận hưởng những bản nhạc chất lượng cao, phù hợp với mọi nhu cầu sáng tạo nội dung của bạn."
        imageUrl={"/assets/images/audio/1.png"}
        imageAlt="artist"
        href={"https://audiobay.net/artists"}
      />
      <div ref={artistPage} id="content-page" className="content-page">
        <div className="container-fluid">
          <div className="row">
            <Search />

            <Fragment>
              <div className="col-lg-12">
                <div className="iq-card">
                  <div className="iq-card-header d-flex justify-content-between align-items-center">
                    <div className="iq-header-title">
                      <h4 className="card-title font-weight-normal">Nghệ sĩ</h4>
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
                    ) : (
                      <ul className="list-unstyled row feature-album-artist mb-0 ">
                        {listArtist &&
                          listArtist.map((item, index) => {
                            return (
                              <li
                                key={item._id}
                                className="col-lg-2  iq-music-box mb-5"
                              >
                                <Link to={`/artists/${item?.slug}`}>
                                  <div className="iq-thumb-artist">
                                    <div className="iq-music-overlay"></div>
                                    <img
                                      src={item.thumbnail}
                                      className="w-100 img-fluid artist-cover-thumb "
                                      alt="artist-profile"
                                    />
                                  </div>
                                </Link>
                                <div className="feature-list text-center">
                                  <h6 className="font-weight-600  mb-0">
                                    {item.name}
                                  </h6>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
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

export default Artist;
