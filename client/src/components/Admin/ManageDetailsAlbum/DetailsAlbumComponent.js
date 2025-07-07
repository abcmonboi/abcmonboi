import React, { memo, useState, useCallback, Fragment } from "react";
import { Loading, ModalSearchAllSong } from "components";

const DetailsAlbumComponent = ({
  album,
  isLoading,
  totalSong,
  showModal,
  handleModal,
  handleUploadMultiSong,
  handleLoadingSong,
  handleLoading
}) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="iq-card">
            <div
              style={
                `${isLoading}` === "true"
                  ? { height: "274px", position: "relative" }
                  : { height: "auto" }
              }
              className="iq-card-body"
            >
              {isLoading ? (
                <div
                  style={{
                    position: "absolute",
                    top: "30%",
                    left: "46%",
                  }}
                >
                  {" "}
                  <Loading />
                </div>
              ) : (
                <div className="row">
                  <div className="col-lg-2">
                    <img
                      style={{
                        backgroundColor: "rgb(39,41,44)",
                        minHeight: "200px",
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                      src={album?.album_art}
                      className="img-fluid w-100"
                      alt="album_art"
                    />
                  </div>
                  <div className="col-lg-10">
                    <div className="d-flex align-items-top justify-content-between iq-music-play-detail">
                      <div className="music-detail">
                        <span className="text-black "> Album Title </span>

                        <h3 className="text-muted ">{album?.title}</h3>
                        <span className="text-black "> Artist: </span>
                        <span className=" mb-0">
                          {album?.artists &&
                            album?.artists
                              .map((artist) => artist.name)
                              .join(", ")}
                        </span>
                        <p className="mb-0 font-bold">
                          Genres:{" "}
                          {album?.genres?.map((genre) => genre.name).join(", ")}
                        </p>
                        <p>{`Total Song: ${totalSong} `}</p>
                        
                        <div className="d-flex align-items-center">
                        <a
                            onClick={() => handleUploadMultiSong(false)}
                            className="btn btn-primary iq-play mr-2 d-flex align-items-start justify-content-between"
                            title="View All Song In Album"
                          >
                            <i
                              style={{
                                fontSize: "20px",
                              }}
                              className="ml-1 lar la-eye text-white"
                            >
                              
                            </i>
                          All Song

                          </a>
                          <a
                            onClick={() => handleModal(true)}
                            className="btn btn-primary iq-play mr-2"
                            title="Add Available Song To Album"
                          >
                            <i
                              style={{
                                fontSize: "20px",
                              }}
                              className="ml-1 las la-plus text-white"
                            ></i>
                            Add Available Song To Album
                          </a>
                  
                            <a
                            onClick={() => handleUploadMultiSong(true)}
                            title="Add New Song To Album"
                             className="btn btn-primary mr-2 d-flex align-items-center">
                              <i
                                style={{
                                  fontSize: "20px",
                                }}
                                className="ml-1 las la-plus text-white"
                              ></i>
                              Add New Song To Album 
                            </a>
                          {/* </div> */}
 
               


                        </div>
                      </div>
                      <div
                        style={{
                          zIndex: 2,
                        }}
                        className="music-right"
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Fragment>
          <div
            style={{
              zIndex: 100,
              position: "fixed",
              width: "100vw",
              height: "100vh",
              inset: "0px",
              backgroundColor: "rgb(0 0 0 / 50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              handleModal(false);
              handleLoadingSong(true);
              handleLoading(true);
            } }
          >
            <ModalSearchAllSong handleModal={handleModal} aid={album?._id}
            handleLoadingSong={handleLoadingSong}
            handleLoading={handleLoading}
             />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default memo(DetailsAlbumComponent);
