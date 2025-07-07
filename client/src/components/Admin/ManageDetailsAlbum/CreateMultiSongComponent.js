import React, { memo, Fragment, useState, useEffect,useRef,useCallback } from "react";
import {
  apiGetAllMood,
  apiGetAllInstrument,
  apiGetAllVideoTheme,
  apiGetAllLicense,
} from "apis";
import Select from "react-select";
import Swal from "sweetalert2";
import UploadingFile from "../UploadingFile/UploadingFile";
import UploadMultiFileComponent from "../UploadingFile/UploadMultiFileComponent";

const CreateMultiSongComponent = ({ album,handleLoadingSong,handleUploadMultiSong }) => {
  const [multiSong, setMultiSong] = useState([]);

  const [mood, setMood] = useState([]);
  const [instrument, setInstrument] = useState([]);
  const [videoTheme, setVideoTheme] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [license, setLicense] = useState([]);

  const generalRef = useRef();
  const FetchGetAllMood = async () => {
    const response = await apiGetAllMood("", "", "-createdAt", "");
    const data = response.data.data
      .map((item) => {
        return {
          value: item._id,
          label: item.name,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
    setMood(data);
  };
  const FetchGetAllInstrument = async () => {
    const response = await apiGetAllInstrument("", "", "-createdAt", "");
    const data = response.data.data
      .map((item) => {
        return {
          value: item._id,
          label: item.name,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
    setInstrument(data);
  };
  const FetchGetAllVideoTheme = async () => {
    const response = await apiGetAllVideoTheme("", "", "-createdAt", "");
    const data = response.data.data
      .map((item) => {
        return {
          value: item._id,
          label: item.name,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
    setVideoTheme(data);
  };
  const FetchGetAllLicense = async () => {
    const response = await apiGetAllLicense({ sort: "title", fields: "title"});
    const data = response.data.data
      .map((item,index) => {
        return {
          value: item._id,
          label: `${item.title}`,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
    setLicense(data);
  };
  useEffect(() => {
    FetchGetAllMood();
    FetchGetAllInstrument();
    FetchGetAllVideoTheme();
    FetchGetAllLicense();
  }, []);
  const handleLoading = useCallback(
    (value) => {
      setIsLoading(value);
    },
    [isLoading]
  );
  const handleSubmit = () => {

    if( multiSong[0].moods === "" || multiSong[0].moods === undefined){      
      window.scrollTo({
        top: 100,
        left: 100,
        behavior: "smooth",
      })    
    }
    else if( multiSong?.map ((item) =>  item.title === "" || item.title === undefined).includes(true)){    
        Swal.fire("Error!", "Please fill all title", "error");
    } 
    else {
      setIsLoading(true);
    }
    

   
  };
  return (
    <Fragment>
      {multiSong?.length > 0 ? (
        <Fragment>
          <div ref={generalRef} className="row">
            <div className="col-sm-12">
              <div className="iq-card position-relative">
                <div className="iq-card-header d-flex justify-content-between">
                  <div className="iq-header-title">
                    <h4 className="card-title">
                      {" "}
                      {`General (`}
                      <span className="text-danger font-size-20 font-weight-bold">
                        *{" "}
                      </span>
                      <span className="font-size-16 text-primary">
                        Song will auto add general fields like Artists, Genre,
                        Album Title, Artwork following Album
                      </span>
                      {`)`}
                    </h4>
                  </div>
                </div>
                <div className="iq-card-body">
                  <form>
                    <div
                      style={{
                        color: "black",
                      }}
                      className="form-group"
                    >
                      <label>
                        <span className="text-danger font-size-16 font-weight-bold">
                          *{" "}
                        </span>
                        Mood:  <span className="text-danger font-size-16 font-weight-bold">
                         required
                        </span>
                      </label>
                      <Select
                        isClearable={true}
                        disabled={mood.length === 0}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            background: "rgba(0,0,0,0)",
                            border: "1px solid #e3e6f0",
                            boxShadow: "none",
                            "&:hover": {
                              border: "1px solid #e3e6f0",
                            },
                            color: "black",
                          }),
                          zIndex: 9999,
                        }}
                        isMulti
                        name="name"
                        options={mood}
                        isSearchable={true}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e) => {
                          if (e?.length === 0) {
                            setMultiSong((prev) => {
                              return prev.map((item) => {
                                return {
                                  ...item,
                                  moods: "",
                                };
                              });
                            });
                            return;
                          } else {
                            setMultiSong((prev) => {
                              return prev.map((item) => {
                                return {
                                  ...item,
                                  moods: e?.map((item) => item.value),
                                };
                              });
                            });
                          }
                        }}
                      />
                    </div>
               
                    {/* <div
                      style={{
                        color: "black",
                      }}
                      className="form-group"
                    >
                      <label>Video Theme:</label>
                      <Select
                        isClearable={true}
                        disabled={videoTheme.length === 0}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            background: "rgba(0,0,0,0)",
                            border: "1px solid #e3e6f0",
                            boxShadow: "none",
                            "&:hover": {
                              border: "1px solid #e3e6f0",
                            },
                            color: "black",
                          }),
                          zIndex: 9999,
                        }}
                        isMulti
                        name="name"
                        options={videoTheme}
                        isSearchable={true}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e) => {
                          if (e?.length === 0) {
                            setMultiSong((prev) => {
                              return prev.map((item) => {
                                return {
                                  ...item,
                                  videothemes: "",
                                };
                              });
                            });
                            return;
                          } else {
                            setMultiSong((prev) => {
                              return prev.map((item) => {
                                return {
                                  ...item,
                                  videothemes: e?.map((item) => item.value),
                                };
                              });
                            });
                          }
                        }}
                      />
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
          {multiSong?.map((item, index) => {
            return (
              <div key={index} className="row">
                <div className="col-sm-12">
                  <div className="iq-card position-relative">
                    <div className="iq-card-header d-flex justify-content-between">
                      <div className="iq-header-title ">
                        <h4 className="card-title">
                          {`File ${index + 1}`}
                          <span className="text-primary">
                            {" "}
                            {`: ${item?.streaming?.name}`}{" "}
                          </span>
                        </h4>
                      </div>
                      <a
                        onClick={() => {
                          setMultiSong((prev) => {
                            return prev.filter((item, i) => i !== index);
                          });
                        }}
                        className="d-flex align-items-center justify-content-center bg-danger text-white p-2 rounded rounded-circle"
                      >
                        <i className="las la-times  "></i>
                      </a>
                    </div>
                    <div className="iq-card-body">
                      <form>
                        <div className="form-group">
                          <label>
                            <span className="text-danger font-size-16 font-weight-bold">
                              *{" "}
                            </span>
                            Title:
                            <span className="text-danger font-size-16 font-weight-bold">
                          {` required`}
                        </span>
                          </label>
                          <input
                            onMouseLeave={(e) => {
                              if (e.target.value === "") {
                                if (
                                  document
                                    .getElementById(`warningTitle ${index}`)
                                    .classList.contains("d-none") === true
                                ) {
                                  document
                                    .getElementById(`warningTitle ${index}`)
                                    .classList.remove("d-none");
                                }
                              }
                            }}
                            onChange={(e) => {
                              if (e.target.value === "") {
                                if (
                                  document
                                    .getElementById(`warningTitle ${index}`)
                                    .classList.contains("d-none") === true
                                ) {
                                  document
                                    .getElementById(`warningTitle ${index}`)
                                    .classList.remove("d-none");
                                }
                              } else {
                                if (
                                  document
                                    .getElementById(`warningTitle ${index}`)
                                    .classList.contains("d-none") === false
                                ) {
                                  document
                                    .getElementById(`warningTitle ${index}`)
                                    .classList.add("d-none");
                                }
                              }
                              setMultiSong((prev) => {
                                return prev.map((item, i) => {
                                  if (i === index) {
                                    return {
                                      ...item,
                                      title: e.target.value,
                                    };
                                  }
                                  return item;
                                });
                              });
                            }}
                            type="text"
                            className="form-control"
                          />
                          <span
                            id={`warningTitle ${index}`}
                            className="text-danger d-none"
                          >
                            Please enter title
                          </span>
                        </div>
                        

                        <div className="form-group">
                          <label>
                            <span className="text-danger font-size-16 font-weight-bold">
                              *{" "}
                            </span>
                            {`Upload Song:(Tối đa: 100MB)`}
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              accept={".mp3"}
                              className="custom-file-input"
                              id="customFile"
                              onChange={(e) => {
                                if (e.target.files[0]) {
                                  setMultiSong((prev) => {
                                    return prev.map((item, i) => {
                                      if (i === index) {
                                        return {
                                          ...item,
                                          streaming: e.target.files[0],
                                        };
                                      }
                                      return item;
                                    });
                                  });
                                }
                              }}
                            />
                            {item && (
                              <label
                                className="custom-file-label text-black"
                                htmlFor="customFile"
                              >
                                {item?.streaming?.name}
                              </label>
                            )}
                          </div>
                        </div>
                        <div
                      style={{
                        color: "black",
                      }}
                      className="form-group"
                    >
                      <label>Instrument:</label>
                      <Select
                        isClearable={true}
                        disabled={instrument.length === 0}
                        styles={{
                          control: (base, state) => ({
                            ...base,
                            background: "rgba(0,0,0,0)",
                            border: "1px solid #e3e6f0",
                            boxShadow: "none",
                            "&:hover": {
                              border: "1px solid #e3e6f0",
                            },
                            color: "black",
                          }),
                          zIndex: 9999,
                        }}
                        isMulti
                        name="name"
                        options={instrument}
                        isSearchable={true}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(e) => {
                          if (e?.length === 0) {
                          setMultiSong((prev) => {
                            return prev.map((item, i) => {
                              if (i === index) {
                                return {
                                  ...item,
                                  instruments: "",
                                };
                              }
                              return item;
                            });
                          });
                        } else {
                          setMultiSong((prev) => {
                            return prev.map((item,i) => {
                              if (i === index) {
                                return {
                                  ...item,
                                  instruments: e?.map((item) => item.value),
                                };
                              }
                              return item;
                            });
                          });
                        }
                        }}
                    
                      />
                    </div>
                    <div
                        style={{
                          color: "black",
                        }}
                        className="form-group"
                      >
                        <label><span className="text-danger font-size-16 font-weight-bold">* </span>License:</label>
                        <Select
                          // isClearable={true}
                          disabled={license.length === 0}
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              background: "rgba(0,0,0,0)",
                              border: "1px solid #e3e6f0",
                              boxShadow: "none",
                              "&:hover": {
                                border: "1px solid #e3e6f0",
                              },
                            }),
                            zIndex: 9999,
                          }}
                          name="name"
                          options={license}
                          isSearchable={true}
                          className="basic-select font-weight-bold "
                          classNamePrefix="select"
                          onChange={(e) => {
                            setMultiSong((prev) => {
                              return prev.map((item,i) => {
                                if (i === index) {
                                  return {
                                    ...item,
                                    license: e?.value,
                                  };
                                }
                                return item;
                              });
                            });
                          }}
                   
                        />
                      </div>
                        <div className="form-group">
                          <label>Tempo:</label>
                          <input
                            id="tempo"
                            onChange={(e) => {
                              setMultiSong((prev) => {
                                return prev.map((item, i) => {
                                  if (i === index) {
                                    return {
                                      ...item,
                                      tempo: +e.target.value,
                                    };
                                  }
                                  return item;
                                });
                              });
                            }}
                            type="number"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label>Price:</label>
                          <input
                            onChange={(e) => {
                              setMultiSong((prev) => {
                                return prev.map((item, i) => {
                                  if (i === index) {
                                    return {
                                      ...item,
                                      price: +e.target.value,
                                    };
                                  }
                                  return item;
                                });
                              });
                            }}
                            type="number"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label>Description:</label>
                          <textarea
                            onChange={(e) => {
                              setMultiSong((prev) => {
                                return prev.map((item, i) => {
                                  if (i === index) {
                                    return {
                                      ...item,
                                      description: e.target.value,
                                    };
                                  }
                                  return item;
                                });
                              });
                            }}
                            className="form-control"
                            rows="2"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="iq-card">
            <div className="iq-card-body">
           
              <button   onClick={ handleSubmit} className="btn btn-primary" type="button">
                Submit form
              </button>
        

            </div>
          </div>
        </Fragment>
      ) : (
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card ">
              <div className="iq-card-body">
                <div className=" d-flex flex-column align-items-start justify-content-between">
                  <label htmlFor="exampleFormControlFile1">
                    {" "}
                    Select multiple songs to upload:
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                    multiple
                    accept=".mp3"
                    onChange={(e) => {
                      const files = e.target.files;
                      const arrFiles = Array.from(files);

                      setMultiSong(
                        arrFiles.map((item) => {
                          return {
                            streaming: item,
                            thumbnail: album?.album_art,
                            thumbnail_medium:
                              album?.album_cover || album?.album_art,
                            genres: album?.genres.map((item) => item._id),
                            album: album?._id,
                            artists: album?.artists.map((item) => item._id),
                            
                          };
                        })
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
                  
                  {isLoading && (
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
             setIsLoading(false);
            } }
          >
            <div className="w-100 h-100 position-relative">
            <UploadMultiFileComponent handleLoading={handleLoading}
              handleUploadMultiSong={handleUploadMultiSong}
              handleLoadingSong={handleLoadingSong}
             multiSong={multiSong}/>

            </div>
         
          </div>
        </Fragment>
      )}    </Fragment>
  );
};

export default memo(CreateMultiSongComponent);
