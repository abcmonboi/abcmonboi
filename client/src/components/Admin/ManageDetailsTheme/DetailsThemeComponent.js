import React, { memo,Fragment } from 'react'
import { Loading} from "../../../components";

const DetailsThemeComponent = ({
    theme,
    totalThemeSub,
    isLoading,
    handleUploadSubTheme
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
                    src={theme?.themesArtwork}
                    className="img-fluid w-100"
                    alt="album_art"
                  />
                </div>
                <div className="col-lg-10">
                  <div className="d-flex align-items-top justify-content-between iq-music-play-detail">
                    <div className="music-detail">
                      <span className="text-black "> Theme Title </span>

                      <h3 className="text-muted ">{theme?.title}</h3>
                      <span className="text-black "> Description: </span>
                      <span className="mb-0">
                        {theme?.description}
                      </span>
                   
                      <p>{`Total SubTheme: ${totalThemeSub} `}</p>
                      
                      <div className="d-flex align-items-center">
                      <a
                          onClick={() => handleUploadSubTheme(false)}
                          className="btn btn-primary iq-play mr-2 d-flex align-items-start justify-content-between"
                          title="View  All SubTheme In Theme"
                        >
                          <i
                            style={{
                              fontSize: "20px",
                            }}
                            className="ml-1 lar la-eye text-white"
                          >
                            
                          </i>
                        All SubTheme

                        </a>
                   
                
                          <a
                          onClick={() => handleUploadSubTheme(true)}
                          title="Add SubTheme To Theme"
                           className="btn btn-primary mr-2 d-flex align-items-center">
                            <i
                              style={{
                                fontSize: "20px",
                              }}
                              className="ml-1 las la-plus text-white"
                            ></i>
                            Add SubTheme To Theme
                          </a>

             


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
  
  </Fragment>
  )
}

export default memo(DetailsThemeComponent)