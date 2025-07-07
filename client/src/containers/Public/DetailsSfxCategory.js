import { useEffect, React, useState, Fragment, useRef } from "react";
import { useParams } from "react-router-dom";
import { HelmetComponent, Loading } from "components";
import { apigetAllSfxByCateSlug, apiGetSfxCategoryBySlug } from "apis";
import {MusicPlayer} from "components";
import * as actions from "store/actions";
import { useDispatch, useSelector } from "react-redux";
import logo from "assets/images/logo.png";
const DetailsSfxCategory = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(true);
  const { fileList } = useSelector((state) => state.music);

  const [sfx, setSfx] = useState([]);
  const [sfxCate, setSfxCate] = useState([]);
  const detailSfxCate = useRef(null);
  const FetchGetSfxCategoryBySlug = async () => {
    try {
      const response = await apiGetSfxCategoryBySlug(slug);
      const data = response.data.data;
      setSfxCate(data);
      setisLoading(false);
    } catch (error) {}
  };

  const FetchGetSfxByCateSlug = async () => {
    try {
      const response = await apigetAllSfxByCateSlug(slug);
      const data = response.data.data;
      setSfx(data);
      dispatch(actions.setPlaylist(data));
      setisLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    slug && FetchGetSfxCategoryBySlug() && FetchGetSfxByCateSlug();
    //eslint-disable-next-line
  }, [slug]);
  const handleDownloadAlbum = async () => {
    if (fileList === null) {
      dispatch(
        actions.setDownload([
          {
            file: sfx?.map((item) => {
              return {
                streaming: item.streaming,
                song: item?.title,
              };
            }),
            filename: sfxCate?.title + ".zip",
            thumbnail: sfxCate?.video_thumnail,
            type: "zip",
          },
        ])
      );
    } else {
      dispatch(
        actions.setDownload([
          ...fileList,
          {
            file: sfx?.map((item) => {
              return {
                streaming: item.streaming,
                song: item?.title,
              };
            }),
            filename: sfxCate?.title + ".zip",
            thumbnail: sfxCate?.video_thumnail,
            type: "zip",
          },
        ])
      );
    }
    // let zip = new JSZip();
    // let songToblob = async () => {
    //   for (let i = 0; i < sfx.length; i++) {
    //     if (sfx[i]?.streaming === "") {
    //       continue;
    //     } else {
    //       await fetch(sfx[i].streaming)
    //         .then((response) => response.blob())
    //         .then((blob) => {
    //           zip.file(`${sfx[i].slug}.mp3`, blob);
    //         });
    //     }
    //   }
    // };
    // await songToblob();
    // const zipFile = await zip.generateAsync({ type: "blob" });
    // saveAs(zipFile, `${sfxCate?.slug}.zip`);
  };
  return (
    <div ref={detailSfxCate} id="content-page" className="content-page">
      <HelmetComponent
        title={sfxCate?.title}
        description={
          sfxCate?.title 
        }
        imageUrl={logo}
        imageAlt={sfxCate?.title}
      />
      {/* <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={sfxCate?.title} />
        <link rel="canonical" href={window.location.href} />
        <meta property="fb:app_id" content="2426931344156472" />
      </Helmet> */}
      <div className="container-fluid">
        {isLoading ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          >
            {" "}
            <Loading />
          </div>
        ) : (
          <Fragment>
            <div className="row ">
              <div className="col-lg-12 ">
                <div
                  style={{
                    height: "250px",
                  }}
                  className="iq-card position-relative"
                >
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
                    <video
                      filter="url(#blur)"
                      style={{
                        objectFit: "cover",
                        borderRadius: "18px",
                      }}
                      src={sfxCate?.video_thumnail}
                      alt="SFX"
                      autoPlay
                      loop
                      muted
                    />
                  </div>
                  <div
                    className="iq-card position-absolute"
                    style={{
                      height: "100%",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "rgba(0,0,0,.5)",
                    }}
                  />

                  <div className="iq-card-body ">
                    <div className="row d-flex justify-content-spacebetween  ">
                      <div className="col-lg-12  ">
                        <div className="row  d-flex justify-content-between pr-3 pl-3">
                          <div className="music-detail text-white">
                            <span>Sound Effects Category</span>
                            <h3 className="mb-2 text-white">
                              {" "}
                              {sfxCate?.title}
                            </h3>
                            <div className=" d-flex align-items-center  ">
                              <a
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
                              </a>
                              <div
                                style={{
                                  zIndex: 2,
                                }}
                                className=""
                              >
                                <div
                                  data-toggle="modal"
                                  data-target="#exampleModalCenter4"
                                  className="d-flex align-items-center"
                                >
                                  <a className="btn btn-primary iq-play mr-2">
                                    <i className="las la-download text-white"></i>
                                    Free Download
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* <div className="music-right">
                            <div className="d-flex align-items-center">
                              <div
                                style={{
                                  position: "relative",
                                }}
                                className="iq-circle mr-2 share"
                              >
                                <a
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      window.location.href
                                    );
                                    document.getElementById(
                                      "shareLink"
                                    ).style.opacity = 1;
                                    setTimeout(() => {
                                      document.getElementById(
                                        "shareLink"
                                      ).style.opacity = 0;
                                    }, 2000);
                                  }}
                                >
                                  <i className="las la-share-alt-square text-primary"></i>
                                </a>
                              </div>
                              <div
                                id="shareLink"
                                style={{
                                  border: "1px solid #1faf16",
                                  borderRadius: "0.3rem",
                                  position: "absolute",
                                  zIndex: "999",
                                  top: "0",
                                  right: "10%",
                                  padding: "0.5rem 0.75rem",
                                  display: "flex",
                                  justifyContent: "center",
                                  backgroundColor: "#daffdc",
                                  color: "#212529",
                                  fontSize: "16x",
                                  opacity: "0",
                                  transition: "all 0.3s ease-in-out",
                                  marginRight: "1rem",
                                }}
                              >
                                <span>
                                  {"Link copied to clipboard "}
                                  <i className="las la-check-circle"></i>
                                </span>
                              </div>
                              <div
                                data-toggle="modal"
                                data-target="#exampleModalCenter4"
                                className="iq-circle"
                              >
                                <a>
                                  <i className="las la-download text-primary"></i>
                                </a>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {sfx?.length !== 0 && (
              <div className="col-lg-12">
                <div className="iq-card">
                  <div className="iq-card-body">
                    <ul className="list-unstyled iq-music-slide mb-0">
                      {sfx &&
                        sfx.map((sfx, index) => {
                          return (
                            <Fragment key={index}>
                              <MusicPlayer
                                reference={detailSfxCate}
                                sfx={sfx}
                              />
                            </Fragment>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        )}
      </div>

      <div
        className="modal fade"
        id="exampleModalCenter4"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenter4Title"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content ">
            <div className="modal-header">
              <h5
                style={{
                  color: "black",
                }}
                className="modal-title "
                id="exampleModalCenter4Title"
              >
                Say thanks to AudioBay
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Crediting isn't required, but linking back is greatly
                appreciated and allows music authors to gain exposure.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownloadAlbum();
                }}
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSfxCategory;
